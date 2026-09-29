import {sqliteTable,text,primaryKey} from 'drizzle-orm/sqlite-core';
export const entries=sqliteTable('entries',{userId:text('user_id').notNull(),key:text('key').notNull(),value:text('value').notNull(),updated:text('updated').notNull()},t=>[primaryKey({columns:[t.userId,t.key]})]);
