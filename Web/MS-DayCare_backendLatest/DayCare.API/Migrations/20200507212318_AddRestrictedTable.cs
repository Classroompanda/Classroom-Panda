﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class AddRestrictedTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RestrictedPerson",
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
                    RestrictedPersonID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    ParentID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    RestrictedPersonName = table.Column<string>(nullable: true),
                    Mobile = table.Column<long>(nullable: false),
                    EmailId = table.Column<string>(maxLength: 100, nullable: true),
                    IsRestricted = table.Column<bool>(nullable: false),
                    ImagePath = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestrictedPerson", x => x.RestrictedPersonID);
                    table.ForeignKey(
                        name: "FK_RestrictedPerson_Agency_AgencyID",
                        column: x => x.AgencyID,
                        principalTable: "Agency",
                        principalColumn: "AgencyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RestrictedPerson_AgencyID",
                table: "RestrictedPerson",
                column: "AgencyID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RestrictedPerson");
        }
    }
}
