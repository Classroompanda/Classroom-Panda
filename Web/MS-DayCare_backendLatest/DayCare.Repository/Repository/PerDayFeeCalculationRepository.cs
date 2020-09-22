using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class PerDayFeeCalculationRepository : RepositoryBase<PerDayFeeCalculation>, IPerDayFeeCalculationRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public PerDayFeeCalculationRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
