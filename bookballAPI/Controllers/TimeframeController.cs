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
    public class TimeframeController : ControllerBase
    {
        private readonly bookballContext _context;
        public TimeframeController(bookballContext context)
        {
            _context = context;
        }

        // GET api/timeframe
        [HttpGet("")]
        public async Task<JObject> Get(int? page, int? size)
        {
            var query = _context.Timeframe.AsQueryable();
            dynamic data;

            var count = await _context.Timeframe.LongCountAsync();
            if (page.HasValue && size.HasValue)
            {
                var expression = (page - 1) * size ?? default(int);
                data = await query.Skip(expression).Take(Convert.ToInt32(size)).ToListAsync();
            }
            else
            {
                data = await _context.Timeframe.ToListAsync();
            }
            Console.Write("Timeframesss {0}", JArray.FromObject(data));

            var res = new JObject {
                new JProperty("count", count),
                new JProperty("data", JArray.FromObject(data))
            };
            return res;
        }

        // GET api/timeframe/5
        [HttpGet("{id}")]
        public ActionResult<Timeframe> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("Timeframe id must be higher than zero");
            }
            Timeframe result = _context.Timeframe.FirstOrDefault(x => x.Id == id);

            if (result == null)
            {
                return NotFound("Timeframe not found");
            }
            return Ok(result);
        }

        // POST api/timeframe
        [HttpPost("")]
        public async Task<ActionResult<Timeframe>> Post([FromBody] Timeframe model)
        {
            if (model == null)
            {
                return NotFound("Timeframe data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Timeframe.AddAsync(model);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Gettimeframe), new { id = timeframe.Id }, timeframe);
            return Ok(model);
        }

        // PUT api/timeframe/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Timeframe model)
        {
            if (model == null)
            {
                return NotFound("Timeframe data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Timeframe result = _context.Timeframe.FirstOrDefault(x => x.Id == model.Id);
            if (result == null)
            {
                return NotFound("Timeframe does not exist in the database");
            }
            result.TimeGroup = model.TimeGroup;
            _context.Attach(result).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(result);
        }

        // DELETE api/timeframe/5
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
            Timeframe result = _context.Timeframe.FirstOrDefault(x => x.Id == id);
            if (result == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "Timeframe does not exist in the database")
                };
            }
            _context.Timeframe.Remove(result);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "Timeframe does not exist in the database")
            };
        }
    }
}