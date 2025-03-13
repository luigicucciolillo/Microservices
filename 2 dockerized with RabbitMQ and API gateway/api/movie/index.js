import { Router } from 'express';
import { getAllAction, createAction } from './controller.js';
 
const router = Router();
 
router.get('/', getAllAction);
router.post('/', createAction);
 
export { router };