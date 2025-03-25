/*
  Warnings:

  - Made the column `profile_photo` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_photo" SET NOT NULL;
