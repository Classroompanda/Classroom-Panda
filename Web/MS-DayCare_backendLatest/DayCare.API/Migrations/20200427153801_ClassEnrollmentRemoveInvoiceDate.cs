using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class ClassEnrollmentRemoveInvoiceDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvoiceStartDate",
                table: "ClassEnrollments");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "InvoiceStartDate",
                table: "ClassEnrollments",
                nullable: true);
        }
    }
}
