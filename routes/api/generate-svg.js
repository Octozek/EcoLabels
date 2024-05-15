const router = require('express').Router();
const QRCode = require('qrcode');
const { Animal } = require('../../models');

router.post('/', async (req, res) => {
  const { petName, petSpecies, petDate, petGender } = req.body;

  try {
    const animal = await Animal.findByPk(petSpecies);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    // Generate QR code SVG with a thinner margin
    const qrCodeSvg = await QRCode.toString(animal.information_link, {
      type: 'svg',
      margin: 1, // Set a thinner margin
    });

    const svg = `
      <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="black"/>
        <text x="10" y="30" fill="white" font-size="36" font-family="Arial">${petName}</text> <!-- Increased font size for pet name -->
        <text x="10" y="50" fill="white" font-size="18" font-family="Arial">${animal.animal_species}</text> <!-- Increased font size for animal species -->
        <text x="10" y="70" fill="white" font-size="16" font-family="Arial">${animal.scientificName}</text>
        <text x="10" y="90" fill="white" font-size="16" font-family="Arial">Acq Date: ${petDate}</text>
        <text x="10" y="110" fill="white" font-size="16" font-family="Arial">${petGender}</text>
        <g transform="scale(0.3)">
          <g transform="translate(-60, 500)"> <!-- Adjusted vertical position and moved more left -->
            ${qrCodeSvg}
          </g>
        </g>
        <text x="85" y="165" fill="white" font-size="12" font-family="Arial">Scan to see</text>
        <text x="85" y="180" fill="white" font-size="12" font-family="Arial">more detailed</text>
        <text x="85" y="195" fill="white" font-size="12" font-family="Arial">information about</text>
        <text x="85" y="210" fill="white" font-size="12" font-family="Arial">this species.</text>
      </svg>
    `;

    res.type('image/svg+xml');
    res.send(svg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate SVG' });
  }
});

module.exports = router;
