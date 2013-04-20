namespace Perfin.UI.Web
{
    using Microsoft.IdentityModel.Tokens.JWT;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.ServiceModel.Security.Tokens;
    using System.Threading;
    using System.Threading.Tasks;

    public class JsonWebTokenValidationHandler : DelegatingHandler
    {
        public string SymmetricKey { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }

        private static bool TryRetrieveToken(HttpRequestMessage request, out string token)
        {
            token = null;
            IEnumerable<string> authzHeaders;
            if (!request.Headers.TryGetValues("Authorization", out authzHeaders) || authzHeaders.Count() > 1)
            {
                // Fail if no Authorization header or more than one Authorization headers  
                // are found in the HTTP request  
                return false;
            }

            // Remove the bearer token scheme prefix and return the rest as ACS token  
            var bearerToken = authzHeaders.ElementAt(0);
            token = bearerToken.StartsWith("Bearer ") ? bearerToken.Substring(7) : bearerToken;
            return true;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            HttpStatusCode statusCode;
            string token;

            if (!TryRetrieveToken(request, out token))
            {
                statusCode = HttpStatusCode.Unauthorized;
                return Task<HttpResponseMessage>.Factory.StartNew(() => new HttpResponseMessage(statusCode));
            }

            try
            {
                JWTSecurityTokenHandler tokenHandler = new JWTSecurityTokenHandler();
                var secret = this.SymmetricKey.Replace('-', '+').Replace('_', '/');
                TokenValidationParameters validationParameters = new TokenValidationParameters()
                {
                    AllowedAudience = this.Audience,
                    ValidateIssuer = this.Issuer != null ? true : false,
                    ValidIssuer = this.Issuer,
                    SigningToken = new BinarySecretSecurityToken(Convert.FromBase64String(secret))
                };

                Thread.CurrentPrincipal =
                    tokenHandler.ValidateToken(token, validationParameters);

                return base.SendAsync(request, cancellationToken);
            }
            catch (SecurityTokenValidationException)
            {
                statusCode = HttpStatusCode.Unauthorized;
            }
            catch (Exception)
            {
                statusCode = HttpStatusCode.InternalServerError;
            }
            return Task<HttpResponseMessage>.Factory.StartNew(() => new HttpResponseMessage(statusCode));
        }
    }
}