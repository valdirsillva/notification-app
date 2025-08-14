import { main } from "../broker/consumer";
import { messageStatusMap } from "../cache-in-memory/cache-in-memory";

export class ListNotification {
  constructor() {}

  async execute(mensagemId: string) {
    main();

    return messageStatusMap.get(mensagemId) || "NAO_ENCONTRADO";
  }
}
