using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using bookballAPI.Models;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using bookballAPI.Contexts;
using bookballAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using bookballAPI.Common.Models;
using bookballAPI.Helpers.Extensions;

namespace bookballAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PitchController : ControllerBase
    {
        private readonly bookballContext _context;
        public PitchController(bookballContext context)
        {
            _context = context;
        }

        // GET api/pitch
        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery] SearchModel model)
        {
            var query = _context.Pitch.AsQueryable();
            var result = query.ToPaging(model);

            return Ok(new ResultModel<dynamic>
            {
                data = result.data,
                paging = result.paging
            });
        }

        // GET api/pitch/5
        [HttpGet("GetById/{id}")]
        public ActionResult<Pitch> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("Pitch id must be higher than zero");
            }
            Pitch result = _context.Pitch.FirstOrDefault(p => p.Id == id);

            if (result == null)
            {
                return NotFound("Pitch not found");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("search")]
        public async Task<JObject> Search(int index, int size, string searchString = "")
        {
            var query = _context.Pitch.AsQueryable();
            if (!string.IsNullOrEmpty(searchString))
            {
                query = query.Where(x =>
                    x.Name.Contains(searchString) ||
                    x.Address.Contains(searchString)
                );
            }
            var total = await _context.Pitch.LongCountAsync();
            var data = await query.Skip((index - 1) * size).Take(size).ToListAsync();
            // return query.ToList();
            return new JObject {
                new JProperty("total", total),
                new JProperty("data", JArray.FromObject(data)),
            };
        }

        // POST api/pitch
        [HttpPost("")]
        public async Task<ActionResult<Pitch>> Post([FromBody] Pitch model)
        {
            if (model == null)
            {
                return NotFound("Pitch data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Pitch.AddAsync(model);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Getpitch), new { id = pitch.Id }, pitch);
            return Ok(model);
        }

        // PUT api/pitch/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Pitch model)
        {
            if (model == null)
            {
                return NotFound("Pitch data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Pitch result = _context.Pitch.FirstOrDefault(p => p.Id == model.Id);
            if (result == null)
            {
                return NotFound("Pitch does not exist in the database");
            }
            result.Name = model.Name;
            result.Address = model.Address;
            _context.Attach(result).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(result);
        }

        // DELETE api/pitch/5
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
            Pitch result = _context.Pitch.FirstOrDefault(x => x.Id == id);
            if (result == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "Pitch does not exist in the database")
                };
            }
            _context.Pitch.Remove(result);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "Pitch deleted successfully in the database")
            };
        }
    }
}