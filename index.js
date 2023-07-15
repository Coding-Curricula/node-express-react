const express = require('express');
const app = express();

const PORT = 8080;

const emailData = [
    {
        id: 1,
        from: 'name1@email.com',
        subject: 'Test World',
        message: 'Hello World!'
    },
    {
        id: 2,
        from: 'name2@email.com',
        subject: 'Hi World',
        message: 'Hello World!'
    },
    {
        id: 3,
        from: 'name3@email.com',
        subject: 'Whoops',
        message: 'Hello World!'
    },
];

app.get('/', (req, res) => {
    res.send('Hello Team UN!');
});

app.get('/good-mornin-mervin', (req, res) => {
    res.send('Good morning from Mervin!');
});

// GET - /api/emails - returns all emails - PUBLIC
app.get('/api/emails', (req, res) => {
    res.json(emailData);
});

// GET - /api/emails/:id - returns a single email - PUBLIC
app.get('/api/emails/:id', (req, res) => {
    const emailId = Number(req.params.id);
    const email = emailData.find(email => email.id === emailId);
    res.json(email);
});

// POST - /api/emails - creates a new email - PRIVATE
app.post('/api/emails', (req, res) => {
    const newEmail = {
        id: emailData.length + 1,
        from: req.body.from,
        subject: req.body.subject,
        message: req.body.message
    };
    emailData.push(newEmail);
    res.json(newEmail);
});

// PUT - /api/emails/:id - updates an email - PRIVATE
app.put('/api/emails/:id', (req, res) => {
    const emailId = Number(req.params.id);
    const email = emailData.find(email => email.id === emailId);
    email.from = req.body.from;
    email.subject = req.body.subject;
    email.message = req.body.message;
    res.json(email);
});

// DELETE - /api/emails/:id - deletes an email - PRIVATE
app.delete('/api/emails/:id', (req, res) => {
    const emailId = Number(req.params.id);
    const email = emailData.find(email => email.id === emailId);
    const index = emailData.indexOf(email);
    emailData.splice(index, 1);
    res.json(email);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});