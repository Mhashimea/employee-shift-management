import User from '../../model/user'

export default async (req, res) => {
  try {
    const { payload } = req.body

    // Check if email is already exist
    const email = await User.findOne({
      where: { email: payload.email },
    })
    if (email && email.id !== payload.id) return res.status(422).json({ success: false, message: "Email already exist" })

    // Check if Id and update the user
    if (payload.id) {
      await User.update(payload, {
        where: { id: payload.id }
      })
      return res.status(200).json({ success: true, message: "User Updated Successfully" })
    }

    // Create User
    await User.create(payload)
    return res.status(200).json({ success: true, message: "User Created Successfully" })


  } catch (e) {
    res.status(500).json({ success: false, message: e.message })
  }
}