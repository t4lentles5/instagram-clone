/*
  Warnings:

  - You are about to drop the column `displayName` on the `RecentSearch` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `RecentSearch` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhotoUrl` on the `RecentSearch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `RecentSearch` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RecentSearch" DROP CONSTRAINT "RecentSearch_userId_fkey";

-- DropIndex
DROP INDEX "RecentSearch_userId_createdAt_idx";

-- DropIndex
DROP INDEX "RecentSearch_userId_profileId_key";

-- AlterTable
ALTER TABLE "RecentSearch" DROP COLUMN "displayName",
DROP COLUMN "profileId",
DROP COLUMN "profilePhotoUrl";

-- CreateIndex
CREATE UNIQUE INDEX "RecentSearch_userId_key" ON "RecentSearch"("userId");

-- AddForeignKey
ALTER TABLE "RecentSearch" ADD CONSTRAINT "RecentSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
