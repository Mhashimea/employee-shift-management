import ShiftMaster from '../../model/shiftMaster'

export default async (req, res) => {
  try {
    const { payload } = req.body

    // Check if Id and update the shift
    if (payload.id) {
      await ShiftMaster.update(payload, { where: { id: payload.id } })
      return res.status(200).json({ success: false, message: "Shift Updated Successfully" })
    }

    await ShiftMaster.create(payload)
    return res.status(200).json({ success: true, message: "Shift Created Successfully" })


  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
}