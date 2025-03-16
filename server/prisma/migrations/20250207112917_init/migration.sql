-- CreateTable
CREATE TABLE "Users" (
    "userId" INTEGER NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Products" (
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Sales" (
    "saleId" INTEGER NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "SaleItems" (
    "saleItemId" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantitySold" INTEGER NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaleItems_pkey" PRIMARY KEY ("saleItemId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "expectedDeliveryDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "orderItemId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantityOrdered" INTEGER NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "expenseId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("expenseId")
);

-- CreateTable
CREATE TABLE "ExpenseCategories" (
    "expenseCategoryId" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ExpenseCategories_pkey" PRIMARY KEY ("expenseCategoryId")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "notificationId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("notificationId")
);

-- AddForeignKey
ALTER TABLE "SaleItems" ADD CONSTRAINT "SaleItems_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItems" ADD CONSTRAINT "SaleItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

