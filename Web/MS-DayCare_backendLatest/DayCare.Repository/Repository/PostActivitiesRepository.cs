using DayCare.Data;
using DayCare.Entity.PostActivity;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class PostActivitiesRepository : RepositoryBase<PostActivities>, IPostActivitiesRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public PostActivitiesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
