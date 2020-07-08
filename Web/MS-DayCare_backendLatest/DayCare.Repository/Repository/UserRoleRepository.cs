using DayCare.Repository.Core;
using DayCare.Entity.User;
using DayCare.Data;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{

    public class UserRoleRepository : RepositoryBase<UserRole>, IUserRoleRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public UserRoleRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
