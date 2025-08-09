import amqp from "amqplib";
import { Notification } from "../dtos/notification";

export class Publisher {
  constructor() {}

  public async producerMessage(data: Notification) {
    try {
      const queueName = "fila.notificacao.entrada.VALDIR";

      const connection = await amqp.connect({
        protocol: process.env.RABBITMQ_PROTOCOL,
        hostname: process.env.RABBITMQ_HOSTNAME,
        port: Number(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USERNAME,
        password: process.env.RABBITMQ_PASSWORD,
        vhost: process.env.RABBITMQ_VHOST,
      });

      const channel = await connection.createChannel();

      const exchange = "notification";
      await channel.assertExchange(exchange, "direct", { durable: true });

      await channel.assertQueue(queueName, {
        durable: true,
      });

      const routingKey = process.env.RABBITMQ_USERNAME;

      await channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(data))
      );

      console.log(" [x] Send %s", JSON.stringify(data));

      await channel.close();
      await connection.close();
    } catch (error) {
      console.error(error);
    }
  }
}
