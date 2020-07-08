using DayCare.Data;
using DayCare.Entity.PostActivity;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
namespace DayCare.Repository.IRepository
{
    public class PostVideolikeDetailsRepository : RepositoryBase<PostVideolikeDetails>, IPostVideolikeDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public PostVideolikeDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
