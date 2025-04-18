"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/components/button";
import FormField from "@/components/formField";
import TextAreaField from "@/components/textAreaField";
import RotatingWheelLoader from "@/components/rotatingWheel";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [meeting, setMeeting] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
  });

  const handleInputChange = (field: keyof typeof meeting) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setMeeting((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCreateMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/meetings/create", meeting);
      if (response.status === 201) {
        toast.success("Meeting created successfully");
        router.push("/meetings");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("Server Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-wheel">
        <RotatingWheelLoader />
      </div>
    );
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
            placeholder="Enter event title"
            value={meeting.title}
            onChange={handleInputChange("title")}
          />
        </div>

        <div className="create-meeting-page-section">
          <h3>Date & Time</h3>
          <FormField
            label="Date"
            type="date"
            placeholder="Enter date"
            value={meeting.date}
            onChange={handleInputChange("date")}
          />
          <fieldset className="parallel-fields">
            <FormField
              label="Start Time"
              type="time"
              placeholder="Enter time"
              value={meeting.startTime}
              onChange={handleInputChange("startTime")}
            />
            <FormField
              label="End Time"
              type="time"
              placeholder="Enter time"
              value={meeting.endTime}
              onChange={handleInputChange("endTime")}
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
            onChange={handleInputChange("location")}
          />
        </div>

        <div className="create-meeting-page-section">
          <h3>Additional Information</h3>
          <TextAreaField
            label="Description"
            placeholder="Enter description"
            value={meeting.description}
            onChange={handleInputChange("description")}
          />
        </div>

        <Button label="Create Event" className="button-tertially" />
      </form>
    </div>
  );
}
