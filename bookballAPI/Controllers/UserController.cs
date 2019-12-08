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
        public UserController(
            bookballContext context,
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
            )
        {
            _context = context;
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
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
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
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
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<Entities.User>(model);

            try
            {
                // create user
                _userService.Create(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
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

        // POST api/user
        // [HttpPost("")]
        // public async Task<ActionResult<User>> Post([FromBody] User user)
        // {
        //     if (user == null)
        //     {
        //         return NotFound("User data is not supplied");
        //     }
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }
        //     await _context.User.AddAsync(user);
        //     await _context.SaveChangesAsync();
        //     // return CreatedAtAction(nameof(Getuser), new { id = user.Id }, user);
        //     return Ok(user);
        // }

        // PUT api/user/5
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]UpdateModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<Entities.User>(model);
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