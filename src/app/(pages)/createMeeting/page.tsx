"use client";
import Button from "@/components/button";
import FormField from "@/components/formField";
import TextAreaField from "@/components/textAreaField";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {

    const router = useRouter();

    const [meeting, setMeeting] = useState({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        description: ""
    });

    const handleCreateMeeting = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/meetings/create", meeting);
            if (response.status === 201) {
                console.log("Meeting created successfully");
                toast.success("Meeting created successfully")
                router.push("/meetings");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response.data.message);
            } else {
                console.log("Server Error");
            }
        }
    }

    return (
        <div className="create-meeting-page">
            <form className="create-meeting-form" onSubmit={handleCreateMeeting}>
                <h1>Create a New Event</h1>
                <div className="create-meeting-page-section">
                    <h3>Event Details</h3>
                    <FormField
                        label="Title"
                        type="text"
                        placeholder="Enter event Title"
                        value={meeting.title}
                        onChange={
                            (event) => {
                                setMeeting({ ...meeting, title: event.target.value });
                            }
                        }
                    />
                </div>

                <div className="create-meeting-page-section">
                    <h3>Date & Time</h3>
                    <FormField
                        label="Date"
                        type="date"
                        placeholder="Enter date"
                        value={meeting.date}
                        onChange={
                            (event) => {
                                setMeeting({ ...meeting, date: event.target.value });
                            }
                        }
                    />
                    <fieldset className="parallel-fields">

                        <FormField
                            label="Start Time"
                            type="time"
                            placeholder="Enter time"
                            value={meeting.startTime}
                            onChange={
                                (event) => {
                                    setMeeting({ ...meeting, startTime: event.target.value });
                                }
                            }
                        />
                        <FormField
                            label="End Time"
                            type="time"
                            placeholder="Enter time"
                            value={meeting.endTime}
                            onChange={
                                (event) => {
                                    setMeeting({ ...meeting, endTime: event.target.value });
                                }
                            }
                        />
                    </fieldset>
                </div>
                <div className="create-meeting-page-section">
                    <h3>Location</h3>
                    <FormField
                        label="Where will the meeting take place?"
                        type="text"
                        placeholder="Enter location"
                        value={meeting.location}
                        onChange={
                            (event) => {
                                setMeeting({ ...meeting, location: event.target.value });
                            }
                        }
                    />
                </div>
                <div className="create-meeting-page-section">
                    <h3>Additional Information</h3>
                    <TextAreaField
                        label="Description"
                        placeholder="Enter description"
                        value={meeting.description}
                        onChange={
                            (event) => {
                                setMeeting({ ...meeting, description: event.target.value });
                            }
                        }
                    />
                </div>
                <Button
                    label="Create Event"
                    className="button-tertially"
                />
            </form>
        </div>

    )
}