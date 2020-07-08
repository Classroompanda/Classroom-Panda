using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.IRepository
{
    public class AgencySettingRepository : RepositoryBase<AgencySetting>, IAgencySettingRepository
    {

        #region Initialize DI
        private readonly DataContext _context;
        public AgencySettingRepository(DataContext context) : base(context)
        {
            this._context = context;
        }


        #endregion
    }
}