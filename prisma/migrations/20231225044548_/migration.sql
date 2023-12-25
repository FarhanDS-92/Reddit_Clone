/*
  Warnings:

  - You are about to drop the column `subRedditId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `subredditId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subRedditId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "subRedditId",
ADD COLUMN     "subredditId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subredditId_fkey" FOREIGN KEY ("subredditId") REFERENCES "SubReddit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
