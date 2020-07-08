using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class ClassAttendenceRepository : RepositoryBase<ClassAttendence>, IClassAttendenceRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public ClassAttendenceRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
