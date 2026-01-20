export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const correctPassword = process.env.ADMIN_PASSWORD;
  const { password } = req.body;

  if (password === correctPassword) {
    return res.status(200).json({ success: true });
  } else {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return res.status(401).json({ error: 'Invalid password' });
  }
}