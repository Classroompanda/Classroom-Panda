using DayCare.Entity.User;
using DayCare.Model.Common;
using DayCare.Repository.Core;

namespace DayCare.Repository.IRepository
{
    public interface IUserRepository : IRepository<Users>
    {
        JsonModel UpdateAccessFailedCount(int userID, TokenModel tokenModel);
    }
}
