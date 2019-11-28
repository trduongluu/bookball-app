using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using bookballAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace bookballAPI.Controllers
{
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
        public async Task<JObject> Getbooking()
        {
            var bookings = await _context.Booking.ToListAsync();
            var res = new JObject {
                new JProperty("data", bookings)
            };
            return res;
        }

        // GET api/booking/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetbookingById(int id)
        {
            var booking = await _context.Booking.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return booking;
        }

        // POST api/booking
        [HttpPost("")]
        public async Task<ActionResult<Booking>> Postbooking(Booking booking)
        {
            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Getbooking), new { id = booking.Id }, booking);
        }

        // PUT api/booking/5
        [HttpPut("{id}")]
        public void Putstring(int id, string value)
        {
        }

        // DELETE api/booking/5
        [HttpDelete("{id}")]
        public void DeletestringById(int id)
        {
        }
    }
}