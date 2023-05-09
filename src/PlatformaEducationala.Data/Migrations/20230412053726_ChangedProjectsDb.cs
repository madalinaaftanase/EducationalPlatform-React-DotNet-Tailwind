using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlatformaEducationala.Data.Migrations
{
    public partial class ChangedProjectsDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Students_StudentId",
                table: "Projects");

            migrationBuilder.AlterColumn<Guid>(
                name: "StudentId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "GradeId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "TeacherId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_TeacherId",
                table: "Projects",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Students_StudentId",
                table: "Projects",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Teachers_TeacherId",
                table: "Projects",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Students_StudentId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Teachers_TeacherId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_TeacherId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "Projects");

            migrationBuilder.AlterColumn<Guid>(
                name: "StudentId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "GradeId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Students_StudentId",
                table: "Projects",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
