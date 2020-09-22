using DayCare.Data;
using DayCare.Entity.PostActivity;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;
namespace DayCare.Repository.IRepository
{
    public class PostImageslikeDetailsRepository : RepositoryBase<PostImageslikeDetails>, IPostImageslikeDetailsRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public PostImageslikeDetailsRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}
