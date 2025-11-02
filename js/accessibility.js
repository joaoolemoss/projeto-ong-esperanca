/**
 * ACCESSIBILITY.JS
 * Controles de acessibilidade para WCAG 2.1 Nível AA
 * Inclui: Modo Escuro, Alto Contraste, Tamanho de Fonte, Navegação por Teclado
 */

(function() {
    'use strict';

    // ===== INICIALIZAÇÃO =====
    document.addEventListener('DOMContentLoaded', function() {
        initAccessibility();
        initKeyboardNavigation();
        initARIA();
        loadAccessibilityPreferences();
    });

    // ===== FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO =====
    function initAccessibility() {
        // Criar botão de acessibilidade
        createAccessibilityToggle();
        
        // Criar painel de controles
        createAccessibilityPanel();
        
        // Adicionar link "Pular para conteúdo principal"
        createSkipLink();
        
        // Adicionar eventos aos controles
        setupAccessibilityControls();
    }

    // ===== CRIAR BOTÃO DE ALTERNÂNCIA =====
    function createAccessibilityToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'accessibility-toggle';
        toggle.setAttribute('aria-label', 'Abrir controles de acessibilidade');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'accessibility-panel');
        toggle.innerHTML = '♿';
        toggle.id = 'accessibility-toggle-btn';
        
        toggle.addEventListener('click', function() {
            const panel = document.getElementById('accessibility-panel');
            const isActive = panel.classList.contains('active');
            
            panel.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
            
            // Anunciar para leitores de tela
            announceToScreenReader(
                isActive ? 'Painel de acessibilidade fechado' : 'Painel de acessibilidade aberto'
            );
        });
        
        document.body.appendChild(toggle);
    }

    // ===== CRIAR PAINEL DE CONTROLES =====
    function createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-controls';
        panel.id = 'accessibility-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Controles de acessibilidade');
        
        panel.innerHTML = `
            <h3>Controles de Acessibilidade</h3>
            
            <button id="toggle-dark-mode" aria-pressed="false">
                <span class="sr-only">Ativar ou desativar </span>
                Modo Escuro
            </button>
            
            <button id="toggle-high-contrast" aria-pressed="false">
                <span class="sr-only">Ativar ou desativar </span>
                Alto Contraste
            </button>
            
            <button id="increase-font">
                Aumentar Fonte
                <span class="sr-only">(Tamanho atual: <span id="current-font-size">100</span>%)</span>
            </button>
            
            <button id="decrease-font">
                Diminuir Fonte
                <span class="sr-only">(Tamanho atual: <span id="current-font-size-2">100</span>%)</span>
            </button>
            
            <button id="reset-font">
                Resetar Fonte
                <span class="sr-only">(Para 100%)</span>
            </button>
            
            <button id="toggle-underline-links" aria-pressed="false">
                <span class="sr-only">Ativar ou desativar </span>
                Sublinhar Links
            </button>
            
            <button id="reset-accessibility">
                Resetar Todas Configurações
            </button>
        `;
        
        document.body.appendChild(panel);
    }

    // ===== CRIAR LINK "PULAR PARA CONTEÚDO" =====
    function createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Pular para o conteúdo principal';
        
        // Inserir como primeiro elemento do body
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Adicionar ID ao main se não existir
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    // ===== CONFIGURAR EVENTOS DOS CONTROLES =====
    function setupAccessibilityControls() {
        // Modo Escuro
        document.getElementById('toggle-dark-mode').addEventListener('click', function() {
            toggleDarkMode();
            updateARIAPressed(this);
        });

        // Alto Contraste
        document.getElementById('toggle-high-contrast').addEventListener('click', function() {
            toggleHighContrast();
            updateARIAPressed(this);
        });

        // Aumentar Fonte
        document.getElementById('increase-font').addEventListener('click', function() {
            adjustFontSize(10);
        });

        // Diminuir Fonte
        document.getElementById('decrease-font').addEventListener('click', function() {
            adjustFontSize(-10);
        });

        // Resetar Fonte
        document.getElementById('reset-font').addEventListener('click', function() {
            resetFontSize();
        });

        // Sublinhar Links
        document.getElementById('toggle-underline-links').addEventListener('click', function() {
            toggleUnderlineLinks();
            updateARIAPressed(this);
        });

        // Resetar Tudo
        document.getElementById('reset-accessibility').addEventListener('click', function() {
            resetAllAccessibility();
        });
    }

    // ===== MODO ESCURO =====
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        localStorage.setItem('darkMode', isDark);
        announceToScreenReader(isDark ? 'Modo escuro ativado' : 'Modo escuro desativado');
    }

    // ===== ALTO CONTRASTE =====
    function toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        
        localStorage.setItem('highContrast', isHighContrast);
        announceToScreenReader(isHighContrast ? 'Alto contraste ativado' : 'Alto contraste desativado');
    }

    // ===== AJUSTAR TAMANHO DA FONTE =====
    let currentFontSize = 100;

    function adjustFontSize(change) {
        currentFontSize += change;
        
        // Limitar entre 80% e 150%
        if (currentFontSize < 80) currentFontSize = 80;
        if (currentFontSize > 150) currentFontSize = 150;
        
        document.documentElement.style.fontSize = currentFontSize + '%';
        
        // Atualizar indicadores visuais
        document.querySelectorAll('#current-font-size, #current-font-size-2').forEach(span => {
            span.textContent = currentFontSize;
        });
        
        localStorage.setItem('fontSize', currentFontSize);
        announceToScreenReader('Tamanho da fonte: ' + currentFontSize + '%');
    }

    function resetFontSize() {
        currentFontSize = 100;
        document.documentElement.style.fontSize = '100%';
        
        document.querySelectorAll('#current-font-size, #current-font-size-2').forEach(span => {
            span.textContent = '100';
        });
        
        localStorage.setItem('fontSize', 100);
        announceToScreenReader('Tamanho da fonte resetado para 100%');
    }

    // ===== SUBLINHAR LINKS =====
    function toggleUnderlineLinks() {
        document.body.classList.toggle('underline-links');
        const isUnderlined = document.body.classList.contains('underline-links');
        
        if (isUnderlined) {
            const style = document.createElement('style');
            style.id = 'underline-links-style';
            style.textContent = 'a { text-decoration: underline !important; }';
            document.head.appendChild(style);
        } else {
            const style = document.getElementById('underline-links-style');
            if (style) style.remove();
        }
        
        localStorage.setItem('underlineLinks', isUnderlined);
        announceToScreenReader(isUnderlined ? 'Links sublinhados' : 'Sublinhado de links desativado');
    }

    // ===== RESETAR TODAS AS CONFIGURAÇÕES =====
    function resetAllAccessibility() {
        document.body.classList.remove('dark-mode', 'high-contrast', 'underline-links');
        resetFontSize();
        
        const style = document.getElementById('underline-links-style');
        if (style) style.remove();
        
        // Resetar aria-pressed
        document.querySelectorAll('[aria-pressed]').forEach(button => {
            button.setAttribute('aria-pressed', 'false');
        });
        
        // Limpar localStorage
        localStorage.removeItem('darkMode');
        localStorage.removeItem('highContrast');
        localStorage.removeItem('fontSize');
        localStorage.removeItem('underlineLinks');
        
        announceToScreenReader('Todas as configurações de acessibilidade foram resetadas');
    }

    // ===== CARREGAR PREFERÊNCIAS SALVAS =====
    function loadAccessibilityPreferences() {
        // Modo Escuro
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            updateARIAPressed(document.getElementById('toggle-dark-mode'), true);
        }

        // Alto Contraste
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
            updateARIAPressed(document.getElementById('toggle-high-contrast'), true);
        }

        // Tamanho da Fonte
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            currentFontSize = parseInt(savedFontSize);
            document.documentElement.style.fontSize = currentFontSize + '%';
            document.querySelectorAll('#current-font-size, #current-font-size-2').forEach(span => {
                span.textContent = currentFontSize;
            });
        }

        // Sublinhar Links
        if (localStorage.getItem('underlineLinks') === 'true') {
            document.body.classList.add('underline-links');
            const style = document.createElement('style');
            style.id = 'underline-links-style';
            style.textContent = 'a { text-decoration: underline !important; }';
            document.head.appendChild(style);
            updateARIAPressed(document.getElementById('toggle-underline-links'), true);
        }
    }

    // ===== NAVEGAÇÃO POR TECLADO =====
    function initKeyboardNavigation() {
        // Fechar painel com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const panel = document.getElementById('accessibility-panel');
                if (panel.classList.contains('active')) {
                    panel.classList.remove('active');
                    document.getElementById('accessibility-toggle-btn').setAttribute('aria-expanded', 'false');
                    document.getElementById('accessibility-toggle-btn').focus();
                }
            }
        });

        // Adicionar indicadores visuais de foco aprimorados
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
    }

    // ===== INICIALIZAR ARIA LABELS =====
    function initARIA() {
        // Adicionar roles e labels ARIA onde necessário
        
        // Header
        const header = document.querySelector('header');
        if (header && !header.getAttribute('role')) {
            header.setAttribute('role', 'banner');
        }

        // Nav
        const nav = document.querySelector('nav');
        if (nav && !nav.getAttribute('aria-label')) {
            nav.setAttribute('aria-label', 'Navegação principal');
        }

        // Main
        const main = document.querySelector('main');
        if (main && !main.getAttribute('role')) {
            main.setAttribute('role', 'main');
        }

        // Footer
        const footer = document.querySelector('footer');
        if (footer && !footer.getAttribute('role')) {
            footer.setAttribute('role', 'contentinfo');
        }

        // Adicionar aria-label a imagens sem alt adequado
        document.querySelectorAll('img').forEach(img => {
            if (!img.alt || img.alt.trim() === '') {
                img.setAttribute('alt', 'Imagem decorativa');
                img.setAttribute('role', 'presentation');
            }
        });

        // Adicionar aria-required a campos obrigatórios
        document.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
            field.setAttribute('aria-required', 'true');
        });
    }

    // ===== ATUALIZAR ARIA-PRESSED =====
    function updateARIAPressed(button, forceState) {
        const currentState = button.getAttribute('aria-pressed') === 'true';
        const newState = forceState !== undefined ? forceState : !currentState;
        button.setAttribute('aria-pressed', newState.toString());
    }

    // ===== ANUNCIAR PARA LEITORES DE TELA =====
    function announceToScreenReader(message) {
        let liveRegion = document.getElementById('aria-live-region');
        
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'aria-live-region';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = '';
        setTimeout(() => {
            liveRegion.textContent = message;
        }, 100);
    }

    // ===== TRAP FOCUS NO PAINEL =====
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

})();
