using Microsoft.EntityFrameworkCore;
using TargetOnline.Entities;
using TargetOnline.Entities.Paystack;

namespace TargetOnline.Context
{
    public partial class DatabaseContext : DbContext
    {
        public virtual DbSet<Configuration> Configurations { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<TransactionRef> TransactionRefs { get; set; }
        public virtual DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<OrderedItem> OrderedItems { get; set; }
        public virtual DbSet<Shop> Shops { get; set; }
        public virtual DbSet<ShopProduct> ShopProducts { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) 
        {
            Database.SetCommandTimeout(90);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Configuration>(entity =>
            {
                entity.ToTable("Configuration", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.LocationId).HasColumnName("LocationID");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastLoggedIn).HasColumnType("datetime");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Location)
                    .WithMany()
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Location");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.HasQueryFilter(e => !e.IsDeleted);
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.ToTable("CartItem", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.Property(e => e.CreatedByUserId).HasColumnName("CreatedByUserID");

                entity.Property(e => e.PickUpAddressId).HasColumnName("PickUpAddressID");

                entity.Property(e => e.DeliveryAddressId).HasColumnName("DeliveryAddressID");

                entity.Property(e => e.TransactionRefId).HasColumnName("TransactionRefID");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.PaymentCompletedAt).HasColumnType("datetime");

                entity.Property(e => e.CreatedByUserId).HasColumnName("CreatedByUserID");

                entity.HasOne(d => d.CreatedByUser)
                    .WithMany()
                    .HasForeignKey(d => d.CreatedByUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CartItem_CreatedByUser");

                entity.HasOne(d => d.Status)
                    .WithMany()
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CartItem_Status");

                entity.HasOne(d => d.DeliveryAddress)
                    .WithMany()
                    .HasForeignKey(d => d.DeliveryAddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CartItem_DeliveryAddress");

                entity.HasOne(d => d.PickUpAddress)
                    .WithMany()
                    .HasForeignKey(d => d.PickUpAddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CartItem_PickUpAddress");

                entity.HasOne(d => d.TransactionRef)
                    .WithMany()
                    .HasForeignKey(d => d.TransactionRefId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CartItem_TransactionRef");

                entity.HasQueryFilter(e => !e.IsDeleted);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.ToTable("Status", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("Location", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasQueryFilter(e => !e.IsDeleted);
            });

            modelBuilder.Entity<TransactionRef>(entity =>
            {
                entity.ToTable("TransactionRef", "paystack");

                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<OrderedItem>(entity =>
            {
                entity.ToTable("OrderedItem", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CartItemId).HasColumnName("CartItemID");

                entity.Property(e => e.AutoSpareId).HasColumnType("AutoSpareID");

                entity.HasOne(e => e.CartItem)
                    .WithMany(e => e.OrderedItems)
                    .HasForeignKey(d => d.CartItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderedItem_CartItem");

                entity.HasOne(e => e.AutoSpare)
                    .WithMany()
                    .HasForeignKey(d => d.AutoSpareId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderedItem_AutoSpare");

                entity.HasQueryFilter(e => !e.IsDeleted);
            });

            modelBuilder.Entity<Shop>(entity =>
            {
                entity.ToTable("Shop", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedByUserId).HasColumnName("CreatedByUserID");

                entity.Property(e => e.LocationId).HasColumnName("LocationID");

                entity.HasOne(d => d.CreatedByUser)
                    .WithMany()
                    .HasForeignKey(d => d.CreatedByUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Shop_CreatedByUser");

                entity.HasOne(e => e.Location)
                    .WithMany()
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Shop_Location");

                entity.HasQueryFilter(e => !e.IsDeleted);
            });

            modelBuilder.Entity<ShopProduct>(entity =>
            {
                entity.ToTable("ShopProduct", "to");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.ShopId).HasColumnName("ShopID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasQueryFilter(e => !e.IsDeleted);
            });

            modelBuilder.Entity<Bank>(entity =>
            {
                entity.ToTable("Bank", "paystack");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.PayStackId).HasColumnName("PayStackID");

                entity.Property(e => e.Active).HasDefaultValueSql("((0))");

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.LongCode).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.PayWithBank).HasDefaultValueSql("((0))");

                entity.Property(e => e.Slug).IsUnicode(false);

                entity.Property(e => e.Type).IsUnicode(false);

                entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<SubAccount>(entity =>
            {
                entity.ToTable("SubAccount", "paystack");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Active).HasDefaultValueSql("((0))");

                entity.Property(e => e.BankId).HasColumnName("BankID");

                entity.Property(e => e.PayStackId).HasColumnName("PayStackID");

                entity.Property(e => e.BusinessName).IsUnicode(false);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.AccountNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Currency)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Domain)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PercentageCharge).HasColumnType("decimal(18, 4)");

                entity.Property(e => e.SettlementBank).IsUnicode(false);

                entity.Property(e => e.SettlementSchedule).IsUnicode(false);

                entity.Property(e => e.SubAccountCode).IsUnicode(false);

                entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
