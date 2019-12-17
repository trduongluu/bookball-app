using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using bookballAPI.Models;
using bookballAPI.Models.Users;
using bookballAPI.Entities;

namespace bookballAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TempUserController : ControllerBase
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _singInManager;

        public TempUserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _singInManager = signInManager;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(RegisterModel model)
        {
            var applicationUser = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}