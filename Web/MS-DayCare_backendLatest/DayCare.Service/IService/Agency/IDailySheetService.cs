using DayCare.Model.Agency;
using DayCare.Model.Response;

namespace DayCare.Service.IService.Agency
{
    public interface IDailySheetService
    {
        ResponseViewModal GetDailySheet(DailySheetRequestViewModel getDailySheetRequest);
        ResponseViewModal SaveStudentActivity(SaveStudentsActivityViewModel saveStudentActivityRequest);
        ResponseViewModal GetTodayMealPlan(DailySheetRequestViewModel getTodayMealPlanRequest);
        ResponseViewModal GetDailySheetMobile(DailySheetRequestViewModel getDailySheetMobileRequest);
        ResponseViewModal GetParticularStudentActivityMeals(ParticularStudentActivityRequestViewModel getParticularStudentActivityMealsRequest);
        ResponseViewModal GetParticularStudentActivityMedications(ParticularStudentActivityRequestViewModel getParticularStudentActivityMedicationsRequest);
        ResponseViewModal GetParticularStudentActivityNotes(ParticularStudentActivityRequestViewModel getParticularStudentActivityNotesRequest);
        ResponseViewModal GetParticularStudentActivityMoods(ParticularStudentActivityRequestViewModel getParticularStudentActivityMoodsRequest);
        ResponseViewModal GetParticularStudentOtherActivity(ParticularStudentActivityRequestViewModel getParticularStudentOtherActivityRequest);
        ResponseViewModal GetParticularStudentActivityNap(ParticularStudentActivityRequestViewModel getParticularStudentActivityNapRequest);
        ResponseViewModal GetParticularStudentActivityDiaperChanges(ParticularStudentActivityRequestViewModel getParticularStudentActivityDiaperChangesRequest);

        ResponseViewModal DeleteParticularMealPlan(DeleteMealPlanViewModel getDeleteMealPlanRequest);
        ResponseViewModal GetDailySheetActivityReportByEmail(DailySheetRequestViewModel getDailySheetRequest);

    }
}
