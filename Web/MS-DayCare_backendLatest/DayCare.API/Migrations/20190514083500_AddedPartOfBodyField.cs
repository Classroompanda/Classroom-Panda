using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class AddedPartOfBodyField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContextChild",
                table: "Incident",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContextEnviroment",
                table: "Incident",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartOfBody",
                table: "Incident",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContextChild",
                table: "Incident");

            migrationBuilder.DropColumn(
                name: "ContextEnviroment",
                table: "Incident");

            migrationBuilder.DropColumn(
                name: "PartOfBody",
                table: "Incident");
        }
    }
}
