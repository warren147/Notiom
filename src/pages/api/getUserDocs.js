// pages/api/getUserDocs.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = req.query.userId; // Assuming user ID is passed as a query parameter
      const client = await clientPromise;
      const db = client.db('notiom');
      const documents = await db
        .collection('documents')
        .find({ user: process.env.NEXT_PUBLIC_USER_NAME })
        .toArray();
      res.status(200).json(documents);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
