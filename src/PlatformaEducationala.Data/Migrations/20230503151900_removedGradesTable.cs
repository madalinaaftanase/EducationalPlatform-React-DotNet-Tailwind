using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlatformaEducationala.Data.Migrations
{
    public partial class removedGradesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Grades_GradeId",
                table: "Projects");

            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropIndex(
                name: "IX_Projects_GradeId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "GradeId",
                table: "Projects");

            migrationBuilder.AddColumn<float>(
                name: "Grade",
                table: "Projects",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Projects");

            migrationBuilder.AddColumn<Guid>(
                name: "GradeId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TecherId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Grades_Teachers_TecherId",
                        column: x => x.TecherId,
                        principalTable: "Teachers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Projects_GradeId",
                table: "Projects",
                column: "GradeId");

            migrationBuilder.CreateIndex(
                name: "IX_Grades_TecherId",
                table: "Grades",
                column: "TecherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Grades_GradeId",
                table: "Projects",
                column: "GradeId",
                principalTable: "Grades",
                principalColumn: "Id");
        }
    }
}
