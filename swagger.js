const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API StartupPitcher",
    description: "Documentación de la API para la gestión de startups y pitches.",
  },
  host: "startup-pitcher-back.vercel.app",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
