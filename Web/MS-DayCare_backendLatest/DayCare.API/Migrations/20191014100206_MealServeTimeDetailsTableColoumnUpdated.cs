using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class MealServeTimeDetailsTableColoumnUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MealServeTime",
                table: "MealServeTimeDetails",
                newName: "MealServeTimeTo");

            migrationBuilder.AddColumn<DateTime>(
                name: "MealServeTimeFrom",
                table: "MealServeTimeDetails",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MealServeTimeFrom",
                table: "MealServeTimeDetails");

            migrationBuilder.RenameColumn(
                name: "MealServeTimeTo",
                table: "MealServeTimeDetails",
                newName: "MealServeTime");
        }
    }
}
