/*
  Warnings:

  - Made the column `profilePhotoUrl` on table `RecentSearch` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RecentSearch" ALTER COLUMN "profilePhotoUrl" SET NOT NULL;
