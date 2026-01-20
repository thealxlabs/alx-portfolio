export default async function handler(req, res) {
  const visitorIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const allowedIP = process.env.ALLOWED_IP;

  if (visitorIP === allowedIP) {
    return res.status(200).json({ allowed: true });
  } else {
    return res.status(403).json({ error: 'Access denied' });
  }
}