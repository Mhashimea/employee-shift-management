import Holiday from '../../model/holiday'

export default async (req, res) => {
  try {
    const data = await Holiday.findAll()
    return res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
}