"use client";
import FormField from "@/components/formField";
import MemberEditPopup from "@/components/memberEditPopup";
import SelectFormField from "@/components/selectFormField";
import { useState } from "react";

export default function AddMember() {
    const [popupDisplay, setPopupDisplay] = useState(false);
    return (
        <div className="add-member-page">
            <div className="popup-background"
                style={{ display: popupDisplay ? "flex" : "none" }}
                onClick={() => {
                    setPopupDisplay(false);
                }}
            >
                <MemberEditPopup
                    closePopup={() => setPopupDisplay(false)}
                />
            </div>
            <h1>Add a New Member</h1>
            <div className="add-member-body">
                <div className="add-member-left-side">
                    <div className="add-member-profile-img-cont-outside">
                        <div className="add-member-profile-img-cont">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                <path d="M24.152 2.2546H23.0248L23.0246 1.1272C23.0246 0.450842 22.5738 0 21.8974 0C21.221 0 20.7702 0.450842 20.7702 1.1272V2.2544H19.643C18.9666 2.2544 18.5158 2.70525 18.5158 3.38161C18.5158 4.05797 18.9666 4.50881 19.643 4.50881H20.7702V5.63601C20.7702 6.31237 21.221 6.76321 21.8974 6.76321C22.5738 6.76321 23.0246 6.31237 23.0246 5.63601V4.509H24.1518C24.8282 4.509 25.279 4.05816 25.279 3.3818C25.2792 2.70544 24.8284 2.2546 24.152 2.2546H24.152ZM11.7519 12.4C10.5118 12.4 9.4973 13.4145 9.4973 14.6546C9.4973 15.8947 10.5118 16.9092 11.7519 16.9092C12.992 16.9092 14.0065 15.8947 14.0065 14.6546C14.0065 13.4145 12.992 12.4 11.7519 12.4ZM19.6426 7.8908H18.1772L17.839 6.87626C17.7264 6.53808 17.6135 6.31256 17.3882 5.97438V5.86172L17.2755 5.74906C16.599 4.96004 15.6973 4.509 14.6828 4.509H8.82065C8.25714 4.509 7.58078 4.73452 7.12975 5.0727C7.01709 5.0727 7.01709 5.18536 6.90423 5.18536C6.34073 5.63639 5.88988 6.1999 5.66437 6.87626L5.32619 7.8908H3.8608C1.94439 7.8908 0.479004 9.35618 0.479004 11.2726V20.2909C0.479004 22.2073 1.94439 23.6727 3.8608 23.6727H19.6427C21.5591 23.6727 23.0245 22.2073 23.0245 20.2909V11.2726C23.0243 9.35638 21.5589 7.8908 19.6425 7.8908H19.6426ZM11.7519 19.1638C9.27197 19.1638 7.24289 17.1347 7.24289 14.6548C7.24289 12.1749 9.27197 10.1458 11.7519 10.1458C14.2318 10.1458 16.2609 12.1749 16.2609 14.6548C16.2609 17.1347 14.2318 19.1638 11.7519 19.1638Z" fill="#A3A3A3" />
                            </svg>
                            <p>Upload photo</p>
                        </div>
                    </div>
                    <div className="photo-size-spec">
                        <h3>Allowed format</h3>
                        <p>JPG, JPEG, and PNG</p>
                    </div>
                    <div className="photo-size-spec">
                        <h3>Max file size</h3>
                        <p>2MB</p>
                    </div>
                </div>
                <div className="add-member-inputs">
                    <fieldset className="parallel-fields">
                        <FormField
                            label="First Name"
                            type="text"
                            placeholder="Enter First Name"
                            value=""
                            onChange={() => {
                                console.log("First Name");
                            }}
                        />
                        <FormField
                            label="Last Name"
                            type="text"
                            placeholder="Enter Last Name"
                            value=""
                            onChange={() => {
                                console.log("Last Name");
                            }}
                        />
                    </fieldset>
                    <fieldset className="parallel-fields">
                        <FormField
                            label="Email"
                            type="text"
                            placeholder="Enter Email"
                            value=""
                            onChange={() => {
                                console.log("Email");
                            }}
                        />
                        <FormField
                            label="Phone Number"
                            type="text"
                            placeholder="Enter Phone Number"
                            value=""
                            onChange={() => {
                                console.log("Phone Number");
                            }}
                        />
                    </fieldset>
                    <fieldset className="parallel-fields">
                        <SelectFormField
                            label="Gender"
                            options={[
                                { value: "all", label: "All" },
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                            ]}
                        />
                        <FormField
                            label="ID / Passport Number"
                            type="text"
                            placeholder="Enter ID / Passport Number"
                            value=""
                            onChange={() => {
                                console.log("ID / Passport Number");
                            }}
                        />
                    </fieldset>
                    <fieldset className="parallel-fields">
                        <SelectFormField
                            label="Role"
                            options={[
                                { value: "all", label: "All" },
                                { value: "admin", label: "Admin" },
                                { value: "member", label: "Member" },
                            ]}
                        />
                        <FormField
                            label="Address"
                            type="text"
                            placeholder="Enter Address"
                            value=""
                            onChange={() => {
                                console.log("Address");
                            }}
                        />
                    </fieldset>
                    <button className="tertially-btn"
                    onClick={() => {
                        setPopupDisplay(true)
                    }}
                    >Add Member</button>

                </div>
            </div>
        </div>
    );
}