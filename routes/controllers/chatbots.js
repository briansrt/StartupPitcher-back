const getClient = require("../../db/mongo");
const { ObjectId } = require("mongodb");
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const solicitarFeedback = async (req, res) => {
  const { ideaId } = req.body;

  if (!ideaId || !ObjectId.isValid(ideaId)) {
    return res.status(400).json({ message: "ID de idea inválido" });
  }

  try {
    const client = await getClient();
    const db = client.db("StartupPitcher");
    const ideasCollection = db.collection("ideas");

    const idea = await ideasCollection.findOne({ _id: new ObjectId(ideaId) });

    if (!idea) {
      return res.status(404).json({ message: "Idea no encontrada" });
    }

    const prompt = `
        Eres un experto en análisis de ideas de negocio. Analiza la siguiente idea y proporciona un análisis estructurado:

        Título: ${idea.titulo}
        Descripción: ${idea.descripcion}

        🔍 Resultados del análisis:
        ✅ Fortalezas:
        - 

        ⚠️ Áreas de mejora:
        - 

        💡 Ideas adicionales:
        - 
    `;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un asesor profesional que da retroalimentación sobre ideas de negocio. Solo puedes hablar sobre ideas, sus descripciones. Si el usuario te pregunta sobre cualquier otro tema, responde amablemente que solo puedes ayudar con ideas.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const aiFeedback = chatResponse.choices[0].message.content;

    // Guardar el feedback en MongoDB
    const updateResult = await ideasCollection.updateOne(
      { _id: new ObjectId(ideaId) },
      { $set: { aiFeedback } }
    );

    if (updateResult.modifiedCount !== 1) {
      return res.status(500).json({ message: "No se pudo guardar el feedback" });
    }

    return res.status(200).json({ feedback: aiFeedback });
  } catch (error) {
    console.error("Error al generar feedback:", error);
    return res.status(500).json({ message: "Error generando feedback con OpenAI" });
  }
};

const mejorarPitch = async (req, res) => {
  const { pitch, descripcion } = req.body;

  try {
    const prompt = `
Eres un experto en comunicación de startups. A continuación tienes una descripción de una idea y un pitch original. Mejora el pitch usando la estructura del "Elevator Pitch". Hazlo más claro, persuasivo y profesional.

Descripción de la idea:
"${descripcion}"

Pitch original:
"${pitch}"

Pitch mejorado:
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un asistente especializado en mejorar pitches de ideas. Solo puedes hablar sobre ideas, sus descripciones y cómo mejorar su comunicación. Si el usuario te pregunta sobre cualquier otro tema, responde amablemente que solo puedes ayudar con ideas y pitches.",
        },
        { role: "user", content: prompt }],
      temperature: 0.7,
    });

    const mejorado = response.choices[0].message.content.trim();
    res.status(200).json({ pitchMejorado: mejorado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al mejorar el pitch con IA" });
  }
};

const guardarPitch = async (req, res) => {
  const client = await getClient();
  const { ideaId, pitch } = req.body;

  try {
    await client
      .db("StartupPitcher")
      .collection("ideas")
      .updateOne({ _id: new ObjectId(ideaId) }, { $set: { pitch } });

    res.status(200).json({ message: "Pitch guardado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al guardar el pitch" });
  }
};

module.exports = {solicitarFeedback, mejorarPitch, guardarPitch};
