﻿using System;
using bookballAPI.Entities;
using bookballAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace bookballAPI.Contexts
{
    public partial class bookballContext : IdentityDbContext<User>
    {
        public bookballContext() { }

        public bookballContext(DbContextOptions<bookballContext> options) : base(options) { }

        public virtual DbSet<Booking> Booking { get; set; }
        public virtual DbSet<Field> Field { get; set; }
        public virtual DbSet<Pitch> Pitch { get; set; }
        public virtual DbSet<Timeframe> Timeframe { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                // optionsBuilder.UseNpgsql("");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("booking");

                entity.HasIndex(e => e.FieldId)
                    .HasName("IX_booking_pitchId");

                entity.HasIndex(e => e.TimeSlot)
                    .HasName("IX_booking_timeslotId");

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Checkin)
                    .HasColumnName("checkin")
                    .HasColumnType("date");

                entity.Property(e => e.Checkout)
                    .HasColumnName("checkout")
                    .HasColumnType("date");

                entity.Property(e => e.Day)
                    .HasColumnName("day")
                    .HasColumnType("date");

                entity.Property(e => e.FieldId).HasColumnName("fieldId");

                entity.Property(e => e.Paid).HasColumnName("paid");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.TimeSlot)
                    .IsRequired()
                    .HasColumnName("timeSlot");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId");

                entity.HasOne(d => d.Field)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.FieldId)
                    .HasConstraintName("FK_Field");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_User");
            });

            modelBuilder.Entity<Field>(entity =>
            {
                entity.ToTable("field");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FieldType).HasColumnName("fieldType");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255);

                entity.Property(e => e.PitchId).HasColumnName("pitchId");

                entity.HasOne(d => d.Pitch)
                    .WithMany(p => p.Field)
                    .HasForeignKey(d => d.PitchId)
                    .HasConstraintName("FK_Pitch");
            });

            modelBuilder.Entity<Pitch>(entity =>
            {
                entity.ToTable("pitch");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(255);

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasColumnName("location")
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Timeframe>(entity =>
            {
                entity.ToTable("timeframe");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedId)
                    .IsRequired()
                    .HasColumnName("createdId");

                entity.Property(e => e.TimeGroup)
                    .IsRequired()
                    .HasColumnName("timeGroup");
            });

            // TODO: customize the asp.net identity model
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable(name: "Users");
            });

            modelBuilder.Entity<IdentityRole>(entity =>
            {
                entity.ToTable(name: "Roles");
            });
            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("UserRoles");
                //in case you chagned the TKey type
                //  entity.HasKey(key => new { key.UserId, key.RoleId });
            });

            modelBuilder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("UserClaims");
            });

            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("UserLogins");
                //in case you chagned the TKey type
                //  entity.HasKey(key => new { key.ProviderKey, key.LoginProvider });       
            });

            modelBuilder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("RoleClaims");

            });

            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("UserTokens");
                //in case you chagned the TKey type
                // entity.HasKey(key => new { key.UserId, key.LoginProvider, key.Name });

            });

            // modelBuilder.Entity<User>(entity =>
            // {
            //     entity.ToTable("user");

            //     entity.Property(e => e.customId).HasColumnName("customId");

            //     // entity.Property(e => e.Email)
            //     //     .HasColumnName("email")
            //     //     .HasMaxLength(255);

            //     // entity.Property(e => e.Password)
            //     //     .HasColumnName("password")
            //     //     .HasMaxLength(255);

            //     entity.Property(e => e.Username)
            //         .HasColumnName("username")
            //         .HasMaxLength(255);
            // });

            // OnModelCreatingPartial(modelBuilder);
        }

        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}