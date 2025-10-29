import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { docId } = req.query;

  if (typeof docId !== 'string') {
    return res.status(400).json({ error: 'A valid docId query parameter is required.' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('notiom');
    const objectId = new ObjectId(docId);

    const logs = await db
      .collection('activities')
      .find({ documentId: objectId })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    const serialized = logs.map((log) => ({
      ...log,
      _id: log._id.toString(),
      documentId: log.documentId.toString(),
      timestamp: log.timestamp instanceof Date ? log.timestamp.toISOString() : log.timestamp,
    }));

    res.status(200).json(serialized);
  } catch (e) {
    console.error('Failed to fetch activities', e);
    res.status(500).json({ error: e.message });
  }
}
