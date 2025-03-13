import { getAll, create } from './model.js';
 
export async function getAllAction(request, response) {
  try {
    const movies = await getAll();
    response.json(movies);
  } catch (e) {
    response.status(500).json(e);
  }
}
export async function createAction(request, response) {
  try {
    const newMovie = await create(request.body);
    response.json(newMovie);
  } catch (e) {
    response.status(500).json(e);
  }
} 