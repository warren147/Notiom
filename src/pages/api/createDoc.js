import { connectToDatabase } from 'mongodb://localhost:27017';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      const document = await db.collection('documents').insertOne(JSON.parse(req.body));
      res.status(201).json(document);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
