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

namespace bookballAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TimeslotController : ControllerBase
    {
        private readonly bookballContext _context;
        public TimeslotController(bookballContext context)
        {
            _context = context;
        }

        // GET api/timeslot
        [HttpGet("")]
        public async Task<JObject> Get(int? page, int? size)
        {
            var query = _context.Timeslot.AsQueryable();
            dynamic data;

            var count = await _context.Timeslot.LongCountAsync();
            if (page.HasValue && size.HasValue)
            {
                var expression = (page - 1) * size ?? default(int);
                data = await query.Skip(expression).Take(Convert.ToInt32(size)).ToListAsync();
            }
            else
            {
                data = await _context.Timeslot.ToListAsync();
            }
            Console.Write("Timeslotsss {0}", JArray.FromObject(data));

            var res = new JObject {
                new JProperty("count", count),
                new JProperty("data", JArray.FromObject(data))
            };
            return res;
        }

        // GET api/timeslot/5
        [HttpGet("{id}")]
        public ActionResult<Timeslot> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("Timeslot id must be higher than zero");
            }
            Timeslot timeslot = _context.Timeslot.FirstOrDefault(p => p.Id == id);

            if (timeslot == null)
            {
                return NotFound("Timeslot not found");
            }
            return Ok(timeslot);
        }

        // POST api/timeslot
        [HttpPost("")]
        public async Task<ActionResult<Timeslot>> Post([FromBody] Timeslot timeslot)
        {
            if (timeslot == null)
            {
                return NotFound("Timeslot data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Timeslot.AddAsync(timeslot);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Gettimeslot), new { id = timeslot.Id }, timeslot);
            return Ok(timeslot);
        }

        // PUT api/timeslot/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Timeslot timeslot)
        {
            if (timeslot == null)
            {
                return NotFound("Timeslot data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Timeslot selectedTimeslot = _context.Timeslot.FirstOrDefault(p => p.Id == timeslot.Id);
            if (selectedTimeslot == null)
            {
                return NotFound("Timeslot does not exist in the database");
            }
            selectedTimeslot.Timeframe = timeslot.Timeframe;
            _context.Attach(selectedTimeslot).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(selectedTimeslot);
        }

        // DELETE api/timeslot/5
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
            Timeslot timeslot = _context.Timeslot.FirstOrDefault(p => p.Id == id);
            if (timeslot == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "Timeslot does not exist in the database")
                };
            }
            _context.Timeslot.Remove(timeslot);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "Timeslot does not exist in the database")
            };
        }
    }
}