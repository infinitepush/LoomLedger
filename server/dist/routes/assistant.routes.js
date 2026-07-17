"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gemini_1 = require("../ai/gemini");
const router = (0, express_1.Router)();
router.post('/ask', async (req, res, next) => {
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
                const json = await response.json();
                if (json.answer && !json.answer.includes("I don't have that information")) {
                    answer = json.answer;
                }
            }
        }
        catch (err) {
            // Connection failure, fallback will handle it
        }
        // 2. Fallback to Gemini if RAG didn't find info
        if (!answer) {
            answer = await gemini_1.geminiService.askAssistantFallback(question);
        }
        res.status(200).json({ answer });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=assistant.routes.js.map