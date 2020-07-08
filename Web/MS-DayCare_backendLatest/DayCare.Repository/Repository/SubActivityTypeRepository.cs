using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class SubActivityTypeRepository : RepositoryBase<SubActivityType>, ISubActivityTypeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public SubActivityTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}


