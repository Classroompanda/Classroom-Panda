using System;

namespace DayCare.Model.Response
{
    public class ResponseViewModal :ResponseModal
    {
        /// <summary>
        ///     Gets or sets the identifier.
        /// </summary>
        /// <value>
        ///     The identifier.
        /// </value>
        public long SaveId { get; set; }

        public long StatusCode { get; set; }

        /// <summary>
        ///     Gets or sets a value indicating whether this instance is success.
        /// </summary>
        /// <value>
        ///     <c>true</c> if this instance is success; otherwise, <c>false</c>.
        /// </value>
        public bool IsSuccess { get; set; }

        /// <summary>
        ///     Gets or sets the message.
        /// </summary>
        /// <value>
        ///     The message.
        /// </value>
        public string Message { get; set; }

        /// <summary>
        ///     Gets or sets the content.
        /// </summary>
        /// <value>
        ///     The content.
        /// </value>
        public object Data { get; set; }

        public string FilePath { get; set; }

        public string FileName { get; set; }

        public decimal TotalInvoiceAmount { get; set; }
        public decimal DiscountAmount { get; set; }

        public decimal TotalPaidAmount { get; set; }

        public decimal TotalBalanceAmount { get; set; }

        public DateTime LastDate { get; set; }
        public string CalculatedFeeDate { get; set; }

        public string PaidFeeDate { get; set; }
        public object EnrollClassesId { get; set; }
        public bool Transferwithcheckout { get; set; }
      
        public string TotalHours { get; set; }
        public string studentmealdetail { get; set; }
        public string ParentName { get; set; }
        public string LastName { get; set; }
        public string StudentNames { get; set; }
        public string EmailId { get; set; }
        public string ApproveType { get; set; }
        public string NotificationSetting { get; set; }

        public long AgencyId { get; set; }
        public int Count { get; set; }
        public int Amount { get; set; }

        public decimal PaidAmountCash { get; set; }
        public decimal PaidAmountCheck { get; set; }
        // For Deactivate Reason
        public int NonPaymentCount { get; set; }
        public int RelocationCount { get; set; }
        public int CertificateCount { get; set; }
        public int GraduatedCount { get; set; }
        public int ServiceCount { get; set; }
        public int BehaviorCount { get; set; }
        public int HealthCount { get; set; }
        public int SeasonalCount { get; set; }
        public int LostJobCount { get; set; }
        public int LivingCount { get; set; }

        public class Constants
        {
            public const string InvalidAccount = "Your account is inactive";
            public const string Error = "Some Internal Error Occurred";
            public const string Success = "Data Saved Successfully";
            public const string Delete = "Data Deleted Successfully";
            public const string Warning = "Data Is Not In Proper Format";
            public const string Missing = "Missing Parameter"; 
            public const string Retreived = "Data Retrieved Successfully";
            public const string NotFound = "Data Not Found";
            public const string Exist = "Data Already Exist";
            public const string Login = "Login Successfully";
            public const string LoginFail = "Invalid UserName or Password";            
            public const string InsertionFail = "Please Try Again";                  
            public const string GenerateLink = "Please generate link again";
            public const string InvalidUser = "Please select valid user name";
            public const string InvalidPassword = "Please enter valid old password";           
            public const string uploadSuccess = "uploaded successfully";
            public const string updateSuccess = "Data Updated Successfully";            
            public const string UnAuthorized = "UnAuthorized Access";       
            public const string ProfileImage = "Profile";
            public const string PostImage = "Post";
            public const string MultipleImage = "Multiple";
            public const string EditorImage = "Editor";
            public const string MealServe = "Meal Serve Report Fetch Successfully";            
            public const string UserImage = "UserImage";
            public const string GreaterCheckInTime = "Check-In time should be less than Check-out time";
            public const string LessCheckOutTime = "Check-Out time should be Greater than Check-In time";
            public const string GreaterCheckInTimeBreak = "Checked in time is greater than break-in or break-out time";
            public const string LessCheckOutTimeBreak = "Checked Out time is less than break-in or break-out time";
            public const string TimeUpdatedSuccess = "Time updated successfully";
        }

    }
}
