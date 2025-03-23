"use client";
import React, {  useEffect, useState, } from "react";
import Button from "./button";
import axios from "axios";





interface MarkAttendancePopupProps {
    closePopup: () => void;
    attendanceId: string;
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
}

  


export default function AttachmentPopup(props: MarkAttendancePopupProps) {
    const [initialStatus, setInitialStatus] = useState("");
    const { closePopup, attendanceId, setUpdate } = props

    

    const defaultStatus = [
        {
            status: "present",
            checked: false
        },
        {
            status: "absent",
            checked: false,
        },
        {
            status: "late",
            checked: false
        },
        {
            status: "excused",
            checked: false
        },
        {
            status: "very late",
            checked: false
        }
    ]

    const [attendanceStatus, setAttendanceStatus] = useState(defaultStatus);



    const handleContinue = async () => {
        try {
            const status = attendanceStatus.find(s => s.checked);
            if (!status) {
                console.error("No status selected");
                return;
            }
            const res = await axios.post("/api/attendances/update", {
                attendanceId,
                status: status.status
            });
            console.log(res.data);
            closePopup();
            setUpdate((prev: number) => prev + 1);
            setInitialStatus(status.status);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    useEffect(() => {
        axios.post("/api/attendances/getOne", {
            attendanceId
        }).then(res => {
            const { attendance } = res.data;
            console.log(attendance);
            const status = attendance.status;
            setInitialStatus(status);
            setAttendanceStatus(
                attendanceStatus.map(s => {
                    if (s.status === status) {
                        return {
                            ...s,
                            checked: true
                        }
                    } else {
                        return {
                            ...s,
                            checked: false
                        }
                    }
                })
            )
        })
    }, [attendanceId]);

    return (
        <div className="mark-attendance-poppup"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="mark-attendance-success">
                <div className="login-page-heading">
                    <h2>Update Attendance status</h2>
                </div>
                <div className="atttendance-status-container">
                    {
                        attendanceStatus.map((status, index) => {
                            return (
                                <div className="attendance-status" key={index}
                                    onClick={() => {
                                        const newStatus = attendanceStatus.map((s, i) => {
                                            if (i === index) {
                                                return {
                                                    ...s,
                                                    checked: true
                                                }
                                            } else {
                                                return {
                                                    ...s,
                                                    checked: false
                                                }
                                            }
                                        })
                                        setAttendanceStatus(newStatus)
                                    }}
                                >
                                    <div className={`attendance-chekbox ${status.checked ? "checked" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M9 1L3.5 6.5L1 4" stroke="#B0CAD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p>{status.status}</p>
                                </div>
                            )
                        })
                    }



                </div>


                <div className="parallel-btn">
                    <Button
                        label="Cancel"
                        onClick={() => {
                            closePopup()
                        }}
                        className="button-tertially"
                    />
                    {
                        attendanceStatus.find(s => s.checked && s.status !== initialStatus) &&
                        <Button
                            label="Update Attendance"
                            onClick={handleContinue}
                            className="button-primary"
                        />
                    }


                </div>

            </div>
        </div>

    )
}