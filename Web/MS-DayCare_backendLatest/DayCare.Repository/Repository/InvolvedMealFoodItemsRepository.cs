using DayCare.Data;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using DayCare.Entity.Agency;

namespace DayCare.Repository.IRepository
{
    public class InvolvedMealFoodItemsRepository : RepositoryBase<InvolvedMealFoodItems>, IInvolvedMealFoodItemsRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public InvolvedMealFoodItemsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}


