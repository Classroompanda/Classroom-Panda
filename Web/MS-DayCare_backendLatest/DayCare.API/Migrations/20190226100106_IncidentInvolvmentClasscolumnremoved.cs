using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class IncidentInvolvmentClasscolumnremoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassesID",
                table: "IncidentInvolvment");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ClassesID",
                table: "IncidentInvolvment",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
