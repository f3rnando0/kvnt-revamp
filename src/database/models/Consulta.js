import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const consultaModel = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    keyword: {
      type: String,
      required: true,
    },
    files: {
      withDomain: {
        type: String,
        default: ""
      },
      withoutDomain: {
        type: String,
        default: ""
      }
    },
    userId: {
      type: String,
      required: true,
    },
    rowsTotal: {
      type: Number,
      required: true,
    },
    range: {
      type: String,
      required: true,
    },
    userInput: {
      type: String,
      required: true,
      }
  },
  {
    timestamps: true,
  },
)

const Consulta = model('Consultas', consultaModel)

export default Consulta