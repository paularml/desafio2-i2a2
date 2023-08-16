const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/chat', async (req, res) => {
    const userMessage = req.query.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: userMessage },
                { role: 'assistant', content: 'Você é um Psicólogo da linha a Psicologia positiva, e Augusto Cury, e seu nome é Dr. Arthur' }
            ],
        }),
    };

    try {
        const response = await fetch(apiUrl, requestData);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erro ao enviar mensagem para a API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
