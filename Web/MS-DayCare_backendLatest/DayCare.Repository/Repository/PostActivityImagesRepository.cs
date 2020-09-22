using DayCare.Data;
using DayCare.Entity.PostActivity;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class PostActivityImagesRepository : RepositoryBase<PostActivityImages>, IPostActivityImagesRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public PostActivityImagesRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

