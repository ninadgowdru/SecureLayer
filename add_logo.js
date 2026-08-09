const Jimp = require('jimp');
const path = require('path');

async function compositeLogo() {
    try {
        // Load the AI generated poster
        const poster = await Jimp.read('C:\\Users\\ninad\\.gemini\\antigravity-ide\\brain\\2fa3041d-992e-4b70-b0d3-0ce9d3e79724\\professional_poster_v2_1786291924833.png');
        
        // Load the logo
        const logo = await Jimp.read('c:\\Users\\ninad\\SecureLayer\\logo.png');
        
        // Resize logo to be appropriate for the poster (poster is likely 1024x1792 or similar)
        // Let's make logo 200px wide
        logo.resize(250, Jimp.AUTO);
        
        // Calculate X position (center)
        const xPos = (poster.bitmap.width / 2) - (logo.bitmap.width / 2);
        
        // Calculate Y position (near top)
        const yPos = 80;
        
        // Composite the logo over the poster
        poster.composite(logo, xPos, yPos, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 1,
            opacityDest: 1
        });
        
        const outPath = 'C:\\Users\\ninad\\.gemini\\antigravity-ide\\brain\\2fa3041d-992e-4b70-b0d3-0ce9d3e79724\\final_poster_with_logo.png';
        await poster.writeAsync(outPath);
        console.log("SUCCESS: " + outPath);
    } catch (err) {
        console.error("ERROR: ", err);
    }
}

compositeLogo();
