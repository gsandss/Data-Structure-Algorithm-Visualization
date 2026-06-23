const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sortingRoutes = require('./routes/sortingRoutes');
app.use('/api/sorting', sortingRoutes);

app.get('/', (req, res) => res.send('Algorithms backend running'));

app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
