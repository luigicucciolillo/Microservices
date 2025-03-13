/************************************************************************************************************
 * The biggest difference between the user and movie modules can be found in the implementation of the model,
 * which, in both cases, provides a promise interface to the outside world. 
 * In the case of the user model, communication is asynchronous via a message queue. 
 * With the movie module, use synchronous communication via HTTP requests. 
 * In this case, use the axios package, which can be installed via the npm install axios command, to route the requests to the microservice
 ************************************************************************************************************/
import axios from 'axios';
const url = 'http://movie:8181/movie';
export async function getAll() {
  const { data } = await axios.get(url);
  return data;
} 
export async function create(movie) {
  const { data } = await axios.post(url, movie);
  return data;
} 