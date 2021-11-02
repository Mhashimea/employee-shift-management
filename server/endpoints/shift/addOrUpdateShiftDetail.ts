import ShiftDetails from '../../model/shiftDetails'
import ShiftMaster from '../../model/shiftMaster'

export default async (req, res) => {
  try {
    const { payload } = req.body

    // Check if Id and update the shift
    if (payload.id) {
      await ShiftMaster.update(payload, { where: { id: payload.id } })
      await ShiftDetails.update(payload, { where: { shiftMasterId: payload.id } })
      return res.status(200).json({ success: false, message: "Shift Updated Successfully" })
    }

    const response = await ShiftMaster.create(payload)
    if (payload.shiftDetails && payload.shiftDetails.length > 0) {
      payload.shiftDetails.map(async shift => {
        const data = {
          shiftMasterId: response.id,
          ...shift
        }
        await ShiftDetails.create(data)
      })
    }

    return res.status(200).json({ success: true, message: "Shift Created Successfully" })


  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
}