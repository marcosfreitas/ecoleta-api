import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const PointsControllerInstance = new PointsController;
const ItemsControllerInstance = new ItemsController;

const routes = express.Router();

routes.get('/items', ItemsControllerInstance.index);
routes.get('/points', PointsControllerInstance.index);
routes.post('/points', PointsControllerInstance.create);
routes.get('/points/:id', PointsControllerInstance.show);


export default routes;