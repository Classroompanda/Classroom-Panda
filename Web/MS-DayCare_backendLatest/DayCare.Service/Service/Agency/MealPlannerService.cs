using DayCare.Service.IService.Agency;
using AutoMapper;
using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Model.Agency;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Collections;
using System.Globalization;
using System.Threading;
using static DayCare.Service.Common.CommonEnum;

namespace DayCare.Service.Service.Agency
{
    public class MealPlannerService : IMealPlannerService
    {
        public DataContext _dataContext;
        public IMealPlannerRepository _mealPlannerRepository;
        public IInvolvedMealClassesRepository _involvedMealClassesRepository;
        public IMealTypeRepository _mealTypeRepository;
        public IFoodTypeRepository _foodTypeRepository;
        public IMeasureUnitTypeRepository _measureUnitTypeRepository;
        public IMeasureQuantityTypeRepository _measureQuantityTypeRepository;
        public IClassesRepository _classesRepository;
        public IInvolvedMealFoodItemsRepository _involvedMealFoodItemsRepository;
        public MealPlannerService(DataContext dataContext, IMealPlannerRepository mealPlannerRepository, IInvolvedMealClassesRepository involvedMealClassesRepository
           , IMealTypeRepository mealTypeRepository, IFoodTypeRepository foodTypeRepository,
            IMeasureUnitTypeRepository measureUnitTypeRepository, IMeasureQuantityTypeRepository measureQuantityTypeRepository
            , IClassesRepository classesRepository,
            IInvolvedMealFoodItemsRepository involvedMealFoodItemsRepository)
        {
            _dataContext = dataContext;
            _mealPlannerRepository = mealPlannerRepository;
            _involvedMealClassesRepository = involvedMealClassesRepository;
            _mealTypeRepository = mealTypeRepository;
            _foodTypeRepository = foodTypeRepository;
            _measureUnitTypeRepository = measureUnitTypeRepository;
            _measureQuantityTypeRepository = measureQuantityTypeRepository;
            _classesRepository = classesRepository;
            _involvedMealFoodItemsRepository = involvedMealFoodItemsRepository;
        }

       
        public ResponseViewModal GetAllMealPlan(MealPlannerSearchViewModel getAllMealPlanRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
           try
            {
                if (getAllMealPlanRequest.AgencyID > 0)
                {
                    List<MealPlannerViewModel> allMealPlans = new List<MealPlannerViewModel>();
                    List<MealPlannerViewModel> allMealPlansDetails = new List<MealPlannerViewModel>();

                    IQueryable<MealPlanner> selectedMealPlanner = _mealPlannerRepository.GetAll().Where(check => check.PlannerRepeatTypeID == 0 && check.AgencyID == getAllMealPlanRequest.AgencyID && !check.IsDeleted
                     && (check.StartDate.Date >= getAllMealPlanRequest.EventSearchFromDate.Date && check.EndDate.Date <= getAllMealPlanRequest.EventSearchToDate.Date));

                    IQueryable<InvolvedMealClasses> selectedInvolvedMealClasses = _involvedMealClassesRepository.GetAll().Where(check => check.AgencyID == getAllMealPlanRequest.AgencyID && !check.IsDeleted);
                                
                    IQueryable<InvolvedMealFoodItems> selectedInvolvedMealFoodItemsRepository = _involvedMealFoodItemsRepository.GetAll().Where(check => check.AgencyID == getAllMealPlanRequest.AgencyID && !check.IsDeleted);

                    allMealPlans = (from mealPlannerObj in selectedMealPlanner
                                    join involvedMealClassesObj in selectedInvolvedMealClasses on mealPlannerObj.Id equals involvedMealClassesObj.MealPlannerID
                                    where (!mealPlannerObj.IsDeleted && mealPlannerObj.AgencyID == getAllMealPlanRequest.AgencyID)                                 
                                    select new MealPlannerViewModel()
                                    {
                                        Id = mealPlannerObj.Id,
                                        AgencyID = mealPlannerObj.AgencyID,
                                        MealTypeID = mealPlannerObj.MealTypeID,
                                        PlannerRepeatTypeID = mealPlannerObj.PlannerRepeatTypeID,
                                        Title = mealPlannerObj.Title,
                                        Start = mealPlannerObj.StartDate,
                                        End = mealPlannerObj.EndDate,
                                        EndsOn = mealPlannerObj.EndsOn,
                                        Description = mealPlannerObj.Description,
                                        Mon = mealPlannerObj.Mon,
                                        Tue = mealPlannerObj.Tue,
                                        Wed = mealPlannerObj.Wed,
                                        Thu = mealPlannerObj.Thu,
                                        Fri = mealPlannerObj.Fri,
                                        Sat = mealPlannerObj.Sat,
                                        Sun = mealPlannerObj.Sun
                                    }).OrderBy(c => c.Start).ToList();

                    var result = allMealPlans.GroupBy(p => p.Id).Select(p => p.First()).ToList();

                    foreach (var items in result)
                    {                       
                        ArrayList arrDayList = new ArrayList();                        

                        if (items.Mon == true)
                        {                           
                            arrDayList.Add(DayOfWeek.Monday);
                        }
                        if (items.Tue == true)
                        {
                            arrDayList.Add(DayOfWeek.Tuesday);                           
                        }
                        if (items.Wed == true)
                        {
                            arrDayList.Add(DayOfWeek.Wednesday);
                        }
                        if (items.Thu == true)
                        {
                            arrDayList.Add(DayOfWeek.Thursday);
                        }
                        if (items.Fri == true)
                        {
                            arrDayList.Add(DayOfWeek.Friday);
                        }
                        if (items.Sat == true)
                        {
                            arrDayList.Add(DayOfWeek.Saturday);
                        }
                        if (items.Sun == true)
                        {
                            arrDayList.Add(DayOfWeek.Sunday);
                        }

                        //if (items.Mon == true && items.Tue == true && items.Wed == true && items.Thu == true && items.Fri == true)
                        //{
                        //    allMealPlans = (from mealPlannerObj in selectedMealPlanner
                        //                    join involvedMealClassesObj in selectedInvolvedMealClasses on mealPlannerObj.Id equals involvedMealClassesObj.MealPlannerID
                        //                    where (mealPlannerObj.Id == items.Id && !mealPlannerObj.IsDeleted && mealPlannerObj.AgencyID == getAllMealPlanRequest.AgencyID)
                        //                    select new MealPlannerViewModel()
                        //                    {
                        //                        Id = mealPlannerObj.Id,
                        //                        AgencyID = mealPlannerObj.AgencyID,
                        //                        MealTypeID = mealPlannerObj.MealTypeID,
                        //                        PlannerRepeatTypeID = mealPlannerObj.PlannerRepeatTypeID,
                        //                        Title = mealPlannerObj.Title,
                        //                        Start = mealPlannerObj.StartDate,
                        //                        End = mealPlannerObj.EndDate,
                        //                        EndsOn = mealPlannerObj.EndsOn,
                        //                        Description = mealPlannerObj.Description
                        //                    }).OrderBy(c => c.Start).ToList();

                        //    allMealPlansDetails.AddRange(allMealPlans);

                        //}
                        //if (items.Mon == true && items.Tue == true && items.Wed == true && items.Thu == true && items.Fri == true && items.Sat == true && items.Sun == true)
                        //{
                        //    allMealPlans = (from mealPlannerObj in selectedMealPlanner
                        //                    join involvedMealClassesObj in selectedInvolvedMealClasses on mealPlannerObj.Id equals involvedMealClassesObj.MealPlannerID
                        //                    where (mealPlannerObj.Id == items.Id && !mealPlannerObj.IsDeleted && mealPlannerObj.AgencyID == getAllMealPlanRequest.AgencyID)
                        //                    select new MealPlannerViewModel()
                        //                    {
                        //                        Id = mealPlannerObj.Id,
                        //                        AgencyID = mealPlannerObj.AgencyID,
                        //                        MealTypeID = mealPlannerObj.MealTypeID,
                        //                        PlannerRepeatTypeID = mealPlannerObj.PlannerRepeatTypeID,
                        //                        Title = mealPlannerObj.Title,
                        //                        Start = mealPlannerObj.StartDate,
                        //                        End = mealPlannerObj.EndDate,
                        //                        EndsOn = mealPlannerObj.EndsOn,
                        //                        Description = mealPlannerObj.Description
                        //                    }).OrderBy(c => c.Start).ToList();

                        //    allMealPlansDetails.AddRange(allMealPlans);

                        //}
                        //if (!(items.Mon == true && items.Tue == true && items.Wed == true && items.Thu == true && items.Fri == true) || (items.Mon == true && items.Tue == true && items.Wed == true && items.Thu == true && items.Fri == true && items.Sat == true && items.Sun == true))
                        {
                            var start = (items.Start.Date);
                            var end = (items.End.Date);
                            int numberOfDays = end.Subtract(start).Days + 1;

                            var daysOfWeek = arrDayList;

                            var Dates = Enumerable.Range(0, numberOfDays).Select(i => start.AddDays(i)).Where(d => daysOfWeek.Contains(d.DayOfWeek));

                            foreach (var date in Dates)
                            {
                                allMealPlans = (from mealPlannerObj in selectedMealPlanner
                                                join involvedMealClassesObj in selectedInvolvedMealClasses on mealPlannerObj.Id equals involvedMealClassesObj.MealPlannerID
                                                where (mealPlannerObj.Id == items.Id && !mealPlannerObj.IsDeleted && mealPlannerObj.AgencyID == getAllMealPlanRequest.AgencyID)
                                                select new MealPlannerViewModel()
                                                {
                                                    Id = mealPlannerObj.Id,
                                                    AgencyID = mealPlannerObj.AgencyID,
                                                    MealTypeID = mealPlannerObj.MealTypeID,
                                                    PlannerRepeatTypeID = mealPlannerObj.PlannerRepeatTypeID,
                                                    Title = mealPlannerObj.Title,
                                                    Start = date.Date,
                                                    End = date.Date,
                                                    Description = mealPlannerObj.Description
                                                }).OrderBy(c => c.Start).ToList();

                                allMealPlans = allMealPlans.GroupBy(p => p.Id).Select(p => p.First()).ToList();                               

                                allMealPlansDetails.AddRange(allMealPlans);                               
                            }
                        }                                       
                    }                 
                    res.Data = allMealPlansDetails;
                    res.TotalRows = allMealPlans.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Meal Plans is successfully fetched.";
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

      
        public ResponseViewModal GetMealPlanDetails(MealPlannerSearchViewModel getMealPlanDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getMealPlanDetailsRequest.AgencyID > 0)
                {
                    MealPlannerViewModel mealPlanDetail = new MealPlannerViewModel();
                    IQueryable<MealPlanner> selectedMealPlanner = _mealPlannerRepository.GetAll().Where(Check => Check.AgencyID == getMealPlanDetailsRequest.AgencyID && !Check.IsDeleted);
                    IQueryable<InvolvedMealClasses> selectedInvolvedMealClasses = _involvedMealClassesRepository.GetAll().Where(Check => Check.MealPlannerID == getMealPlanDetailsRequest.MealPlanID && !Check.IsDeleted);
                    IQueryable<Entity.Masters.MealType> selectedMealType = _mealTypeRepository.GetAll().Where(Check => Check.AgencyID == getMealPlanDetailsRequest.AgencyID && !Check.IsDeleted);
                    IQueryable<Entity.Masters.FoodType> selectedFoodType = _foodTypeRepository.GetAll();
                    IQueryable<Entity.Masters.MeasureUnitType> selectedMeasureUnitType = _measureUnitTypeRepository.GetAll().Where(Check => Check.AgencyID == getMealPlanDetailsRequest.AgencyID && !Check.IsDeleted);
                    IQueryable<Entity.Masters.MeasureQuantityType> selectedMeasureQuantityType = _measureQuantityTypeRepository.GetAll().Where(Check => Check.AgencyID == getMealPlanDetailsRequest.AgencyID && !Check.IsDeleted);
                    IQueryable<InvolvedMealFoodItems> selectedInvolvedMealFoodItemsRepository = _involvedMealFoodItemsRepository.GetAll().Where(Check => Check.MealPlannerID == getMealPlanDetailsRequest.MealPlanID && !Check.IsDeleted);

                    mealPlanDetail = (from mealPlannerObj in selectedMealPlanner
                                      join involvedMealClassesObj in selectedInvolvedMealClasses on mealPlannerObj.Id equals involvedMealClassesObj.MealPlannerID
                                      join mealTypeObj in selectedMealType on mealPlannerObj.MealTypeID equals mealTypeObj.Id
                                      where (!mealPlannerObj.IsDeleted && mealPlannerObj.AgencyID == getMealPlanDetailsRequest.AgencyID)
                                      select new MealPlannerViewModel()
                                      {
                                          Id = mealPlannerObj.Id,
                                          AgencyID = mealPlannerObj.AgencyID,
                                          MealTypeID = mealPlannerObj.MealTypeID,
                                          PlannerRepeatTypeID = mealPlannerObj.PlannerRepeatTypeID,
                                          Title = mealPlannerObj.Title,
                                          Start = mealPlannerObj.StartDate,
                                          End = mealPlannerObj.EndDate,
                                          EndsOn = mealPlannerObj.EndsOn,
                                          Description = mealPlannerObj.Description,
                                          Mon = mealPlannerObj.Mon,
                                          Tue = mealPlannerObj.Tue,
                                          Wed = mealPlannerObj.Wed,
                                          Thu = mealPlannerObj.Thu,
                                          Fri = mealPlannerObj.Fri,
                                          Sat = mealPlannerObj.Sat,
                                          Sun = mealPlannerObj.Sun,

                                          InvolvedClass = (from involvedMealClassObj in selectedInvolvedMealClasses
                                                           join classObj in _classesRepository.GetAll() on involvedMealClassObj.ClassesID equals classObj.Id
                                                           where (!involvedMealClassObj.IsDeleted && involvedMealClassObj.AgencyID == getMealPlanDetailsRequest.AgencyID
                                                           && mealPlannerObj.Id == involvedMealClassesObj.MealPlannerID)
                                                           select new InvolvedMealClassesViewModel()
                                                           {
                                                               Id = involvedMealClassesObj.Id,
                                                               AgencyID = involvedMealClassesObj.AgencyID,
                                                               MealPlannerID = involvedMealClassesObj.MealPlannerID,
                                                               ClassesID = involvedMealClassesObj.ClassesID,
                                                               ClassName = classObj.ClassName ?? String.Empty                                                               
                                                           }).ToList(),

                                          InvolvedMealFoodItems = (from involvedMealFoodItemsObj in selectedInvolvedMealFoodItemsRepository
                                                                   join foodTypeObj in _foodTypeRepository.GetAll() on involvedMealFoodItemsObj.FoodTypeID equals foodTypeObj.Id
                                                                   join measureQuantityTypeObj in _measureQuantityTypeRepository.GetAll() on involvedMealFoodItemsObj.MeasureQuantityTypeID equals measureQuantityTypeObj.Id
                                                                   join measureUnitTypeObj in _measureUnitTypeRepository.GetAll() on involvedMealFoodItemsObj.MeasureUnitTypeID equals measureUnitTypeObj.Id
                                                                   where (!involvedMealFoodItemsObj.IsDeleted &&  involvedMealFoodItemsObj.AgencyID == getMealPlanDetailsRequest.AgencyID
                                                                   && mealPlannerObj.Id == involvedMealClassesObj.MealPlannerID)
                                                                   select new InvolvedMealFoodItemsViewModel()
                                                                   {
                                                                       Id = involvedMealFoodItemsObj.Id,
                                                                       AgencyID = involvedMealFoodItemsObj.AgencyID,
                                                                       MealPlannerID = involvedMealFoodItemsObj.MealPlannerID,
                                                                       FoodTypeID = involvedMealFoodItemsObj.FoodTypeID,
                                                                       FoodTypeName = foodTypeObj.FoodTypeName,
                                                                       Amount = involvedMealFoodItemsObj.Amount,
                                                                       quantity = involvedMealFoodItemsObj.quantity,
                                                                       MeasureUnitTypeID = involvedMealFoodItemsObj.MeasureUnitTypeID,
                                                                       MeasureUnitTypeName = measureUnitTypeObj.MeasureUnitTypeName,
                                                                       MeasureQuantityTypeID = involvedMealFoodItemsObj.MeasureQuantityTypeID,
                                                                       MeasureQuantityTypeName = measureQuantityTypeObj.MeasureQuantityTypeName                                                                      
                                                                   }).ToList(),
                                          
                                      }).FirstOrDefault();
                    res.Data = mealPlanDetail;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Meal Plan Information is successfully fetched.";
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 986;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }
                       

        public ResponseViewModal SaveMealPlan(MealPlannerViewModel saveMealPlanRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
            try
             {
               DateTime start = saveMealPlanRequest.Start;
               DateTime end = saveMealPlanRequest.End;                  

                if (!(start.DayOfWeek == DayOfWeek.Sunday || start.DayOfWeek == DayOfWeek.Monday))
                 {
                    StartDayOfWeekNotEqualToSundayMonday(saveMealPlanRequest);
                 }

                 if (start.DayOfWeek == DayOfWeek.Sunday || start.DayOfWeek == DayOfWeek.Monday)
                 {
                    StartDayOfWeekEqualToSundayMonday(saveMealPlanRequest);
                 }

              res.IsSuccess = true;
              res.StatusCode = (long)HttpStatusCodes.OK;
              res.Message = "Meal Plan Save Successfully.";                           
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }


        private ResponseViewModal StartDayOfWeekNotEqualToSundayMonday(MealPlannerViewModel saveMealPlanRequest)
        {
            ResponseViewModal res = new ResponseViewModal();

            DateTime start = saveMealPlanRequest.Start;
            DateTime end = saveMealPlanRequest.End;

            try
             {
                DateTime startDate = saveMealPlanRequest.Start;
                DateTime endDate = saveMealPlanRequest.End;

                List<BiWeeklyDateRangeViewModel> AllDateDetails = new List<BiWeeklyDateRangeViewModel>();

                var weeks = Enumerable.Range(0, (end - start).Days)
                        .Where(x => start.AddDays(x).DayOfWeek == DayOfWeek.Sunday)
                        .Select(x => new Tuple<DateTime, DateTime>(start.AddDays(x), start.AddDays(x + 6)))
                        .Where(x => x.Item2 < end).ToList();


                if (weeks.Count == 0)
                {
                    DateTime thisWeekStart = start.AddDays(-(int)start.DayOfWeek);
                    DateTime thisWeekEnd = thisWeekStart.AddDays(7).AddSeconds(-1);

                    saveMealPlanRequest.Start = saveMealPlanRequest.Start;

                    if (saveMealPlanRequest.End < thisWeekEnd)
                    {
                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = saveMealPlanRequest.Start,
                               EndDate = saveMealPlanRequest.End
                           });
                    }

                    if (saveMealPlanRequest.End > thisWeekEnd)
                    {
                        AllDateDetails.Add(
                             new BiWeeklyDateRangeViewModel
                             {
                                 StartDate = saveMealPlanRequest.Start,
                                 EndDate = thisWeekEnd
                             });

                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = thisWeekEnd.AddDays(1),
                               EndDate = saveMealPlanRequest.End
                           });
                    }

                }

                if (weeks.Count > 0)
                {
                    DateTime thisWeekStart = start.AddDays(-(int)start.DayOfWeek);
                    DateTime thisWeekEnd = thisWeekStart.AddDays(7).AddSeconds(-1);

                    saveMealPlanRequest.Start = saveMealPlanRequest.Start;

                    AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = saveMealPlanRequest.Start,
                               EndDate = thisWeekEnd
                           });

                    foreach (var item in weeks)
                    {
                        AllDateDetails.Add(
                            new BiWeeklyDateRangeViewModel
                            {
                                StartDate = item.Item1.Date,
                                EndDate = item.Item2.Date
                            });
                    }

                    if (!(endDate.DayOfWeek == DayOfWeek.Monday))
                    {
                        var lastItem = weeks.LastOrDefault();
                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = lastItem.Item2.Date.AddDays(1),
                               EndDate = endDate
                           });
                    }

