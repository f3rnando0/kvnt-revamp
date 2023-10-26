import { connect } from 'mongoose'
import { config } from '../config/app.js';

export default async () => {
  try {
    await connect(config.database_uri)
  } catch (e) {
    throw new Error(e.message);
  }
};
