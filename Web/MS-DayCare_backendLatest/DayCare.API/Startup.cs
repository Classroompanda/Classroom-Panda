using DayCare.API.Controllers.API;
using DayCare.API.DI;
using DayCare.API.Infrastructure;
using DayCare.API.WebSockets;
using DayCare.Data;
using DayCare.Entity.Masters;
using DayCare.Model.Options;
using DayCare.Model.User;
using DayCare.Repository.Core;
using DayCare.Service.Automapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc.Versioning.Conventions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net;
using System.Text;

namespace DayCare.API
{
    public class Startup
    {
        private const string DefaultCorsPolicyName = "localhost";
        public Startup(IConfiguration configuration)
        {
            AutomapperConfiguration.Configure();
            Configuration = configuration;
            DayCareConstants.SetConfiguration(Configuration);

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();
            services.AddSwaggerDocumentation();
            services.AddWebSocketManager();
            ReadAPIKeySetting();
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Info { Title = "DayCare API", Version = "v1" });

            //});
            //Initialize MVC
            services.AddMvc(o =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                o.Filters.Add(new AuthorizeFilter(policy));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
            });
            //Dependency Injection
            services = BuildUnityContainer.RegisterAddTransient(services);
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
            services.AddScoped(typeof(IRepository<>), typeof(RepositoryBase<>));
            services.AddSingleton(typeof(IRepository<>), typeof(RepositoryBase<>));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //Manage Conncection String
            //   services.AddDbContext<DataContext>(option => { option.UseSqlServer(Configuration.GetConnectionString("DayCareConnection"), b => b.MigrationsAssembly("DayCare.API")); });
            services.AddDbContext<DataContext>(option => { option.UseNpgsql(Configuration.GetConnectionString("DayCareConnection"), b => b.MigrationsAssembly("DayCare.API")); });
            //Configure CORS for angular2 UI
            //services.AddCors(options =>
            //{
            //    options.AddPolicy(DefaultCorsPolicyName, builder => builder.AllowAnyOrigin()
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()
            //        .AllowCredentials()
            //        .AllowAnyOrigin());,
            //});
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicyName, builder =>
                  //  builder.WithOrigins("http://75.126.168.31:9942")//")//
                  builder.AllowAnyOrigin()//""//
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            // Register the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Day Care 2018 V1", Version = "v1" });
                c.IgnoreObsoleteProperties();
            });

            services.AddApiVersioning(o => {
                o.ReportApiVersions = true;
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new ApiVersion(1, 0);
                o.ApiVersionReader = new HeaderApiVersionReader("api-version");
            });
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; // new
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.

            //Enable CORS!
            app.UseCors(DefaultCorsPolicyName);
            app.UseExceptionHandler(
         builder =>
         {
             builder.Run(
               async dbcontext =>
               {
                   dbcontext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                   dbcontext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                   var error = dbcontext.Features.Get<IExceptionHandlerFeature>();
                   if (error != null)
                   {
                       await dbcontext.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                   }
               });
         });

            app.UseHttpsRedirection();

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.  
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwaggerDocumentation();
            }
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
           Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
                RequestPath = "/ReviewTemplateImage"
            });

            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
                RequestPath = "/ReviewTemplateImage"
            });
            app.UseAuthentication();

            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("/chat");
            });

            var wsOptions = new WebSocketOptions
            {
                KeepAliveInterval = TimeSpan.FromSeconds(60),
                ReceiveBufferSize = 4 * 1024
            };

            app.UseWebSockets(wsOptions);
            app.MapWebSocketManager("/chatroom", serviceProvider.GetService<ChatRoomHandler>());

            app.UseMvc();
        }

        private void ReadAPIKeySetting()
        {
            StripeKeySettings.APIKeySettings = Configuration["APIKeySettings:SetApiKey"];
            StripeKeySettings.PushNotificationTeacherAPIKey = Configuration["PushNotificationTeacherAPIKey:Teacher_Legacy_Server_Key"];
            StripeKeySettings.PushNotificationParentAPIKey = Configuration["PushNotificationParentAPIKey:Parent_Legacy_Server_Key"];
            StripeKeySettings.SendGridAPIKey = Configuration["SendGridAPIKey:Send_Grid_API_Key"];
            //StripeKeySettings.ConnectionStrings = Configuration["ConnectionStrings:DayCareConnection"];
        }

    }
}
