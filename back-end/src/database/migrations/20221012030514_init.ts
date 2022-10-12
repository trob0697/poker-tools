import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("refresh_tokens", table => {
            table.uuid("token").notNullable()
            table.datetime("expiry").notNullable()
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("refresh_tokens");
}
