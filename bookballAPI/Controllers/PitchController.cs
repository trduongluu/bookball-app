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

namespace bookballAPI.Controllers
{
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
        public async Task<JObject> Get(int? page, int? size)
        {
            var query = _context.Pitch.AsQueryable();
            dynamic data;

            var count = await _context.Pitch.LongCountAsync();
            if (page.HasValue && size.HasValue)
            {
                var expression = (page - 1) * size ?? default(int);
                data = await query.Skip(expression).Take(Convert.ToInt32(size)).ToListAsync();
            }
            else
            {
                data = await _context.Pitch.ToListAsync();
            }
            Console.Write("Pitchsss {0}", JArray.FromObject(data));

            var res = new JObject {
                new JProperty("count", count),
                new JProperty("data", JArray.FromObject(data))
            };
            return res;
        }

        // GET api/pitch/5
        [HttpGet("{id}")]
        public ActionResult<Pitch> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("Pitch id must be higher than zero");
            }
            Pitch pitch = _context.Pitch.FirstOrDefault(p => p.Id == id);

            if (pitch == null)
            {
                return NotFound("Pitch not found");
            }
            return Ok(pitch);
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
        public async Task<ActionResult<Pitch>> Post([FromBody] Pitch pitch)
        {
            if (pitch == null)
            {
                return NotFound("Pitch data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Pitch.AddAsync(pitch);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Getpitch), new { id = pitch.Id }, pitch);
            return Ok(pitch);
        }

        // PUT api/pitch/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Pitch pitch)
        {
            if (pitch == null)
            {
                return NotFound("Pitch data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Pitch selectedPitch = _context.Pitch.FirstOrDefault(p => p.Id == pitch.Id);
            if (selectedPitch == null)
            {
                return NotFound("Pitch does not exist in the database");
            }
            selectedPitch.Name = pitch.Name;
            selectedPitch.Address = pitch.Address;
            _context.Attach(selectedPitch).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(selectedPitch);
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
            Pitch pitch = _context.Pitch.FirstOrDefault(p => p.Id == id);
            if (pitch == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "Pitch does not exist in the database")
                };
            }
            _context.Pitch.Remove(pitch);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "Pitch deleted successfully in the database")
            };
        }
    }
}