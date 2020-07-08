using DayCare.Data;
using DayCare.Entity.Student;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class StudentActivityMealFoodItemsRepository : RepositoryBase<StudentActivityMealFoodItems>, IStudentActivityMealFoodItemsRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public StudentActivityMealFoodItemsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}
