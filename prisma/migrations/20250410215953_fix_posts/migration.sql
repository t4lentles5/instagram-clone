/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageUrl",
DROP COLUMN "type",
ADD COLUMN     "imagesUrl" TEXT[];

-- DropEnum
DROP TYPE "PostType";
