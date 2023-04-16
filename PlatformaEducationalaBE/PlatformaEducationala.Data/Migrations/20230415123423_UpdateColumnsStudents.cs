using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

#nullable disable

namespace PlatformaEducationala.Data.Migrations
{
    public partial class UpdateColumnsStudents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("Firstname","Students","Firstname");
            migrationBuilder.RenameColumn("Lastname","Students","Lastname");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("Firstname", "Students", "Firstname");
            migrationBuilder.RenameColumn("Lastname", "Students", "Lastname");
        }
    }
}
