﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace DayCare.API.Migrations
{
    public partial class SubsidyIdColomnAddedinPaymentDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SubsidyDetailsID",
                table: "PayementDetails",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubsidyDetailsID",
                table: "PayementDetails");
        }
    }
}