import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("refresh_tokens", table => {
            table.uuid("id").notNullable().unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("token", 600).notNullable();
            table.datetime("expiry").notNullable();
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("refresh_tokens");
}

