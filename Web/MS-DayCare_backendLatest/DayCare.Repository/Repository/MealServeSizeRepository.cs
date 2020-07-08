
using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class MealServeSizeRepository : RepositoryBase<MealServeSize>, IMealServeSizeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public MealServeSizeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