                    if (endDate.DayOfWeek == DayOfWeek.Monday)
                    {
                        var lastItem = weeks.LastOrDefault();
                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = lastItem.Item2.Date.AddDays(1),
                               EndDate = endDate
                           });
                    }

                    var AllDateRange = AllDateDetails;

                    if (saveMealPlanRequest.IsBiweekly == true)
                    {
                        foreach (var items in AllDateRange)
                        {
                            int index = AllDateRange.IndexOf(items);

                            var FirstWeek = index % 2 != 0;
                            //var SecondWeek = index % 2 == 0;
                            if (FirstWeek == false)
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = false;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                            else
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = true;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                        }
                    }
                    else
                    {
                        foreach (var items in AllDateRange)
                        {
                            saveMealPlanRequest.Start = items.StartDate;
                            saveMealPlanRequest.End = items.EndDate;
                            saveMealPlanRequest.FirstWeek = false;
                            SaveSingleMealPlan(saveMealPlanRequest);
                        }
                    }
                }
                else
                {
                    var AllDateRange = AllDateDetails;

                    if (saveMealPlanRequest.IsBiweekly == true)
                    {
                        foreach (var items in AllDateRange)
                        {
                            int index = AllDateRange.IndexOf(items);

                            var FirstWeek = index % 2 != 0;
                            //var SecondWeek = index % 2 == 0;
                            if (FirstWeek == false)
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = false;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                            else
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = true;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                        }
                    }
                    else
                    {
                        foreach (var items in AllDateRange)
                        {
                            saveMealPlanRequest.Start = items.StartDate;
                            saveMealPlanRequest.End = items.EndDate;
                            saveMealPlanRequest.FirstWeek = false;
                            SaveSingleMealPlan(saveMealPlanRequest);
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;                
            }
            return res;
        }


        private ResponseViewModal StartDayOfWeekEqualToSundayMonday(MealPlannerViewModel saveMealPlanRequest)
        {
            ResponseViewModal res = new ResponseViewModal();

            DateTime start = saveMealPlanRequest.Start;
            DateTime end = saveMealPlanRequest.End;

            try
            {
                List<BiWeeklyDateRangeViewModel> AllDateDetails = new List<BiWeeklyDateRangeViewModel>();

                DateTime startDate = saveMealPlanRequest.Start;
                DateTime endDate = saveMealPlanRequest.End;

                var weeks = Enumerable.Range(0, (end - start).Days)
                        .Where(x => start.AddDays(x).DayOfWeek == DayOfWeek.Sunday)
                        .Select(x => new Tuple<DateTime, DateTime>(start.AddDays(x), start.AddDays(x + 6)))
                        .Where(x => x.Item2 < end).ToList();

                if (weeks.Count == 0)
                {
                    DateTime thisWeekStart = start.AddDays(-(int)start.DayOfWeek);
                    DateTime thisWeekEnd = thisWeekStart.AddDays(7).AddSeconds(-1);

                    saveMealPlanRequest.Start = saveMealPlanRequest.Start;

                    if (saveMealPlanRequest.End < thisWeekEnd)
                    {
                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = saveMealPlanRequest.Start,
                               EndDate = saveMealPlanRequest.End
                           });
                    }

                    if (saveMealPlanRequest.End > thisWeekEnd)
                    {
                        AllDateDetails.Add(
                             new BiWeeklyDateRangeViewModel
                             {
                                 StartDate = saveMealPlanRequest.Start,
                                 EndDate = thisWeekEnd
                             });

                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = thisWeekEnd.AddDays(1),
                               EndDate = saveMealPlanRequest.End
                           });
                    }

                }

                if (weeks.Count > 0)
                {
                    foreach (var item in weeks)
                    {
                        AllDateDetails.Add(
                            new BiWeeklyDateRangeViewModel
                            {
                                StartDate = item.Item1.Date,
                                EndDate = item.Item2.Date
                            });
                    }

                    if (!(endDate.DayOfWeek == DayOfWeek.Monday))
                    {
                        var lastItem = weeks.LastOrDefault();
                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = lastItem.Item2.Date.AddDays(1),
                               EndDate = endDate
                           });
                    }
                    if (endDate.DayOfWeek == DayOfWeek.Monday)
                    {
                        var lastItem = weeks.LastOrDefault();
                        AllDateDetails.Add(
                           new BiWeeklyDateRangeViewModel
                           {
                               StartDate = lastItem.Item2.Date.AddDays(1),
                               EndDate = endDate
                           });
                    }

                    var AllDateRange = AllDateDetails;

                    if (saveMealPlanRequest.IsBiweekly == true)
                    {
                        foreach (var items in AllDateRange)
                        {
                            int index = AllDateRange.IndexOf(items);

                            var FirstWeek = index % 2 != 0;
                            //var SecondWeek = index % 2 == 0;
                            if (FirstWeek == false)
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = false;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                            else
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = true;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                        }
                    }
                    else
                    {
                        foreach (var items in AllDateRange)
                        {
                            saveMealPlanRequest.Start = items.StartDate;
                            saveMealPlanRequest.End = items.EndDate;
                            saveMealPlanRequest.FirstWeek = false;
                            SaveSingleMealPlan(saveMealPlanRequest);
                        }
                    }
                }
                else
                {
                    var AllDateRange = AllDateDetails;

                    if (saveMealPlanRequest.IsBiweekly == true)
                    {
                        foreach (var items in AllDateRange)
                        {
                            int index = AllDateRange.IndexOf(items);

                            var FirstWeek = index % 2 != 0;
                            //var SecondWeek = index % 2 == 0;
                            if (FirstWeek == false)
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = false;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                            else
                            {
                                saveMealPlanRequest.Start = items.StartDate;
                                saveMealPlanRequest.End = items.EndDate;
                                saveMealPlanRequest.FirstWeek = true;
                                SaveSingleMealPlan(saveMealPlanRequest);
                            }
                        }
                    }
                    else
                    {
                        foreach (var items in AllDateRange)
                        {
                            saveMealPlanRequest.Start = items.StartDate;
                            saveMealPlanRequest.End = items.EndDate;
                            saveMealPlanRequest.FirstWeek = false;
                            SaveSingleMealPlan(saveMealPlanRequest);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
            }
            return res;
        }

        public ResponseViewModal UpdateParticularMealPlan(MealPlannerViewModel saveMealPlanRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                   if (saveMealPlanRequest.AgencyID > 0 && saveMealPlanRequest.Id > 0) 
                    {
                        long id = 0;
                        MealPlanner mealPlannerObj = null;    
                        
                        mealPlannerObj = _mealPlannerRepository.Get(x => x.Id == saveMealPlanRequest.Id && !x.IsDeleted);

                        if (!ReferenceEquals(mealPlannerObj, null))
                         {                   
                            if (saveMealPlanRequest.Mon == true)
                            {
                                mealPlannerObj.Mon = false;
                            }
                            if (saveMealPlanRequest.Tue == true)
                            {
                                mealPlannerObj.Tue = false;
                            }
                            if (saveMealPlanRequest.Wed == true)
                            {
                                mealPlannerObj.Wed = false;
                            }
                            if (saveMealPlanRequest.Thu == true)
                            {
                                mealPlannerObj.Thu = false;
                            }
                            if (saveMealPlanRequest.Fri == true)
                            {
                                mealPlannerObj.Fri = false;
                            }
                            if (saveMealPlanRequest.Sat == true)
                            {
                                mealPlannerObj.Sat = false;
                            }
                            if (saveMealPlanRequest.Sun == true)
                            {
                                mealPlannerObj.Sun = false;
                            }
                            mealPlannerObj.UpdatedBy = saveMealPlanRequest.UpdatedBy;
                            mealPlannerObj.UpdatedDate = DateTime.Now;
                            _mealPlannerRepository.SaveChanges();                          
                            id = mealPlannerObj.Id;
                         }
                       
                        daycaredb.Commit();                        

                        if (id > 0 && saveMealPlanRequest.InvolvedMealFoodItems != null && saveMealPlanRequest.InvolvedMealFoodItems.Count > 0)
                        {
                            long CreatedId = 0;
                            saveMealPlanRequest.CreatedDate = DateTime.UtcNow;
                            mealPlannerObj = new MealPlanner();
                            mealPlannerObj.StartDate = saveMealPlanRequest.Start;
                            mealPlannerObj.EndDate = saveMealPlanRequest.Start;
                            Mapper.Map(saveMealPlanRequest, mealPlannerObj);
                            _mealPlannerRepository.Create(mealPlannerObj);
                            _mealPlannerRepository.SaveChanges();
                            CreatedId = mealPlannerObj.Id;

                            for (int i = 0; i < saveMealPlanRequest.InvolvedClass.Count; i++)
                            {
                               saveMealPlanRequest.InvolvedClass[i].MealPlannerID = CreatedId;
                               SaveInvolvedMealClasses(saveMealPlanRequest.InvolvedClass[i]);
                            }                            

                            for (int i = 0; i < saveMealPlanRequest.InvolvedMealFoodItems.Count; i++)
                            {
                               saveMealPlanRequest.InvolvedMealFoodItems[i].MealPlannerID = CreatedId;
                               SaveInvolvedMealFoodItems(saveMealPlanRequest.InvolvedMealFoodItems[i]);
                            }
                        }
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Meal Plan has been Updated.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

       
        private ResponseViewModal SaveSingleMealPlan(MealPlannerViewModel saveMealPlanRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                   if (saveMealPlanRequest.AgencyID > 0)
                    {
                        long id = 0;
                        MealPlanner mealPlannerObj = null;
                        if (saveMealPlanRequest.AgencyID != 0 && saveMealPlanRequest.Id == 0)
                        {                            
                            saveMealPlanRequest.CreatedDate = DateTime.UtcNow;
                            mealPlannerObj = new MealPlanner();
                            Mapper.Map(saveMealPlanRequest, mealPlannerObj);
                            _mealPlannerRepository.Create(mealPlannerObj);
                            _mealPlannerRepository.SaveChanges();
                            id = mealPlannerObj.Id;
                        }
                        daycaredb.Commit();
                        if (id > 0 && saveMealPlanRequest.InvolvedClass != null && saveMealPlanRequest.InvolvedClass.Count > 0)
                        {                           
                            for (int i = 0; i < saveMealPlanRequest.InvolvedClass.Count; i++)
                            {
                                saveMealPlanRequest.InvolvedClass[i].MealPlannerID = id;
                                SaveInvolvedMealClasses(saveMealPlanRequest.InvolvedClass[i]);
                            }
                        }
                        if (id > 0 && saveMealPlanRequest.InvolvedMealFoodItems != null && saveMealPlanRequest.InvolvedMealFoodItems.Count > 0)
                        {                            
                            if (saveMealPlanRequest.FirstWeek == false)
                            {
                                for (int i = 0; i < saveMealPlanRequest.InvolvedMealFoodItems.Count; i++)
                                {
                                    saveMealPlanRequest.InvolvedMealFoodItems[i].MealPlannerID = id;
                                    SaveInvolvedMealFoodItems(saveMealPlanRequest.InvolvedMealFoodItems[i]);
                                }
                            }

                            if (saveMealPlanRequest.FirstWeek == true)
                            {
                                for (int i = 0; i < saveMealPlanRequest.InvolvedMealFoodItemsSecond.Count; i++)
                                {
                                    saveMealPlanRequest.InvolvedMealFoodItemsSecond[i].MealPlannerID = id;
                                    SaveInvolvedMealFoodItems(saveMealPlanRequest.InvolvedMealFoodItemsSecond[i]);
                                }
                            }
                        }
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Meal Plan Save Successfully.";                      
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

      
        public ResponseViewModal SaveInvolvedMealClasses(InvolvedMealClassesViewModel saveInvolvedMealClassesRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long id = 0;
                    InvolvedMealClasses involvedMealClassesObj = null;
                    if (saveInvolvedMealClassesRequest.AgencyID != 0 && saveInvolvedMealClassesRequest.Id == 0)
                    {                        
                        saveInvolvedMealClassesRequest.CreatedDate = DateTime.UtcNow;

                        involvedMealClassesObj = new InvolvedMealClasses();
                        Mapper.Map(saveInvolvedMealClassesRequest, involvedMealClassesObj);
                        _involvedMealClassesRepository.Create(involvedMealClassesObj);
                        _involvedMealClassesRepository.SaveChanges();
                        id = involvedMealClassesObj.Id;
                    }
                    else if (saveInvolvedMealClassesRequest.Id > 0)
                    {
                        involvedMealClassesObj = _involvedMealClassesRepository.Get(x => x.Id == saveInvolvedMealClassesRequest.Id && !x.IsDeleted);
                        if (!ReferenceEquals(involvedMealClassesObj, null))
                        {
                            involvedMealClassesObj.MealPlannerID = saveInvolvedMealClassesRequest.MealPlannerID;
                            involvedMealClassesObj.ClassesID = saveInvolvedMealClassesRequest.ClassesID;
                            involvedMealClassesObj.AgencyID = saveInvolvedMealClassesRequest.AgencyID;
                            _involvedMealClassesRepository.SaveChanges();
                            id = involvedMealClassesObj.Id;
                        }
                    }
                    daycaredb.Commit();
                    res.IsSuccess = true;
                    res.SaveId = id;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Meal Plan involvment classes has been saved.";                    
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

       
        private bool DeletePreviousMealPlanInvolvmentClasses(InvolvedMealClassesViewModel deletePreviousMealPlanInvolvmentClassesRequest)
        {
            bool res;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long id = 0;
                    InvolvedMealClasses involvedMealClassesObj = null;
                    involvedMealClassesObj = new InvolvedMealClasses();
                    if (deletePreviousMealPlanInvolvmentClassesRequest.AgencyID != 0 && deletePreviousMealPlanInvolvmentClassesRequest.MealPlannerID != 0)
                    {
                        deletePreviousMealPlanInvolvmentClassesRequest.IsDeleted = true;
                        deletePreviousMealPlanInvolvmentClassesRequest.DeletedDate = DateTime.UtcNow;

                        involvedMealClassesObj = _involvedMealClassesRepository.Get(x => x.Id == deletePreviousMealPlanInvolvmentClassesRequest.Id && !x.IsDeleted);
                        if (!ReferenceEquals(involvedMealClassesObj, null))
                        {
                            involvedMealClassesObj.IsDeleted = deletePreviousMealPlanInvolvmentClassesRequest.IsDeleted;
                            involvedMealClassesObj.DeletedBy = deletePreviousMealPlanInvolvmentClassesRequest.DeletedBy;
                            involvedMealClassesObj.DeletedDate = deletePreviousMealPlanInvolvmentClassesRequest.DeletedDate;
                            _involvedMealClassesRepository.SaveChanges();
                            id = involvedMealClassesObj.Id;
                        }
                    }
                    daycaredb.Commit();
                    res = true;
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res = false;
                }
            }
            return res;
        }

       
        public ResponseViewModal SaveInvolvedMealFoodItems(InvolvedMealFoodItemsViewModel saveInvolvedMealFoodItemsRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
           using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                    long id = 0;
                    InvolvedMealFoodItems involvedMealFoodItemsObj = null;
                    if (saveInvolvedMealFoodItemsRequest.AgencyID != 0 && saveInvolvedMealFoodItemsRequest.Id == 0)
                    {                        
                        saveInvolvedMealFoodItemsRequest.CreatedDate = DateTime.UtcNow;

                        involvedMealFoodItemsObj = new InvolvedMealFoodItems();
                        Mapper.Map(saveInvolvedMealFoodItemsRequest, involvedMealFoodItemsObj);
                        _involvedMealFoodItemsRepository.Create(involvedMealFoodItemsObj);
                        _involvedMealFoodItemsRepository.SaveChanges();
                        id = involvedMealFoodItemsObj.Id;
                    }
                    else if (saveInvolvedMealFoodItemsRequest.Id > 0)
                    {
                        involvedMealFoodItemsObj = _involvedMealFoodItemsRepository.Get(x => x.Id == saveInvolvedMealFoodItemsRequest.Id && !x.IsDeleted);
                        if (!ReferenceEquals(involvedMealFoodItemsObj, null))
                        {
                            involvedMealFoodItemsObj.MealPlannerID = saveInvolvedMealFoodItemsRequest.MealPlannerID;
                            involvedMealFoodItemsObj.FoodTypeID = saveInvolvedMealFoodItemsRequest.FoodTypeID;
                            involvedMealFoodItemsObj.Amount = saveInvolvedMealFoodItemsRequest.Amount;
                            involvedMealFoodItemsObj.quantity = saveInvolvedMealFoodItemsRequest.quantity;
                            involvedMealFoodItemsObj.MeasureUnitTypeID = saveInvolvedMealFoodItemsRequest.MeasureUnitTypeID;
                            involvedMealFoodItemsObj.MeasureQuantityTypeID = saveInvolvedMealFoodItemsRequest.MeasureQuantityTypeID;
                            involvedMealFoodItemsObj.AgencyID = saveInvolvedMealFoodItemsRequest.AgencyID;
                            _involvedMealClassesRepository.SaveChanges();
                            id = involvedMealFoodItemsObj.Id;
                        }
                    }
                    daycaredb.Commit();
                    res.IsSuccess = true;
                    res.SaveId = id;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Meal Plan involvment food Items has been saved.";                   
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

       
        private bool DeletePreviousMealPlanInvolvmentFoodItems(InvolvedMealFoodItemsViewModel deletePreviousMealPlanInvolvmentFoodItemsRequest)
        {
           bool res;
           using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {
                    long id = 0;
                    InvolvedMealFoodItems involvedMealFoodItemsObj = null;
                    involvedMealFoodItemsObj = new InvolvedMealFoodItems();
                    if (deletePreviousMealPlanInvolvmentFoodItemsRequest.AgencyID != 0 && deletePreviousMealPlanInvolvmentFoodItemsRequest.MealPlannerID != 0)
                    {
                        deletePreviousMealPlanInvolvmentFoodItemsRequest.IsDeleted = true;
                        deletePreviousMealPlanInvolvmentFoodItemsRequest.DeletedDate = DateTime.UtcNow;

                        involvedMealFoodItemsObj = _involvedMealFoodItemsRepository.Get(x => x.Id == deletePreviousMealPlanInvolvmentFoodItemsRequest.Id && !x.IsDeleted);

                        if (!ReferenceEquals(involvedMealFoodItemsObj, null))
                        {
                            involvedMealFoodItemsObj.IsDeleted = deletePreviousMealPlanInvolvmentFoodItemsRequest.IsDeleted;
                            involvedMealFoodItemsObj.DeletedBy = deletePreviousMealPlanInvolvmentFoodItemsRequest.DeletedBy;
                            involvedMealFoodItemsObj.DeletedDate = deletePreviousMealPlanInvolvmentFoodItemsRequest.DeletedDate;
                            _involvedMealClassesRepository.SaveChanges();
                            id = involvedMealFoodItemsObj.Id;
                        }
                    }
                    daycaredb.Commit();
                    res = true;
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res = false;
                }
            }
            return res;
        }

       
        public ResponseViewModal DeleteMealPlan(MealPlannerViewModel deleteMealPlanRequest)
        {
          ResponseViewModal res = new ResponseViewModal();
           using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {
                  if (deleteMealPlanRequest.AgencyID > 0 && deleteMealPlanRequest.Id > 0)
                    {
                        long id = 0;
                        MealPlanner mealPlannerObj = null;
                        if (deleteMealPlanRequest.Id > 0)
                        {
                            mealPlannerObj = _mealPlannerRepository.Get(x => x.Id == deleteMealPlanRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(mealPlannerObj, null))
                            {
                                mealPlannerObj.DeletedBy = deleteMealPlanRequest.DeletedBy;
                                mealPlannerObj.DeletedDate = deleteMealPlanRequest.DeletedDate;
                                mealPlannerObj.IsDeleted = deleteMealPlanRequest.IsDeleted;
                                _mealPlannerRepository.SaveChanges();
                                id = mealPlannerObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        if (id > 0 && deleteMealPlanRequest.InvolvedClass != null && deleteMealPlanRequest.InvolvedClass.Count > 0)
                        {
                            List<InvolvedMealClassesViewModel> involvedMealPlanClassesToBeDeleted = new List<InvolvedMealClassesViewModel>();
                            involvedMealPlanClassesToBeDeleted = (from involvedMealPlanClassesObj in _involvedMealClassesRepository.GetAll()
                                                                  where (!involvedMealPlanClassesObj.IsDeleted && deleteMealPlanRequest.AgencyID == involvedMealPlanClassesObj.AgencyID
                                                                  && involvedMealPlanClassesObj.MealPlannerID == deleteMealPlanRequest.Id)
                                                                  select new InvolvedMealClassesViewModel()
                                                                  {
                                                                      Id = involvedMealPlanClassesObj.Id,
                                                                      AgencyID = involvedMealPlanClassesObj.AgencyID,
                                                                      ClassesID = involvedMealPlanClassesObj.ClassesID
                                                                  }).OrderBy(c => c.CreatedDate).ToList();

                            if (involvedMealPlanClassesToBeDeleted != null && involvedMealPlanClassesToBeDeleted.Count > 0)
                            {
                                for (int i = 0; i < involvedMealPlanClassesToBeDeleted.Count; i++)
                                {
                                    DeletePreviousMealPlanInvolvmentClasses(involvedMealPlanClassesToBeDeleted[i]);
                                }
                            }
                        }
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Meal Plan has been deleted.";                       
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        
        
        public ResponseViewModal GetParticularMealPlan(MealPlannerSearchViewModel getAllMealPlanRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
           try
            {
               if (getAllMealPlanRequest.AgencyID > 0)
                {
                    List<MealPlannerViewModel> allMealPlans = new List<MealPlannerViewModel>();

                    IQueryable<MealPlanner> selectedMealPlanner = _mealPlannerRepository.GetAll().Where(check => check.AgencyID == getAllMealPlanRequest.AgencyID
                    && ((getAllMealPlanRequest.EventSearchFromDate <= check.StartDate && getAllMealPlanRequest.EventSearchFromDate >= check.EndDate)
                    || (getAllMealPlanRequest.EventSearchToDate >= check.StartDate || getAllMealPlanRequest.EventSearchToDate <= check.EndDate) && check.Id == getAllMealPlanRequest.MealPlanID)
                    );
                    IQueryable<InvolvedMealClasses> selectedInvolvedMealClasses = _involvedMealClassesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllMealPlanRequest.AgencyID && classCheck.MealPlannerID == getAllMealPlanRequest.MealPlanID && !classCheck.IsDeleted);
                    IQueryable<Entity.Masters.FoodType> selectedFoodType = _foodTypeRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllMealPlanRequest.AgencyID);
                    IQueryable<Entity.Masters.MeasureUnitType> selectedMeasureUnitType = _measureUnitTypeRepository.GetAll();
                    IQueryable<Entity.Masters.MeasureQuantityType> selectedMeasureQuantityType = _measureQuantityTypeRepository.GetAll();
                    IQueryable<InvolvedMealFoodItems> selectedInvolvedMealFoodItemsRepository = _involvedMealFoodItemsRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllMealPlanRequest.AgencyID && classCheck.MealPlannerID == getAllMealPlanRequest.MealPlanID && !classCheck.IsDeleted);
                 

                    allMealPlans = (from mealPlannerObj in selectedMealPlanner
                                    join involvedMealClassesObj in selectedInvolvedMealClasses on mealPlannerObj.Id equals involvedMealClassesObj.MealPlannerID
                                    where (!mealPlannerObj.IsDeleted && mealPlannerObj.AgencyID == getAllMealPlanRequest.AgencyID)
                                    select new MealPlannerViewModel()
                                    {
                                        Id = mealPlannerObj.Id,
                                        AgencyID = mealPlannerObj.AgencyID,
                                        MealTypeID = mealPlannerObj.MealTypeID,
                                        PlannerRepeatTypeID = mealPlannerObj.PlannerRepeatTypeID,
                                        Title = mealPlannerObj.Title,
                                        Start = mealPlannerObj.StartDate,
                                        End = mealPlannerObj.EndDate,
                                        EndsOn = mealPlannerObj.EndsOn,
                                        Description = mealPlannerObj.Description,
                                        Mon = mealPlannerObj.Mon,
                                        Tue = mealPlannerObj.Tue,
                                        Wed = mealPlannerObj.Wed,
                                        Thu = mealPlannerObj.Thu,
                                        Fri = mealPlannerObj.Fri,
                                        Sat = mealPlannerObj.Sat,
                                        Sun = mealPlannerObj.Sun,
                                        StartTime = mealPlannerObj.StartTime,
                                        EndTime = mealPlannerObj.EndTime,
                                        IsBiweekly = mealPlannerObj.IsBiweekly,

                                        InvolvedClass = (from involvedMealClassObj in selectedInvolvedMealClasses
                                                         join classObj in _classesRepository.GetAll() on involvedMealClassObj.ClassesID equals classObj.Id
                                                         where (!involvedMealClassObj.IsDeleted &&  involvedMealClassObj.AgencyID == getAllMealPlanRequest.AgencyID
                                                         && mealPlannerObj.Id == involvedMealClassesObj.MealPlannerID)
                                                         select new InvolvedMealClassesViewModel()
                                                         {
                                                             Id = involvedMealClassesObj.Id,
                                                             AgencyID = involvedMealClassesObj.AgencyID,
                                                             MealPlannerID = involvedMealClassesObj.MealPlannerID,
                                                             ClassesID = classObj.Id,
                                                             ClassName = classObj.ClassName ?? String.Empty                                                            
                                                         }).ToList(),                                       
                                       
                                                      }).OrderBy(c => c.Start).ToList();
                 
                    var result = allMealPlans.GroupBy(p => p.Id).Select(p => p.First()).ToList();

                    for (var i = 0; i < result.Count; i++)
                    {
                        var InvolvedMealFoodItems = (from involvedMealFoodItemsObj in selectedInvolvedMealFoodItemsRepository
                                                     join foodTypeObj in selectedFoodType on involvedMealFoodItemsObj.FoodTypeID equals foodTypeObj.Id                                                    
                                                     join measureUnitTypeObj in _measureUnitTypeRepository.GetAll() on involvedMealFoodItemsObj.MeasureUnitTypeID equals measureUnitTypeObj.Id
                                                     where (!involvedMealFoodItemsObj.IsDeleted
                                                     &&  involvedMealFoodItemsObj.MealPlannerID == getAllMealPlanRequest.MealPlanID)                                                    
                                                     select new InvolvedMealFoodItemsViewModel()
                                                     {
                                                         Id = involvedMealFoodItemsObj.Id,
                                                         AgencyID = involvedMealFoodItemsObj.AgencyID,
                                                         MealPlannerID = involvedMealFoodItemsObj.MealPlannerID,
                                                         FoodTypeID = involvedMealFoodItemsObj.FoodTypeID,
                                                         FoodTypeName = foodTypeObj.FoodTypeName,
                                                         Amount = involvedMealFoodItemsObj.Amount,
                                                         quantity = involvedMealFoodItemsObj.quantity,
                                                         MeasureUnitTypeID = involvedMealFoodItemsObj.MeasureUnitTypeID,
                                                         MeasureUnitTypeName = measureUnitTypeObj.MeasureUnitTypeName,
                                                         MeasureQuantityTypeID = involvedMealFoodItemsObj.MeasureQuantityTypeID                                                        
                                                     }).ToList();

                        result[i].InvolvedMealFoodItems.AddRange(InvolvedMealFoodItems);
                    }                   
                    res.Data = result;
                    res.TotalRows = allMealPlans.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Meal Plans is successfully fetched.";
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

      
    }
}

