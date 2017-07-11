using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.DataAccess.Services
{
    public abstract class BaseConsoleService
    {
        protected static IDao DataProvider
        {

            get { return Sabio.Data.DataProvider.Instance; }
        }

        protected static SqlConnection GetConnection()
        {
            string conn = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            return new System.Data.SqlClient.SqlConnection(conn);


        }
    }
}
