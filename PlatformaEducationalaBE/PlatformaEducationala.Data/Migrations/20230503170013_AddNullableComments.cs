using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlatformaEducationala.Data.Migrations
{
    public partial class AddNullableComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Projects");
        }
    }
}
