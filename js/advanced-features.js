/* ====================================
   FUNCIONALIDADES AVANÇADAS
   ONG Esperança - Sistema Completo
   ==================================== */

// ====================================
// SISTEMA DE SINGLE PAGE APPLICATION
// ====================================
class SPARouter {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }
    
    init() {
        // Interceptar cliques em links internos
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[data-spa]')) {
                e.preventDefault();
                const route = e.target.getAttribute('href');
                this.navigate(route);
            }
        });
        
        // Lidar com botões voltar/avançar
        window.addEventListener('popstate', () => {
            this.loadContent(window.location.pathname);
        });
    }
    
    register(path, loader) {
        this.routes[path] = loader;
    }
    
    navigate(path) {
        window.history.pushState({}, '', path);
        this.loadContent(path);
    }
    
    async loadContent(path) {
        const loader = this.routes[path] || this.routes['/404'];
        if (loader) {
            try {
                showPageLoader();
                const content = await loader();
                this.updateContent(content);
                hidePageLoader();
            } catch (error) {
                console.error('Erro ao carregar conteúdo:', error);
                this.updateContent('<h1>Erro ao carregar página</h1>');
            }
        }
    }
    
    updateContent(html) {
        const mainContent = document.querySelector('main') || document.body;
        
        // Fade out
        mainContent.style.opacity = '0';
        
        setTimeout(() => {
            mainContent.innerHTML = html;
            // Reinicializar funcionalidades
            initPageFeatures();
            // Fade in
            mainContent.style.opacity = '1';
        }, 300);
    }
}

// ====================================
// SISTEMA DE CARREGAMENTO DINÂMICO
// ====================================
const DynamicLoader = {
    // Carregar mais projetos
    loadMoreProjects: async function(page = 1, limit = 6) {
        console.log(`📦 Carregando página ${page} de projetos...`);
        
        // Simular carregamento de API
        return new Promise((resolve) => {
            setTimeout(() => {
                const startIndex = (page - 1) * limit;
                const endIndex = startIndex + limit;
                const projects = AppData.projects.slice(startIndex, endIndex);
                
                const container = document.querySelector('#dynamic-projects');
                if (container && projects.length > 0) {
                    projects.forEach(project => {
                        const card = document.createElement('div');
                        card.innerHTML = Templates.projectCard(project);
                        container.appendChild(card.firstElementChild);
                    });
                }
                
                resolve(projects);
            }, 500);
        });
    },
    
    // Carregar comentários
    loadComments: async function(projectId) {
        // Simular carregamento de comentários
        const comments = [
            { author: 'João', text: 'Projeto incrível!', date: '2024-01-15' },
            { author: 'Maria', text: 'Muito importante para a comunidade.', date: '2024-01-14' }
        ];
        
        return comments;
    },
    
    // Infinite scroll
    setupInfiniteScroll: function() {
        let page = 1;
        let loading = false;
        
        const loadMore = async () => {
            if (loading) return;
            
            const scrollPosition = window.innerHeight + window.pageYOffset;
            const documentHeight = document.documentElement.offsetHeight;
            
            if (scrollPosition >= documentHeight - 100) {
                loading = true;
                page++;
                
                const button = document.querySelector('#load-more-btn');
                if (button) {
                    button.textContent = 'Carregando...';
                    button.disabled = true;
                }
                
                const projects = await this.loadMoreProjects(page);
                
                if (projects.length === 0 && button) {
                    button.textContent = 'Todos os projetos carregados';
                    window.removeEventListener('scroll', loadMore);
                } else if (button) {
                    button.textContent = 'Carregar Mais';
                    button.disabled = false;
                }
                
                loading = false;
            }
        };
        
        window.addEventListener('scroll', debounce(loadMore, 200));
    }
};

