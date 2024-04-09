import { connectToDatabase } from 'mongodb://localhost:27017';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { db } = await connectToDatabase();
      const deleteResult = await db.collection('documents').deleteOne({ _id: ObjectId(req.query.id) });
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}