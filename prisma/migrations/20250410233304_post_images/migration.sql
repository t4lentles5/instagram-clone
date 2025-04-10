-- CreateTable
CREATE TABLE "PostImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageUrlId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostImages" ADD CONSTRAINT "PostImages_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
