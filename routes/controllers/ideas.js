const getClient = require("../../db/mongo");
const { ObjectId } = require("mongodb");
const moment = require('moment-timezone');


const crearIdeas = async (req, res) => {
  const client = await getClient();
  const datos = req.body;
  try {
    const timezone = datos.timezone || 'UTC';
    const fechaLocal = moment().tz(timezone).toDate();
    const result = await client
      .db("StartupPitcher")
      .collection("ideas")
      .insertOne({userId: datos.userId, username: datos.username, titulo: datos.titulo, descripcion: datos.descripcion, fecha: fechaLocal, estado: "privado"});
    res.status(200).json({ status: "Idea creada" });
  } catch (error) {
    console.error("Error al crear la idea:", error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const getIdeas = async (req, res) => {
  const client = await getClient();
  const userId = req.params.userId;
  try {
    const ideas = await client
      .db("StartupPitcher")
      .collection("ideas")
      .find({ userId: userId })
      .toArray();
    res.status(200).json(ideas);
  } catch (error) {
    console.error("Error al obtener las ideas:", error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const getIdeaId = async (req, res) => {
  const { id } = req.params;
  const client = await getClient();
  try {
    const idea = await client
      .db("StartupPitcher")
      .collection("ideas")
      .findOne({ _id: new ObjectId(id) });

    if (!idea) return res.status(404).json({ message: 'Idea no encontrada' });

    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la idea' });
  }
};

const eliminarIdea = async (req, res) => {
    const client = await getClient();
    const ideaId = req.params.ideaId;
    try {
        const result = await client
        .db("StartupPitcher")
        .collection("ideas")
        .deleteOne({ _id: new ObjectId(ideaId) });
        if (result.deletedCount === 1) {
        res.status(200).json({ status: "Idea eliminada" });
        } else {
        res.status(404).json({ status: "Error", message: "Idea no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la idea:", error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
}

const actualizarIdea = async (req, res) => {
    const client = await getClient();
    const { ideaId, nuevoEstado } = req.body;
    try {
        const result = await client
        .db("StartupPitcher")
        .collection("ideas")
        .updateOne({ _id: new ObjectId(ideaId) }, { $set: { estado: nuevoEstado } });
        if (result.matchedCount === 1) {
          res.status(200).json({ status: "Idea actualizada" });
        } else {
          res.status(404).json({ status: "Error", message: "Idea no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar la idea:", error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
}

const estadisticas = async (req, res) => {
  const { userId } = req.params;
  const client = await getClient();

  try {
    const ideas = await client.db("StartupPitcher").collection("ideas").find({ userId }).toArray();

    const total = ideas.length;
    const conFeedback = ideas.filter((idea) => idea.aiFeedback).length;
    const sinFeedback = ideas.filter((idea) => !idea.aiFeedback).length;
    const conPitch = ideas.filter((idea) => idea.pitch).length;

    res.json({
      total,
      conFeedback,
      sinFeedback,
      conPitch,
    });
  } catch (err) {
    console.error("Error al obtener estadísticas:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

const ideasPublicas = async (req, res) => {
  const client = await getClient();
  try {
    const ideas = await client
      .db("StartupPitcher")
      .collection("ideas")
      .find({ estado: "publico" })
      .project({
        userId: 1,
        username: 1,
        titulo: 1,
        descripcion: 1,
        fecha: 1,
        aiFeedback: 1,
        pitch: 1,
      })
      .toArray();

    res.status(200).json(ideas);
  } catch (err) {
    console.error("Error al obtener ideas públicas:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const editarIdea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, pitch } = req.body;

  try {
    const client = await getClient();
    const result = await client
      .db("StartupPitcher")
      .collection("ideas")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { titulo, descripcion, pitch } },
        { returnDocument: "after" }
      );

    if (result.value) {
      return res.status(200).json(result.value); // ✅ JSON válido
    } else {
      return res.status(404).json({ message: "Idea no encontrada" });
    }
  } catch (err) {
    console.error("Error actualizando idea:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { crearIdeas, getIdeas, getIdeaId, eliminarIdea, actualizarIdea, estadisticas, ideasPublicas, editarIdea };