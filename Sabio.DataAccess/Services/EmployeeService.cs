
using Sabio.DataAccess.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;//We must implement this using statement so that we can use the extension methods like GetSafeString
using Sabio.DataAccess.Domain;

namespace Sabio.DataAccess.Services
{
    public class EmployeeService : BaseConsoleService
    {
        public static int Insert(EmployeeAddRequest model)
        {
            int empId = 0;

            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Employees_Insert"
               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
               {
                   paramCollection.AddWithValue("@FirstName", model.FirstName);
                   paramCollection.AddWithValue("@LastName", model.LastName);

                   paramCollection.AddWithValue("@Email", model.Email);
                   paramCollection.AddWithValue("@JobTitle", model.JobTitle);
                   paramCollection.AddWithValue("@DOB", model.DOB);
                   paramCollection.AddWithValue("@Salary", model.Salary);


                   SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                   idParameter.Direction = System.Data.ParameterDirection.Output;

                   paramCollection.Add(idParameter);

               }, returnParameters: delegate (SqlParameterCollection param)
               {
                   Int32.TryParse(param["@Id"].Value.ToString(), out empId);
               }
               );


            return empId;
        }

        public static int InsertAlternative(EmployeeAddRequest model)
        {
            int empId = 0;

            Action<SqlParameterCollection> inputParamDelegate = delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@FirstName", model.FirstName);
                paramCollection.AddWithValue("@LastName", model.LastName);

                paramCollection.AddWithValue("@Email", model.Email);
                paramCollection.AddWithValue("@JobTitle", model.JobTitle);
                paramCollection.AddWithValue("@DOB", model.DOB);
                paramCollection.AddWithValue("@Salary", model.Salary);


                SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                idParameter.Direction = System.Data.ParameterDirection.Output;

                paramCollection.Add(idParameter);

            };

            Action<SqlParameterCollection> returnParamDelegate = delegate (SqlParameterCollection paramCollection)
            {
                Int32.TryParse(paramCollection["@Id"].Value.ToString(), out empId);

            };

            DataProvider.ExecuteNonQuery(GetConnection
                , "dbo.Employees_Insert"
               , inputParamDelegate
               , returnParamDelegate);


            return empId;
        }

        internal static Employee Get(int id)
        {
            Employee singleItem = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.Employees_SelectByID"
               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
               {
                   paramCollection.AddWithValue("@Id", id);
               }
               , singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   singleItem = new Employee();
                   int startingIndex = 0; //startingOrdinal

                   singleItem.Id = reader.GetSafeInt32(startingIndex++);
                   singleItem.FirstName = reader.GetSafeString(startingIndex++);
                   singleItem.LastName = reader.GetSafeString(startingIndex++);
                   singleItem.JobTitle = reader.GetSafeString(startingIndex++);
                   singleItem.Email = reader.GetSafeString(startingIndex++);

                   singleItem.DOB = reader.GetSafeDateTimeNullable(startingIndex++);
                   singleItem.Salary = reader.GetSafeInt32Nullable(startingIndex++);

               }
               );


            return singleItem;
        }

        internal static List<Employee> Get()
        {
            List<Employee> list = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.Employees_Select"
               , inputParamMapper: null
               , singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   Employee singleItem = new Employee();
                   int startingIndex = 0; //startingOrdinal

                   singleItem.Id = reader.GetSafeInt32(startingIndex++);
                   singleItem.FirstName = reader.GetSafeString(startingIndex++);
                   singleItem.LastName = reader.GetSafeString(startingIndex++);
                   singleItem.JobTitle = reader.GetSafeString(startingIndex++);
                   singleItem.Email = reader.GetSafeString(startingIndex++);

                   singleItem.DOB = reader.GetSafeDateTimeNullable(startingIndex++);
                   singleItem.Salary = reader.GetSafeInt32Nullable(startingIndex++);


                   if (list == null)
                   {
                       list = new List<Employee>();
                   }

                   list.Add(singleItem);
               }
               );


            return list;
        }

        internal static List<Employee> GetAlternative()
        {
            List<Employee> list = null;
            Action<IDataReader, short> singleRecMapper = delegate (IDataReader reader, short set)
             {
                 Employee singleItem = new Employee();
                 int startingIndex = 0; //startingOrdinal

                 singleItem.Id = reader.GetSafeInt32(startingIndex++);
                 singleItem.FirstName = reader.GetSafeString(startingIndex++);
                 singleItem.LastName = reader.GetSafeString(startingIndex++);
                 singleItem.JobTitle = reader.GetSafeString(startingIndex++);
                 singleItem.Email = reader.GetSafeString(startingIndex++);

                 singleItem.DOB = reader.GetSafeDateTimeNullable(startingIndex++);
                 singleItem.Salary = reader.GetSafeInt32Nullable(startingIndex++);


                 if (list == null)
                 {
                     list = new List<Employee>();
                 }

                 list.Add(singleItem);
             };

            Action<SqlParameterCollection> inputParamDelegate = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.Employees_Select", inputParamDelegate, singleRecMapper);


            return list;
        }
    }
}
