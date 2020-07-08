using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class PayementDetailsRepository : RepositoryBase<PayementDetails>, IPayementDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public PayementDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
