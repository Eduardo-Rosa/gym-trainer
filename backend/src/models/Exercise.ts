import mongoose, { Document } from 'mongoose';

interface IExercise extends Document {
  name: string;
  gifUrl: string;
  muscleGroup: string;
  instructions?: string;
}

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gifUrl: { type: String, required: true },
  muscleGroup: { type: String, enum: ['core', 'upper', 'lower'], required: true },
  instructions: { type: String }
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);