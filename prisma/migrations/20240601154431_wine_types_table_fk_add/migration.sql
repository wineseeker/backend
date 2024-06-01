-- AddForeignKey
ALTER TABLE `Wines` ADD CONSTRAINT `Wines_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `wine_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
