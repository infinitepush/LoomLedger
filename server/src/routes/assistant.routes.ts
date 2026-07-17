import { Router, Request, Response, NextFunction } from 'express';
import { geminiService } from '../ai/gemini';

const router = Router();

router.post('/ask', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { question } = req.body;
    if (!question) {
      res.status(400).json({ error: 'Question missing' });
      return;
    }

    let answer = '';
    
    // 1. Try calling the Render RAG service
    try {
      const response = await fetch('https://loomledger-rag.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const json = await response.json() as any;
        if (json.answer && !json.answer.includes("I don't have that information")) {
          answer = json.answer;
        }
      }
    } catch (err) {
      // Connection failure, fallback will handle it
    }

    // 2. Fallback to Gemini if RAG didn't find info
    if (!answer) {
      answer = await geminiService.askAssistantFallback(question);
    }

    res.status(200).json({ answer });
  } catch (error) {
    next(error);
  }
});

export default router;
