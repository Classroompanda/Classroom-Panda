using System;
using DayCare.Model.Response;
using DayCare.Model.Agency;
using DayCare.Service.IService.Agency;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace DayCare.API.Controllers.API
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class ClassesController : Controller
    {
        #region Initialize Dependency
        private readonly IClassService _classService;
        /// <summary>
        /// Declaration of Interface of Daily Sheet to obtain its methods
        /// </summary>
        private readonly IDailySheetService _dailySheetService;
        ResponseViewModal response;

        public ClassesController(IClassService classService, IDailySheetService dailySheetService)
        {
            _classService = classService;
            _dailySheetService = dailySheetService;
            response = new ResponseViewModal();
        }
        #endregion

      
        [HttpPost]
        [Route("GetAllClasses")]
        public async Task<ResponseViewModal> GetAllClasses(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal responseGetAllClasses = new ResponseViewModal();
            responseGetAllClasses = _classService.GetAllClasses(getAllClassesRequest);
            responseGetAllClasses = new ResponseViewModal()
            {
                IsSuccess = responseGetAllClasses.IsSuccess,
                Data = responseGetAllClasses.Data,
                StatusCode = responseGetAllClasses.StatusCode,
                Message = responseGetAllClasses.Message,
                TotalRows = responseGetAllClasses.TotalRows
            };
            return await Task.Run(() => responseGetAllClasses);
        }


        [HttpPost]
        [Route("GetDailySheet")]
        public async Task<ResponseViewModal> GetDailySheet(DailySheetRequestViewModel getDailySheetRequest)
      {
            ResponseViewModal responseGetDailySheet = new ResponseViewModal();
            responseGetDailySheet = _dailySheetService.GetDailySheet(getDailySheetRequest);
            responseGetDailySheet = new ResponseViewModal()
            {
                IsSuccess = responseGetDailySheet.IsSuccess,
                Data = responseGetDailySheet.Data,
                StatusCode = responseGetDailySheet.StatusCode,
                Message = responseGetDailySheet.Message,
                TotalRows = responseGetDailySheet.TotalRows
            };
            return await Task.Run(() => responseGetDailySheet);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetDailySheetActivityReportByEmail")]
        public async Task<ResponseViewModal> GetDailySheetActivityReportByEmail(DailySheetRequestViewModel getDailySheetRequest)
        {
            ResponseViewModal responseGetDailySheetActivityReportByEmail = new ResponseViewModal();
            responseGetDailySheetActivityReportByEmail = _dailySheetService.GetDailySheetActivityReportByEmail(getDailySheetRequest);
            responseGetDailySheetActivityReportByEmail = new ResponseViewModal()
            {
                IsSuccess = responseGetDailySheetActivityReportByEmail.IsSuccess,
                Data = responseGetDailySheetActivityReportByEmail.Data,
                StatusCode = responseGetDailySheetActivityReportByEmail.StatusCode,
                Message = responseGetDailySheetActivityReportByEmail.Message,
                TotalRows = responseGetDailySheetActivityReportByEmail.TotalRows
            };
            return await Task.Run(() => responseGetDailySheetActivityReportByEmail);
        }

        [HttpPost]
        [Route("GetDailySheetMobile")]
        public async Task<ResponseViewModal> GetDailySheetMobile(DailySheetRequestViewModel getDailySheetMobileRequest)
        {
            ResponseViewModal responseGetDailySheetMobile = new ResponseViewModal();
            responseGetDailySheetMobile = _dailySheetService.GetDailySheetMobile(getDailySheetMobileRequest);
            responseGetDailySheetMobile = new ResponseViewModal()
            {
                IsSuccess = responseGetDailySheetMobile.IsSuccess,
                Data = responseGetDailySheetMobile.Data,
                StatusCode = responseGetDailySheetMobile.StatusCode,
                Message = responseGetDailySheetMobile.Message,
                TotalRows = responseGetDailySheetMobile.TotalRows
            };
            return await Task.Run(() => responseGetDailySheetMobile);
        }       
                

        [HttpPost]
        [Route("SaveStudentActivity")]
        public async Task<ResponseViewModal> SaveStudentActivity(SaveStudentsActivityViewModel saveStudentActivityRequest)
        {
            ResponseViewModal responseSaveStudentActivity = new ResponseViewModal();
            responseSaveStudentActivity = _dailySheetService.SaveStudentActivity(saveStudentActivityRequest);
            responseSaveStudentActivity = new ResponseViewModal()
            {
                IsSuccess = responseSaveStudentActivity.IsSuccess,
                Data = responseSaveStudentActivity.Data,
                StatusCode = responseSaveStudentActivity.StatusCode,
                Message = responseSaveStudentActivity.Message,
                TotalRows = responseSaveStudentActivity.TotalRows
            };
            return await Task.Run(() => responseSaveStudentActivity);
        }


        [HttpPost]
        [Route("GetTodayMealPlan")]
        public async Task<ResponseViewModal> GetTodayMealPlan(DailySheetRequestViewModel getTodayMealPlanRequest)
        {
            ResponseViewModal responseGetTodayMealPlan = new ResponseViewModal();
            responseGetTodayMealPlan = _dailySheetService.GetTodayMealPlan(getTodayMealPlanRequest);
            responseGetTodayMealPlan = new ResponseViewModal()
            {
                IsSuccess = responseGetTodayMealPlan.IsSuccess,
                Data = responseGetTodayMealPlan.Data,
                StatusCode = responseGetTodayMealPlan.StatusCode,
                Message = responseGetTodayMealPlan.Message,
                TotalRows = responseGetTodayMealPlan.TotalRows
            };
            return await Task.Run(() => responseGetTodayMealPlan);

        }

        [HttpPost]
        [Route("GetParticularStudentActivityMeals")]
        public async Task<ResponseViewModal> GetParticularStudentActivityMeals(ParticularStudentActivityRequestViewModel getParticularStudentActivityMealsRequest)
        {
            ResponseViewModal responseGetParticularStudentActivityMeals = new ResponseViewModal();
            responseGetParticularStudentActivityMeals = _dailySheetService.GetParticularStudentActivityMeals(getParticularStudentActivityMealsRequest);
            responseGetParticularStudentActivityMeals = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularStudentActivityMeals.IsSuccess,
                Data = responseGetParticularStudentActivityMeals.Data,
                StatusCode = responseGetParticularStudentActivityMeals.StatusCode,
                Message = responseGetParticularStudentActivityMeals.Message,
                TotalRows = responseGetParticularStudentActivityMeals.TotalRows
            };
            return await Task.Run(() => responseGetParticularStudentActivityMeals);

        }

        [HttpPost]
        [Route("GetParticularStudentActivityMedications")]
        public async Task<ResponseViewModal> GetParticularStudentActivityMedications(ParticularStudentActivityRequestViewModel getParticularStudentActivityMedicationsRequest)
        {
            ResponseViewModal responseGetParticularStudentActivityMedications = new ResponseViewModal();
            responseGetParticularStudentActivityMedications = _dailySheetService.GetParticularStudentActivityMedications(getParticularStudentActivityMedicationsRequest);
            responseGetParticularStudentActivityMedications = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularStudentActivityMedications.IsSuccess,
                Data = responseGetParticularStudentActivityMedications.Data,
                StatusCode = responseGetParticularStudentActivityMedications.StatusCode,
                Message = responseGetParticularStudentActivityMedications.Message,
                TotalRows = responseGetParticularStudentActivityMedications.TotalRows
            };
            return await Task.Run(() => responseGetParticularStudentActivityMedications);

        }

        [HttpPost]
        [Route("GetParticularStudentActivityNotes")]
        public async Task<ResponseViewModal> GetParticularStudentActivityNotes(ParticularStudentActivityRequestViewModel getParticularStudentActivityNotesRequest)
        {
            ResponseViewModal responseGetParticularStudentActivityNotes = new ResponseViewModal();
            responseGetParticularStudentActivityNotes = _dailySheetService.GetParticularStudentActivityNotes(getParticularStudentActivityNotesRequest);
            responseGetParticularStudentActivityNotes = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularStudentActivityNotes.IsSuccess,
                Data = responseGetParticularStudentActivityNotes.Data,
                StatusCode = responseGetParticularStudentActivityNotes.StatusCode,
                Message = responseGetParticularStudentActivityNotes.Message,
                TotalRows = responseGetParticularStudentActivityNotes.TotalRows
            };
            return await Task.Run(() => responseGetParticularStudentActivityNotes);

        }

        [HttpPost]
        [Route("GetParticularStudentActivityMoods")]
        public async Task<ResponseViewModal> GetParticularStudentActivityMoods(ParticularStudentActivityRequestViewModel getParticularStudentActivityMoodsRequest)
        {
            ResponseViewModal responseGetParticularStudentActivityMoods = new ResponseViewModal();
            responseGetParticularStudentActivityMoods = _dailySheetService.GetParticularStudentActivityMoods(getParticularStudentActivityMoodsRequest);
            responseGetParticularStudentActivityMoods = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularStudentActivityMoods.IsSuccess,
                Data = responseGetParticularStudentActivityMoods.Data,
                StatusCode = responseGetParticularStudentActivityMoods.StatusCode,
                Message = responseGetParticularStudentActivityMoods.Message,
                TotalRows = responseGetParticularStudentActivityMoods.TotalRows
            };
            return await Task.Run(() => responseGetParticularStudentActivityMoods);

        }

        [HttpPost]
        [Route("GetParticularStudentOtherActivity")]
        public async Task<ResponseViewModal> GetParticularStudentOtherActivity(ParticularStudentActivityRequestViewModel getParticularStudentOtherActivityRequest)
        {
            ResponseViewModal responseGetParticularStudentOtherActivity = new ResponseViewModal();
            responseGetParticularStudentOtherActivity = _dailySheetService.GetParticularStudentOtherActivity(getParticularStudentOtherActivityRequest);
            responseGetParticularStudentOtherActivity = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularStudentOtherActivity.IsSuccess,
                Data = responseGetParticularStudentOtherActivity.Data,
                StatusCode = responseGetParticularStudentOtherActivity.StatusCode,
                Message = responseGetParticularStudentOtherActivity.Message,
                TotalRows = responseGetParticularStudentOtherActivity.TotalRows
            };
            return await Task.Run(() => responseGetParticularStudentOtherActivity);

        }


        [HttpPost]
        [Route("GetParticularStudentActivityNap")]
        public async Task<ResponseViewModal> GetParticularStudentActivityNap(ParticularStudentActivityRequestViewModel getParticularStudentActivityNapRequest)
        {
            ResponseViewModal responseGetParticularStudentActivityNap = new ResponseViewModal();
            responseGetParticularStudentActivityNap = _dailySheetService.GetParticularStudentActivityNap(getParticularStudentActivityNapRequest);
            responseGetParticularStudentActivityNap = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularStudentActivityNap.IsSuccess,
                Data = responseGetParticularStudentActivityNap.Data,
                StatusCode = responseGetParticularStudentActivityNap.StatusCode,
                Message = responseGetParticularStudentActivityNap.Message,
                TotalRows = responseGetParticularStudentActivityNap.TotalRows
            };
            return await Task.Run(() => responseGetParticularStudentActivityNap);

        }

        [HttpPost]
        [Route("GetParticularStudentActivityDiaperChanges")]
        public async Task<ResponseViewModal> GetParticularStudentActivityDiaperChanges(ParticularStudentActivityRequestViewModel getParticularStudentActivityDiaperChangesRequest)
        {
            ResponseViewModal responseGetParticularStudentActivityDiaperChanges = new ResponseViewModal();
            responseGetParticularStudentActivityDiaperChanges = _dailySheetService.GetParticularStudentActivityDiaperChanges(getParticularStudentActivityDiaperChangesRequest);
            responseGetParticularStudentActivityDiaperChanges = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularStudentActivityDiaperChanges.IsSuccess,
                Data = responseGetParticularStudentActivityDiaperChanges.Data,
                StatusCode = responseGetParticularStudentActivityDiaperChanges.StatusCode,
                Message = responseGetParticularStudentActivityDiaperChanges.Message,
                TotalRows = responseGetParticularStudentActivityDiaperChanges.TotalRows
            };
            return await Task.Run(() => responseGetParticularStudentActivityDiaperChanges);
        }


        [HttpPost]
        [Route("DeleteParticularMealPlan")]
        public async Task<ResponseViewModal> DeleteParticularMealPlan(DeleteMealPlanViewModel getDeleteMealPlanRequest)
        {
            ResponseViewModal responseDeleteParticularMealPlan = new ResponseViewModal();
            responseDeleteParticularMealPlan = _dailySheetService.DeleteParticularMealPlan(getDeleteMealPlanRequest);
            responseDeleteParticularMealPlan = new ResponseViewModal()
            {
                IsSuccess = responseDeleteParticularMealPlan.IsSuccess,
                Data = responseDeleteParticularMealPlan.Data,
                StatusCode = responseDeleteParticularMealPlan.StatusCode,
                Message = responseDeleteParticularMealPlan.Message,
                TotalRows = responseDeleteParticularMealPlan.TotalRows
            };
            return await Task.Run(() => responseDeleteParticularMealPlan);

        }


       


    }
}