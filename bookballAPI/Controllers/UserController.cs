using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using bookballAPI.Models;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using bookballAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace bookballAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly bookballContext _context;
        private IUserService _userService;
        public UserController(bookballContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
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
            return Ok(user);
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
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
        public ActionResult<User> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("User id must be higher than zero");
            }
            User user = _context.User.FirstOrDefault(p => p.Id == id);

            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

        // POST api/user
        [HttpPost("")]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            if (user == null)
            {
                return NotFound("User data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Getuser), new { id = user.Id }, user);
            return Ok(user);
        }

        // PUT api/user/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] User user)
        {
            if (user == null)
            {
                return NotFound("User data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User selectedUser = _context.User.FirstOrDefault(p => p.Id == user.Id);
            if (selectedUser == null)
            {
                return NotFound("User does not exist in the database");
            }
            selectedUser.Username = user.Username;
            selectedUser.Password = user.Password;
            _context.Attach(selectedUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(selectedUser);
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public async Task<JObject> Delete(int id)
        {
            if (id.Equals(null))
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "No id supplied")
                };
            }
            User user = _context.User.FirstOrDefault(p => p.Id == id);
            if (user == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "User does not exist in the database")
                };
            }
            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "User does not exist in the database")
            };
        }
    }
}