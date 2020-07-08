using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class TeachersDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public string TeacherName { get; set; }
        public long AgencyID { get; set; }
        public long UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long GenderID { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ImagePath { get; set; }
        public long PositionTypeID { get; set; }
        public long TeacherStatusID { get; set; }
        public DateTime DateHired { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public long CountryId { get; set; }
        public long StateId { get; set; }
        public long CityId { get; set; }
        public string Certification { get; set; }
        public string PostalCode { get; set; }
        public long PhoneNumber { get; set; }
        public long HomePhone { get; set; }

        public string MPhoneNumber { get; set; }
        public string MHomePhone { get; set; }
        public long StringId { get; set; }

        public decimal GrossPayPerHour { get; set; }

        public long TeacherDailyAttendenceID { get; set; }
        public bool ClockOut { get; set; }
        public string msg { get; set; }

        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }
    }
}
