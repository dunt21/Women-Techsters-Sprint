import { PreferredDelivery } from "../models/index.js";

export async function bookDelivery(data) {
  const deliveryBooked = await PreferredDelivery.create({
    pickupLocation: data.pickup,
    dropoffLocation: data.dropoff,
    selectedCourier: data.courier,
    estimatedTime: data.estimatedTime,
    price: data.price,
    trackingUrl: data.trackingUrl,
    userId: data.userId,
  });

  return deliveryBooked;
}

export async function getAllPastDeliveries(userId) {
  const deliveryHistory = await PreferredDelivery.findAll({
    where: { userId: userId },
  });

  return deliveryHistory;
}
