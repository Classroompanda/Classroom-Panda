using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ActivityTypeRepository : RepositoryBase<ActivityType>, IActivityTypeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public ActivityTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
