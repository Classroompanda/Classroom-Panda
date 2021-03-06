﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DayCare.API.Migrations
{
    public partial class StudentFilesTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentFiles",
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
                    StudentFilesID = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    AgencyID = table.Column<long>(nullable: false),
                    StudentID = table.Column<long>(nullable: false),
                    FileName = table.Column<string>(maxLength: 100, nullable: false),
                    FilePath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentFiles", x => x.StudentFilesID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentFiles");
        }
    }
}
