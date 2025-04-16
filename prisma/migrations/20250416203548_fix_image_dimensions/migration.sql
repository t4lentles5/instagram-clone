/*
  Warnings:

  - The values [original] on the enum `Aspect_ratio` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `first_image_dimensions` on the `Post` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Aspect_ratio_new" AS ENUM ('square', 'portrait', 'video');
ALTER TABLE "Post" ALTER COLUMN "aspect_ratio" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "aspect_ratio" TYPE "Aspect_ratio_new" USING ("aspect_ratio"::text::"Aspect_ratio_new");
ALTER TYPE "Aspect_ratio" RENAME TO "Aspect_ratio_old";
ALTER TYPE "Aspect_ratio_new" RENAME TO "Aspect_ratio";
DROP TYPE "Aspect_ratio_old";
ALTER TABLE "Post" ALTER COLUMN "aspect_ratio" SET DEFAULT 'square';
COMMIT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "first_image_dimensions";
