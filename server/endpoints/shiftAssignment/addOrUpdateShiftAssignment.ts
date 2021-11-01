
import ShiftAssignment from '../../model/shiftAssignment';

export default async (req, res) => {
  const { payload } = req.body
  try {
    if (payload.id) {
      await ShiftAssignment.update(payload, { where: { id: payload.id } })
      return res.status(200).json({ success: true, message: "Shift Assignment Updated Successfully" })
    }

    await ShiftAssignment.create(payload)
    return res.status(200).json({ success: false, message: "Shift Assignment Created Successfully" })

  } catch (e) { }
}