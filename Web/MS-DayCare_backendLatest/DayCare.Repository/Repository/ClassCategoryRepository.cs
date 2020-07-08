using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;


namespace DayCare.Repository.IRepository
{
    public class ClassCategoryRepository : RepositoryBase<ClassCategory>, IClassCategoryRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public ClassCategoryRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
