import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('notiom');
      const timestamp = new Date();
      const docToInsert = {
        title: req.body?.title ?? '',
        body: req.body?.body ?? '',
        user: req.body?.user ?? null,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const { insertedId } = await db
        .collection('documents')
        .insertOne(docToInsert);

      if (insertedId) {
        const newDoc = {
          _id: insertedId.toString(),
          ...docToInsert,
        };

        await db.collection('activities').insertOne({
          documentId: insertedId,
          type: 'create',
          message: `Document created${docToInsert.title ? ` – ${docToInsert.title}` : ''}`,
          title: docToInsert.title,
          timestamp: timestamp,
        });

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
