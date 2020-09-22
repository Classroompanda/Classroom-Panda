export interface LoginUserDetails {
    access_token?: string;
    data: UsersDetails;
}



export interface UsersDetails {
agencyID?: number;
childCount?: number;
emailAddress?: string;
firstName?: string;
imagePath?: string;
isApprovedAgency?: boolean;
isGaurdian?: boolean;
isParent?: boolean;
isSecondaryParent?: boolean;
isStripeAccount?: boolean;
isSubscriptionActive?: boolean;
lastName?: string;
loginUserID?: number;
releventUserID?: number;
roleId?: number;
teacherTodayAttendenceId?: number;
teacherTodayAttendenceStatusId?: number;
}
