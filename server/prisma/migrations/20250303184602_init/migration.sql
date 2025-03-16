/*
  Warnings:

  - You are about to drop the column `status` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `expectedDeliveryDate` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerUnit` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockQuantity` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE notifications_notificationid_seq;
ALTER TABLE "Notifications" DROP COLUMN "status",
DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "readStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "notificationId" SET DEFAULT nextval('notifications_notificationid_seq');
ALTER SEQUENCE notifications_notificationid_seq OWNED BY "Notifications"."notificationId";

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "expectedDeliveryDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "orderDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "pricePerUnit",
DROP COLUMN "rating",
DROP COLUMN "stock",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ratings" DOUBLE PRECISION,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "stockQuantity" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "jobDescription" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "sex" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phoneNumber_key" ON "Users"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
