import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../config/db';
import User from '../../../../models/User';

import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const {email, password} = req.body;
await dbConnect();
const user = await User.findOne({email});
if (!user) {
  return res.status(404).json({ message: 'User not found' });
}
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1889235006.
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(401).json({ message: 'Invalid email or password' });
}
res.status(200).json({ message: 'Login successful' });
}

}