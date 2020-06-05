import Knex from 'knex';

/**
 * @param knex
 */
export async function up(knex: Knex){
	return knex.schema.createTable('point_items', table => {
		table.bigIncrements('id').primary();

		table.bigInteger('point_id')
			.notNullable()
			.references('id')
			.inTable('points')
		;

		table.bigInteger('item_id')
			.notNullable()
			.references('id')
			.inTable('items')
		;
	});
}

export async function down(knex: Knex){
	return knex.schema.dropTable('point_items');
}