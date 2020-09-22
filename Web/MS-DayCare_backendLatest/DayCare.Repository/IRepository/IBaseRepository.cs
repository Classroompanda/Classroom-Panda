using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DayCare.Repository.IRepository
{
    public interface IBaseRepository<T> : IDisposable where T : class
    {
        T GetFirstOrDefault(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] include);
        IQueryable<T> FetchAll();
        IQueryable<T> GetAll();
        IQueryable<T> GetAll(Expression<Func<T, bool>> exp);
        T Get(Expression<Func<T, bool>> exp);
        T GetByID(object id);
        IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "");
        void Add(T entity);
        void AddRange(IEnumerable<T> entities);
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        bool isExist(Expression<Func<T, bool>> predicate);
        void Create(T entity, params T[] entities);
        void Create(T[] entities);
        void Update(T entity, params T[] entities);
        void Update(T[] entities);
        void Delete(T entity, params T[] entities);
        void Delete(object id);
        void Delete(Expression<Func<T, bool>> filter);
        int SaveChanges();

        #region StoredProceduresFactory
        Task<IList<T>> ExecWithStoreProcedureAsync(string query, params object[] parameters);
        IEnumerable<T> ExecWithStoreProcedure(string query);
        IEnumerable<T> ExecWithStoreProcedureWithParameters(string query, params object[] parameters);
        T ExecWithStoreProcedureWithParametersForModel(string query, params object[] parameters);
        Task ExecuteWithStoreProcedureAsync(string query, params object[] parameters);
        int ExecuteWithStoreProcedure(string query, params object[] parameters);
        #endregion
    }

    public interface IHandler<T>
    {
        IEnumerable<T> ExecStoredProcedureListWithOutputForRolePermissions(string query, params object[] parameters);
    }
}
