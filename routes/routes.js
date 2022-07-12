import Express from 'express';

import { Model } from '../models/model.js';

const Routers = Express.Router();

Routers.post('/post', async (request, response) => {
  const dataPost = new Model({
    title: request.body.title,
    name: request.body.name,
    age: request.body.age
  });

  try {
    const dataPostToSave = await dataPost.save();
    response.status(200).json(dataPostToSave);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

Routers.get('/getAll', async (request, response) => {
  try {
    const dataDescription = await Model.find();
    response.status(200).json(dataDescription);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

Routers.get('/getOne/:id', async (request, response) => {
  try {
    const dataDescription = await Model.findOne();
    response.status(200).json(dataDescription);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

Routers.patch('/update/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const updatedData = request.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    response.status(200).send(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

Routers.delete('/delete/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const data = await Model.findByIdAndDelete(id);
    response.send(`Document with ${data.name} has been deleted`);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

export default Routers;
