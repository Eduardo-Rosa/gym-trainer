import openai from '../src/config/openAI';

describe('OpenAI API Integration', () => {
  it('should generate fitness instructions', async () => {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um assistente útil.' },
        { role: 'user', content: 'Explique a forma correta de fazer agachamento.' },
      ],
      max_tokens: 100,
    });

    expect(response.choices[0].message?.content).toBeDefined();
  });

  it('should handle API errors', async () => {
    await expect(
      openai.chat.completions.create({
        model: 'invalid-model',
        messages: [{ role: 'user', content: 'test' }],
      })
    ).rejects.toThrow();
  });
});