import {Request, Response} from 'express';
import knexConnection from '../database/connection';

class PointsController {

	async index(req: Request, res: Response) {
		const { term, items } = req.query;

		const parsedItems = String(items)
			.split(',')
			.map(item => Number(item.trim()))
		;

		const points =  await knexConnection('points')
			.join('point_items', 'points.id', '=', 'point_items.point_id')
			.whereIn('point_items.item_id', parsedItems)
			.where('name', 'like', `%${String(term)}%`)
			.distinct()
			.select('points.*')
		;

		return res.json(points);

	}

	async show(req: Request, res: Response) {
		const { id } = req.params;
		const point =  await knexConnection('points').where('id', id).first();

		if (!point) {
			return res.status(422).json({description: 'Point not found'});
		}

		const items = await knexConnection('items')
			.join('point_items', 'items.id', '=', 'point_items.item_id')
			.where('point_items.point_id', id)
			.select('items.title');

		return res.json({
			point,
			items
		});
	}

	async create(req: Request, res: Response) {

		const {
			name,
			email,
			phones,
			coordinates,
			items
		} = req.body;

		const json_phones = JSON.stringify(phones);
		const json_coordinates = JSON.stringify(coordinates);

		const transaction = await knexConnection.transaction();


		const point_data = {
			image: 'img.png',
			name,
			email,
			phones: json_phones,
			coordinates: json_coordinates
		};

		const inserted_ids = await transaction('points').insert(point_data);

		const point_items = items.map((item_id: number) => {
			return {
				point_id: inserted_ids[0],
				item_id
			};
		});

		await transaction('point_items').insert(point_items);

		await transaction.commit();

		point_data.image = `http://localhost:8081/uploads/img.png`;

		return res.json({
			id: inserted_ids[0],
			...point_data
		});

	}
}

export default PointsController;