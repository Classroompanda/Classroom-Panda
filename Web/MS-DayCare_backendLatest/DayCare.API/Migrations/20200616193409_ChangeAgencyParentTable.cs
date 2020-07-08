using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ChangeAgencyParentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsJoinClassroom",
                table: "Parent",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPolicyEULAAccept",
                table: "Agency",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "PolicyEULAAcceptDate",
                table: "Agency",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsJoinClassroom",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "IsPolicyEULAAccept",
                table: "Agency");

            migrationBuilder.DropColumn(
                name: "PolicyEULAAcceptDate",
                table: "Agency");
        }
    }
}
