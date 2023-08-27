using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TargetOnline.Outcomes;
using TargetOnline.Services.Authentication;
using TargetOnline.Services.Validations.AuthenticationValidation;
using TargetOnline.Services.Settings;
using Microsoft.OpenApi.Models;
using TargetOnline.Services.Validations.SettingsValidation;
using TargetOnline.Models;
using TargetOnline.Services.Emails;
using Microsoft.EntityFrameworkCore;
using TargetOnline.Context;

namespace TargetOnline
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
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("https://www.targetonline.co.za", "http://www.targetonline.co.za", "https://targetonline-site.web.app", "https://targetonline.co.za", "http://localhost:3000", "https://aspnetclusters-77136-0.cloudclusters.net")
                        .AllowCredentials();
                });
            });

            services.AddControllers()
                .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddSignalR(o =>
            {
                o.EnableDetailedErrors = true;
            });

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "1.0.0",
                    Title = "Target Online API",
                    Description = "An ASP.NET Core Web API for managing Target Online Pty Ltd App"
                });
                options.CustomSchemaIds(type => type.ToString());
            });

            services.AddControllers();

            services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(Configuration.GetConnectionString(Configuration.GetSection("Environment").Value)));

            services.AddScoped<ISettingsValidationService, SettingsValidationService>();
            services.AddScoped<IAuthenticationValidationService, AuthenticationValidationService>();

            services.AddScoped<IHandler, Handler>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped<INotificationsService, NotificationsService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors("ClientPermission");

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Target Online API V1");
            });
        }
    }
}
