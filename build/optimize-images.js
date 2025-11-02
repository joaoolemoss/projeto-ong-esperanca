/**
 * OPTIMIZE-IMAGES.JS
 * Otimiza e comprime todas as imagens do projeto
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'imagens');
const DIST_IMAGES_DIR = path.join(ROOT_DIR, 'dist', 'imagens');

// Criar diretório de destino se não existir
if (!fs.existsSync(DIST_IMAGES_DIR)) {
    fs.mkdirSync(DIST_IMAGES_DIR, { recursive: true });
}

console.log('🖼️  Otimizando imagens...\n');

// Copiar README.md das imagens
const readmePath = path.join(IMAGES_DIR, 'README.md');
const readmeDestPath = path.join(DIST_IMAGES_DIR, 'README.md');

if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, readmeDestPath);
    console.log('  ✓ README.md copiado');
}

// Verificar se Sharp está disponível
let sharp;
try {
    sharp = require('sharp');
    console.log('  ℹ️  Sharp disponível - usando compressão avançada\n');
    
    optimizeWithSharp();
} catch (error) {
    console.log('  ℹ️  Sharp não disponível - copiando imagens sem otimização\n');
    copyImagesWithoutOptimization();
}

async function optimizeWithSharp() {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    
    if (!fs.existsSync(IMAGES_DIR)) {
        console.log('  ⚠️  Diretório de imagens não encontrado');
        return;
    }
    
    const files = fs.readdirSync(IMAGES_DIR).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    });
    
    if (files.length === 0) {
        console.log('  ℹ️  Nenhuma imagem encontrada para otimizar');
        return;
    }
    
    let totalOriginal = 0;
    let totalOptimized = 0;
    
    for (const file of files) {
        const inputPath = path.join(IMAGES_DIR, file);
        const outputPath = path.join(DIST_IMAGES_DIR, file);
        
        try {
            const originalStats = fs.statSync(inputPath);
            const originalSize = originalStats.size;
            
            const ext = path.extname(file).toLowerCase();
            
            // Otimizar baseado no tipo de imagem
            if (ext === '.jpg' || ext === '.jpeg') {
                await sharp(inputPath)
                    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
                    .toFile(outputPath);
            } else if (ext === '.png') {
                await sharp(inputPath)
                    .png({ compressionLevel: 9, palette: true })
                    .toFile(outputPath);
            } else if (ext === '.webp') {
                await sharp(inputPath)
                    .webp({ quality: 80, effort: 6 })
                    .toFile(outputPath);
            } else {
                // Para GIF e outros, apenas copiar
                fs.copyFileSync(inputPath, outputPath);
            }
            
            const optimizedStats = fs.statSync(outputPath);
            const optimizedSize = optimizedStats.size;
            const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(2);
            
            totalOriginal += originalSize;
            totalOptimized += optimizedSize;
            
            console.log(`  ✓ ${file}`);
            console.log(`    ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${reduction}% menor)`);
        } catch (error) {
            console.error(`  ❌ Erro ao otimizar ${file}:`, error.message);
            // Copiar arquivo original em caso de erro
            fs.copyFileSync(inputPath, outputPath);
        }
    }
    
    if (totalOriginal > 0) {
        console.log(`\n📊 Total:`);
        console.log(`  Original: ${formatBytes(totalOriginal)}`);
        console.log(`  Otimizado: ${formatBytes(totalOptimized)}`);
        console.log(`  Economia: ${formatBytes(totalOriginal - totalOptimized)} (${((1 - totalOptimized / totalOriginal) * 100).toFixed(2)}%)`);
    }
}

function copyImagesWithoutOptimization() {
    if (!fs.existsSync(IMAGES_DIR)) {
        console.log('  ⚠️  Diretório de imagens não encontrado');
        return;
    }
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
    const files = fs.readdirSync(IMAGES_DIR).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    });
    
    if (files.length === 0) {
        console.log('  ℹ️  Nenhuma imagem encontrada');
        return;
    }
    
    files.forEach(file => {
        const inputPath = path.join(IMAGES_DIR, file);
        const outputPath = path.join(DIST_IMAGES_DIR, file);
        
        fs.copyFileSync(inputPath, outputPath);
        console.log(`  ✓ ${file} copiado`);
    });
    
    console.log(`\n  ℹ️  Instale 'sharp' para otimização avançada: npm install sharp`);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
