import Exercise from '../models/ExerciseImage';

export interface IExerciseRepository {
  findById(id: string): Promise<Exercise | null>;
  save(exercise: Exercise): Promise<void>;
}

export class ExerciseRepository implements IExerciseRepository {
  private exercises: Exercise[] = [];

  async findById(id: string): Promise<Exercise | null> {
    return this.exercises.find(exercise => exercise.id === id) || null;
  }

  async save(exercise: Exercise): Promise<void> {
    this.exercises.push(exercise);
  }
}