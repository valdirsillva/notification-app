import amqp from "amqplib";

// Cria o mock de channel com todos os métodos usados no Publisher
const channelMock = {
  assertExchange: jest.fn(),
  assertQueue: jest.fn(),
  publish: jest.fn(),
  close: jest.fn(),
};
const connectMock = {
  createChannel: jest.fn().mockResolvedValue(channelMock),
  close: jest.fn(),
};

jest.mock("amqplib", () => ({
  connect: jest.fn().mockResolvedValue(connectMock),
}));

import { Publisher } from "./publisher";

describe("Publisher", () => {
  it("should publish a message to the RabbitMQ queue", async () => {
    const data = {
      messageId: "123",
      messageContent: "Test message notification",
    };

    const publisher = new Publisher();
    await publisher.producerMessage(data);

    const publisherBuffer = channelMock.publish.mock.calls[0][2];
    expect(JSON.parse(publisherBuffer.toString())).toEqual(data);
    // Veifica se p método close() foi chamado
    expect(channelMock.close).toHaveBeenCalled();
  });

  it("should handle error when publishing message", async () => {
    const data = {
      messageId: "456",
      messageContent: "This will fail",
    };

    channelMock.publish.mockImplementationOnce(() => {
      throw new Error("Publish failed");
    });

    const publisher = new Publisher();

    // Captura o console.error
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await publisher.producerMessage(data);

    // Deve ter logado o erro
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));

    // Fecha o canal mesmo com erro
    expect(channelMock.close).toHaveBeenCalled();
    expect(connectMock.close).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
