using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ACHChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddDate",
                table: "ACHInformation",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "ACHInformation",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddDate",
                table: "ACHInformation");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ACHInformation");
        }
    }
}
