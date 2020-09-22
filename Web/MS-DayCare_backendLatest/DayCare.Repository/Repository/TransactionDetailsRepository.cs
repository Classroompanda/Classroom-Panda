using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class TransactionDetailsRepository : RepositoryBase<TransactionDetails>, ITransactionDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public TransactionDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
