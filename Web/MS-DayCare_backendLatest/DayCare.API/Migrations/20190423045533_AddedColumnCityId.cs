using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedColumnCityId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CityId",
                table: "Agency",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CountryId",
                table: "Agency",
                nullable: false,
                defaultValue: 0L);
           

           
            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "Agency",
                maxLength: 100,
                nullable: true);
           

            migrationBuilder.AddColumn<long>(
                name: "StateId",
                table: "Agency",
                nullable: false,
                defaultValue: 0L);

           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Agency");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Agency");
           

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "Agency");
            

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "Agency");

           
        }
    }
}
