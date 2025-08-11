-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "category" TEXT,
ADD COLUMN     "commentsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "contentText" TEXT,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
