using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using bookballAPI.Contexts;
using bookballAPI.Entities;
using bookballAPI.Helpers;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace bookballAPI.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(string id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(string id);
    }
    public class UserService : IUserService
    {
        private bookballContext _context;

        public UserService(bookballContext context)
        {
            _context = context;
        }
        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.User.SingleOrDefault(x => x.UserName == username);

            // check if username exists
            if (user == null) return null;

            // check if password is correct
            var passHash = Convert.FromBase64String(user.PasswordHash);
            if (!VerifyPasswordHash(password, passHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.User;
        }

        public User GetById(string id)
        {
            return _context.User.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.User.Any(x => x.UserName == user.UserName))
                throw new AppException("Username " + user.UserName + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = Convert.ToBase64String(passwordHash);
            user.PasswordSalt = passwordSalt;

            _context.User.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.User.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.UserName) && userParam.UserName != user.UserName)
            {
                // throw error if the new username is already taken
                if (_context.User.Any(x => x.UserName == userParam.UserName))
                    throw new AppException("Username " + userParam.UserName + " is already taken");

                user.UserName = userParam.UserName;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash.ToString();
                user.PasswordSalt = passwordSalt;
            }

            _context.User.Update(user);
            _context.SaveChanges();
        }

        public void Delete(string id)
        {
            var user = _context.User.Find(id);
            if (user != null)
            {
                _context.User.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}