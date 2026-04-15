const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5173;

// When running inside a pkg executable, assets are extracted next to the .exe
// process.execDir gives the directory of the .exe file
const distPath = process.pkg
  ? path.join(path.dirname(process.execPath), 'frontend')
  : path.join(__dirname, 'frontend');

app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving from: ${distPath}`);
});
