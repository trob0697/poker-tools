import knex from "knex";
import { config as knexfile } from "./knexfile";

export const db = knex(knexfile.development);
