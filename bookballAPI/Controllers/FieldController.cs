using System.Linq;
using System.Threading.Tasks;
using bookballAPI.Common.Models;
using bookballAPI.Contexts;
using bookballAPI.Entities;
using bookballAPI.Helpers.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace bookballAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        private readonly bookballContext _context;
        public FieldController(bookballContext context)
        {
            _context = context;
        }

        // GET api/field
        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery] SearchModel model)
        {
            var query = _context.Field.AsQueryable();
            var result = query.ToPaging(model);

            return Ok(new ResultModel<dynamic>
            {
                data = result.data,
                paging = result.paging
            });
        }

        // GET api/field
        [HttpGet("of-pitch/{pitchId}")]
        public async Task<IActionResult> GetFieldOfPitch([FromQuery] SearchModel model, int pitchId)
        {
            var query = _context.Field.AsQueryable().Where(x => x.PitchId == pitchId);
            var result = query.ToPaging(model);

            return Ok(new ResultModel<dynamic>
            {
                data = result.data,
                paging = result.paging
            });
        }

        // GET api/field/5
        [HttpGet("GetById/{id}")]
        public ActionResult<Field> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("Field id must be higher than zero");
            }
            Field result = _context.Field.FirstOrDefault(x => x.Id == id);

            if (result == null)
            {
                return NotFound("Field not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("search")]
        public async Task<JObject> Search(int index, int size, string searchString = "")
        {
            var query = _context.Field.AsQueryable();
            if (!string.IsNullOrEmpty(searchString))
            {
                query = query.Where(x =>
                    x.Name.Contains(searchString)
                );
            }
            var total = await _context.Field.LongCountAsync();
            var data = await query.Skip((index - 1) * size).Take(size).ToListAsync();
            // return query.ToList();
            return new JObject {
                new JProperty("total", total),
                new JProperty("data", JArray.FromObject(data)),
            };
        }

        // POST api/field
        [HttpPost("")]
        public async Task<ActionResult<Field>> Post([FromBody] Field model)
        {
            if (model == null)
            {
                return NotFound("Field data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Field.AddAsync(model);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Getfield), new { id = field.Id }, field);
            return Ok(model);
        }

        // PUT api/field/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Field model)
        {
            if (model == null)
            {
                return NotFound("Field data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Field result = _context.Field.FirstOrDefault(p => p.Id == model.Id);
            if (result == null)
            {
                return NotFound("Field does not exist in the database");
            }
            result.Name = model.Name;
            _context.Attach(result).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(result);
        }

        // DELETE api/field/5
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
            Field result = _context.Field.FirstOrDefault(p => p.Id == id);
            if (result == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "Field does not exist in the database")
                };
            }
            _context.Field.Remove(result);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "Field deleted successfully in the database")
            };
        }
    }
}