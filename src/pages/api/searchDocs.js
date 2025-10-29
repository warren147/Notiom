import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';

  try {
    const client = await clientPromise;
    const db = client.db('notiom');

    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { body: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const documents = await db
      .collection('documents')
      .find(filter)
      .sort({ updatedAt: -1, createdAt: -1 })
      .toArray();

    const serialized = documents.map((doc) => ({
      _id: doc._id.toString(),
      title: doc.title ?? '',
      body: doc.body ?? '',
      user: doc.user ?? null,
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
      updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
    }));

    res.status(200).json(serialized);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
