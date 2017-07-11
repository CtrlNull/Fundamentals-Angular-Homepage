
using Sabio.DataAccess.Domain;
using Sabio.DataAccess.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.DataAccess
{
    class Program
    {

        static void Main(string[] args)
        {
            string conn = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            bool isConnected = IsServerConnected(conn);
            Console.WriteLine("DB isConnected = {0}", isConnected);

            Sabio.DataAccess.Models.Requests.EmployeeAddRequest addReq = new Models.Requests.EmployeeAddRequest();

            addReq.DOB = DateTime.Now.AddYears(-25);
            addReq.Email = "twoEmails@gmail.com";
            addReq.FirstName = "Useremployee";
            addReq.LastName = "LastOfName";
            addReq.Salary = 1000000;
            addReq.JobTitle = "Developer";

            int newId = EmployeeService.Insert(addReq);

            List<Employee> emps = EmployeeService.Get();

            Employee existingEmp = EmployeeService.Get(1001);

            Employee empJustCreated = EmployeeService.Get(newId);

            Console.ReadLine();

        }


        private static bool IsServerConnected(string connectionString)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    return true;
                }
                catch (SqlException ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
        }


        
    }
}
