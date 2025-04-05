import { Request, Response } from 'express';
import Exercise from '../models/ExerciseImage';
import OpenAI from '../config/openAI';

export const getExercise = async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });

    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const generateInstructions = async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });

    const prompt = `
      Como personal trainer certificado, gere instruções detalhadas para:
      Exercício: ${exercise.name}
      Inclua:
      1. Posicionamento inicial (3 pontos críticos)
      2. Execução passo-a-passo (máx. 5 passos)
      3. Erros comuns (rank dos 3 mais graves)
      4. Variações para iniciantes/avançados
      5. Dicas de respiração específicas
      Formato: Markdown com emojis
    `;

    const response = await OpenAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um assistente útil.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    exercise.instructions = response.choices[0].message?.content?.trim();
    await exercise.save();

    res.json({ instructions: exercise.instructions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate instructions' });
  }
};