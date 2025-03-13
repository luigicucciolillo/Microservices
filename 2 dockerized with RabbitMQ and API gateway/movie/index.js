import express from 'express';
import { getAllAction, createAction } from './controller.js';
 
const app = express();
app.use(express.json());
 
app.get('/movie', getAllAction);
app.post('/movie', createAction);
 
app.listen(8181, () => console.log('Movie service is listening'));