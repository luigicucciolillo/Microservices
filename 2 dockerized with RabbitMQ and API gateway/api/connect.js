import { connect } from 'amqplib';
 
let channel = null;
export const queue = 'user';
 
const registry = {};
    export function register(id, response) {
    registry[id] = response;
  }
   
  export function answer(id, data) {
    if (typeof registry[id] === 'function') {
  registry[id](data);
  } else {
      registry[id].send(data);
    }
    delete registry[id];
  }
   
  export async function getChannel() {
    try {
      if (channel) {
        return channel;
      }
      const connection = await connect('amqp://rabbitmq');
      channel = await connection.createChannel();
   
      const ok = await channel.assertQueue(queue);
   
      if (ok) {
        return channel;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
   
  export function registerHandler(channel) {
    channel.consume(queue, (receivedMessage) => {
      const messageData = JSON.parse(receivedMessage.content.toString());
   
      if (messageData.role === 'user' && messageData.cmd === 'answer') {
        answer(messageData.id, messageData.data);
        channel.ack(receivedMessage);
      } else {
        channel.nack(receivedMessage);
      }
    });
  } 