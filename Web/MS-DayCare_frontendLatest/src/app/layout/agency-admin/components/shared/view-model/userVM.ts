export interface UserVM {
listUserName?: string;
listUserId?: any;
imagePath?: string;
agencyID?: number;
isActive?: boolean;
isMarked?: boolean;
emailID?: string;
count?: number;
phoneNumber?: number;

}


export interface AddFeesVM {
    studentID?: number;
    ParentID?: number;
    fromDate?: any;
    toDate?: any;
    totalPerDayFee?: any;
    agencyID?: number;
    totalCalculatedAmount?: any;
    classID?: number;
    ExtraFees?: ExtraFees;
    Discountamount?: any;
    generatedFees?: number;
    DiscountDetails?: string;
}


export interface ExtraFees {
    ExtraFeeChargeMasterID?: number;
    ChargeAmount?: number;

}

