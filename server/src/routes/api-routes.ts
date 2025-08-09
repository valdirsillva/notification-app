import express from "express";
import { NotificationController } from "../controllers/notification-controller";
import { CreateNotification } from "../useCases/create-notification";
import { ListNotification } from "../useCases/list-notification";

const router = express.Router();

const factoryMethod = () => {
  const createNotification = new CreateNotification();
  const listNotification = new ListNotification();

  return { createNotification, listNotification };
};

const { createNotification, listNotification } = factoryMethod();

const notificationController = new NotificationController(
  createNotification,
  listNotification
);

router.post(
  "/notificar",
  notificationController.notification.bind(notificationController)
);

router.get(
  "/notificacao/status/:mensagemId",
  notificationController.listNotificationById.bind(notificationController)
);

export { router };
