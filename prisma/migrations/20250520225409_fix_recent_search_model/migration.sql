/*
  Warnings:

  - You are about to drop the column `authenticatedUserId` on the `RecentSearch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,searchedUserId]` on the table `RecentSearch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `searchedUserId` to the `RecentSearch` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RecentSearch_userId_key";

-- AlterTable
ALTER TABLE "RecentSearch" DROP COLUMN "authenticatedUserId",
ADD COLUMN     "searchedUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RecentSearch_userId_searchedUserId_key" ON "RecentSearch"("userId", "searchedUserId");

-- AddForeignKey
ALTER TABLE "RecentSearch" ADD CONSTRAINT "RecentSearch_searchedUserId_fkey" FOREIGN KEY ("searchedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
