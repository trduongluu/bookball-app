using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bookballAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace bookballAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                // options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                // options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            // .ConfigureApiBehaviorOptions(options =>
            // {
            //     options.SuppressMapClientErrors = true;
            //     options.InvalidModelStateResponseFactory = context =>
            //     {
            //         return new BadRequestObjectResult(new SerializableError(context.ModelState));
            //     };

            //     options.ClientErrorMapping[404].Link =
            //         "https://httpstatuses.com/404";
            // })
            // .AddNewtonsoftJson(options =>
            // {
            //     options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //     options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            // });
            services.AddMvc();
            services.AddDbContext<bookballContext>(options => options.UseNpgsql(Configuration.GetConnectionString("bookballDatabase")));
            services.AddDbContext<AuthenticationContext>(options => options.UseNpgsql(Configuration.GetConnectionString("bookballDatabase")));
            services.AddIdentityCore<ApplicationUser>().AddEntityFrameworkStores<AuthenticationContext>();
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
            // services.AddMvcCore().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("MyPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}