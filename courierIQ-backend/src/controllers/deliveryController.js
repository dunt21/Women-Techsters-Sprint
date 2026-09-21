import { deliverySchema } from "../schema/deliverySchema.js";
import {
  bookDelivery,
  getAllPastDeliveries,
} from "../services/deliveryService.js";

export async function deliveryController(req, res) {
  const userId = req.user.id;
  const data = req.body;
  data.userId = userId;
  data.trackingUrl = "https://track.courieriq.com/12345";

  const result = await bookDelivery(data);

  res.status(201).json({ msg: "Delivery selected successfully", data: result });
  res
    .status(201)
    .json({ message: "Delivery selected successfully", data: result });
}

export async function getHistory(req, res) {
  const userId = req.user.id;

  const results = await getAllPastDeliveries(userId);

  res
    .status(200)

    .json({ message: "Past selected deliveries history", data: results });
}
