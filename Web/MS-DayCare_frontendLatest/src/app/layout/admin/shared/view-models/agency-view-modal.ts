export interface AgencyDetailsVM {
    Id?: number;
    AgencyName?: string;
    OwnerFirstName?: string;
    OwnerLastName?: string;
    ContactPersonFirstName?: string;
    ContactPersonLastName?: string;
    IsExistingAccount?: boolean;
    IsLoggedFirstTime?: boolean;
    PayPalUserId?: number;
    PayPalSubscriptionId?: number;
    IsTrial?: boolean;
    TrialStart?: any;
    TrialEnd?: any;
    IsTrialMailSent?: boolean;
    CurrentSubscriptionPlanId?: number;
    SubscriptionValidUpto?: any;
    TimeZoneSpecification?: any;
    UserID?: number;
    EmailId?: string;
    Mobile?: number;
    GenderID?: number;
    DateOfBirth?: any;
    Profession?: string;
    CountryId?: number;
    StateId?: number;
    CityId?: number;
    PostalCode?: number;
    Address?: string;
    status?: number;
    ImagePath?: string;
    imagePath?: string;
}


export interface PaymentVM {
    id?: number;
    planName?: string;
    numberofUsers?: number;
    planPrice?: number;
    frequency?: string;
    remark?: string;
    IsActive?: boolean;
}

