/*
  Warnings:

  - Added the required column `rank` to the `result_wine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `result_wine` ADD COLUMN `rank` INTEGER NOT NULL;
