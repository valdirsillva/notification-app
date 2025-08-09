import amqp from "amqplib";

const queueName = "fila.notificacao.entrada.VALDIR";

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

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(
      queueName,
      (message) => {
        if (message !== null) {
          const content = message.content.toString();
          const jsonData = JSON.parse(content);

          console.log(`Mensagem recebida: ${content}`);
          channel.ack(message); // Confirme o recebimento da mensagem

          // Salva dados da notificação no banco de dados
          // createNotificationController.handle(jsonData);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
  }
}
