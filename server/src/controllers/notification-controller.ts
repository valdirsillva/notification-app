import { Request, Response, NextFunction } from "express";
import { CreateNotification } from "../useCases/create-notification";
import { Notification } from "../dtos/notification";
import { ListNotification } from "../useCases/list-notification";

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
      return res
        .status(400)
        .json({ error: `A ${payload.messageContent} não pode ser vazio.` });

    try {
      await this.useCaseNotificationCreate.execute(payload);
      res.status(201).json({ message: "Notificação criada com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  public async listNotificationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { mensagemId } = req.body;

    try {
      await this.useCaseNotificationList.execute(mensagemId);
    } catch (error) {
      next(error);
    }
  }
}
