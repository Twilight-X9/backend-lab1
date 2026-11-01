const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Lab 01 Express Server!');
});

app.get('/about', (req, res) => {
  res.status(200).json({
    name: 'Pinisetti Sai Babu',
    rollNo: '252U1R1192',
    section: 'S-019'
  });
});

app.get('/time', (req, res) => {
  const currentDate = new Date();
  res.status(200).json({
    currentTime: currentDate.toISOString(),
    formatted: currentDate.toString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
    message: `Route '${req.originalUrl}' does not exist on this server.`
  });
});

// Start listening for incoming requests
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
