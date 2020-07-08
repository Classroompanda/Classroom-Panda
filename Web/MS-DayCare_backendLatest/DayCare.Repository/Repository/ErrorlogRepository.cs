using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ErrorlogRepository : RepositoryBase<ErrorLog>, IErrorlogRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public ErrorlogRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
