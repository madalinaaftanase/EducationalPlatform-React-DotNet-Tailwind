using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlatformaEducationala.Data.Migrations
{
    public partial class HomeworkExtraFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Homeworks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Homeworks_ProjectId",
                table: "Homeworks",
                column: "ProjectId",
                unique: true,
                filter: "[ProjectId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Homeworks_Projects_ProjectId",
                table: "Homeworks",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Homeworks_Projects_ProjectId",
                table: "Homeworks");

            migrationBuilder.DropIndex(
                name: "IX_Homeworks_ProjectId",
                table: "Homeworks");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Homeworks");
        }
    }
}
