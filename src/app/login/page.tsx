"use client";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import FormField from "@/components/formField";
import LogoContainer from "@/components/logoContainer";
import MarkAttendancePopup from "@/components/markAttendancePopup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import { cn } from "@/lib/utils";


import { useAuth } from "@/lib/auth/authProvider";
import toast from "react-hot-toast";




export default function Page() {
    const router = useRouter();
    const [popupDisplay, setPopupDisplay] = useState(false);

    const loggedInUser = useAuth().user

    // useEffect(() => {
    //     axios.get("/api/users/populateUsers")
    //         .then((res) => {
    //             console.log("Users populated successfully", res.data);
    //         })
    //         .catch((err) => {
    //             console.error("Error populating users:", err);
    //         })     
    // }, [])

    useEffect(() => {
        if (loggedInUser) {
            router.push("/overview")
        }
    }, [loggedInUser, router])

    const [user, setUser] = useState({
        phoneNumber: "",
        password: "",
        remberMe: false
    })

    const handleJoinMeeting = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setPopupDisplay(true)
    }

    const formValidation = () => {
        if (user.phoneNumber === "") {
            toast.error("Phone number is required")
            return false
        }
        if (user.password === "") {
            toast.error("Password is required")
            return false
        }
        return true
    }

    const { refreshUser } = useAuth(); // Import useAuth hook

    const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!formValidation()) {
            return;
        }
    
        try {
            await axios.post("/api/login", user);
            await refreshUser(); // Refresh user data after login
            router.push("/overview");
            toast.success("Logged in successfully");

        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response.data.message);
                // setError(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                console.log("An unexpected error occurred");
                toast.error("An unexpected error occurred");
            }
        }
    };


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
            <div className="login-form">
                <LogoContainer />
                <div className="login-page-heading">
                    <p>Welcome back!!</p>
                    <h1>Please Sign In</h1>
                </div>
                <fieldset>
                    {/* <PhoneInput
                        placeholder="Enter phone number"
                        value={user.phoneNumber}
                        onChange={(value) => {
                            setUser({ ...user, phoneNumber: value ?? "" })
                        }}
                        defaultCountry="RW"
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        )}
                    /> */}

                    <FormField
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={user.phoneNumber}
                        onChange={(e) => {
                            setUser({...user, phoneNumber: e.target.value})
                        }}
                    />
                    <p className='text-black-500 text-sm w-100 text-start'>
                        Please Enter your phone number
                    </p>
                    <FormField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                    />
                    <Checkbox
                        label="Remember me"
                        checked={user.remberMe}
                        onChange={() => {
                            setUser({...user, remberMe: !user.remberMe})
                        }}
                    />
                </fieldset>

                <Button
                    label="Sign In"
                    onClick={handleSignIn}
                    className="button-primary"
                />



                {/* <OtpLogin/> */}
                <Button
                    label="Join Meeting"
                    onClick={handleJoinMeeting}
                    className="button-primary"
                    disabled={true}
                />
            </div>
        </div>
    );
}