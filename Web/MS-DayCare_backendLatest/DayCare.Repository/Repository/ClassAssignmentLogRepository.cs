using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ClassAssignmentLogRepository : RepositoryBase<ClassAssignmentLog>, IClassAssignmentLogRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public ClassAssignmentLogRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
