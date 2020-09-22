using System;
using System.Collections.Generic;
using System.Text;
using DayCare.Entity;
using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using DayCare.Entity.Parent;
using DayCare.Entity.PostActivity;
using DayCare.Entity.Student;
using DayCare.Entity.Teachers;
using DayCare.Entity.User;
using Microsoft.EntityFrameworkCore;
namespace DayCare.Data
{

    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Users> Users { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Agency> Agency { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<State> State { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<TeacherStatus> TeacherStatus { get; set; }
        public DbSet<PositionType> PositionType { get; set; }
        public DbSet<TransportationType> TransportationType { get; set; }
        public DbSet<RelationType> RelationType { get; set; }
        public DbSet<SecurityQuestion> SecurityQuestion { get; set; }
        public DbSet<FeePaymentType> FeePaymentType { get; set; }
        public DbSet<Gender> Gender { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Parent> Parent { get; set; }
        public DbSet<ParentLog> ParentLog { get; set; }
        public DbSet<ClassAttendence> ClassAttendence { get; set; }
        public DbSet<AttendenceStatus> AttendenceStatus { get; set; }
        public DbSet<Classes> Classes { get; set; }
        public DbSet<Guardian> Guardian { get; set; }
        public DbSet<ClassEnrollment> ClassEnrollments { get; set; }
        public DbSet<Immunization> Immunization { get; set; }
        public DbSet<AllergyName> AllergyName { get; set; }
        public DbSet<AllergyReactionType> AllergyReactionType { get; set; }
        public DbSet<AllergyType> AllergyType { get; set; }
        public DbSet<StudentAgeCategories> StudentAgeCategories { get; set; }
        public DbSet<StudentAllergies> StudentAllergies { get; set; }
        public DbSet<StudentMedication> StudentMedication { get; set; }
        public DbSet<ActivityType> ActivityType { get; set; }
        public DbSet<DailyStatus> DailyStatus { get; set; }
        public DbSet<StudentActivities> StudentActivities { get; set; }
        public DbSet<StudentActivityMeal> StudentActivityMeal { get; set; }
        public DbSet<StudentActivityMedication> StudentActivityMedication { get; set; }
        public DbSet<StudentActivityMood> StudentActivityMood { get; set; }
        public DbSet<StudentActivityNote> StudentActivityNote { get; set; }
        public DbSet<StudentImmunization> StudentImmunization { get; set; }
        public DbSet<StudentOtherActivity> StudentOtherActivity { get; set; }
        public DbSet<MoodType> MoodType { get; set; }
        public DbSet<ClassStatus> ClassStatus { get; set; }
        public DbSet<LeaveReasonType> LeaveReasonType { get; set; }
        public DbSet<ScheduleRepeatType> ScheduleRepeatType { get; set; }
        public DbSet<MealServeSize> MealServeSize { get; set; }
        public DbSet<MealItemMaster> MealItemMaster { get; set; }
        public DbSet<Incident> Incident { get; set; }
        public DbSet<IncidentInvolvment> IncidentInvolvment { get; set; }
        public DbSet<IncidentPriortyType> IncidentPriortyType { get; set; }
        public DbSet<StudentDisabilities> StudentDisabilities { get; set; }
        public DbSet<NatureOfInjury> NatureOfInjury { get; set; }
        public DbSet<BreakTypes> BreakTypes { get; set; }
        public DbSet<TeacherBreakLog> TeacherBreakLog { get; set; }
        public DbSet<TeacherDailyAttendence> TeacherDailyAttendence { get; set; }
        public DbSet<TeacherAttendenceStatus> TeacherAttendenceStatus { get; set; }
        public DbSet<PlannerRepeatType> PlannerRepeatType { get; set; }
        public DbSet<EventPlanner> EventPlanner { get; set; }
        public DbSet<InvolvedEventClasses> InvolvedEventClasses { get; set; }
        public DbSet<InvolvedMealClasses> InvolvedMealClasses { get; set; }
        public DbSet<MealPlanner> MealPlanner { get; set; }
        public DbSet<FoodType> FoodType { get; set; }
        public DbSet<MealType> MealType { get; set; }
        public DbSet<MeasureUnitType> MeasureUnitType { get; set; }
        public DbSet<MeasureQuantityType> MeasureQuantityType { get; set; }
        public DbSet<InvolvedMealFoodItems> InvolvedMealFoodItems { get; set; }
        public DbSet<TeacherInfo> TeacherInfo { get; set; }
        public DbSet<PostActivities> PostActivities { get; set; }
        public DbSet<PostActivityImages> PostActivityImages { get; set; }
        public DbSet<PostActivityVideos> PostActivityVideos { get; set; }
        public DbSet<StudentAcitivityNap> StudentAcitivityNap { get; set; }
        public DbSet<SubActivityType> SubActivityType { get; set; }
        public DbSet<ClassAssignmentLog> ClassAssignmentLog { get; set; }
        public DbSet<StudentActivityMealFoodItems> StudentActivityMealFoodItems { get; set; }
        public DbSet<TeacherClassAttendence> TeacherClassAttendence { get; set; }
        public DbSet<FoodConsumtion> FoodConsumtion { get; set; }
        public DbSet<DoseRepeat> DoseRepeat { get; set; }
        public DbSet<DosageQuantity> DosageQuantity { get; set; }
        public DbSet<StudentBreakLog> StudentBreakLog { get; set; }
        public DbSet<TeacherAvailability> TeacherAvailability { get; set; }
        public DbSet<StudentActivityDiaper> StudentActivityDiaper { get; set; }

        public DbSet<PostImageslikeDetails> PostImageslikeDetails { get; set; }

        public DbSet<PostVideolikeDetails> PostVideolikeDetails { get; set; }

        public DbSet<ClassCategory> ClassCategory { get; set; }

        public DbSet<KioskeStudentSignInDetails> KioskeStudentSignInDetails { get; set; }

        public DbSet<ParentStudentMapping> MappingParentStudent { get; set; }

        public DbSet<StripeDetails> StripeDetails { get; set; }

        public DbSet<PayementDetails> PayementDetails { get; set; }

        public DbSet<InvoiceDetails> InvoiceDetails { get; set; }

        public DbSet<InvoiceItemDetails> InvoiceItemDetails { get; set; }

        public DbSet<PricingPlan> PricingPlan { get; set; }

        public DbSet<SubscriptionDetails> SubscriptionDetails { get; set; }

        public DbSet<ChatPrivateMessageDetails> ChatPrivateMessageDetails { get; set; }

        public DbSet<ActiveUsersForChat> ActiveUsersForChat { get; set; }
        public DbSet<UserLoginDevice> UserLoginDevice { get; set; }

        public DbSet<DigitalDirectorMaster> DigitalDirectorMaster { get; set; }

        public DbSet<TransactionType> TransactionType { get; set; }

        public DbSet<TransactionMaster> TransactionMaster { get; set; }

        public DbSet<TransactionDetails> TransactionDetails { get; set; }


        public DbSet<AccountLedger> AccountLedger { get; set; }

        public DbSet<ExtraFeeChargeMaster> ExtraFeeChargeMaster { get; set; }

        public DbSet<ExtraFeesDetails> ExtraFeesDetails { get; set; }

        public DbSet<PerDayFeeCalculation> PerDayFeeCalculation { get; set; }
        public DbSet<StudentFeesDiscount> StudentFeesDiscount { get; set; }

        public DbSet<CalculatedFeeDetails> CalculatedFeeDetails { get; set; }

        public DbSet<AdvanceFeePaymentDetails> AdvanceFeePaymentDetails { get; set; }

        public DbSet<AuthorizedPerson> AuthorizedPerson { get; set; }
        public DbSet<RestrictedPerson> RestrictedPerson { get; set; }

        public DbSet<AuthorizedPersonLogin> AuthorizedPersonLogin { get; set; }

        public DbSet<SubsidyDetails> SubsidyDetails { get; set; }

        public DbSet<StudentSubsidyDetails> StudentSubsidyDetails { get; set; }

        public DbSet<ParentSignatureDetails> ParentSignatureDetails { get; set; }

        public DbSet<ClassTransferAttendence> ClassTransferAttendence { get; set; }
        public DbSet<DailySheetAndBalanceLog> DailySheetAndBalanceLog { get; set; }

        public DbSet<ErrorLog> ErrorLog { get; set; }

        public DbSet<MealServeTimeDetails> MealServeTimeDetails { get; set; }

        public DbSet<AgencySetting> AgencySetting { get; set; }

        public DbSet<StudentFiles> StudentFiles { get; set; }
        public DbSet<StudentDigitalDirector> StudentDigitalDirector { get; set; }

        public DbSet<RecurringBilling> RecurringBilling { get; set; }
        public DbSet<ACHInformation> ACHInformation { get; set; }
        public DbSet<RecurringPayment> RecurringPayment { get; set; }
        public DbSet<SectionVideo> SectionVideo { get; set; }
        public DbSet<Section> Section { get; set; }
        public DbSet<UnApprovedImages> UnApprovedImages { get; set; }
        public DbSet<ImageApproveType> ImageApproveType { get; set; }
        public DbSet<DeactivateReason> DeactivateReason { get; set; }

        public DbSet<NotificationSoundSetting> NotificationSoundSetting { get; set; }
        public DbSet<Coupon> Coupon { get; set; }
        public DbSet<TextMessagePlan> TextMessagePlan { get; set; }

        public DbSet<Bus> Bus { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //optionsBuilder.UseNpgsql(@"User ID=daycare_dev;Password=daycare_dev;Server=75.126.168.31;Port=5432;Database=daycare_dev;pooling=true;");
                // optionsBuilder.UseNpgsql(@"User ID=DayCareOnline;Password=daycare_dev;Server=75.126.168.31;Port=5432;Database=DayCareOnline;pooling=true;"); //Staging 
                //optionsBuilder.UseNpgsql(@"User ID=DayCareOnline;Password=daycare_dev;Server=75.126.168.31;Port=5432;Database=mobiledev;pooling=true;"); //Staging Mobile
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Users");

                entity.Property(e => e.FirstName)
                    .HasColumnName("FirstName")
                    .ValueGeneratedNever();

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

            });
        }

    }
}
