using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.DataAccess.Models.Requests
{
    public class EmployeeAddRequest
    {
     

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string JobTitle { get; set; }

        public DateTime? DOB { get; set; }

        public int? Salary { get; set; }
    }
}
