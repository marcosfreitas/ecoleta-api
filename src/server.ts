import express from 'express';

const app = express();

app.get('/', (req, res) => {
	console.log('server ok');
	res.json({status: 200});
});

app.listen(8081, () => {
	console.log('running');
});