// ====================================
// SISTEMA DE MODAIS E LIGHTBOX
// ====================================
const ModalSystem = {
    create: function(content, className = '') {
        // Remover modal existente
        this.close();
        
        // Criar modal
        const modal = document.createElement('div');
        modal.className = `modal ${className}`;
        modal.innerHTML = `
            <div class="modal-overlay" onclick="ModalSystem.close()"></div>
            <div class="modal-container">
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Animar entrada
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Fechar com ESC
        document.addEventListener('keydown', this.handleEsc);
        
        return modal;
    },
    
    close: function() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', this.handleEsc);
            
            setTimeout(() => modal.remove(), 300);
        }
    },
    
    handleEsc: function(e) {
        if (e.key === 'Escape') {
            ModalSystem.close();
        }
    }
};

// Abrir modal de projeto
function openProjectModal(projectId) {
    const project = AppData.projects.find(p => p.id === projectId);
    if (project) {
        ModalSystem.create(Templates.projectModal(project), 'project-modal');
        
        // Reinicializar funcionalidades do modal
        setTimeout(() => {
            setupModalFeatures();
            animateModalNumbers();
        }, 100);
    }
}

// Lightbox para imagens
function openLightbox(imageSrc, caption = '') {
    const content = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="ModalSystem.close()">&times;</button>
            <img src="${imageSrc}" alt="${caption}">
            ${caption ? `<p class="lightbox-caption">${caption}</p>` : ''}
        </div>
    `;
    
    ModalSystem.create(content, 'lightbox-modal');
}

// ====================================
// SISTEMA DE FILTROS AVANÇADOS
// ====================================
const FilterSystem = {
    activeFilters: {
        category: 'todos',
        search: '',
        sortBy: 'relevance',
        status: 'all'
    },
    
    init: function() {
        this.setupCategoryFilters();
        this.setupSearchFilter();
        this.setupSortFilter();
        this.setupStatusFilter();
    },
    
    setupCategoryFilters: function() {
        const container = document.querySelector('#projetos-ativos, .projects-section');
        if (!container) return;
        
        // Criar container de filtros se não existir
        let filtersContainer = container.querySelector('.filters-container');
        if (!filtersContainer) {
            filtersContainer = document.createElement('div');
            filtersContainer.className = 'filters-container';
            filtersContainer.innerHTML = `
                <div class="filter-row">
                    <div class="filter-group">
                        <label>Categoria:</label>
                        <div class="filter-buttons" id="category-filters">
                            <button class="filter-btn active" data-filter="todos">Todos</button>
                            <button class="filter-btn" data-filter="educacao">Educação</button>
                            <button class="filter-btn" data-filter="saude">Saúde</button>
                            <button class="filter-btn" data-filter="alimentacao">Alimentação</button>
                            <button class="filter-btn" data-filter="capacitacao">Capacitação</button>
                            <button class="filter-btn" data-filter="cultura">Cultura</button>
                            <button class="filter-btn" data-filter="esporte">Esporte</button>
                            <button class="filter-btn" data-filter="ambiente">Meio Ambiente</button>
                        </div>
                    </div>
                </div>
                
                <div class="filter-row">
                    <div class="filter-group">
                        <label>Buscar:</label>
                        <input type="search" id="project-search" class="search-input" placeholder="Digite para buscar...">
                    </div>
                    
                    <div class="filter-group">
                        <label>Ordenar por:</label>
                        <select id="sort-filter" class="sort-select">
                            <option value="relevance">Relevância</option>
                            <option value="progress">Progresso</option>
                            <option value="beneficiaries">Beneficiários</option>
                            <option value="alphabetical">Alfabética</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Status:</label>
                        <select id="status-filter" class="status-select">
                            <option value="all">Todos</option>
                            <option value="active">Ativos</option>
                            <option value="featured">Destaques</option>
                            <option value="urgent">Urgentes</option>
                        </select>
                    </div>
                </div>
                
                <div class="filter-row">
                    <div class="filter-stats">
                        <span id="filter-count">Mostrando <strong>0</strong> projetos</span>
                        <button class="btn-text" onclick="FilterSystem.reset()">Limpar Filtros</button>
                    </div>
                </div>
            `;
            
            container.insertBefore(filtersContainer, container.firstChild);
        }
        
        // Event listeners para filtros de categoria
        const categoryBtns = filtersContainer.querySelectorAll('#category-filters .filter-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeFilters.category = btn.dataset.filter;
                this.applyFilters();
            });
        });
    },
    
    setupSearchFilter: function() {
        const searchInput = document.querySelector('#project-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.activeFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            }, 300));
        }
    },
    
    setupSortFilter: function() {
        const sortSelect = document.querySelector('#sort-filter');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.activeFilters.sortBy = e.target.value;
                this.applyFilters();
            });
        }
    },
    
    setupStatusFilter: function() {
        const statusSelect = document.querySelector('#status-filter');
        if (statusSelect) {
            statusSelect.addEventListener('change', (e) => {
                this.activeFilters.status = e.target.value;
                this.applyFilters();
            });
        }
    },
    
    applyFilters: function() {
        const cards = document.querySelectorAll('.project-card, article[data-category]');
        let visibleCount = 0;
        
        // Filtrar
        const filteredCards = Array.from(cards).filter(card => {
            let show = true;
            
            // Filtro de categoria
            if (this.activeFilters.category !== 'todos') {
                const category = card.dataset.category || card.querySelector('[data-category]')?.dataset.category;
                show = show && category === this.activeFilters.category;
            }
            
            // Filtro de busca
            if (this.activeFilters.search) {
                const text = card.textContent.toLowerCase();
                show = show && text.includes(this.activeFilters.search);
            }
            
            // Filtro de status
            if (this.activeFilters.status !== 'all') {
                if (this.activeFilters.status === 'featured') {
                    show = show && card.classList.contains('featured');
                }
                // Adicionar outros filtros de status conforme necessário
            }
            
            return show;
        });
        
        // Ordenar
        const sortedCards = this.sortCards(filteredCards);
        
        // Mostrar/esconder cards
        cards.forEach(card => {
            if (sortedCards.includes(card)) {
                card.style.display = '';
                card.classList.add('fade-in');
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Atualizar contador
        const counter = document.querySelector('#filter-count strong');
        if (counter) {
            counter.textContent = visibleCount;
        }
        
        // Mostrar mensagem se não houver resultados
        if (visibleCount === 0) {
            this.showNoResults();
        } else {
            this.hideNoResults();
        }
    },
    
    sortCards: function(cards) {
        return cards.sort((a, b) => {
            switch(this.activeFilters.sortBy) {
                case 'alphabetical':
                    const titleA = a.querySelector('h3')?.textContent || '';
                    const titleB = b.querySelector('h3')?.textContent || '';
                    return titleA.localeCompare(titleB);
                    
                case 'progress':
                    const progressA = parseInt(a.querySelector('.progress-bar')?.style.width) || 0;
                    const progressB = parseInt(b.querySelector('.progress-bar')?.style.width) || 0;
                    return progressB - progressA;
                    
                case 'beneficiaries':
                    const benA = parseInt(a.querySelector('.stat-value')?.textContent) || 0;
                    const benB = parseInt(b.querySelector('.stat-value')?.textContent) || 0;
                    return benB - benA;
                    
                default:
                    return 0;
            }
        });
    },
    
    reset: function() {
        this.activeFilters = {
            category: 'todos',
            search: '',
            sortBy: 'relevance',
            status: 'all'
        };
        
        // Resetar UI
        document.querySelector('#project-search').value = '';
        document.querySelector('#sort-filter').value = 'relevance';
        document.querySelector('#status-filter').value = 'all';
        
        const categoryBtns = document.querySelectorAll('#category-filters .filter-btn');
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'todos') {
                btn.classList.add('active');
            }
        });
        
        this.applyFilters();
    },
    
    showNoResults: function() {
        let noResults = document.querySelector('.no-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <div class="no-results-content">
                    <svg class="no-results-icon" viewBox="0 0 24 24" width="64" height="64">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <h3>Nenhum projeto encontrado</h3>
                    <p>Tente ajustar os filtros ou fazer uma nova busca</p>
                    <button class="btn btn-primary" onclick="FilterSystem.reset()">Limpar Filtros</button>
                </div>
            `;
            
            const container = document.querySelector('#projetos-ativos, .projects-section');
            if (container) {
                container.appendChild(noResults);
            }
        }
        noResults.style.display = 'block';
    },
    
    hideNoResults: function() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
};

// ====================================
// SISTEMA DE COMPARTILHAMENTO
// ====================================
function shareProject(projectId) {
    const project = AppData.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const shareData = {
        title: project.title,
        text: project.description,
        url: window.location.origin + '/projeto/' + projectId
    };
    
    // Verificar se Web Share API está disponível
    if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
        navigator.share(shareData)
            .then(() => showNotification('Compartilhado com sucesso!', 'success'))
            .catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        // Fallback: mostrar modal com opções de compartilhamento
        const content = `
            <div class="share-modal-content">
                <h3>Compartilhar Projeto</h3>
                <p>${project.title}</p>
                
                <div class="share-buttons">
                    <button class="share-btn facebook" onclick="shareToFacebook(${projectId})">
                        <svg><!-- Ícone Facebook --></svg>
                        Facebook
                    </button>
                    <button class="share-btn twitter" onclick="shareToTwitter(${projectId})">
                        <svg><!-- Ícone Twitter --></svg>
                        Twitter
                    </button>
                    <button class="share-btn whatsapp" onclick="shareToWhatsApp(${projectId})">
                        <svg><!-- Ícone WhatsApp --></svg>
                        WhatsApp
                    </button>
                    <button class="share-btn copy" onclick="copyProjectLink(${projectId})">
                        <svg><!-- Ícone Link --></svg>
                        Copiar Link
                    </button>
                </div>
            </div>
        `;
        
        ModalSystem.create(content, 'share-modal');
    }
}

function shareToFacebook(projectId) {
    const url = encodeURIComponent(window.location.origin + '/projeto/' + projectId);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    ModalSystem.close();
}

function shareToTwitter(projectId) {
    const project = AppData.projects.find(p => p.id === projectId);
    const text = encodeURIComponent(`Conheça o projeto "${project.title}" da ONG Esperança`);
    const url = encodeURIComponent(window.location.origin + '/projeto/' + projectId);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    ModalSystem.close();
}

function shareToWhatsApp(projectId) {
    const project = AppData.projects.find(p => p.id === projectId);
    const text = encodeURIComponent(`Conheça o projeto "${project.title}" da ONG Esperança: ${window.location.origin}/projeto/${projectId}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    ModalSystem.close();
}

function copyProjectLink(projectId) {
    const url = window.location.origin + '/projeto/' + projectId;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showNotification('Link copiado!', 'success');
                ModalSystem.close();
            })
            .catch(err => console.error('Erro ao copiar:', err));
    } else {
        // Fallback
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showNotification('Link copiado!', 'success');
        ModalSystem.close();
    }
}

