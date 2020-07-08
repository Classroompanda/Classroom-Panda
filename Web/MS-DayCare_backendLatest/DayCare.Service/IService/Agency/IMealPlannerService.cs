using DayCare.Model.Response;
using DayCare.Model.Agency;

namespace DayCare.Service.IService.Agency
{
    public interface IMealPlannerService
    {
        ResponseViewModal GetAllMealPlan(MealPlannerSearchViewModel getAllMealPlanRequest);
        ResponseViewModal GetMealPlanDetails(MealPlannerSearchViewModel getMealPlanDetailsRequest);
        ResponseViewModal SaveMealPlan(MealPlannerViewModel saveMealPlanRequest);
        ResponseViewModal SaveInvolvedMealClasses(InvolvedMealClassesViewModel saveInvolvedMealClassesRequest);
        ResponseViewModal DeleteMealPlan(MealPlannerViewModel deleteMealPlanRequest);

        ResponseViewModal GetParticularMealPlan(MealPlannerSearchViewModel getAllMealPlanRequest);
        ResponseViewModal UpdateParticularMealPlan(MealPlannerViewModel saveMealPlanRequest);

    }
}

