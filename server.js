const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connection to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/the-unsocializr', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Display all events in console
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
