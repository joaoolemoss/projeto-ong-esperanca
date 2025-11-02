/**
 * OPTIMIZE.JS
 * Script de build para otimização de produção
 * Minifica CSS, JavaScript, HTML e otimiza imagens
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('🚀 Iniciando processo de build para produção...\n');

// Criar diretório dist se não existir
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
    console.log('✅ Diretório dist criado\n');
}

// Criar subdiretórios
['css', 'js', 'imagens'].forEach(dir => {
    const dirPath = path.join(DIST_DIR, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

console.log('📦 Estrutura de diretórios criada\n');

// Executar minificação
console.log('📝 Minificando arquivos CSS...');
try {
    execSync('node build/minify-css.js', { stdio: 'inherit', cwd: ROOT_DIR });
    console.log('✅ CSS minificado com sucesso\n');
} catch (error) {
    console.error('❌ Erro ao minificar CSS:', error.message);
}

console.log('📝 Minificando arquivos JavaScript...');
try {
    execSync('node build/minify-js.js', { stdio: 'inherit', cwd: ROOT_DIR });
    console.log('✅ JavaScript minificado com sucesso\n');
} catch (error) {
    console.error('❌ Erro ao minificar JavaScript:', error.message);
}

console.log('📝 Minificando arquivos HTML...');
try {
    execSync('node build/minify-html.js', { stdio: 'inherit', cwd: ROOT_DIR });
    console.log('✅ HTML minificado com sucesso\n');
} catch (error) {
    console.error('❌ Erro ao minificar HTML:', error.message);
}

console.log('🖼️  Otimizando imagens...');
try {
    execSync('node build/optimize-images.js', { stdio: 'inherit', cwd: ROOT_DIR });
    console.log('✅ Imagens otimizadas com sucesso\n');
} catch (error) {
    console.error('❌ Erro ao otimizar imagens:', error.message);
}

// Copiar arquivos adicionais
console.log('📋 Copiando arquivos adicionais...');
const filesToCopy = ['README.md', 'package.json'];

filesToCopy.forEach(file => {
    const src = path.join(ROOT_DIR, file);
    const dest = path.join(DIST_DIR, file);
    
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`  ✓ ${file} copiado`);
    }
});

console.log('\n✨ Build concluído com sucesso!');
console.log(`📁 Arquivos de produção em: ${DIST_DIR}`);

// Estatísticas de otimização
console.log('\n📊 Estatísticas de Otimização:');

function getDirectorySize(dirPath) {
    let size = 0;
    
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isDirectory()) {
                size += getDirectorySize(filePath);
            } else {
                size += stats.size;
            }
        });
    }
    
    return size;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

const originalSize = getDirectorySize(ROOT_DIR);
const distSize = getDirectorySize(DIST_DIR);
const reduction = ((originalSize - distSize) / originalSize * 100).toFixed(2);

console.log(`  Original: ${formatBytes(originalSize)}`);
console.log(`  Otimizado: ${formatBytes(distSize)}`);
console.log(`  Redução: ${reduction}%`);

console.log('\n🎉 Projeto pronto para deploy!\n');
