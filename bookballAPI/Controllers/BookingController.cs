using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using bookballAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using bookballAPI.Contexts;
using bookballAPI.Entities;
using Microsoft.AspNetCore.Authorization;

namespace bookballAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly bookballContext _context;
        public BookingController(bookballContext context)
        {
            _context = context;
        }

        // GET api/booking
        [HttpGet("")]
        public async Task<JObject> Get(int? page, int? size)
        {
            var query = _context.Booking.AsQueryable();
            dynamic data;

            var count = await _context.Booking.LongCountAsync();
            if (page.HasValue && size.HasValue)
            {
                var expression = (page - 1) * size ?? default(int);
                data = await query.Skip(expression).Take(Convert.ToInt32(size)).ToListAsync();
            }
            else
            {
                data = await _context.Booking.ToListAsync();
            }
            Console.Write("Bookingsss {0}", JArray.FromObject(data));

            var res = new JObject {
                new JProperty("count", count),
                new JProperty("data", JArray.FromObject(data))
            };
            return res;
        }

        // GET api/booking/5
        [HttpGet("{id}")]
        public ActionResult<Booking> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("Booking id must be higher than zero");
            }
            Booking booking = _context.Booking.FirstOrDefault(p => p.Id == id);

            if (booking == null)
            {
                return NotFound("Booking not found");
            }
            return Ok(booking);
        }

        // POST api/booking
        [HttpPost("")]
        public async Task<ActionResult<Booking>> Post([FromBody] Booking booking)
        {
            if (booking == null)
            {
                return NotFound("Booking data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Booking.AddAsync(booking);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Getbooking), new { id = booking.Id }, booking);
            return Ok(booking);
        }

        // PUT api/booking/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Booking booking)
        {
            if (booking == null)
            {
                return NotFound("Booking data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Booking selectedBooking = _context.Booking.FirstOrDefault(p => p.Id == booking.Id);
            if (selectedBooking == null)
            {
                return NotFound("Booking does not exist in the database");
            }
            selectedBooking.Price = booking.Price;
            _context.Attach(selectedBooking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(selectedBooking);
        }

        // DELETE api/booking/5
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
            Booking booking = _context.Booking.FirstOrDefault(p => p.Id == id);
            if (booking == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "Booking does not exist in the database")
                };
            }
            _context.Booking.Remove(booking);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "Booking does not exist in the database")
            };
        }
    }
}