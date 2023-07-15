const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

const PORT = 8080;

// Middleware
app.use(express.json());

const emailData = [
    {
        id: 1,
        to: 'name1@email.com',
        subject: 'Test World',
        message: 'Hello World!'
    },
    {
        id: 2,
        to: 'name2@email.com',
        subject: 'Hi World',
        message: 'Hello World!'
    },
    {
        id: 3,
        to: 'name3@email.com',
        subject: 'Whoops',
        message: 'Hello World!'
    },
];

app.get('/', (req, res) => {
    res.send('Hello Team UN!');
});

app.get('/good-mornin-mervin', (req, res) => {
    res.send('Good morning to Mervin!');
});

// GET - /api/emails - returns all emails - PUBLIC
app.get('/api/emails', (req, res) => {
    try {
        res.json(emailData);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// GET - /api/emails/:id - returns a single email - PUBLIC
app.get('/api/emails/:id', (req, res) => {
    try {
        const emailId = Number(req.params.id);
        const email = emailData.find(email => email.id === emailId);


        if (!email) {
            return res.status(404).json({
                message: 'Email not found'
            });
        }

        res.json(email);

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// POST - /api/emails - creates a new email - PUBLIC
app.post('/api/emails', (req, res) => {
    try {

        if (!req.body.to || !req.body.subject || !req.body.message) {
            return res.status(400).json({
                message: 'Please enter all fields'
            });
        }

        const newEmail = {
            id: emailData.length + 1,
            to: req.body.to,
            subject: req.body.subject,
            message: req.body.message
        };
        emailData.push(newEmail);
        res.json(newEmail);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// POST - /api/emails/send-email - sends an email - PUBLIC
app.post('/api/emails/send-email', (req, res) => {

    let { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({
            message: 'Please enter all fields'
        });
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        text: message
    };

    // update emailData array
    const newEmail = {
        id: emailData.length + 1,
        to: to,
        subject: subject,
        message: message
    };

    emailData.push(newEmail);

    try {
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: 'Server error'
                });
            }
            return res.json({
                message: 'Email sent'
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});



// PUT - /api/emails/:id - updates an email - PUBLIC
app.put('/api/emails/:id', (req, res) => {
    try {
        const emailId = Number(req.params.id);
        const email = emailData.find(email => email.id === emailId);
        email.to = req.body.to;
        email.subject = req.body.subject;
        email.message = req.body.message;
        res.json(email);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// DELETE - /api/emails/:id - deletes an email - PUBLIC
app.delete('/api/emails/:id', (req, res) => {
    try {
        const emailId = Number(req.params.id);
        const email = emailData.find(email => email.id === emailId);
        const index = emailData.indexOf(email);
        emailData.splice(index, 1);
        res.json(email);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});