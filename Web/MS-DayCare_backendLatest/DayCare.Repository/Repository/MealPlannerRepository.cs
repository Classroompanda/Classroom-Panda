using DayCare.Data;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using DayCare.Entity.Agency;

namespace DayCare.Repository.IRepository
{
    public class MealPlannerRepository : RepositoryBase<MealPlanner>, IMealPlannerRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public MealPlannerRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

