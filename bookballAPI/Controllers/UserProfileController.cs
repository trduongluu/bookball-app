using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using bookballAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
//using bookballAPI.Models;

namespace bookballAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<User> _userManager;

        public UserProfileController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        // GET api/userprofile
        [HttpGet]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == ClaimTypes.Name).Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.UserName
            };
        }

        // // GET api/userprofile/5
        // [HttpGet("{id}")]
        // public ActionResult<string> GetstringById(int id)
        // {
        //     return null;
        // }

        // // POST api/userprofile
        // [HttpPost("")]
        // public void Poststring(string value)
        // {
        // }

        // // PUT api/userprofile/5
        // [HttpPut("{id}")]
        // public void Putstring(int id, string value)
        // {
        // }

        // // DELETE api/userprofile/5
        // [HttpDelete("{id}")]
        // public void DeletestringById(int id)
        // {
        // }
    }
}