using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Repository.Core;
using DayCare.Repository.IRepository;

namespace DayCare.Repository.Repository
{
    public class NotificationSoundSettingRepository : RepositoryBase<NotificationSoundSetting>, INotificationSoundSettingRepository
    {
        #region Initialize DI
        private readonly DataContext _context;
        public NotificationSoundSettingRepository(DataContext context) : base(context)
        {
            this._context = context;
        }
        #endregion
    }
}


