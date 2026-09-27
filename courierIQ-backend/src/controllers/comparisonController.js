import { CompareSchema } from "../schema/compareValidator.js";
import {
  createComparison,
  getAllComparisons,
} from "../services/comparisonService.js";

export const comparison = async (req, res) => {
  const { pickup, dropOff } = req.body;
  const userId = req.user.id;

  const result = await createComparison(pickup, dropOff, userId);

  return res
    .status(201)
    .json({ message: `Your quotes are ready! `, data: result });
};

export async function getHistory(req, res) {
  const userId = req.user.id;
  const limit = req.query.limit;

  const results = await getAllComparisons(userId, limit);

  res.status(200).json({ message: "Past comparison history", data: results });
}
