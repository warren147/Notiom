// pages/api/updateDoc.js
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const client = await clientPromise;
      const db = client.db('notiom');
      console.log('WE Got into post');
      console.log(req.body._id);
      console.log(req.body.body);
      console.log(req.body.title);
      const response = await db
        .collection('documents')
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { body: req.body.body, title: req.body.title } },
        );
      console.log('past response');
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
