using DayCare.Data;
using DayCare.Entity.Parent;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ParentRepository : RepositoryBase<Parent>, IParentRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public ParentRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

