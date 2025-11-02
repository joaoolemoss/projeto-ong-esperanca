/**
 * MINIFY-JS.JS
 * Minifica todos os arquivos JavaScript do projeto
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const ROOT_DIR = path.join(__dirname, '..');
const JS_DIR = path.join(ROOT_DIR, 'js');
const DIST_JS_DIR = path.join(ROOT_DIR, 'dist', 'js');

// Criar diretório de destino se não existir
if (!fs.existsSync(DIST_JS_DIR)) {
    fs.mkdirSync(DIST_JS_DIR, { recursive: true });
}

const terserOptions = {
    compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
    },
    mangle: {
        toplevel: true,
        reserved: ['$', 'jQuery']
    },
    format: {
        comments: false,
        preamble: '/* Projeto ONG Esperança - Minified */'
    }
};

console.log('⚡ Minificando arquivos JavaScript...\n');

// Ler todos os arquivos JS
const jsFiles = fs.readdirSync(JS_DIR).filter(file => file.endsWith('.js'));

let totalOriginal = 0;
let totalMinified = 0;

async function minifyFiles() {
    for (const file of jsFiles) {
        const inputPath = path.join(JS_DIR, file);
        const outputPath = path.join(DIST_JS_DIR, file.replace('.js', '.min.js'));
        
        const input = fs.readFileSync(inputPath, 'utf8');
        const originalSize = Buffer.byteLength(input, 'utf8');
        
        try {
            const result = await minify(input, terserOptions);
            
            if (result.error) {
                console.error(`❌ Erro ao minificar ${file}:`, result.error);
                continue;
            }
            
            const minifiedSize = Buffer.byteLength(result.code, 'utf8');
            const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
            
            fs.writeFileSync(outputPath, result.code);
            
            totalOriginal += originalSize;
            totalMinified += minifiedSize;
            
            console.log(`  ✓ ${file}`);
            console.log(`    ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${reduction}% menor)`);
        } catch (error) {
            console.error(`❌ Erro ao processar ${file}:`, error.message);
        }
    }
    
    console.log(`\n📊 Total:`);
    console.log(`  Original: ${formatBytes(totalOriginal)}`);
    console.log(`  Minificado: ${formatBytes(totalMinified)}`);
    console.log(`  Economia: ${formatBytes(totalOriginal - totalMinified)} (${((1 - totalMinified / totalOriginal) * 100).toFixed(2)}%)`);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

minifyFiles();
