using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class NewTableRecurringBilling : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChildNotes",
                table: "Student",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ChildStartDate",
                table: "Student",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhysicianAddress",
                table: "Student",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentDescription",
                table: "PayementDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployerAddress",
                table: "Parent",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceDescription",
                table: "InvoiceDetails",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "InvoiceStartDate",
                table: "ClassEnrollments",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "ChatPrivateMessageDetails",
                maxLength: 5000,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "RecurringBilling",
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
                    RecurringBillingID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    ParentID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    BillingFromDate = table.Column<DateTime>(nullable: false),
                    BillingToDate = table.Column<DateTime>(nullable: false),
                    BillingDate = table.Column<DateTime>(nullable: false),
                    TransactionType = table.Column<DateTime>(nullable: false),
                    BillingDescription = table.Column<DateTime>(nullable: false),
                    BillingCycle = table.Column<DateTime>(nullable: false),
                    ClassesID = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecurringBilling", x => x.RecurringBillingID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecurringBilling");

            migrationBuilder.DropColumn(
                name: "ChildNotes",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "ChildStartDate",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "PhysicianAddress",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "PaymentDescription",
                table: "PayementDetails");

            migrationBuilder.DropColumn(
                name: "EmployerAddress",
                table: "Parent");

            migrationBuilder.DropColumn(
                name: "InvoiceDescription",
                table: "InvoiceDetails");

            migrationBuilder.DropColumn(
                name: "InvoiceStartDate",
                table: "ClassEnrollments");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "ChatPrivateMessageDetails",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 5000,
                oldNullable: true);
        }
    }
}
