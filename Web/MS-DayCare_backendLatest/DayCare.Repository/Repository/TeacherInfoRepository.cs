using DayCare.Data;
using DayCare.Entity.Teachers;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class TeacherInfoRepository : RepositoryBase<TeacherInfo>, ITeacherInfoRepository

    {

        #region Initialize DI
        private readonly DataContext _context;
        public TeacherInfoRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

