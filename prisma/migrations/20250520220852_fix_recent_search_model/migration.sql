/*
  Warnings:

  - Added the required column `authenticatedUserId` to the `RecentSearch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecentSearch" ADD COLUMN     "authenticatedUserId" TEXT NOT NULL;
