/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SubReddit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SubReddit" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "SubReddit_name_key" ON "SubReddit"("name");
