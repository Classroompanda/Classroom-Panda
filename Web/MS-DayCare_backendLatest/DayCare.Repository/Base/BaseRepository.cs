using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;

namespace DayCare.Repository.Base
{
    public class BaseRepository : IBaseRepository
    {
        protected readonly IConfiguration Configuration;

        public BaseRepository(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// Returns first row of type T based on query parameter
        /// </summary>
        public async Task<T> GetFirstOrDefaultAsync<T>(string query, DynamicParameters parameter = null, CommandType? commandType = null)
        {
            T result = default(T);
            using (IDbConnection conn = GetConnection())
            {
                result = await conn.QueryFirstOrDefaultAsync<T>(query, parameter, null, null, commandType);
            }

            return result;
        }

        /// <summary>
        /// Returns a list of type T based on query parameter
        /// </summary>
        public async Task<IEnumerable<T>> GetAsync<T>(string query, DynamicParameters parameters = null, CommandType? commandType = null)
        {
            IEnumerable<T> result = default(IEnumerable<T>);
            using (IDbConnection conn = GetConnection())
            {
                result = await conn.QueryAsync<T>(query, parameters, null, null, commandType);
            }

            return result;
        }

        public async Task<int> AddAsync(string sql, DynamicParameters parameters = null, CommandType? commandType = null)
        {
            int result = 0;

            using (IDbConnection conn = GetConnection())
            {
                result = await conn.ExecuteAsync(sql, parameters, null, null, commandType);
            }

            return result;
        }

        private IDbConnection GetConnection()
        {
            string connectionString = Configuration.GetSection("ConnectionStrings").GetSection("DayCareConnection").Value;
            return new NpgsqlConnection(connectionString);
        }

        protected async Task DeleteAsync(string sql, object parameters = null, CommandType? commandType = null)
        {
            using (IDbConnection conn = GetConnection())
            {
                await conn.ExecuteAsync(sql, parameters, null, null, commandType);
            }
        }

        public async Task<SqlMapper.GridReader> QueryMultiple(string query, DynamicParameters parameters = null, CommandType? commandType = null)
        {
            SqlMapper.GridReader result;
            using (IDbConnection conn = GetConnection())
            {
                result = await conn.QueryMultipleAsync(query, parameters, null, null, commandType);
            }

            return result;
        }

        /// <summary>
        /// Returns a list of type T based on query parameter
        /// </summary>
        public async Task<IEnumerable<T>> GetAsyncList<T>(string query, DynamicParameters parameters = null, CommandType? commandType = null)
        {
            IEnumerable<T> result = default(IEnumerable<T>);
            using (IDbConnection conn = GetSqlConnection())
            {
                result = await conn.QueryAsync<T>(query, parameters, null, null, commandType);
            }

            return result;
        }

        private IDbConnection GetSqlConnection()
        {
            string connectionString = Configuration.GetSection("ConnectionString").Value;
            return new SqlConnection(connectionString);
        }
    }
}

