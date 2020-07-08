using DataAccessLayer.IRepositories;
using System;
using System.Data;

namespace DataAccessLayer.Repositories
{
    public class InvoicePaymentGenerateRepository : IInvoicePaymentGenerateRepository
    {
        public void InvoicePaymentGenerate()
        {
            try
            {
                string connectionstring = System.Configuration.ConfigurationManager.AppSettings["Connectionstring"];
                Npgsql.NpgsqlCommand cmd = new Npgsql.NpgsqlCommand();
                cmd.Connection = new Npgsql.NpgsqlConnection(connectionstring);
                cmd.CommandType = CommandType.StoredProcedure;

                // Create Paymet and Invoice for recurring billing using "invoice_generate" postgre function
                Npgsql.NpgsqlDataReader dr;
                cmd.CommandText = "invoice_generate";
                if (cmd.Connection.State == System.Data.ConnectionState.Closed)
                    cmd.Connection.Open();
                dr = cmd.ExecuteReader();
                dr.Close();
                cmd.CommandText = "";
                cmd.Connection.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
