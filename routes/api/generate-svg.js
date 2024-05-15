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

        const qrCodeSvg = await QRCode.toString(animal.information_link, { type: 'svg' });
        const svg = `
            <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" fill="black"/>
                <text x="10" y="30" fill="white" font-size="20" font-family="Arial">${petName}</text>
                <text x="10" y="60" fill="white" font-size="16" font-family="Arial">${animal.animal_species}</text>
                <text x="10" y="90" fill="white" font-size="16" font-family="Arial">${animal.scientificName}</text>
                <text x="10" y="120" fill="white" font-size="16" font-family="Arial">${petDate}</text>
                <text x="10" y="150" fill="white" font-size="16" font-family="Arial">${petGender}</text>
                <g transform="translate(10, 160) scale(0.5)">
                    ${qrCodeSvg}
                </g>
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
