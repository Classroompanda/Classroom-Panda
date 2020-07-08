using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class DigitalDirectorMaster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DigitalDirectorMaster",
                columns: table => new
                {
                    DDMasterID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedBy = table.Column<long>(nullable: true),
                    DeletedDate = table.Column<DateTime>(nullable: true),
                    DeletedFromIP = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<long>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    CreatedFromIP = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedFromIP = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true),
                    AgencyID = table.Column<long>(nullable: false),
                    StudentActivitiesID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    TimeInterval = table.Column<DateTime>(nullable: false),
                    Comment = table.Column<string>(maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DigitalDirectorMaster", x => x.DDMasterID);
                    table.ForeignKey(
                        name: "FK_DigitalDirectorMaster_Agency_AgencyID",
                        column: x => x.AgencyID,
                        principalTable: "Agency",
                        principalColumn: "AgencyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DigitalDirectorMaster_StudentActivities_StudentActivitiesID",
                        column: x => x.StudentActivitiesID,
                        principalTable: "StudentActivities",
                        principalColumn: "StudentActivitiesID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DigitalDirectorMaster_Student_StudentID",
                        column: x => x.StudentID,
                        principalTable: "Student",
                        principalColumn: "StudentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DigitalDirectorMaster_AgencyID",
                table: "DigitalDirectorMaster",
                column: "AgencyID");

            migrationBuilder.CreateIndex(
                name: "IX_DigitalDirectorMaster_StudentActivitiesID",
                table: "DigitalDirectorMaster",
                column: "StudentActivitiesID");

            migrationBuilder.CreateIndex(
                name: "IX_DigitalDirectorMaster_StudentID",
                table: "DigitalDirectorMaster",
                column: "StudentID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DigitalDirectorMaster");
        }
    }
}
