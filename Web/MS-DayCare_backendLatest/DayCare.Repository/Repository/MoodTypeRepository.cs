using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class MoodTypeRepository : RepositoryBase<MoodType>, IMoodTypeRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public MoodTypeRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}

