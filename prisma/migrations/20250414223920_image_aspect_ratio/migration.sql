-- CreateEnum
CREATE TYPE "Aspect_ratios" AS ENUM ('original', 'square', 'portrait', 'video');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "aspect_ratio" "Aspect_ratios" NOT NULL DEFAULT 'square';