// ====================================
// SISTEMA DE DOAÇÕES
// ====================================
const DonationSystem = {
    init: function() {
        this.setupDonationForms();
        this.setupRecurringDonations();
        this.setupPaymentMethods();
    },
    
    setupDonationForms: function() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.amount-btn')) {
                e.preventDefault();
                
                // Remover seleção anterior
                document.querySelectorAll('.amount-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                
                // Selecionar novo valor
                e.target.classList.add('selected');
                const amount = e.target.dataset.amount;
                
                // Atualizar input customizado
                const customInput = document.querySelector('#custom-amount');
                if (customInput) {
                    customInput.value = amount;
                }
                
                // Atualizar preview
                this.updateDonationPreview(amount);
            }
        });
        
        // Form de doação
        const donationForm = document.querySelector('#donation-form');
        if (donationForm) {
            donationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processDonation(new FormData(donationForm));
            });
        }
    },
    
    setupRecurringDonations: function() {
        const recurringCheckbox = document.querySelector('#recurring-donation');
        if (recurringCheckbox) {
            recurringCheckbox.addEventListener('change', (e) => {
                const frequencyOptions = document.querySelector('.frequency-options');
                if (frequencyOptions) {
                    frequencyOptions.style.display = e.target.checked ? 'block' : 'none';
                }
            });
        }
    },
    
    setupPaymentMethods: function() {
        const methods = ['pix', 'credit-card', 'boleto', 'paypal'];
        
        methods.forEach(method => {
            const btn = document.querySelector(`[data-payment="${method}"]`);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.selectPaymentMethod(method);
                });
            }
        });
    },
    
    selectPaymentMethod: function(method) {
        // Esconder todos os forms de pagamento
        document.querySelectorAll('.payment-form').forEach(form => {
            form.style.display = 'none';
        });
        
        // Mostrar form selecionado
        const selectedForm = document.querySelector(`.payment-form.${method}`);
        if (selectedForm) {
            selectedForm.style.display = 'block';
        }
        
        // Atualizar botões
        document.querySelectorAll('[data-payment]').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-payment="${method}"]`)?.classList.add('selected');
    },
    
    updateDonationPreview: function(amount) {
        const preview = document.querySelector('.donation-preview');
        if (preview) {
            const impact = this.calculateImpact(amount);
            preview.innerHTML = `
                <h4>Seu impacto com R$ ${amount}:</h4>
                <ul>
                    ${impact.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }
    },
    
    calculateImpact: function(amount) {
        const value = parseInt(amount);
        const impacts = [];
        
        if (value >= 20) impacts.push('1 kit de material escolar');
        if (value >= 50) impacts.push('5 refeições completas');
        if (value >= 100) impacts.push('1 consulta médica');
        if (value >= 200) impacts.push('1 cesta básica completa');
        
        return impacts.length > 0 ? impacts : ['Ajuda a manter nossos projetos'];
    },
    
    processDonation: async function(formData) {
        try {
            showLoader();
            
            // Simular processamento
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Salvar doação
            const donation = {
                amount: formData.get('amount'),
                method: formData.get('payment-method'),
                projectId: formData.get('project-id'),
                date: new Date().toISOString(),
                recurring: formData.get('recurring') === 'on'
            };
            
            this.saveDonation(donation);
            
            hideLoader();
            
            // Mostrar sucesso
            this.showSuccess(donation);
            
        } catch (error) {
            console.error('Erro ao processar doação:', error);
            showNotification('Erro ao processar doação. Tente novamente.', 'error');
        }
    },
    
    saveDonation: function(donation) {
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations.push(donation);
        localStorage.setItem('donations', JSON.stringify(donations));
    },
    
    showSuccess: function(donation) {
        const content = `
            <div class="donation-success">
                <div class="success-icon">✓</div>
                <h2>Obrigado pela sua doação!</h2>
                <p>Sua contribuição de <strong>R$ ${donation.amount}</strong> fará a diferença!</p>
                <p>Enviaremos um recibo para seu e-mail.</p>
                <button class="btn btn-primary" onclick="ModalSystem.close()">Fechar</button>
            </div>
        `;
        
        ModalSystem.create(content, 'success-modal');
    }
};

