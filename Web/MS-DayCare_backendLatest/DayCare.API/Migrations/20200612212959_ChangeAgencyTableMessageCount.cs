using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ChangeAgencyTableMessageCount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MessageStartDate",
                table: "Agency");

            migrationBuilder.AddColumn<DateTime>(
                name: "MessageCountStartDate",
                table: "Agency",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MessageCountStartDate",
                table: "Agency");

            migrationBuilder.AddColumn<DateTime>(
                name: "MessageStartDate",
                table: "Agency",
                nullable: true);
        }
    }
}
