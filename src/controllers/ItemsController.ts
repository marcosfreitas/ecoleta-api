import {Request, Response} from 'express';
import knexConnection from '../database/connection';

class ItemsController {
	async index(req: Request, res: Response) {

		const items = await knexConnection('items').select('*');

		/**
		 * @info serializedItems assume the formatted object but items variable isn't changed by this sintax
		 * @param item is passed by reference
		 */
		const serializedItems = items.map(item => {
			return {
				id: item.id,
				title: item.title,
				image_url: `http://localhost:8081/assets/${item.image}`
			};
		});

		return res.json(serializedItems);
	}
}

export default ItemsController;