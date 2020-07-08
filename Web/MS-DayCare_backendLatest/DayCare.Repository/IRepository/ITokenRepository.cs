using DayCare.Entity.User;
using DayCare.Entity.Masters;

namespace DayCare.Repository.IRepository
{
    public interface ITokenRepository
    {
        Users GetUserByUserName(string userName);
        Users GetUserByEmailAddress(string EmailAddress);
        int GetOrganizationIDByName(string businessName);

        Users GetUserByQuickPin(string QuickPin);
        Users GetUserByQuickPinAndAgency(string QuickPin, long AgenctID);
        AuthorizedPerson GetAuthorizedPersonLoginByQuickPin(string QuickPin);
        AuthorizedPerson GetAuthorizedPersonLoginByQuickPinAndAgency(string QuickPin, long AgencyID);
    }
}
