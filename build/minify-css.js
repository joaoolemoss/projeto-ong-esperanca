/**
 * MINIFY-CSS.JS
 * Minifica todos os arquivos CSS do projeto
 */

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const ROOT_DIR = path.join(__dirname, '..');
const CSS_DIR = path.join(ROOT_DIR, 'css');
const DIST_CSS_DIR = path.join(ROOT_DIR, 'dist', 'css');

// Criar diretório de destino se não existir
if (!fs.existsSync(DIST_CSS_DIR)) {
    fs.mkdirSync(DIST_CSS_DIR, { recursive: true });
}

const cleanCSS = new CleanCSS({
    level: 2,
    compatibility: 'ie9',
    format: {
        breaks: {
            afterAtRule: false,
            afterBlockBegins: false,
            afterBlockEnds: false,
            afterComment: false,
            afterProperty: false,
            afterRuleBegins: false,
            afterRuleEnds: false,
            beforeBlockEnds: false,
            betweenSelectors: false
        },
        spaces: {
            aroundSelectorRelation: false,
            beforeBlockBegins: false,
            beforeValue: false
        }
    }
});

console.log('🎨 Minificando arquivos CSS...\n');

// Ler todos os arquivos CSS
const cssFiles = fs.readdirSync(CSS_DIR).filter(file => file.endsWith('.css'));

let totalOriginal = 0;
let totalMinified = 0;

cssFiles.forEach(file => {
    const inputPath = path.join(CSS_DIR, file);
    const outputPath = path.join(DIST_CSS_DIR, file.replace('.css', '.min.css'));
    
    const input = fs.readFileSync(inputPath, 'utf8');
    const originalSize = Buffer.byteLength(input, 'utf8');
    
    const output = cleanCSS.minify(input);
    
    if (output.errors.length > 0) {
        console.error(`❌ Erros ao minificar ${file}:`, output.errors);
        return;
    }
    
    const minifiedSize = Buffer.byteLength(output.styles, 'utf8');
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
    
    fs.writeFileSync(outputPath, output.styles);
    
    totalOriginal += originalSize;
    totalMinified += minifiedSize;
    
    console.log(`  ✓ ${file}`);
    console.log(`    ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${reduction}% menor)`);
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
