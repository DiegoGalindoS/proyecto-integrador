import {
  createList,
  getListById,
  getAllLists,
} from "../../../models/listModel.js";

export const createListHandler = async (req, res) => {
  const { name } = req.body;

  try {
    const newList = await createList(name);
    res.status(201).json(newList);
  } catch (error) {
    console.error("Error al crear la lista:", error);
    res.status(500).json({ error: "Error al crear la lista" });
  }
};

export const getListByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await getListById(id);
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

export const getAllListsHandler = async (req, res) => {
  try {
    const lists = await getAllLists();
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error al obtener las listas:", error);
    res.status(500).json({ error: "Error al obtener las listas" });
  }
};
