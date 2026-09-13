import { createComparison } from "../services/comparisonService";

export const comparison = async (req, res) => {
  try {
    const { pickup, dropOff } = req.body;
    const userId = red.user.userId;

    if (!pickup)
      return res.status(400).json({ msg: "Please provide  pickup locations" });

    if (!dropOff)
      return res.status(400).json({ msg: "Please provide  dropOff locations" });

    const result = await createComparison(pickup, dropOff, userId);

    return res.status(201).json({ msg: result });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
