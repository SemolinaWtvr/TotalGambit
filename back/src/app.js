import express from 'express';
import defaultRouter from './routes/default.route.js';

const { NODE_ENV, PORT } = process.env;
const app = express(); 


app.use('/public', express.static('public'))
app.use(express.json());
app.use('/api', defaultRouter);

app.listen(PORT, (err) => {
  if(err) {
    console.log(`Une erreur s\'est produite « ${err.message} »`)
    console.error(err.stack);
    process.exit(1);
  }

  console.log(`La Web API est démarré sur le port ${PORT} [${NODE_ENV}]`);
});