/**
 * MINIFY-HTML.JS
 * Minifica todos os arquivos HTML do projeto
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Criar diretório de destino se não existir
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    removeEmptyAttributes: false, // Manter para acessibilidade
    keepClosingSlash: true,
    caseSensitive: true,
    conservativeCollapse: false,
    processConditionalComments: true,
    sortAttributes: true,
    sortClassName: true
};

console.log('📄 Minificando arquivos HTML...\n');

// Arquivos HTML na raiz
const htmlFiles = fs.readdirSync(ROOT_DIR).filter(file => file.endsWith('.html'));

let totalOriginal = 0;
let totalMinified = 0;

htmlFiles.forEach(file => {
    const inputPath = path.join(ROOT_DIR, file);
    const outputPath = path.join(DIST_DIR, file);
    
    const input = fs.readFileSync(inputPath, 'utf8');
    const originalSize = Buffer.byteLength(input, 'utf8');
    
    try {
        // Atualizar referências de CSS e JS para versões minificadas
        let processedInput = input;
        processedInput = processedInput.replace(/\.css"/g, '.min.css"');
        processedInput = processedInput.replace(/\.js"/g, '.min.js"');
        
        const output = minify(processedInput, minifyOptions);
        const minifiedSize = Buffer.byteLength(output, 'utf8');
        const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
        
        fs.writeFileSync(outputPath, output);
        
        totalOriginal += originalSize;
        totalMinified += minifiedSize;
        
        console.log(`  ✓ ${file}`);
        console.log(`    ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${reduction}% menor)`);
    } catch (error) {
        console.error(`❌ Erro ao minificar ${file}:`, error.message);
    }
});

console.log(`\n📊 Total:`);
console.log(`  Original: ${formatBytes(totalOriginal)}`);
console.log(`  Minificado: ${formatBytes(totalMinified)}`);
console.log(`  Economia: ${formatBytes(totalOriginal - totalMinified)} (${((1 - totalMinified / totalOriginal) * 100).toFixed(2)}%)`);

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
