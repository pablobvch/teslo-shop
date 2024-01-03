/*
  Warnings:

  - Made the column `city` on table `UserAddress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserAddress" ALTER COLUMN "city" SET NOT NULL;
