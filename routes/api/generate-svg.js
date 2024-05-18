const router = require('express').Router();
const QRCode = require('qrcode');
const { Animal } = require('../../models');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

router.post('/', async (req, res) => {
  const { animalName, animal_species, animalDate, animalGender } = req.body;

  try {
    const animal = await Animal.findOne({ where: { animal_species } });

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    // Generate QR code SVG with a thinner margin
    const qrCodeSvg = await QRCode.toString(animal.information_link, {
      type: 'svg',
      margin: 1,
    });

    // Read the country SVG file
    const countrySvgPath = path.join(__dirname, '../../public', animal.country_svg_path);
    const countrySvg = fs.readFileSync(countrySvgPath, 'utf-8');

    const svgContent = `
      <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="black"/>
        <text x="10" y="30" fill="white" font-size="36" font-family="Arial">${animalName}</text>
        <text x="10" y="50" fill="white" font-size="18" font-family="Arial">${animal.animal_species}</text>
        <text x="10" y="70" fill="white" font-size="16" font-family="Arial">${animal.scientificName}</text>
        <text x="10" y="90" fill="white" font-size="16" font-family="Arial">Acq Date: ${animalDate}</text>
        <text x="10" y="110" fill="white" font-size="16" font-family="Arial">${animalGender}</text>
        <g transform="scale(0.3)">
          <g transform="translate(-60, 500)">
            ${qrCodeSvg}
          </g>
        </g>
        <text x="85" y="165" fill="white" font-size="12" font-family="Arial">Scan to see</text>
        <text x="85" y="180" fill="white" font-size="12" font-family="Arial">more detailed</text>
        <text x="85" y="195" fill="white" font-size="12" font-family="Arial">information about</text>
        <text x="85" y="210" fill="white" font-size="12" font-family="Arial">this species.</text>
        <g transform="scale(0.5) translate(200, 0)">
          ${countrySvg}
        </g>
      </svg>
    `;

    // Save the SVG to the uploads folder
    const fileName = `${animalName}-${Date.now()}.svg`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, svgContent, 'utf-8');

    res.type('image/svg+xml');
    res.send(svgContent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate SVG' });
  }
});

module.exports = router;