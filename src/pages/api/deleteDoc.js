// pages/api/deleteDoc.js
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const docId = req.query.docId;
      const client = await clientPromise;
      const db = client.db('notiom');

      // Convert the docId string to an ObjectId
      const response = await db
        .collection('documents')
        .deleteOne({ _id: new ObjectId(docId) });

      // If the document was deleted, the deletedCount will be 1
      if (response.deletedCount === 1) {
        res.status(200).json({ message: 'Document successfully deleted.' });
      } else {
        res.status(404).json({ message: 'Document not found.' });
      }
    } catch (e) {
      // If there is an error related to ObjectId conversion, handle it here
      if (
        e.message.startsWith(
          'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
        )
      ) {
        return res.status(400).json({ error: 'Invalid document ID format.' });
      }
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
