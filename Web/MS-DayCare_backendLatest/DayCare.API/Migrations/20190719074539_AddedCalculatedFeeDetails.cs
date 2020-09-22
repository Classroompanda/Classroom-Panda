using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class AddedCalculatedFeeDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CalculatedFeeDetails",
                columns: table => new
                {
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
                    CalculatedFeeDetailsID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    PerDayFeeCalculationID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    CalculatedFeeDate = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalculatedFeeDetails", x => x.CalculatedFeeDetailsID);
                    table.ForeignKey(
                        name: "FK_CalculatedFeeDetails_Agency_AgencyID",
                        column: x => x.AgencyID,
                        principalTable: "Agency",
                        principalColumn: "AgencyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CalculatedFeeDetails_CalculatedFees_PerDayFeeCalculationID",
                        column: x => x.PerDayFeeCalculationID,
                        principalTable: "CalculatedFees",
                        principalColumn: "PerDayFeeCalculationID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CalculatedFeeDetails_AgencyID",
                table: "CalculatedFeeDetails",
                column: "AgencyID");

            migrationBuilder.CreateIndex(
                name: "IX_CalculatedFeeDetails_PerDayFeeCalculationID",
                table: "CalculatedFeeDetails",
                column: "PerDayFeeCalculationID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalculatedFeeDetails");
        }
    }
}
