
import { Sequelize } from 'sequelize-typescript';
import Holiday from '../../model/holiday'

export default async (req, res) => {
  const { payload } = req.body
  try {
    // TDOD:  Check holiday already exists

    if (payload.id) {
      await Holiday.update(payload, { where: { id: payload.id } })
      return res.status(200).json({ success: true, message: "Holiday Updated Successfully" })
    }

    await Holiday.create(payload)
    return res.status(200).json({ success: true, message: "Holiday Created Successfully" })

  } catch (e) { res.status(500).json({ success: false, message: e.message }) }
}