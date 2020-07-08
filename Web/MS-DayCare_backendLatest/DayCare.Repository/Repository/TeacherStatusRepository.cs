using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class TeacherStatusRepository : RepositoryBase<TeacherStatus>, ITeacherStatusRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public TeacherStatusRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
