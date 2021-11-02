import ShiftMaster from '../../model/shiftMaster'

export default async (req, res) => {
  try {
    const response = await ShiftMaster.findOne({
      where: {
        id: req.body.id
      }
    })
    return res.status(200).json({ success: true, data: response })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
}