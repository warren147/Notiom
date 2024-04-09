import { connectToDatabase } from 'mongodb://localhost:27017';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      const { id, content } = JSON.parse(req.body);
      const updateResult = await db.collection('documents').updateOne({ _id: ObjectId(id) }, { $set: { content } });
      if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: 'Document not found or content unchanged' });
      }
      res.status(200).json(updateResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}