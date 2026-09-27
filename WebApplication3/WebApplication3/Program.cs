var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// تفعيل خدمة الملفات الثابتة
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();