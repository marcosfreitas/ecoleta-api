import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json())
app.use(routes);

/**
 * serving static files
 */
app.use('/assets', express.static(path.resolve(__dirname, 'storage', 'assets')));
app.use('/uploads', express.static(path.resolve(__dirname, 'storage', 'uploads')));

app.listen(8081, () => {
	console.log('running');
});