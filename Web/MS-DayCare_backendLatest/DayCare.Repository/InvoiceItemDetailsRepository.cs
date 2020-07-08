using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository
{
    public class InvoiceItemDetailsRepository :  RepositoryBase<InvoiceItemDetails>, IInvoiceItemDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public InvoiceItemDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}
