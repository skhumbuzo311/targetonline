export type User = {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    emailAddress: any;
    phoneNumber: string;
    password: string;
    avatarURL: string;
    isAdmin: boolean;
    isTutor: boolean;
    isTeacher: boolean;
    hasAvatar: boolean;
    isAHSAdmin: boolean;
    IsPasswordEncrypted: boolean;
    isPhoneNumberVerified: boolean;
    expoPushToken: string;
    tutorAttributeId: number;
    lastUpdatedAt: Date,    
}