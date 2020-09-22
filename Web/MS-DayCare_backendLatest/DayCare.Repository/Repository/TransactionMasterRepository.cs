using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class TransactionMasterRepository : RepositoryBase<TransactionMaster>, ITransactionMasterRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public TransactionMasterRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
