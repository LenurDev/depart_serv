import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes';
import config from './config';
import cors from 'cors';

let app = express();

app.use(cors());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: 'Server Error'
  });
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

let port = config.get('app:port');

app.listen(port, () => console.log(`Running at localhost:${port}`));
