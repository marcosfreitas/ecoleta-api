import Knex from 'knex';

/**
 * @param knex
 */
export async function up(knex: Knex){
	return knex.schema.createTable('points', table => {
		table.bigIncrements('id').primary();
		table.string('image').notNullable();
		table.string('name').notNullable();
		table.string('email').unique().notNullable();
		table.json('phones').notNullable();
		table.json('coordinates').notNullable();
		/*
			@info removed because we can get it from coordinates
			city, uf
		*/
	});
}

export async function down(knex: Knex){
	return knex.schema.dropTable('points');
}