using DayCare.Data;
using DayCare.Entity.Parent;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class GuardianRepository : RepositoryBase<Guardian>, IGuardianRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public GuardianRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
