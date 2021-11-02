import ShiftAssignment from '../../model/shiftAssignment';

export default async (req, res) => {
  try {
    const response = await ShiftAssignment.findAll({
      include: ["shiftDetails", "userDetails"]
    });
    return res.status(200).json({ success: true, data: response });
  } catch (e) {
    return res.status(500).json({ success: false, data: e.message });
  }
};
