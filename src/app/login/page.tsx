"use client";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import FormField from "@/components/formField";
import LogoContainer from "@/components/logoContainer";
import MarkAttendancePopup from "@/components/markAttendancePopup";
import OtpField from "@/components/otpField";
import { useState } from "react";

export default function Page() {
    const [popupDisplay, setPopupDisplay] = useState(false);
    const handleJoinMeeting =  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setPopupDisplay(true)
    }
    return (
        <div className="login-page-wrapper">
            <div className="popup-background"
                style={{ display: popupDisplay ? "flex" : "none" }}
                onClick={() => setPopupDisplay(false)}
                >
                < MarkAttendancePopup
                    closePopup={() => setPopupDisplay(false)}
                />
            </div>
            <form className="login-form">
                <LogoContainer />
                <div className="login-page-heading">
                    <p>Welcome back!!</p>
                    <h1>Please Sign In</h1>
                </div>
                <fieldset>
                    <FormField
                        label="Phone Number"
                        type="text"
                        placeholder="Enter your phone number"
                        value=""
                        onChange={() => {
                            console.log("Phone Number");
                        }}
                    />
                    <OtpField
                        label="OTP Number"
                        value=""
                        onChange={() => {
                            console.log("OTP Number");
                        }}
                    />
                    <Checkbox
                        label="Remember me"
                        checked={false}
                        onChange={() => {
                            console.log("Remember me");
                        }}
                    />

                </fieldset>
                <Button
                    label="Sign In"
                    onClick={() => {
                        console.log("Sign In");
                    }}
                    className="button-primary"
                />
                <Button
                    label="Join Meeting"
                    onClick={handleJoinMeeting}
                    className="button-primary"
                />
            </form>
        </div>
    );
}