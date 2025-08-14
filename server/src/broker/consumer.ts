import amqp from "amqplib";
import { messageStatusMap } from "../cache-in-memory/cache-in-memory";

const queueName = "fila.notificacao.entrada.VALDIR";
const exchangeName = "notification";
const exchangeType = "direct";
const routingKey = process.env.RABBITMQ_USERNAME;

export async function main() {
  try {
    const connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOSTNAME,
      port: Number(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST,
    });

    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, exchangeType, { durable: true });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, exchangeName, routingKey);

    channel.consume(
      queueName,
      (message) => {
        if (message !== null) {
          const content = message.content.toString();
          const jsonData = JSON.parse(content);

          console.log(`Mensagem recebida: ${content}`);
          channel.ack(message); // Confirme o recebimento da mensagem

          messageStatusMap.set(jsonData.mensagemId, "PROCESSADO");
        }
      },
      { noAck: false }
    );

    console.log(`Consumer iniciado na fila: ${queueName}`);
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
  }
}
