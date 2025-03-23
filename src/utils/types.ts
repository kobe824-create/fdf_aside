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
    penalties?: string[];
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