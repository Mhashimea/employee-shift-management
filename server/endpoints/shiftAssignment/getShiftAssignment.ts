import ShiftAssignment from '../../model/shiftAssignment'
import ShiftDetails from '../../model/shiftDetails'
import ShiftMaster from '../../model/shiftMaster'
import User from '../../model/user'

export default async (req, res) => {
  try {
    const response = await ShiftAssignment.findAll({
      include: [{ model: ShiftMaster, include: [{ model: ShiftDetails }] }, { model: User }]
    })
    return res.status(200).json({ success: false, data: response })

  } catch (e) { }
}