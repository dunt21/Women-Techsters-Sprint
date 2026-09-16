import {
  createComparison,
  getAllComparisons,
} from "../services/comparisonService.js";

export const comparison = async (req, res) => {
  try {
    const { pickup, dropOff } = req.body;
    const userId = req.user.id;

    if (!pickup)
      return res.status(400).json({ msg: "Please provide  pickup locations" });

    if (!dropOff)
      return res.status(400).json({ msg: "Please provide  dropOff locations" });

    const result = await createComparison(pickup, dropOff, userId);

    return res.status(201).json({ msg: `Here is your quotes: `, data: result });
  } catch (error) {
    console.error(error);

    res.status(500).json({ msg: "Server Error" });
  }
};

export async function getHistory(req, res) {
  try {
    const userId = req.user.id;

    const results = await getAllComparisons(userId);

    res.status(200).json({ msg: "Past comparison history", data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
}
