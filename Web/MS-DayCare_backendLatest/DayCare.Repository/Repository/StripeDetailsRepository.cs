using DayCare.Data;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
using DayCare.Entity.Agency;
namespace DayCare.Repository.IRepository
{
    public class StripeDetailsRepository : RepositoryBase<StripeDetails>, IStripeDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public StripeDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
