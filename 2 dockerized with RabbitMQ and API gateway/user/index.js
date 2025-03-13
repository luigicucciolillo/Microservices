import { getAllAction, createAction } from './controller.js';
import { getChannel, queue } from './connect.js';
 
const channel = await getChannel();
 
channel.consume(queue, (message) => {
  const messageData = JSON.parse(message.content.toString());
  if (messageData.role === 'user') {
    switch (messageData.cmd) {
      case 'getAll':
        getAllAction(channel, messageData.id);
        break;
      case 'create':
        createAction(channel, messageData.id, messageData.data);
        break;
      default:
        console.error('Unknown command');
        channel.nack(message);
        break;
    }
  }
});