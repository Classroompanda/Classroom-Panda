using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class columncommentadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "PostActivityVideos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "PostActivityImages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "PostActivityVideos");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "PostActivityImages");
        }
    }
}
