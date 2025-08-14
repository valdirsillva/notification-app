import { Request, Response, NextFunction } from "express";
import { CreateNotification } from "../useCases/create-notification";
import { Notification } from "../dtos/notification";
import { ListNotification } from "../useCases/list-notification";
import { io } from "../server";

export class NotificationController {
  private useCaseNotificationCreate: CreateNotification;
  private useCaseNotificationList: ListNotification;

  constructor(
    useCaseNotificationCreate: CreateNotification,
    useCaseNotificationList: ListNotification
  ) {
    this.useCaseNotificationCreate = useCaseNotificationCreate;
    this.useCaseNotificationList = useCaseNotificationList;
  }

  public async notification(req: Request, res: Response, next: NextFunction) {
    const payload = req.body as Notification;

    if (!payload.messageContent)
      return res.status(400).json({
        error: `A ${payload.messageContent} não pode ser vazio.`,
        success: false,
      });

    try {
      const notitication = await this.useCaseNotificationCreate.execute(
        payload
      );

      /**
       * Enviar para todos os clientes conectados
       */
      io.emit("nova_notificacao", notitication);

      res.status(202).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  public async listNotificationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { mensagemId } = req.params;

    console.log(mensagemId);

    try {
      const notification = await this.useCaseNotificationList.execute(
        mensagemId
      );
      console.log(notification);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
