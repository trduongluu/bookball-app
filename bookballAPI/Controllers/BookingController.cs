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
using System.Security.Claims;
using bookballAPI.Common.Models;
using bookballAPI.Helpers.Extensions;
using bookballAPI.Models.Bookings;
using AutoMapper;
using bookballAPI.Common.Enums;

namespace bookballAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly bookballContext _context;
        private IMapper _mapper;
        public BookingController(bookballContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET api/booking
        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery] SearchModel model)
        {
            var query = _context.Booking.AsQueryable();
            var result = query.ToPaging(model);

            return Ok(new ResultModel<dynamic>
            {
                data = result.data,
                paging = result.paging
            });
        }

        // GET api/booking
        [HttpGet("user-bookings")]
        public async Task<IActionResult> GetUserBookings([FromQuery] SearchModel model)
        {
            string userId = User.Claims.First(c => c.Type == ClaimTypes.Name).Value;

            var query =
            (
                from booking in _context.Booking
                join field in _context.Field on booking.FieldId equals field.Id
                join pitch in _context.Pitch on field.PitchId equals pitch.Id
                where booking.UserId == userId
                select new
                {
                    booking,
                    fieldName = field.Name,
                    pitchName = pitch.Name
                }
            )
            // _context.Booking
            // .Join(_context.Field, booking => booking.FieldId, field => field.Id, (booking, field) => new {booking, field})
            // .Where(x => x.booking.UserId == userId)
            // .Join(_context.Pitch, fb => fb.field.PitchId, pitch => pitch.Id, (fb, pitch) => new {
            //     fb.booking,
            //     fieldName = fb.field.Name,
            //     pitchName = pitch.Name
            // })
            .AsQueryable();

            var result = query.ToPaging(model);

            return Ok(new ResultModel<dynamic>
            {
                data = result.data,
                paging = result.paging
            });
        }

        // GET api/booking/5
        [HttpGet("{id}")]
        public ActionResult<Booking> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("Booking id must be higher than zero");
            }
            Booking result = _context.Booking.FirstOrDefault(x => x.Id == id);

            if (result == null)
            {
                return NotFound("Booking not found");
            }
            return Ok(result);
        }

        // POST api/booking
        [HttpPost("")]
        public async Task<ActionResult<Booking>> Post([FromBody] Booking model)
        {
            if (model == null)
            {
                return NotFound("Booking data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.Booking.AddAsync(model);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(Getbooking), new { id = booking.Id }, booking);
            return Ok(model);
        }

        // POST api/booking
        [HttpPost("user-book")]
        public async Task<ActionResult<Booking>> PostUserBooking([FromBody] UserBookingModel model)
        {
            string userId = User.Claims.First(c => c.Type == ClaimTypes.Name).Value;
            var booking = new Booking()
            {
                UserId = userId,
                FieldId = model.FieldId,
                TimeSlot = model.TimeSlot,
                Day = model.Day,
                Price = model.Price,
                Paid = model.Paid,
                Status = (short)BookingStatus.Waiting
            };
            if (model == null)
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
        public async Task<ActionResult> Put([FromBody] Booking model)
        {
            if (model == null)
            {
                return NotFound("Booking data is not supplied");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Booking result = _context.Booking.FirstOrDefault(x => x.Id == model.Id);
            if (result == null)
            {
                return NotFound("Booking does not exist in the database");
            }
            result.Price = model.Price;
            _context.Attach(result).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(result);
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
            Booking result = _context.Booking.FirstOrDefault(x => x.Id == id);
            if (result == null)
            {
                return new JObject {
                    new JProperty("success", false),
                    new JProperty("message", "Booking does not exist in the database")
                };
            }
            _context.Booking.Remove(result);
            await _context.SaveChangesAsync();
            return new JObject {
                new JProperty("success", true),
                new JProperty("message", "Booking does not exist in the database")
            };
        }
    }
}