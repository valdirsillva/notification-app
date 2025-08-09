import { Publisher } from "../broker/publisher";
import { Notification } from "../dtos/notification";

export class CreateNotification {
  constructor() {}

  async execute(payload: Notification) {
    // Realizar publicação de mensagen no rabbitMQ
    const publisher = new Publisher();

    const response = await publisher.producerMessage(payload);
  }
}
