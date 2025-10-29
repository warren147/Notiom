import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const client = await clientPromise;
      const db = client.db('notiom');
      const { _id, body, title } = req.body || {};

      if (typeof _id !== 'string' || !_id.trim()) {
        return res.status(400).json({ error: 'A valid document ID is required.' });
      }

      const updatePayload = {
        updatedAt: new Date(),
      };

      if (typeof title === 'string') {
        updatePayload.title = title;
      }

      if (typeof body === 'string') {
        updatePayload.body = body;
      }

      const collection = db.collection('documents');
      let updatedDoc = null;

      if (ObjectId.isValid(_id)) {
        const objectId = new ObjectId(_id);
        const updateResult = await collection.updateOne(
          { _id: objectId },
          { $set: updatePayload },
        );
        if (updateResult.matchedCount > 0) {
          updatedDoc = await collection.findOne({ _id: objectId });
        }
      }

      if (!updatedDoc) {
        const updateResult = await collection.updateOne(
          { _id },
          { $set: updatePayload },
        );
        if (updateResult.matchedCount > 0) {
          updatedDoc = await collection.findOne({ _id });
        }
      }

      if (!updatedDoc) {
        return res.status(404).json({ error: 'Document not found' });
      }

      await db.collection('activities').insertOne({
        documentId: updatedDoc._id,
        type: 'update',
        message: `Document updated${updatedDoc.title ? ` – ${updatedDoc.title}` : ''}`,
        title: updatedDoc.title,
        timestamp: new Date(),
      });

      res.status(200).json({
        ...updatedDoc,
        _id: updatedDoc._id.toString(),
      });
    } catch (e) {
      console.error('Failed to update document', e);
      res.status(500).json({ error: e.message || 'Unexpected server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
