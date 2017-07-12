using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.DataAccess.Domain
{
    public class Employee
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string JobTitle { get; set; }

        public DateTime? DOB { get; set; }

        public int? Salary { get; set; }

    }
}
