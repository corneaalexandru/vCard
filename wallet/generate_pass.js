const fs = require('fs');
const crypto = require('crypto');
const { exec } = require('child_process');
const path = require('path');

const PASS_DIR = __dirname;
const MANIFEST_FILE = path.join(PASS_DIR, 'manifest.json');
const OUTPUT_PASS = path.join(PASS_DIR, 'businesscard.pkpass');

// Files to exclude from manifest
const EXCLUDES = ['.DS_Store', 'manifest.json', 'signature', 'generate_pass.js', 'README.txt', 'businesscard.pkpass'];

function generateManifest() {
    const files = fs.readdirSync(PASS_DIR);
    const manifest = {};

    files.forEach(file => {
        if (EXCLUDES.includes(file)) return;

        const filePath = path.join(PASS_DIR, file);
        if (fs.statSync(filePath).isDirectory()) return; // Skip subdirectories if any (none expected)

        const buffer = fs.readFileSync(filePath);
        const hash = crypto.createHash('sha1').update(buffer).digest('hex');
        manifest[file] = hash;
    });

    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    console.log('✅ manifest.json generated.');
}

console.log('--- Apple Wallet Pass Generator ---');
generateManifest();

console.log('\n⚠️  NEXT STEPS (Requires Apple Developer Account):');
console.log('1. Obtain your Pass Type ID Certificate (pass.p12) and WWDR Certificate (wwdr.pem).');
console.log('2. Export your private key and certificate as `certificates.p12` and convert to `signer.pem` and `key.pem` if using OpenSSL.');
console.log('3. Sign the manifest:');
console.log('   openssl smime -sign -signer signer.pem -inkey key.pem -certfile wwdr.pem -in manifest.json -out signature -outform DER -binary -detach');
console.log('4. Zip the files into .pkpass:');
console.log('   zip -r businesscard.pkpass . -x "*.DS_Store" "generate_pass.js" "README.txt"');

console.log('\nFor now, the folder contains all assets and the manifest ready for signing.');
