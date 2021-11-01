import ShiftMaster from '../../model/shiftMaster'

export default async (req, res) => {
  try {
    const response = await ShiftMaster.findAll({
      include: ['shiftDetails']
    })
    return res.status(200).json({ success: false, data: response })

  } catch (e) { }
}