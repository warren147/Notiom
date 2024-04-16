import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('notiom');
      const { insertedId } = await db
        .collection('documents')
        .insertOne(req.body);

      if (insertedId) {
        const newDoc = {
          _id: insertedId,
          ...req.body,
        };
        res.status(200).json(newDoc);
      } else {
        res.status(500).json({ error: 'Document insertion not acknowledged' });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
