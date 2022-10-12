import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
        .createTable("users", table => {
            table.uuid("id").notNullable().unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.boolean("verified").notNullable().defaultTo(false);
            table.boolean("active").notNullable().defaultTo(false);
            table.datetime("created", { precision: 6 }).notNullable().defaultTo(knex.fn.now(6));
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("users");
}
