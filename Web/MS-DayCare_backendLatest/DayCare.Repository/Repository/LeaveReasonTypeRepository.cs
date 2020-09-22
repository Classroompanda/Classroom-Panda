
using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class LeaveReasonTypeRepository : RepositoryBase<LeaveReasonType>, ILeaveReasonTypeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public LeaveReasonTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}