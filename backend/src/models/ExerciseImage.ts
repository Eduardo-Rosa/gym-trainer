import mongoose, { Document } from 'mongoose';

interface IExerciseImage extends Document {
  name: string;
  s3Key: string;
  description?: string;
  instructions?: string; // Adicionado
  uploaderId: mongoose.Types.ObjectId;
  permissions: {
    public: boolean;
    allowedUsers?: mongoose.Types.ObjectId[];
  };
  createdAt: Date;
}

const ExerciseImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  s3Key: { type: String, required: true, unique: true },
  description: { type: String },
  instructions: { type: String }, // Adicionado
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: {
    public: { type: Boolean, default: false },
    allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IExerciseImage>('ExerciseImage', ExerciseImageSchema);