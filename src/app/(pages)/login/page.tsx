"use client";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import FormField from "@/components/formField";
import LogoContainer from "@/components/logoContainer";
import OtpField from "@/components/otpField";

export default function Page() {
    return (
        <div className="login-page-wrapper">
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
                />
            </form>
        </div>
    );
}