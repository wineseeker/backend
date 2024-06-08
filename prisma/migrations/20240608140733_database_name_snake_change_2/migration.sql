-- DropForeignKey
ALTER TABLE `results` DROP FOREIGN KEY `Results_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
