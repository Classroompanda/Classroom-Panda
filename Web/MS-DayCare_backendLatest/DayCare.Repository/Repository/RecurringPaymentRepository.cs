using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class RecurringPaymentRepository : RepositoryBase<RecurringPayment>, IRecurringPaymentRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public RecurringPaymentRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}
