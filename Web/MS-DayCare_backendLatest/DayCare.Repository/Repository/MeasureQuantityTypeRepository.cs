using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class MeasureQuantityTypeRepository : RepositoryBase<MeasureQuantityType>, IMeasureQuantityTypeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public MeasureQuantityTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

