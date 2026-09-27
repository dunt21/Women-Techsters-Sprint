import { SearchHistory, CourierQuote } from "../models/index.js";

export const createComparison = async (pickupLoc, dropOffLoc, id) => {
  console.log(id);
  const newSearch = await SearchHistory.create({
    pickupLocation: pickupLoc,
    destination: dropOffLoc,
    userId: id,
  });

  const newQuotes = [
    {
      courier: "Yango",

      rating: "4.6",

      estimatedTime: "~4h 50m",
      price: 46,
      dropOffDate: "Tomorrow",
      dropOffTime: "Before 6:00 PM",

      searchHistoryId: newSearch.id,
    },
    {
      courier: "Uber",

      rating: "4.4",

      estimatedTime: "~4h 30m",

      price: 50,
      dropOffDate: "Tomorrow",
      dropOffTime: "Before 5:00 PM",

      searchHistoryId: newSearch.id,
    },
    {
      courier: "Bolt",

      rating: "4.2",

      estimatedTime: "~5h 10m",
      speedTier: "Standard",
      price: 52,
      dropOffDate: "Tomorrow",
      dropOffTime: "Before 7:00 PM",

      searchHistoryId: newSearch.id,
    },
  ];

  const savedQuotes = await CourierQuote.bulkCreate(newQuotes);

  return { search: newSearch, quotes: savedQuotes };
};

export async function getAllComparisons(userId) {
  const results = await SearchHistory.findAll({
    where: { userId: userId },
    include: [CourierQuote],
  });

  return results;
}
