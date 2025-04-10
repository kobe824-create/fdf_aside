import { ReactNode } from "react";

export interface UserTypes {
    _id?: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    gender: string;
    phoneNumber: string;
    identification: number;
    monthlyContributionAmount: number
    image_url?: string;
    notifications?: string[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
    otp?: string | OtpTypes;
}
export interface ContributionTypes {
    _id?: string;
    amount: number | string;
    user: string;
    date: string;
    status: string;
    penalties?: string[] | PenaltyTypes[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface OtpTypes {
    _id?: string;
    otp: string;
    phoneNumber: number;
    isUsed: boolean;
    expiry: Date;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
export interface AttachmentTypes {
    _id?: string;
    name: string;
    url: string;
    size: number;
    meeting: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface MeetingTypes {
    _id?: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    attachments: AttachmentTypes[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface PenaltyTypes  {
    _id?: string;
    amount: number;
    reason: string;
    user: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}


export interface TableProps {
    tableHeaders: string[];
    tableData: (string | ReactNode)[][];
    type?: string;
    title ?: string;
    searchWords?: string[];
    filters?: string[];
    onFilterChange?: (filter: string) => void;
    onRowClick?: (idex: number) => void;
}
