using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace DayCare.Repository.Base
{
    public interface IBaseRepository
    {
        Task<T> GetFirstOrDefaultAsync<T>(string query, DynamicParameters parameter = null, CommandType? commandType = null);

        Task<IEnumerable<T>> GetAsync<T>(string query, DynamicParameters parameters = null, CommandType? commandType = null);
        //Task<ResponseViewModal> GetBalanceAccordingToParentAsync(ReportViewModel getLedgerReportRequest);
    }
}
