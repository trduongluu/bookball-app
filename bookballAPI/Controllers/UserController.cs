using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
// using bookballAPI.Models;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using bookballAPI.Services;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using bookballAPI.Helpers;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using bookballAPI.Entities;
using bookballAPI.Models;
using bookballAPI.Models.Users;
using bookballAPI.Contexts;
using Microsoft.AspNetCore.Identity;

namespace bookballAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly bookballContext _context;
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private UserManager<User> _userManager;
        private SignInManager<User> _singInManager;
        public UserController(
            bookballContext context,
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            UserManager<User> userManager, SignInManager<User> signInManager
            )
        {
            _context = context;
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _userManager = userManager;
            _singInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {

            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.JWT_Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody]AuthenticateModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.JWT_Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new
                {
                    Id = user.Id,
                    Username = user.Username,
                    Token = tokenString
                });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult RegisterAsync([FromBody]RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<User>(model);

            try
            {
                // create user
                var createdUser = _userService.Create(user, model.Password);
                // var result = await _userManager.CreateAsync(user, model.Password);
                return Ok(new
                {
                    Id = createdUser.Id,
                    Username = createdUser.Username,
                    FirstName = createdUser.FirstName,
                    LastName = createdUser.LastName,
                    Email = createdUser.Email,
                });
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("RegisterASP")]
        public async Task<Object> PostApplicationUser([FromBody]RegisterModel model)
        {
            var user = new User()
            {
                UserName = model.Username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var model = _mapper.Map<IList<UserModel>>(users);
            return Ok(model);
        }

        // GET api/user
        [HttpGet("")]
        public async Task<JObject> Get(int? page, int? size)
        {
            var query = _context.User.AsQueryable();
            dynamic data;

            var count = await _context.User.LongCountAsync();
            if (page.HasValue && size.HasValue)
            {
                var expression = (page - 1) * size ?? default(int);
                data = await query.Skip(expression).Take(Convert.ToInt32(size)).ToListAsync();
            }
            else
            {
                data = await _context.User.ToListAsync();
            }
            Console.Write("Usersss {0}", JArray.FromObject(data));

            var res = new JObject {
                new JProperty("count", count),
                new JProperty("data", JArray.FromObject(data))
            };
            return res;
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user = _userService.GetById(id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var model = _mapper.Map<UserModel>(user);
            return Ok(model);
        }

        // PUT api/user/5
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]UpdateModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update user 
                _userService.Update(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIdentityAsync(string id, [FromBody]UpdateModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update user 
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public JObject Delete(string id)
        {
            if (id.Equals(null))
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "No id supplied")
                };
            }
            _userService.Delete(id);
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "User does not exist in the database")
            };
        }
    }
}