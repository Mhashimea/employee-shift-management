import ShiftMaster from '../../model/shiftMaster'

export default async (req, res) => {
  try {
    const response = await ShiftMaster.findAll()
    return res.status(200).json({ success: true, data: response })

  } catch (e) { }
}