// ====================================
// SISTEMA DE ACESSIBILIDADE
// ====================================
function setupAccessibility() {
    // Alto contraste
    const contrastBtn = document.createElement('button');
    contrastBtn.className = 'accessibility-btn contrast-btn';
    contrastBtn.innerHTML = '◐';
    contrastBtn.title = 'Alto Contraste';
    contrastBtn.addEventListener('click', toggleHighContrast);
    
    // Aumentar fonte
    const fontIncBtn = document.createElement('button');
    fontIncBtn.className = 'accessibility-btn font-increase-btn';
    fontIncBtn.innerHTML = 'A+';
    fontIncBtn.title = 'Aumentar Fonte';
    fontIncBtn.addEventListener('click', () => changeFontSize(1));
    
    // Diminuir fonte
    const fontDecBtn = document.createElement('button');
    fontDecBtn.className = 'accessibility-btn font-decrease-btn';
    fontDecBtn.innerHTML = 'A-';
    fontDecBtn.title = 'Diminuir Fonte';
    fontDecBtn.addEventListener('click', () => changeFontSize(-1));
    
    // Container de acessibilidade
    const accessibilityBar = document.createElement('div');
    accessibilityBar.className = 'accessibility-bar';
    accessibilityBar.appendChild(contrastBtn);
    accessibilityBar.appendChild(fontIncBtn);
    accessibilityBar.appendChild(fontDecBtn);
    
    document.body.appendChild(accessibilityBar);
    
    // Navegação por teclado
    setupKeyboardNavigation();
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function changeFontSize(delta) {
    const currentSize = parseInt(localStorage.getItem('fontSize') || '16');
    const newSize = Math.max(12, Math.min(24, currentSize + delta));
    
    document.documentElement.style.fontSize = newSize + 'px';
    localStorage.setItem('fontSize', newSize);
}

function setupKeyboardNavigation() {
    // Skip to content
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Navegação com Tab melhorada
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// ====================================
// MONITOR DE PERFORMANCE
// ====================================
function setupPerformanceMonitor() {
    if ('PerformanceObserver' in window) {
        // Monitorar Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`📊 LCP: ${lastEntry.renderTime || lastEntry.loadTime}ms`);
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Monitorar First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log(`📊 FID: ${entry.processingStart - entry.startTime}ms`);
            });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });
    }
    
    // Lazy load de recursos pesados
    setupResourceOptimization();
}

function setupResourceOptimization() {
    // Carregar fontes de forma assíncrona
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // Preload de recursos críticos
    const criticalResources = [
        'css/main.css',
        'js/main.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// ====================================
// EXPORTAR FUNÇÕES GLOBAIS
// ====================================
window.AdvancedFeatures = {
    SPARouter,
    DynamicLoader,
    ModalSystem,
    FilterSystem,
    DonationSystem,
    openProjectModal,
    openLightbox,
    shareProject,
    setupAccessibility
};