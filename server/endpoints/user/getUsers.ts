import User from '../../model/user'

export default async (req, res) => {
  try {
    const data = await User.findAll()
    return res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
}