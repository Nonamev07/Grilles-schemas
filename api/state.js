import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'state.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Lire l'état
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({REGULUS:[], FOX:[], Cress:[], Noname:[]}));
    }
    const data = fs.readFileSync(filePath);
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    // Mettre à jour l'état
    const body = req.body;
    fs.writeFileSync(filePath, JSON.stringify(body));
    res.status(200).json({message:'OK'});
  } else {
    res.status(405).json({message:'Method not allowed'});
  }
}
