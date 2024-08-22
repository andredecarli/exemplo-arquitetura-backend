import express from 'express';
import professor from './src/routes/professor.js'
import aula from './src/routes/aulas.js';
import { createDatabase } from './src/main.js';

const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  console.log(req.query);
  res.send('Hello World');
});

app.use('/professor', professor);
app.use('/aula', aula)

await createDatabase();


app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`);
});