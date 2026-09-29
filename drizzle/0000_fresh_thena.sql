CREATE TABLE `entries` (
	`user_id` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`updated` text NOT NULL,
	PRIMARY KEY(`user_id`, `key`)
);
