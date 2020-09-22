using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class CouponRepository : RepositoryBase<Coupon>, ICouponRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public CouponRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}


