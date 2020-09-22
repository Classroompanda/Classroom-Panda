export interface AddClassesVM {
  className?: string;
  id?: number;
  loactionId?: number;
  categoryId?: number;
  categoryName?: string;
  roomId?: number;
  classStartDate?: any;
  classEndDate?: any;
  classEnrollStartDate?: any;
  classEnrollEndDate?: any;
  enrollCapacity?: number;
  description?: string;
  MinAgeInMonth?: number;
  MinAgeInYear?: number;
  MaxAgeInMonth?: number;
  MaxAgeInYear?: number;
  AgeFrom?: number;
  AgeTo?: number;
  days?: number;
  AgencyID?: number;
  minAgeFrom?: number;
  minAgeTo?: number;
  onGoing?: boolean;
  sun?: boolean;
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  createdBy?: number;
  startTime?: any;
  endTime?: any;
  feeTypeId?: any;
  fees?: any;
}


export interface ClassAssignmentVM {
  TeacherID?: number;
  ClassesID?: number;
  ClassEnrollStartDate?: any;
  ClassEnrollEndDate?: any;
  ClassStartTime?: any;
  ClassEndTime?: any;
  ClassStartDate?: any;
  ClassEndDate?: any;
  id?: number;
  agencyID?: number;
  onGoing?: boolean;
}

export interface PostLedgerVM {
  AgencyID?: number;
  ParentID?: number;
  StudentID?: any;
  PostingDate?: any;
  InvoiceDescription?: any;
  PaymentDescription?: any;
  Amount?: any;
  ChequeNo?: any;
  PaymentComment?: any;
  InvoiceComment?: any;
  ClassId?: number;
  Notes?: any;

}

export interface RecurringBillingVM {
  Id?: any;
  AgencyID?: number;
  ParentID?: number;
  StudentID?: any;
  Amount?: any;
  BillingFromDate?: any;
  BillingToDate?: any;
  ClassesID?: any;
  BillingCycle?: any;
  BillingDescription?: any;
  TransactionType?: any;
}



