const express = require('express');
const app = express();

// Working with file and directory paths
const path = require('path');

// Init static route for style and script files
app.use('/public/css', express.static(path.join(__dirname, '../dist/css/')));
app.use('/public/js', express.static(path.resolve(__dirname, '../dist/js/')));
app.use('/public/img', express.static(path.resolve(__dirname, '../dist/img/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// listening Port
const LISTEN_PORT = 3000;
app.listen(process.env.LISTEN_PORT || LISTEN_PORT, () => {
    console.log(`listening on port ${process.env.LISTEN_PORT || LISTEN_PORT}...`);
});

module.exports = {
	app,
};
