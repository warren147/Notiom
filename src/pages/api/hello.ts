// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';


const app = express();
app.use(bodyParser.json());

const docSchema = new mongoose.Schema({
  id: {type: Number},
  title: {type: String}
});


const Doc = mongoose.model("Fan", docSchema);


app.get('/api/documents', async (req, res) => {
  const documents = await Doc.find();
  res.json(documents);
});

app.post('/api/documents', async (req, res) => {
  const { id, content } = req.body;
  if (id) {
    const document = await Doc.findByIdAndUpdate(id, { content }, { new: true });
    res.json(document);
  } else {
    const newDocument = new Doc({ content });
    await newDocument.save();
    res.json(newDocument);
  }
});

app.delete('/api/documents/:id', async (req, res) => {
  await Doc.findByIdAndRemove(req.params.id);
  res.json({ message: 'Deleted' });
});

