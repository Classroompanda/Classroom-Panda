using DayCare.Entity.User;
using DayCare.Entity.Masters;

namespace DayCare.Service.Token
{
    public interface ITokenService 
    {
        Users GetUserByUserName(string userName);
        Users GetUserByEmailAddress(string EmailAddress);
        long GetOrganizationIDByName(string businessName);

        Users GetUserByQuickPin(string QuickPin);
        Users GetUserByQuickPinAndAgency(string QuickPin, long AgencyID);
        AuthorizedPerson GetAuthorizedPersonLoginByQuickPin(string QuickPin);
        AuthorizedPerson GetAuthorizedPersonLoginByQuickPinAndAgency(string QuickPin, long AgencyID);
        
    }
}
