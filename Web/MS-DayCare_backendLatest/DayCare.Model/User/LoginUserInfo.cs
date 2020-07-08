using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.User
{
   public class LoginUserInfo
    {
        public long ReleventUserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string  ImagePath { get; set; }
        public long AgencyID { get; set; }
        public long RoleId { get; set; }
        public string EmailAddress { get; set; }
        public long TeacherTodayAttendenceStatusId { get; set; }
        public long TeacherTodayAttendenceId { get; set; }
        public long ChildCount { get; set; }

        public long AddedByID { get; set; }

        public bool IsParent { get; set; }

        public bool IsGaurdian { get; set; }

        public bool IsSecondaryParent { get; set; }

        public long LoginUserID { get; set; }

        public bool IsSubscriptionActive { get; set; }

        public bool IsStripeAccount { get; set; }

        public bool IsApprovedAgency { get; set; }

        public bool IsSubsidy { get; set; }

        public bool LoginStatus { get; set; }
    }
}
