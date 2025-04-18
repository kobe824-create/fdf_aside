"use client";
import LogoContainer from "@/components/logoContainer";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useAuth } from "@/lib/auth/authProvider";
import { UserTypes } from "@/utils/types";
import axios from "axios";
import toast from "react-hot-toast";
import DashboardSVG from "@/components/assets/dashboardSvg";
import MyAccountSVG from "@/components/assets/myAccountSvg";
import MembersSVG from "@/components/assets/memberSvg";
import MeetingsSVG from "@/components/assets/meetingSvg";
import CodeOfConductSVG from "@/components/assets/codeOfConductSvg";

export default function TabsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [member, setMember] = useState<UserTypes | null>(null);

    const router = useRouter();

    const { user, loading, logout } = useAuth();





    const navlinks = [
        {
            name: "Dashboard",
            svg: <DashboardSVG />,
            status: "active",
            path: "overview"

        },
        {
            name: "Account",
            svg: <MyAccountSVG />,
            status: "",
            path: "myAccount"

        },
        {
            name: "Members",
            svg: <MembersSVG />,
            status: "",
            path: "members"
        },
        {
            name: "Meetings",
            svg: <MeetingsSVG />,
            status: "",
            path: "meetings"
        },
        {
            name: "C/code",
            svg: <CodeOfConductSVG />,
            status: "",
            path: "codeOfConduct"
        }
    ]


    const [navlinkStates, setNavlinkstates] = useState(navlinks);

    const handleNavigation = (path: string) => {
        router.push(path);
    }
    useEffect(() => {
        navlinkStates.map((navlink) => {
            if (navlink.status === "active") {
                handleNavigation(navlink.path);
            }
        })
    }, [navlinkStates])


    useEffect(() => {
        if (user?.phoneNumber) {
            axios.post("/api/users/getUserByPhone", { phoneNumber: user.phoneNumber })
            .then((res) => {
                setMember(res.data.user);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }, [user]);


    useEffect(() => {
        if (!user && !loading) {
            // router.push("/login");
            redirect("/login");
        }
    }, [user, loading, router ]);



    if (loading) {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            </>
        )
    }

    return (
        <div className="tabs-layout">
            <div className="side-bar">
                <div className="side-bar-heading">
                    <LogoContainer />
                </div>
                <div className="navlinks-container">
                    {
                        navlinkStates.map((navlink, index) => {
                            if(user?.role === "member" && navlink.name === "Members") {
                                return null;
                            }
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
                    <div className="side-bar-bottom-container"
                        onClick={() => {
                            logout();
                            toast.success("You have been logged out successfully");
                        }}
                    >
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
                    <p className="wlcm-msg">Welcome back, <span>{member?.lastname}! ☀️</span></p>
                    <div className="personalised">
                        <div className="notification-bell-container"
                            onClick={() => {
                                router.push("/notifications");
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.3757 12.6667H3.55881C3.06627 12.6667 2.66699 12.2675 2.66699 11.7749V11.1929C2.66699 10.856 2.80084 10.5328 3.03909 10.2946C3.65457 9.67916 4.00034 8.84434 4.00034 7.97393V5.99997C4.00034 3.42261 6.08971 1.33324 8.66707 1.33324C11.2444 1.33324 13.3338 3.42261 13.3338 5.99997V7.97393C13.3338 8.84434 13.6796 9.67916 14.2951 10.2946C14.5333 10.5328 14.6672 10.856 14.6672 11.1929V11.7749C14.6672 12.2675 14.2679 12.6667 13.7753 12.6667H10.9584C10.9584 12.9044 10.9507 13.3576 10.7117 13.7916C10.316 14.5098 9.54949 15.0001 8.66707 15.0001C7.7846 15.0001 7.01809 14.5098 6.62245 13.7916C6.3834 13.3576 6.3757 12.9044 6.3757 12.6667ZM13.5879 11.0017C13.6387 11.0524 13.6671 11.1212 13.6671 11.1929V11.6667H3.66701V11.1929C3.66701 11.1212 3.69549 11.0524 3.74621 11.0017C4.54922 10.1987 5.00036 9.10955 5.00036 7.97393V5.99997C5.00036 3.9749 6.64201 2.33325 8.66707 2.33325C10.6922 2.33325 12.3338 3.9749 12.3338 5.99997V7.97393C12.3338 9.10955 12.7849 10.1987 13.5879 11.0017ZM9.95843 12.6667H7.37572C7.37572 12.8881 7.39159 13.1153 7.49839 13.3091C7.57286 13.4444 7.67019 13.5653 7.78513 13.6667C8.02013 13.8742 8.32894 14.0001 8.66707 14.0001C9.00521 14.0001 9.31395 13.8742 9.54902 13.6667C9.66395 13.5653 9.76122 13.4444 9.83576 13.3091C9.94256 13.1153 9.95843 12.8881 9.95843 12.6667Z" fill="black" />
                                <circle cx="12.667" cy="3.33327" r="2.33337" fill="#D34645" stroke="white" strokeWidth="0.666676" />
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.3757 11.6667H1.55881C1.06627 11.6667 0.666992 11.2675 0.666992 10.7749V10.1929C0.666992 9.85597 0.800841 9.53283 1.03909 9.29463C1.65457 8.67916 2.00034 7.84434 2.00034 6.97393V4.99997C2.00034 2.42261 4.08971 0.333241 6.66707 0.333241C9.24444 0.333241 11.3338 2.42261 11.3338 4.99997V6.97393C11.3338 7.84434 11.6796 8.67916 12.2951 9.29463C12.5333 9.53283 12.6672 9.85597 12.6672 10.1929V10.7749C12.6672 11.2675 12.2679 11.6667 11.7753 11.6667H8.95844C8.95844 11.9044 8.95071 12.3576 8.7117 12.7916C8.31603 13.5098 7.54949 14.0001 6.66707 14.0001C5.7846 14.0001 5.01809 13.5098 4.62245 12.7916C4.3834 12.3576 4.3757 11.9044 4.3757 11.6667ZM11.5879 10.0017C11.6387 10.0524 11.6671 10.1212 11.6671 10.1929V10.6667H1.66701V10.1929C1.66701 10.1212 1.69549 10.0524 1.74621 10.0017C2.54922 9.1987 3.00036 8.10955 3.00036 6.97393V4.99997C3.00036 2.9749 4.64201 1.33325 6.66707 1.33325C8.69217 1.33325 10.3338 2.9749 10.3338 4.99997V6.97393C10.3338 8.10955 10.7849 9.1987 11.5879 10.0017ZM7.95843 11.6667H5.37572C5.37572 11.8881 5.39159 12.1153 5.49839 12.3091C5.57286 12.4444 5.67019 12.5653 5.78513 12.6667C6.02013 12.8742 6.32894 13.0001 6.66707 13.0001C7.00521 13.0001 7.31395 12.8742 7.54902 12.6667C7.66395 12.5653 7.76122 12.4444 7.83576 12.3091C7.94256 12.1153 7.95843 11.8881 7.95843 11.6667Z" fill="black" />
                            </svg> */}
                        </div>
                        <div className="profile-img-container">
                            <img src={member?.image_url} alt="profile" />
                        </div>
                        <div className="member-name-role">
                            {/* <h3>{member?.firstname} {" "} {member?.lastname}
                                <i className="fa-solid fa-angle-down"></i>
                            </h3> */}
                            <p>{member?.role}</p>
                        </div>
                    </div>
                </div>

                <div className="navlinks-container-responsive">
                    {
                        navlinkStates.map((navlink, index) => {
                            if(user?.role === "member" && navlink.name === "Members") {
                                return null;
                            }
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

                <div className="child-container">
                    {children}
                </div>

            </div>
        </div>
    )
}