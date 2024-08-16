import mongoose from "mongoose";

const fraseSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
});

const Frase = mongoose.model("Frase", fraseSchema);

export default Frase;
