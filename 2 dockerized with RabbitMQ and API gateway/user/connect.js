let channel = null;
export const queue = 'user';
 
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