
import ShiftAssignment from '../../model/shiftAssignment';
import { omit } from 'lodash'

export default async (req, res) => {
  const { payload } = req.body
  try {
    if (payload.id) {
      await ShiftAssignment.update(payload, { where: { id: payload.id } })
      return res.status(200).json({ success: true, message: "Shift Assignment Updated Successfully" })
    }

    if (payload.employeeId.length === 0) res.status(422).json({ success: false, message: "Employee is required" })
    else {
      payload.employeeId.map(async emp => {
        await ShiftAssignment.create({
          ...omit(payload, "employeeId"),
          employeeId: emp
        })
      })
    }
    return res.status(200).json({ success: true, message: "Shift Assignment Created Successfully" })

  } catch (e) { res.status(500).json({ success: false, message: e.message }) }
}