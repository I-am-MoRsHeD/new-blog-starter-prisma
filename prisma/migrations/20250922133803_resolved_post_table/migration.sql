/*
  Warnings:

  - The `isFeatured` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "isFeatured",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
