using DayCare.Entity.Agency;
using Stripe;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DayCare.Service.Service.Agency
{
    public class StripeCreateAccount
    {
        public void CreateStripeAccount(long currentUserId, dynamic stripeAccountVM)
        {
            StripeConfiguration.SetApiKey("");
            StripeOAuthTokenService service = new StripeOAuthTokenService("");
            //creates stripe account on stripe platform
            StripeOAuthToken response = service.Create(new StripeOAuthTokenCreateOptions()
            {
                Code = stripeAccountVM.Code,
                GrantType = "authorization_code",
            });

            StripeAccountService accountService = new StripeAccountService();
            StripeAccount account = accountService.Get(response.StripeUserId);

            StripeAccountUpdateOptions accountOptions = new StripeAccountUpdateOptions()
            {
                TransferScheduleInterval = "manual"
            };
            accountService.Update(response.StripeUserId, accountOptions);

            //create account record in our database if not exist

            StripeDetails stripeAccount = new StripeDetails
            {
                StripeUserId = response.StripeUserId,
                AccessToken = response.AccessToken,
                RefreshToken = response.RefreshToken,
                StripePublishableKey = response.StripePublishableKey,
                LiveMode = response.LiveMode,
                Scope = response.Scope,

                Email = account.Email,
                FirstName = account.DisplayName,
                LastName = account.LegalEntity?.LastName,

                //OwnerId = currentUserId,
                CreatedBy = currentUserId,
                IsDefault = true                  //not completed IsDefault logic
            };
        }
    }
}
