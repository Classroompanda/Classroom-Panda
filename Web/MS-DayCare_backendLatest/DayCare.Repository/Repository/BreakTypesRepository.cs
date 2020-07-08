using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class BreakTypesRepository : RepositoryBase<BreakTypes>, IBreakTypesRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public BreakTypesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
