/*
  Warnings:

  - Made the column `name` on table `food` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `food` MODIFY `name` VARCHAR(191) NOT NULL;
