import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('notiom');
      const documents = await db
        .collection('documents')
        .find()
        .sort({ updatedAt: -1, createdAt: -1 })
        .toArray();
      const serializedDocs = documents.map((doc) => ({
        _id: doc._id.toString(),
        title: doc.title ?? '',
        body: doc.body ?? '',
        user: doc.user ?? null,
        createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
        updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
      }));
      res.status(200).json(serializedDocs);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
