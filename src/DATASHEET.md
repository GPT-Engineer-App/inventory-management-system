# Data Sheet for Inventory Management System

## Stores

The following fields are used to manage store information:

- `storeCode` (String): Unique identifier for the store.
- `storeName` (String): The name of the store.
- `storeAddress` (String): The physical address of the store.
- `storekeeperName` (String): The name of the storekeeper.
- `storekeeperPhoneNumber` (String): The contact phone number of the storekeeper.

## Unit Names

Fields related to unit names within the system:

- `code` (String): Unique code for the unit.
- `englishName` (String): The English name of the unit.
- `arabicName` (String): The Arabic name of the unit.
- `active` (Boolean): Indicates whether the unit is active or not.
- `linkedUnit` (String): Code of another unit to which this unit is linked (optional).

This datasheet represents the main fields used in the application for managing stores and units.
