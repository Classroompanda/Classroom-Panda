using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class StudentAgeCategoriesRepository : RepositoryBase<StudentAgeCategories>, IStudentAgeCategoriesRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentAgeCategoriesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}