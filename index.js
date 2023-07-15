const express = require('express');
const app = express();

const PORT = 8080;

app.get('/good-mornin-mervin', (req, res) => {
    res.send('Good morning from Mervin!');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});