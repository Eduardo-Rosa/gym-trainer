import mongoose from 'mongoose';
import Exercise from './models/ExerciseImage';
import dotenv from 'dotenv';

dotenv.config();

const exercises = [
  {
    name: "Standing Cable Twist",
    gifUrl: "/standing-cable-twist.gif",
    muscleGroup: "core"
  },
  // Adicione todos os outros exercícios aqui...
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Exercise.deleteMany({});
  await Exercise.insertMany(exercises);
  console.log('Database seeded!');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});