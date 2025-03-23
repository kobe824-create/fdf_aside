"use client";
import Button from "@/components/button";
import Table from "@/components/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Meetings() {
    const router = useRouter();
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        axios.get("/api/meetings/get")
            .then(res => {
                setMeetings(res.data.meetings);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div className="meeting-page">

            <div className="meeting-body">
                <h2>
                    Meetings Dashboard
                    <Button
                        label="Create New Metting"
                        onClick={
                            () => {
                                router.push("/createMeeting")
                            }
                        }
                        className="button-primary"
                    />
                </h2>
                <div className="overview-tables">
                    <Table
                        data={{
                            tableHeaders: ["Title", "Start Time", "End Time", "Location", "Action"],
                            tableData: meetings.map((meeting: any) => [
                                meeting.title,
                                meeting.startTime,
                                meeting.endTime,
                                meeting.location,
                                <Button
                                    key={meeting._id}
                                    label="View"
                                    onClick={() => router.push(`/meeting/?id=${meeting._id}`)}
                                    className="button-tertially"
                                />
                            ]),
                            type: "normal"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}