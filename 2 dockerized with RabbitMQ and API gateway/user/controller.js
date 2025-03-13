import { create, getAll } from './model.js';
import { getChannel, queue } from './connect.js';
 
function createMessage(id, data) {
  return {
    role: 'user',
    cmd: 'answer',
    id,
    data,
  };
}
 
async function send(message) {
  const channel = await getChannel();
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}
 
export async function getAllAction(channel, id) {
  const data = await getAll();
  const message = createMessage(id, data);
  send(message);
}
 
export async function createAction(channel, id, data) {
  const newData = await create(data);
  const message = createMessage(id, newData);
  send(message);
} 