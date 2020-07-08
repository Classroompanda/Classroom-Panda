using DayCare.Data;
using DayCare.Entity.PostActivity;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class UnApprovedImagesRepository : RepositoryBase<UnApprovedImages>, IUnApprovedImagesRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public UnApprovedImagesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}

