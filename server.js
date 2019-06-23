const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'dist', 'online-resume')));

app.get('/*', (req, res) => {
  res.sendfile(path.join(__dirname, 'dist', 'online-resume', 'index.html'));
});

app.listen(port, () => {
  console.log('Server running on port', port);
});
