using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class PlannerRepeatTypeRepository : RepositoryBase<PlannerRepeatType>, IPlannerRepeatTypeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public PlannerRepeatTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
