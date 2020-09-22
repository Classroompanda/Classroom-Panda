using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ParentSignatureDetailsRepository : RepositoryBase<ParentSignatureDetails>, IParentSignatureDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ParentSignatureDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}
