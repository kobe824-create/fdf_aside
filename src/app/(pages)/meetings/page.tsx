"use client";
import Button from "@/components/button";
import Table from "@/components/table";
import { useAuth } from "@/lib/auth/authProvider";
import { MeetingTypes } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Meetings() {
    const router = useRouter();
    const [meetings, setMeetings] = useState<MeetingTypes[]>([]);

    useEffect(() => {
        axios.get("/api/meetings/get")
            .then(res => {
                setMeetings(res.data.meetings);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const { user } = useAuth();


    return (
        <div className="meeting-page">

            <div className="meeting-body">
                <h2>
                    Meetings Dashboard
                    {user?.role === "admin" &&
                        <Button
                            label="Create New Metting"
                            onClick={
                                () => {
                                    router.push("/createMeeting")
                                }
                            }
                            className="button-primary"
                        />
                    }
                </h2>
                <div className="overview-tables">
                    <Table
                        data={{
                            tableHeaders: ["Title", "Date", "Start Time", "Location"],
                            tableData: meetings.map((meeting: MeetingTypes) => [
                                meeting.title,
                                meeting.date.split("T")[0],
                                meeting.startTime,
                                meeting.location,
                            ]),
                            type: "normal",
                            searchWords: ["title", "date", "location"],
                            onRowClick: (idex) => router.push(`/meeting/?id=${meetings[idex]._id}`)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}