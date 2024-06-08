/*
  Warnings:

  - You are about to drop the `passwordresettokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `passwordresettokens`;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `tokenHash` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tokenHash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
