import { connectToDatabase } from 'mongodb://localhost:27017';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const document = await db.collection('documents').findOne({ _id: ObjectId(req.query.id) });
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
