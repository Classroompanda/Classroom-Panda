using DayCare.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace DayCare.Repository.IRepository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class, new()
    {
        private readonly DataContext _context;
        private DbSet<T> entities;
        public BaseRepository(DataContext context)
        {
            _context = context;
            entities = context.Set<T>();
        }
        #region get methods
        /// <summary>
        /// Gets the first entity found or default value.
        /// </summary>
        /// <param name="filter">Filter expression for filtering the entities.</param>
        /// <param name="include">Include for eager-loading.</param>
        /// <returns></returns>
        public virtual T GetFirstOrDefault(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] include)
        {
            IQueryable<T> dbQuery = SelectQuery(filter, include);
            return dbQuery.AsNoTracking().FirstOrDefault();
        }

        /// <summary>
        /// Fetch all records .
        /// </summary>
        /// <returns></returns>
        /// 
        public IQueryable<T> FetchAll()
        {
            return GetAll();
        }

        /// <summary>
        /// Method to get all records
        /// </summary>
        /// <returns></returns>
        public IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        /// <summary>
        /// Method to get all records that satisfy some condition
        /// </summary>
        /// <param name="exp"></param>
        /// <returns>record of Iqueryable type</returns>
        public IQueryable<T> GetAll(Expression<Func<T, bool>> exp)
        {
            return _context.Set<T>().Where(exp);
        }

        /// <summary>
        /// Method to get single record satisfying a condition
        /// </summary>
        /// <param name="exp"></param>
        /// <returns></returns>
        public T Get(Expression<Func<T, bool>> exp)
        {
            return _context.Set<T>().Where(exp).FirstOrDefault(); ;
        }

        /// <summary>
        /// Method to get record by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns a single Record of type T</returns>
        public virtual T GetByID(object id)
        {
            return CreateDbSet<T>().Find(id);
        }

        /// <summary>
        /// Method to create DbSet
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        protected DbSet<TEntity> CreateDbSet<TEntity>() where TEntity : class
        {
            return _context.Set<TEntity>();
        }

        /// <summary>
        /// // Get method and return IEnumerable
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="orderBy"></param>
        /// <param name="includeProperties"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
        {
            IQueryable<T> query = entities;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        #endregion

        #region Add and find by
        public void Add(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            _context.Set<T>().Add(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                EntityEntry dbEntityEntry = _context.Entry<T>(entity);
                _context.Set<T>().Add(entity);
            }
        }

        public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _context.Set<T>().Where(predicate);
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public bool isExist(Expression<Func<T, bool>> predicate)
        {
            var hasData = _context.Set<T>().Where(predicate).FirstOrDefault();
            if (hasData != null)
            {
                return true;
            }
            return false;
        }


        /// <summary>
        /// Creates the specified entity/entities.
        /// </summary>
        /// <param name="entity">Single entity.</param>
        /// <param name="entities">Multiple entities.</param>
        public virtual void Create(T entity, params T[] entities)
        {
            EntityState state = EntityState.Added;
            SetEntityState(state, entity, entities);
        }


        /// <summary>
        /// Creates the specified entity/entities.
        /// </summary>
        /// <param name="entities">Multiple entities.</param>
        public void Create(T[] entities)
        {
            EntityState state = EntityState.Added;
            SetEntityStateForArray(state, entities);
        }
        #endregion

        #region update
        /// <summary>
        /// Updates the specified entity/entities.
        /// </summary>
        /// <param name="entity">Single entity.</param>
        /// <param name="entities">Multiple entities.</param>
        public virtual void Update(T entity, params T[] entities)
        {
            EntityState state = EntityState.Modified;
            SetEntityState(state, entity, entities);
        }

        /// <summary>
        /// Updates the specified entity/entities.
        /// </summary>
        /// <param name="entities">Multiple entities.</param>
        public virtual void Update(T[] entities)
        {
            EntityState state = EntityState.Modified;
            SetEntityStateForArray(state, entities);
        }
        #endregion

        #region Delete
        /// <summary>
        /// Deletes the specified entity/entities.
        /// </summary>
        /// <param name="entity">Single entity.</param>
        /// <param name="entities">Multiple entities.</param>
        public virtual void Delete(T entity, params T[] entities)
        {
            EntityState state = EntityState.Deleted;
            SetEntityState(state, entity, entities);
        }

        /// <summary>
        /// Deletes the entity by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        public virtual void Delete(object id)
        {
            T entity = CreateDbSet<T>().Find(id);
            EntityState state = EntityState.Deleted;
            SetEntityState(state, entity);
        }

        /// <summary>
        /// Deletes multiple entities which are found using filter.
        /// </summary>
        /// <param name="filter">Filter expression for filtering the entities.</param>
        public virtual void Delete(Expression<Func<T, bool>> filter)
        {
            IQueryable<T> dbQuery = SelectQuery(filter);
            dbQuery.AsNoTracking().ToList().ForEach(item => _context.Entry(item).State = EntityState.Deleted);
        }
        #endregion

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing,
        /// or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Dispose method to dispose any unused instance
        /// </summary>
        /// <param name="disposing"></param>
        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_context != null)
                {
                    _context.Dispose();
                }
            }
        }

        /// <summary>
        /// Saves the changes to the database.
        /// </summary>
        /// <returns>Number of rows affected.</returns>
        public int SaveChanges()
        {
            int recordsAffected = _context.SaveChanges();
            //this.Dispose();  // uncommented by kundan for memeory release 
            return recordsAffected;
        }

        /// <summary>
        /// Finalizes an instance of the <see cref="RepositoryBase{T}"/> class.
        /// </summary>
        ~BaseRepository()
        {
            Dispose(false);
        }

        #region Private Methods
        private IQueryable<T> SelectQuery(Expression<Func<T, bool>> filter, Expression<Func<T, object>>[] include = null)
        {
            IQueryable<T> dbQuery = CreateDbSet<T>();

            if (filter != null)
            {
                dbQuery = dbQuery.Where(filter);
            }

            if (include != null)
            {
                dbQuery = include.Aggregate(dbQuery, (a, b) => a.Include(b));
            }
            return dbQuery;
        }

        private void SetEntityState(EntityState state, T entity, params T[] entities)
        {
            try
            {
                _context.Entry(entity).State = state;
                foreach (T item in entities)
                {
                    _context.Entry(item).State = state;
                }
            }
            catch (Exception)
            {
            }
        }

        private void SetEntityStateForArray(EntityState state, T[] entities)
        {
            try
            {
                foreach (T item in entities)
                {
                    _context.Entry(item).State = state;
                }
            }
            catch (Exception)
            {
            }
        }

        #endregion

        #region Stored Procedures Factory
        //When you expect a model back (async)
        public async Task<IList<T>> ExecWithStoreProcedureAsync(string query, params object[] parameters)
        {
            // EF 6
            //context.Database.SqlQuery<T>(query, parameters).ToListAsync();
            // EF Core
            return await entities.FromSql(query, parameters).ToListAsync();
        }

        //When you expect a model back
        public IEnumerable<T> ExecWithStoreProcedure(string query)
        {
            // EF 6
            //_context.Database.SqlQuery<T>(query);
            // EF Core
            return entities.FromSql(query);
        }

        //When you expect a model back
        public IEnumerable<T> ExecWithStoreProcedureWithParameters(string query, params object[] parameters)
        {
            // EF 6
            //_context.Database.SqlQuery<T>(query, parameters);
            // EF Core
            return entities.FromSql(query, parameters);
        }

        //When you expect a model back
        public T ExecWithStoreProcedureWithParametersForModel(string query, params object[] parameters)
        {
            // EF 6
            //IEnumerable<TResult> dbQuery = _context.Database.SqlQuery<TResult>(query, parameters);
            //return dbQuery.FirstOrDefault();
            // EF Core
            IEnumerable<T> dbQuery = entities.FromSql(query, parameters);
            return dbQuery.FirstOrDefault();
        }

        // Fire and forget (async)
        public async Task ExecuteWithStoreProcedureAsync(string query, params object[] parameters)
        {
            // EF 6
            //await _context.Database.ExecuteSqlCommandAsync(query, parameters);
            // EF Core
            await _context.Database.ExecuteSqlCommandAsync(query, default(CancellationToken), parameters);
        }

        // Fire and get no. of row inserted
        public int ExecuteWithStoreProcedure(string query, params object[] parameters)
        {
            return _context.Database.ExecuteSqlCommand(query, parameters);
        }
        #endregion
    }

    public class Handler<T> : IHandler<T> where T : class
    {
        private static DataContext _context;
        private static System.Data.Common.DbConnection connection;

        public Handler(DataContext context)
        {
            _context = context;
        }

        //, params object[] parameters
        public IEnumerable<T> ExecStoredProcedureListWithOutputForRolePermissions(string commandText, params object[] parameters)
        {
            connection = _context.Database.GetDbConnection();
            // T result=null;
            List<T> res = null;
            try
            {
                if (connection.State == ConnectionState.Closed) { connection.Open(); }
                using (var cmd = connection.CreateCommand())
                {
                    AddParametersToDbCommand(commandText, parameters, cmd);
                    using (var reader = cmd.ExecuteReader())
                    {
                        res = DataReaderMapToList<T>(reader).ToList();

                    }
                }
                return res;
            }
            finally
            {
                connection.Close();
            }
        }

        private static void AddParametersToDbCommand(string commandText, object[] parameters, System.Data.Common.DbCommand cmd)
        {
            cmd.CommandText = commandText;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 1000;
            if (parameters != null)
            {
                foreach (var p in parameters)
                {
                    if (p != null)
                    {
                        cmd.Parameters.Add(p);
                    }
                }
            }
        }

        public static IList<T> DataReaderMapToList<T>(IDataReader dr)
        {
            IList<T> list = new List<T>();
            T obj = default(T);
            while (dr.Read())
            {
                obj = Activator.CreateInstance<T>();
                foreach (PropertyInfo prop in obj.GetType().GetProperties())               //Solution - Check if property is there in the reader and then try to remove try catch code
                {
                    try
                    {
                        if (!object.Equals(dr[prop.Name], DBNull.Value))
                        {
                            prop.SetValue(obj, dr[prop.Name], null);
                        }
                    }
                    catch { continue; }
                }
                list.Add(obj);
            }
            return list;
        }

    }
}
