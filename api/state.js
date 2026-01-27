const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'state.json');

module.exports = async (req, res) => {
  // Si state.json n'existe pas, on le crée avec des objets vides
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        REGULUS: {},
        FOX: {},
        Cress: {},
        Noname: {}
      })
    );
  }

  if (req.method === 'GET') {
    const data = fs.readFileSync(filePath, 'utf8');
    res.status(200).json(JSON.parse(data));
    return;
  }

  if (req.method === 'POST') {
    fs.writeFileSync(filePath, JSON.stringify(req.body));
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
