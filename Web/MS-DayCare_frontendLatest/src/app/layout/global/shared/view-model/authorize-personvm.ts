export interface PersonAuthorizationVM {
    Id?: number;
    AgencyID?: number;
    StudentName?: string;
    ParentName?: string;
    ParentID?: number;
    EmailId?: string;
    Mobile?: number;
    imagePath?: string;
    AuthorizedPersonName?: boolean;
    StudentIDs?: any[];
    IsAuthorizedPickUp?: boolean;
    IsEmergencyContact?: boolean;
    isAddMode?: boolean;
    QuickPin?: string;
}

export interface PersonRestrictedVM {
    Id?: number;
    AgencyID?: number;
    StudentName?: string;
    ParentName?: string;
    ParentID?: number;
    EmailId?: string;
    Mobile?: number;
    imagePath?: string;
    RestrictedPersonName?: boolean;
    StudentIDs?: any[];
    IsRestricted?: boolean;
    isAddMode?: boolean;
    Description?: string;
    CommonId?: string;
}
