import * as ListModel from "../models/listModel.js";

export const createList = async (req, res) => {
  const { name } = req.body;
  try {
    const list = await ListModel.createList(name);
    res.status(201).json(list);
  } catch (error) {
    console.error("Error al crear la lista:", error);
    res.status(500).json({ error: "Error al crear la lista" });
  }
};

export const getListById = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await ListModel.getListById(id);
    if (list) {
      res.status(200).json(list);
    } else {
      res.status(404).json({ error: "Lista no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la lista:", error);
    res.status(500).json({ error: "Error al obtener la lista" });
  }
};

export const getAllLists = async (req, res) => {
  try {
    const lists = await ListModel.getAllLists();
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error al obtener las listas:", error);
    res.status(500).json({ error: "Error al obtener las listas" });
  }
};
