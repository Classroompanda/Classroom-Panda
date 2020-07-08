using CoreEntities.Models;
using DataAccessLayer.IRepositories;
using Stripe;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace DataAccessLayer.Repositories
{
    public class ACHPaymentGenerateRepository : IACHPaymentGenerateRepository
    {
        [Obsolete]
        public void ACHPaymentGenerate()
        {
            try
            {
                List<ACHPaymentViewModel> achPayModel = new List<ACHPaymentViewModel>();
                string connectionstring = System.Configuration.ConfigurationManager.AppSettings["Connectionstring"];
                Npgsql.NpgsqlCommand cmd = new Npgsql.NpgsqlCommand();
                cmd.Connection = new Npgsql.NpgsqlConnection(connectionstring);
                cmd.CommandType = CommandType.StoredProcedure;

                // Getting Recurring Payment details from RecurringPayment Table using "recurringpayment" function
                Npgsql.NpgsqlDataReader dataReader;
                cmd.CommandText = "recurringpayment";
                if (cmd.Connection.State == System.Data.ConnectionState.Closed)
                    cmd.Connection.Open();
                dataReader = cmd.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        ACHPaymentViewModel achpay = new ACHPaymentViewModel();
                        achpay.RecurringPaymentID = Convert.ToInt32(dataReader["recurringpaymentid"]);
                        achpay.AgencyID = Convert.ToInt32(dataReader["agencyid"]);
                        achpay.ParentID = Convert.ToInt32(dataReader["parentid"]);
                        achpay.StudentID = Convert.ToInt32(dataReader["studentid"]);
                        achpay.Amount = Convert.ToInt32(dataReader["amount"]);
                        achpay.CustomerID = Convert.ToString(dataReader["customerid"]);
                        achpay.AgencyApiKey = Convert.ToString(dataReader["agencyapikey"]);
                        achpay.PaymentComment = Convert.ToString(dataReader["paymentcomment"]);
                        achPayModel.Add(achpay);
                    }
                }
                dataReader.Close();
                cmd.CommandText = "";
                cmd.Connection.Close();
                var result = achPayModel.ToList();

                if (result.Count != 0)
                {
                    foreach (var r in result)
                    {
                        try
                        {
                            // Createting Charge using ACH account information
                            StripeConfiguration.SetApiKey(r.AgencyApiKey);
                            var bankchargeoption = new ChargeCreateOptions
                            {
                                Amount = r.Amount * 100, // Amount in cent*100
                                Currency = "usd",        // Curreny
                                Customer = r.CustomerID, // CustomerID
                            };
                            var bankchargeservice = new ChargeService();
                            var bankcharge = bankchargeservice.Create(bankchargeoption);

                            // Save Charge in Payement Table Using payment_generate_using_ach function
                            Npgsql.NpgsqlCommand cmmd = new Npgsql.NpgsqlCommand();
                            cmmd.Connection = new Npgsql.NpgsqlConnection(connectionstring);
                            cmmd.CommandType = CommandType.StoredProcedure;

                            Npgsql.NpgsqlDataReader dataReaderr;
                            cmmd.CommandText = "payment_generate_using_ach";
                            if (cmmd.Connection.State == System.Data.ConnectionState.Closed)
                                cmmd.Connection.Open();

                            cmmd.Parameters.AddWithValue("agencyid", r.AgencyID);   // AgencyID
                            cmmd.Parameters.AddWithValue("parentid", r.ParentID);   // ParentID
                            cmmd.Parameters.AddWithValue("studentid", r.StudentID); // StudentID
                            cmmd.Parameters.AddWithValue("amount", r.Amount);       // Amount
                            cmmd.Parameters.AddWithValue("paymentcomment", r.PaymentComment);     // PaymentComment
                            dataReaderr = cmmd.ExecuteReader();
                            dataReaderr.Close();
                            cmmd.CommandText = "";
                            cmmd.Connection.Close();
                        }
                        catch (Exception ex)
                        {
                            var exception = ex;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
