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
        public virtual DbSet<Pitch> Pitch { get; set; }
        public virtual DbSet<Timeslot> Timeslot { get; set; }
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

                entity.Property(e => e.Paid)
                    .HasColumnName("paid")
                    .HasColumnType("numeric");

                entity.Property(e => e.Price)
                    .HasColumnName("price")
                    .HasColumnType("numeric(10,2)");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.PitchId).HasColumnName("pitchId");

                entity.Property(e => e.TimeslotId).HasColumnName("timeslotId");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Pitch)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.PitchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Pitch");

                entity.HasOne(d => d.Timeslot)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.TimeslotId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Timeslot");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User");
            });

            modelBuilder.Entity<Pitch>(entity =>
            {
                entity.ToTable("pitch");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(255);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasColumnName("location")
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Timeslot>(entity =>
            {
                entity.ToTable("timeslot");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PitchId).HasColumnName("pitchId");

                entity.Property(e => e.Timeframe)
                    .HasColumnName("timeframe")
                    .HasColumnType("time without time zone");

                entity.HasOne(d => d.Pitch)
                    .WithMany(p => p.Timeslot)
                    .HasForeignKey(d => d.PitchId)
                    .HasConstraintName("FK_Pitch");
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