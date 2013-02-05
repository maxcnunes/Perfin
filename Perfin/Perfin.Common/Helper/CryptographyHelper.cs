using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Common.Helper
{
    public class CryptographyHelper
    {
        internal CryptographyHelper() { }

        /// <summary>
        /// Hash algorithm enum
        /// </summary>
        public enum HashType : short
        {
            [DescriptionAttribute("SHA1CryptoServiceProvider")]
            SHA1 = 0,
            [DescriptionAttribute("SHA256Managed")]
            SHA256 = 1,
            [DescriptionAttribute("SHA384Managed")]
            SHA384 = 2,
            [DescriptionAttribute("SHA512Managed")]
            SHA512 = 3,
            [DescriptionAttribute("MD5CryptoServiceProvider")]
            MD5 = 4
        }


        /// <summary>
        /// Creates a random salt to add to a password.
        /// </summary>
        /// <returns></returns>
        public static string CreateSalt()
        {
            RandomNumberGenerator rng = RandomNumberGenerator.Create();
            byte[] number = new byte[32];
            rng.GetBytes(number);
            return Convert.ToBase64String(number);
        }

        /// <summary>
        /// Creates the password hash using a given HashType algoritm.
        /// </summary>
        /// <param name="salt">The salt.</param>
        /// <param name="password">The password.</param>
        /// <param name="hashType">Type of the hash.</param>
        /// <returns></returns>
        public static string CreatePasswordHash(string salt, string password, HashType hashType)
        {
            string hashString = string.Empty;
            if (!string.IsNullOrEmpty(password))
            {
                HashAlgorithm hashAlg = HashAlgorithm.Create(hashType.ToString());
                byte[] pwordData = Encoding.Default.GetBytes(salt + password);
                byte[] hash = hashAlg.ComputeHash(pwordData);
                hashString = Convert.ToBase64String(hash);
            }
            return hashString;
        }

        /// <summary>
        /// Creates the password hash using SHA256 managed hash algoritm.
        /// </summary>
        /// <param name="salt">The password salt.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public static string CreatePasswordHash(string salt, string password)
        {
            return CreatePasswordHash(salt, password, HashType.SHA256);
        }

        /// <summary>
        /// Encrypts the password.
        /// </summary>
        /// <param name="password">The password.</param>
        /// <param name="salt">The salt.</param>
        /// <returns></returns>
        public static string EncryptPassword(string password, out string salt)
        {
            salt = CreateSalt();
            return CreatePasswordHash(salt, password);
        }
    }
}
