import { register } from '../connect.js';
import { getAll, create } from './model.js';
 
export async function getAllAction(request, response) {
  try {
    const { id } = await getAll();
    register(id, response);
  } catch (e) {
    console.error(e);
    response.status(500).json('Interal server error');
  }
}
 
export async function createAction(request, response) {
  try {
    const { id } = await create(request.body);
    register(id, response);
  } catch (e) {
    console.error(e);
    response.status(500).json('Internal server error');
  }
} 