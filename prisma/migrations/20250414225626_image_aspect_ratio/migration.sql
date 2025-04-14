/*
  Warnings:

  - The `aspect_ratio` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Aspect_ratio" AS ENUM ('original', 'square', 'portrait', 'video');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "aspect_ratio",
ADD COLUMN     "aspect_ratio" "Aspect_ratio" NOT NULL DEFAULT 'square';

-- DropEnum
DROP TYPE "Aspect_ratios";
