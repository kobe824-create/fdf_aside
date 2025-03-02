"use client";
import LogoContainer from "@/components/logoContainer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TabsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const dashboardSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M0.666748 14C0.666748 12.7163 0.666748 12.0745 0.955689 11.6029C1.11737 11.3391 1.33919 11.1173 1.60303 10.9556C2.07453 10.6667 2.71638 10.6667 4.00008 10.6667C5.28378 10.6667 5.92563 10.6667 6.39714 10.9556C6.66097 11.1173 6.8828 11.3391 7.04447 11.6029C7.33341 12.0745 7.33341 12.7163 7.33341 14C7.33341 15.2837 7.33341 15.9256 7.04447 16.3971C6.8828 16.6609 6.66097 16.8827 6.39714 17.0444C5.92563 17.3333 5.28378 17.3333 4.00008 17.3333C2.71638 17.3333 2.07453 17.3333 1.60303 17.0444C1.33919 16.8827 1.11737 16.6609 0.955689 16.3971C0.666748 15.9256 0.666748 15.2837 0.666748 14Z" stroke="white" />
            <path d="M10.6667 14C10.6667 12.7163 10.6667 12.0745 10.9557 11.6029C11.1174 11.3391 11.3392 11.1173 11.603 10.9556C12.0745 10.6667 12.7164 10.6667 14.0001 10.6667C15.2838 10.6667 15.9256 10.6667 16.3971 10.9556C16.661 11.1173 16.8828 11.3391 17.0445 11.6029C17.3334 12.0745 17.3334 12.7163 17.3334 14C17.3334 15.2837 17.3334 15.9256 17.0445 16.3971C16.8828 16.6609 16.661 16.8827 16.3971 17.0444C15.9256 17.3333 15.2838 17.3333 14.0001 17.3333C12.7164 17.3333 12.0745 17.3333 11.603 17.0444C11.3392 16.8827 11.1174 16.6609 10.9557 16.3971C10.6667 15.9256 10.6667 15.2837 10.6667 14Z" stroke="white" />
            <path d="M0.666748 4C0.666748 2.71631 0.666748 2.07446 0.955689 1.60295C1.11737 1.33911 1.33919 1.11729 1.60303 0.955613C2.07453 0.666672 2.71638 0.666672 4.00008 0.666672C5.28378 0.666672 5.92563 0.666672 6.39714 0.955613C6.66097 1.11729 6.8828 1.33911 7.04447 1.60295C7.33341 2.07446 7.33341 2.71631 7.33341 4C7.33341 5.2837 7.33341 5.92555 7.04447 6.39706C6.8828 6.66089 6.66097 6.88272 6.39714 7.0444C5.92563 7.33334 5.28378 7.33334 4.00008 7.33334C2.71638 7.33334 2.07453 7.33334 1.60303 7.0444C1.33919 6.88272 1.11737 6.66089 0.955689 6.39706C0.666748 5.92555 0.666748 5.2837 0.666748 4Z" stroke="white" />
            <path d="M10.6667 4C10.6667 2.71631 10.6667 2.07446 10.9557 1.60295C11.1174 1.33911 11.3392 1.11729 11.603 0.955613C12.0745 0.666672 12.7164 0.666672 14.0001 0.666672C15.2838 0.666672 15.9256 0.666672 16.3971 0.955613C16.661 1.11729 16.8828 1.33911 17.0445 1.60295C17.3334 2.07446 17.3334 2.71631 17.3334 4C17.3334 5.2837 17.3334 5.92555 17.0445 6.39706C16.8828 6.66089 16.661 6.88272 16.3971 7.0444C15.9256 7.33334 15.2838 7.33334 14.0001 7.33334C12.7164 7.33334 12.0745 7.33334 11.603 7.0444C11.3392 6.88272 11.1174 6.66089 10.9557 6.39706C10.6667 5.92555 10.6667 5.2837 10.6667 4Z" stroke="white" />
        </svg>
    )
    const myAccountSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
            <path d="M11.1667 13.4167C11.1667 13.4167 12.0001 13.4167 12.8334 15.0833C12.8334 15.0833 15.4805 10.9167 17.8334 10.0833" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.0835 7.58334H4.07601" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66675 14.25H8.25008C5.11793 14.25 3.55186 14.25 2.50629 13.4243C2.33906 13.2922 2.18441 13.1466 2.04408 12.9893C1.16675 12.0052 1.16675 10.5312 1.16675 7.58334C1.16675 4.63543 1.16675 3.16148 2.04408 2.17742C2.18441 2.02003 2.33906 1.87447 2.50629 1.7424C3.55186 0.916672 5.11793 0.916672 8.25008 0.916672H10.7501C13.8822 0.916672 15.4483 0.916672 16.4939 1.7424C16.6611 1.87447 16.8158 2.02003 16.9561 2.17742C17.7465 3.06404 17.8248 4.34833 17.8326 6.75V7.16667" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.5834 7.58333C11.5834 8.73393 10.6507 9.66667 9.50008 9.66667C8.34949 9.66667 7.41675 8.73393 7.41675 7.58333C7.41675 6.43274 8.34949 5.5 9.50008 5.5C10.6507 5.5 11.5834 6.43274 11.5834 7.58333Z" stroke="white" />
        </svg>
    )

    const membersSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
            <path d="M17.8117 13C18.4361 13 18.9328 12.6071 19.3787 12.0576C20.2916 10.9329 18.7928 10.034 18.2211 9.59383C17.64 9.14635 16.9912 8.89285 16.3333 8.83333M15.5 7.16667C16.6506 7.16667 17.5833 6.23393 17.5833 5.08333C17.5833 3.93274 16.6506 3 15.5 3" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M3.18822 13C2.5638 13 2.06714 12.6071 1.62121 12.0576C0.708326 10.9329 2.20714 10.034 2.77879 9.59383C3.3599 9.14635 4.00874 8.89285 4.66659 8.83333M5.08325 7.16667C3.93266 7.16667 2.99992 6.23393 2.99992 5.08333C2.99992 3.93274 3.93266 3 5.08325 3" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M7.23642 10.5927C6.38494 11.1192 4.15241 12.1943 5.51217 13.5395C6.1764 14.1967 6.91619 14.6667 7.84627 14.6667H13.1536C14.0837 14.6667 14.8234 14.1967 15.4877 13.5395C16.8474 12.1943 14.6149 11.1192 13.7634 10.5927C11.7667 9.35802 9.23313 9.35802 7.23642 10.5927Z" fill="white" stroke="white" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.4166 4.25001C13.4166 5.86084 12.1107 7.16668 10.4999 7.16668C8.88909 7.16668 7.58325 5.86084 7.58325 4.25001C7.58325 2.63918 8.88909 1.33334 10.4999 1.33334C12.1107 1.33334 13.4166 2.63918 13.4166 4.25001Z" fill="white" stroke="white" strokeOpacity="0.8" />
        </svg>
    )
    const meetingsSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
            <path d="M15.5834 13.1071V7.33332C15.5834 4.19063 15.5834 2.61928 14.6071 1.64297C13.6308 0.666656 12.0594 0.666656 8.91675 0.666656H8.08342C4.94072 0.666656 3.36937 0.666656 2.39306 1.64297C1.41675 2.61928 1.41675 4.19063 1.41675 7.33332V15.25" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M15.5834 13.1667H3.50008C2.34949 13.1667 1.41675 14.0994 1.41675 15.25C1.41675 16.4006 2.34949 17.3333 3.50008 17.3333H15.5834" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M15.5833 17.3333C14.4327 17.3333 13.5 16.4006 13.5 15.25C13.5 14.0994 14.4327 13.1667 15.5833 13.1667" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M11 4.83331L6 4.83331" stroke="white" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 8.16666L6 8.16666" stroke="white" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
    const codeOfConductSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
            <path d="M15.5834 13.1071V7.33332C15.5834 4.19063 15.5834 2.61928 14.6071 1.64297C13.6308 0.666656 12.0594 0.666656 8.91675 0.666656H8.08342C4.94072 0.666656 3.36937 0.666656 2.39306 1.64297C1.41675 2.61928 1.41675 4.19063 1.41675 7.33332V15.25" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M15.5834 13.1667H3.50008C2.34949 13.1667 1.41675 14.0994 1.41675 15.25C1.41675 16.4006 2.34949 17.3333 3.50008 17.3333H15.5834" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M15.5833 17.3333C14.4327 17.3333 13.5 16.4006 13.5 15.25C13.5 14.0994 14.4327 13.1667 15.5833 13.1667" stroke="white" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M11 4.83331L6 4.83331" stroke="white" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 8.16666L6 8.16666" stroke="white" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const navlinks = [
        {
            name: "Dashboard",
            svg: dashboardSVG,
            status: "active",
            path: "overview"

        },
        {
            name: "My Account",
            svg: myAccountSVG,
            status: "",
            path: "myAccount"
            
        },
        {
            name: "Members",
            svg: membersSVG,
            status: "",
            path: "members"
        },
        {
            name: "Meetings",
            svg: meetingsSVG,
            status: "",
            path: "meetings"
        },
        {
            name: "Code of Conduct",
            svg: codeOfConductSVG,
            status: "",
            path: "codeOfConduct"
        }
    ]
    const [navlinkStates, setNavlinkstates] = useState(navlinks);

    const handleNavigation = (path: string) => {
        router.push(path);
    }
    useEffect (() => {
        navlinkStates.map((navlink) => {
            if (navlink.status === "active") {
                handleNavigation(navlink.path);
            }
        })
    }, [navlinkStates])

    return (
        <div className="tabs-layout">
            <div className="side-bar">
                <div className="side-bar-heading">
                    <LogoContainer />
                </div>
                <div className="navlinks-container">
                    {
                        navlinkStates.map((navlink, index) => {
                            return (
                                <div 
                                className={`navlink ${navlink.status}`} key={index} 
                                onClick={() => {
                                    setNavlinkstates(navlinkStates.map((navlink, i) => {
                                        if (i === index) {
                                            return { ...navlink, status: "active" }
                                        } else {
                                            return { ...navlink, status: "" }
                                        }
                                    }))
                                }
                                }>
                                    <div className="navlink-img-cont">
                                        {navlink.svg}
                                    </div>
                                    <p>
                                        {navlink.name}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="side-bar-bottom">
                    <div className="side-bar-bottom-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M17.3332 9.00016C17.3332 4.39779 13.6022 0.66683 8.99984 0.66683C4.39746 0.66683 0.666504 4.39779 0.666504 9.00016C0.666504 13.6025 4.39746 17.3335 8.99984 17.3335C13.6022 17.3335 17.3332 13.6025 17.3332 9.00016Z" stroke="black" strokeOpacity="0.8" />
                            <path d="M9.2015 13.1667V9.00008C9.2015 8.60724 9.2015 8.41083 9.07946 8.28879C8.95742 8.16675 8.761 8.16675 8.36816 8.16675" stroke="black" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.993 5.66675H9.00049" stroke="black" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>Help</p>
                    </div>
                    <div className="side-bar-bottom-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10.5 12.6875C10.4387 14.2308 9.15258 15.5412 7.4297 15.499C7.02887 15.4892 6.53344 15.3495 5.5426 15.07C3.15801 14.3974 1.08796 13.267 0.591296 10.7346C0.5 10.2691 0.5 9.74532 0.5 8.69771L0.5 7.30229C0.5 6.25468 0.5 5.73087 0.591296 5.26538C1.08796 2.73304 3.15801 1.60263 5.5426 0.930022C6.53345 0.650537 7.02887 0.510795 7.4297 0.500989C9.15257 0.458841 10.4387 1.76923 10.5 3.31251" stroke="black" strokeOpacity="0.8" strokeLinecap="round" />
                            <path d="M15.5002 8.00008H6.3335M15.5002 8.00008C15.5002 7.41656 13.8382 6.32636 13.4168 5.91675M15.5002 8.00008C15.5002 8.5836 13.8382 9.67381 13.4168 10.0834" stroke="black" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
            <div className="main-container">
                <div className="main-container-heading">
                    <p className="wlcm-msg">Welcome back, <span>Benjamin Joel! ☀️</span></p>
                    <div className="personalised">
                        <div className="notification-bell-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.3757 12.6667H3.55881C3.06627 12.6667 2.66699 12.2675 2.66699 11.7749V11.1929C2.66699 10.856 2.80084 10.5328 3.03909 10.2946C3.65457 9.67916 4.00034 8.84434 4.00034 7.97393V5.99997C4.00034 3.42261 6.08971 1.33324 8.66707 1.33324C11.2444 1.33324 13.3338 3.42261 13.3338 5.99997V7.97393C13.3338 8.84434 13.6796 9.67916 14.2951 10.2946C14.5333 10.5328 14.6672 10.856 14.6672 11.1929V11.7749C14.6672 12.2675 14.2679 12.6667 13.7753 12.6667H10.9584C10.9584 12.9044 10.9507 13.3576 10.7117 13.7916C10.316 14.5098 9.54949 15.0001 8.66707 15.0001C7.7846 15.0001 7.01809 14.5098 6.62245 13.7916C6.3834 13.3576 6.3757 12.9044 6.3757 12.6667ZM13.5879 11.0017C13.6387 11.0524 13.6671 11.1212 13.6671 11.1929V11.6667H3.66701V11.1929C3.66701 11.1212 3.69549 11.0524 3.74621 11.0017C4.54922 10.1987 5.00036 9.10955 5.00036 7.97393V5.99997C5.00036 3.9749 6.64201 2.33325 8.66707 2.33325C10.6922 2.33325 12.3338 3.9749 12.3338 5.99997V7.97393C12.3338 9.10955 12.7849 10.1987 13.5879 11.0017ZM9.95843 12.6667H7.37572C7.37572 12.8881 7.39159 13.1153 7.49839 13.3091C7.57286 13.4444 7.67019 13.5653 7.78513 13.6667C8.02013 13.8742 8.32894 14.0001 8.66707 14.0001C9.00521 14.0001 9.31395 13.8742 9.54902 13.6667C9.66395 13.5653 9.76122 13.4444 9.83576 13.3091C9.94256 13.1153 9.95843 12.8881 9.95843 12.6667Z" fill="black" />
                                <circle cx="12.667" cy="3.33327" r="2.33337" fill="#D34645" stroke="white" strokeWidth="0.666676" />
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.3757 11.6667H1.55881C1.06627 11.6667 0.666992 11.2675 0.666992 10.7749V10.1929C0.666992 9.85597 0.800841 9.53283 1.03909 9.29463C1.65457 8.67916 2.00034 7.84434 2.00034 6.97393V4.99997C2.00034 2.42261 4.08971 0.333241 6.66707 0.333241C9.24444 0.333241 11.3338 2.42261 11.3338 4.99997V6.97393C11.3338 7.84434 11.6796 8.67916 12.2951 9.29463C12.5333 9.53283 12.6672 9.85597 12.6672 10.1929V10.7749C12.6672 11.2675 12.2679 11.6667 11.7753 11.6667H8.95844C8.95844 11.9044 8.95071 12.3576 8.7117 12.7916C8.31603 13.5098 7.54949 14.0001 6.66707 14.0001C5.7846 14.0001 5.01809 13.5098 4.62245 12.7916C4.3834 12.3576 4.3757 11.9044 4.3757 11.6667ZM11.5879 10.0017C11.6387 10.0524 11.6671 10.1212 11.6671 10.1929V10.6667H1.66701V10.1929C1.66701 10.1212 1.69549 10.0524 1.74621 10.0017C2.54922 9.1987 3.00036 8.10955 3.00036 6.97393V4.99997C3.00036 2.9749 4.64201 1.33325 6.66707 1.33325C8.69217 1.33325 10.3338 2.9749 10.3338 4.99997V6.97393C10.3338 8.10955 10.7849 9.1987 11.5879 10.0017ZM7.95843 11.6667H5.37572C5.37572 11.8881 5.39159 12.1153 5.49839 12.3091C5.57286 12.4444 5.67019 12.5653 5.78513 12.6667C6.02013 12.8742 6.32894 13.0001 6.66707 13.0001C7.00521 13.0001 7.31395 12.8742 7.54902 12.6667C7.66395 12.5653 7.76122 12.4444 7.83576 12.3091C7.94256 12.1153 7.95843 11.8881 7.95843 11.6667Z" fill="black" />
                            </svg> */}
                        </div>
                        <div className="profile-img-container">
                            <img src="https://s3-alpha-sig.figma.com/img/73a4/1527/c03aa81f94402eb9a43d0e000e9b5fc2?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J~hn~uz5P-hn8KqusrRKRSYNvXEKqUAQmV1QfLRiE~sAKfDnjquNGqWtsWGEoom6BvNC-K9bvv7G6ZzHgIkd3A7cSi6~5UC4JbyiiVr30O5epeY8-0ePNa9ZEXdo4jSoyFv2CMG8GmWbDdYmYYTIGnoGUncVubxDm9LKpnLFH5TEi1XfsX2k~32gSm7fKjA79AdLrIgEQYycSMh3qZnqAV9wOJS-7B3srdb1eiJQuXcC5Hh0n7BvEI9mhQ74Mce-AP1mEXCsc7Zk8oK1568BrWvFsGV3pUsk0MPpGHpuIowkPe~KQaFZY1-ruO6XCy8y3jiamc1tRF9nF9OKSpt74A__" alt="profile" />
                        </div>
                        <div className="member-name-role">
                            <h3>Benjamin Joel
                                <i className="fa-solid fa-angle-down"></i>
                            </h3>
                            <p>Admin</p>
                        </div>
                    </div>
                </div>
                <div className="child-container">
                    {children}
                </div>

            </div>
        </div>
    )
}