import {
  bookDelivery,
  getAllPastDeliveries,
} from "../services/deliveryService.js";

export async function deliveryController(req, res) {
  try {
    const userId = req.user.id;
    const data = req.body;
    data.userId = userId;
    data.trackingUrl = "https://track.courieriq.com/12345";

    console.log(data);

    if (!data.pickup || !data.dropoff || !data.courier)
      return res.status(400).json({ msg: "Please select a delivery option" });

    const result = await bookDelivery(data);

    res
      .status(201)
      .json({ msg: "Delivery selected successfully", data: result });
  } catch (err) {
    console.error(err);

    res.status(500).json({ msg: "Server Error" });
  }
}

export async function getHistory(req, res) {
  try {
    const userId = req.user.id;

    const results = await getAllPastDeliveries(userId);

    res
      .status(200)
      .json({ msg: "Past selected deliveries history", data: results });
  } catch (error) {
    console.error(error);

    res.status(500).json({ msg: "Server Error" });
  }
}
