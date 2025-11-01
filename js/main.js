/* ====================================
   JAVASCRIPT PRINCIPAL - VERSÃO COMPLETA
   ONG Esperança - Sistema Interativo Avançado
   Entrega III - Todas as Funcionalidades
   ==================================== */

// ====================================
// SISTEMA DE TEMPLATES JAVASCRIPT
// ====================================
const Templates = {
    // Template para card de projeto
    projectCard: (project) => `
        <div class="project-card animate-on-scroll" data-category="${project.category}">
            <div class="card-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <span class="card-category">${project.categoryName}</span>
                ${project.featured ? '<span class="featured-badge">Destaque</span>' : ''}
            </div>
            <div class="card-body">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-value">${project.beneficiaries}</span>
                        <span class="stat-label">Beneficiários</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${project.volunteers}</span>
                        <span class="stat-label">Voluntários</span>
                    </div>
                </div>
                
                <div class="progress-wrapper">
                    <div class="progress">
                        <div class="progress-bar" style="width: ${project.progress}%">
                            <span class="progress-text">${project.progress}%</span>
                        </div>
                    </div>
                    <span class="progress-label">Meta: R$ ${project.goal.toLocaleString('pt-BR')}</span>
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="openProjectModal(${project.id})">
                        Ver Detalhes
                    </button>
                    <button class="btn btn-outline" onclick="shareProject(${project.id})">
                        Compartilhar
                    </button>
                </div>
            </div>
        </div>
    `,
    
    // Template para modal de projeto
    projectModal: (project) => `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div class="modal-header">
                <img src="${project.image}" alt="${project.title}">
                <h2>${project.title}</h2>
            </div>
            <div class="modal-body">
                <div class="tabs">
                    <button class="tab-button active" onclick="switchTab('about')">Sobre</button>
                    <button class="tab-button" onclick="switchTab('impact')">Impacto</button>
                    <button class="tab-button" onclick="switchTab('gallery')">Galeria</button>
                    <button class="tab-button" onclick="switchTab('donate')">Doar</button>
                </div>
                
                <div class="tab-content active" id="about-tab">
                    <h3>Sobre o Projeto</h3>
                    <p>${project.fullDescription}</p>
                    <h4>Objetivos</h4>
                    <ul>
                        ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="tab-content" id="impact-tab">
                    <h3>Nosso Impacto</h3>
                    <div class="impact-grid">
                        ${project.impacts.map(impact => `
                            <div class="impact-card">
                                <span class="impact-number" data-count="${impact.value}">0</span>
                                <span class="impact-label">${impact.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="tab-content" id="gallery-tab">
                    <h3>Galeria de Fotos</h3>
                    <div class="gallery-grid">
                        ${project.gallery.map(img => `
                            <img src="${img.thumb}" 
                                 data-full="${img.full}" 
                                 alt="${img.caption}"
                                 onclick="openLightbox('${img.full}', '${img.caption}')"
                                 class="gallery-thumb">
                        `).join('')}
                    </div>
                </div>
                
                <div class="tab-content" id="donate-tab">
                    <h3>Faça sua Doação</h3>
                    <form id="donation-form" class="donation-form">
                        <div class="donation-amounts">
                            <button type="button" class="amount-btn" data-amount="20">R$ 20</button>
                            <button type="button" class="amount-btn" data-amount="50">R$ 50</button>
                            <button type="button" class="amount-btn" data-amount="100">R$ 100</button>
                            <button type="button" class="amount-btn" data-amount="200">R$ 200</button>
                        </div>
                        <input type="number" id="custom-amount" placeholder="Outro valor" min="1">
                        <button type="submit" class="btn btn-success btn-lg">Doar Agora</button>
                    </form>
                </div>
            </div>
        </div>
    `,
    
    // Template para depoimento
    testimonial: (testimonial) => `
        <div class="testimonial-card animate-on-scroll">
            <div class="testimonial-content">
                <div class="quote-icon">"</div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="author-avatar">
                    <div class="author-info">
                        <strong>${testimonial.name}</strong>
                        <span>${testimonial.role}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    // Template para timeline
    timeline: (events) => `
        <div class="timeline">
            ${events.map((event, index) => `
                <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'} animate-on-scroll">
                    <div class="timeline-content">
                        <span class="timeline-date">${event.date}</span>
                        <h4>${event.title}</h4>
                        <p>${event.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `
};

// ====================================
// DADOS DA APLICAÇÃO
// ====================================
const AppData = {
    projects: [
        {
            id: 1,
            title: 'Educar para Transformar',
            description: 'Programa de alfabetização e reforço escolar para crianças.',
            fullDescription: 'Nosso programa de educação atende mais de 500 crianças mensalmente, oferecendo não apenas reforço escolar, mas também alimentação, material didático e acompanhamento psicopedagógico completo.',
            category: 'educacao',
            categoryName: 'Educação',
            image: 'imagens/projeto-educacao.jpg',
            progress: 75,
            goal: 50000,
            beneficiaries: 500,
            volunteers: 30,
            featured: true,
            objectives: [
                'Reduzir a evasão escolar em 80%',
                'Melhorar o desempenho acadêmico',
                'Oferecer alimentação balanceada',
                'Apoio psicopedagógico individualizado'
            ],
            impacts: [
                { value: 500, label: 'Crianças Atendidas' },
                { value: 95, label: '% Melhoria Escolar' },
                { value: 10, label: 'Escolas Parceiras' },
                { value: 30, label: 'Professores Voluntários' }
            ],
            gallery: [
                { thumb: 'imagens/edu-thumb-1.jpg', full: 'imagens/edu-full-1.jpg', caption: 'Aula de reforço' },
                { thumb: 'imagens/edu-thumb-2.jpg', full: 'imagens/edu-full-2.jpg', caption: 'Atividade lúdica' },
                { thumb: 'imagens/edu-thumb-3.jpg', full: 'imagens/edu-full-3.jpg', caption: 'Formatura' }
            ]
        },
        {
            id: 2,
            title: 'Saúde em Primeiro Lugar',
            description: 'Atendimento médico gratuito para comunidades carentes.',
            fullDescription: 'Unidades móveis de saúde percorrem as periferias oferecendo consultas médicas, odontológicas, vacinação e orientação sobre saúde preventiva.',
            category: 'saude',
            categoryName: 'Saúde',
            image: 'imagens/projeto-saude.jpg',
            progress: 60,
            goal: 75000,
            beneficiaries: 300,
            volunteers: 15,
            featured: true,
            objectives: [
                'Atendimento médico gratuito',
                'Campanhas de vacinação',
                'Prevenção de doenças',
                'Educação em saúde'
            ],
            impacts: [
                { value: 300, label: 'Atendimentos/Mês' },
                { value: 2000, label: 'Vacinas Aplicadas' },
                { value: 150, label: 'Consultas Odontológicas' },
                { value: 15, label: 'Profissionais Voluntários' }
            ],
            gallery: [
                { thumb: 'imagens/saude-thumb-1.jpg', full: 'imagens/saude-full-1.jpg', caption: 'Consulta médica' },
                { thumb: 'imagens/saude-thumb-2.jpg', full: 'imagens/saude-full-2.jpg', caption: 'Vacinação' }
            ]
        },
        {
            id: 3,
            title: 'Alimentação Solidária',
            description: 'Distribuição de cestas básicas e refeições.',
            fullDescription: 'Nossa cozinha comunitária prepara 500 refeições diárias e distribui 200 cestas básicas mensalmente para famílias em situação de vulnerabilidade.',
            category: 'alimentacao',
            categoryName: 'Alimentação',
            image: 'imagens/projeto-alimentacao.jpg',
            progress: 90,
            goal: 30000,
            beneficiaries: 500,
            volunteers: 25,
            featured: true,
            objectives: [
                'Combater a fome',
                'Segurança alimentar',
                'Aproveitamento integral de alimentos',
                'Nutrição balanceada'
            ],
            impacts: [
                { value: 500, label: 'Refeições/Dia' },
                { value: 200, label: 'Cestas Básicas/Mês' },
                { value: 100, label: 'Famílias Atendidas' },
                { value: 0, label: 'Desperdício' }
            ],
            gallery: [
                { thumb: 'imagens/alim-thumb-1.jpg', full: 'imagens/alim-full-1.jpg', caption: 'Cozinha comunitária' }
            ]
        },
        {
            id: 4,
            title: 'Capacitação Profissional',
            description: 'Cursos gratuitos para jovens e adultos.',
            fullDescription: 'Oferecemos cursos profissionalizantes em diversas áreas como informática, culinária, costura e empreendedorismo.',
            category: 'capacitacao',
            categoryName: 'Capacitação',
            image: 'imagens/projeto-capacitacao.jpg',
            progress: 45,
            goal: 40000,
            beneficiaries: 200,
            volunteers: 12,
            featured: false,
            objectives: [
                'Inserção no mercado de trabalho',
                'Desenvolvimento de habilidades',
                'Certificação profissional',
                'Mentoria de carreira'
            ],
            impacts: [
                { value: 200, label: 'Alunos Formados' },
                { value: 75, label: '% Empregabilidade' },
                { value: 8, label: 'Cursos Oferecidos' },
                { value: 12, label: 'Instrutores' }
            ],
            gallery: []
        },
        {
            id: 5,
            title: 'Arte e Cultura para Todos',
            description: 'Oficinas de música, dança e teatro.',
            fullDescription: 'Promovemos o acesso à cultura através de oficinas gratuitas de música, dança, teatro e artes visuais.',
            category: 'cultura',
            categoryName: 'Cultura',
            image: 'imagens/projeto-cultura.jpg',
            progress: 55,
            goal: 25000,
            beneficiaries: 150,
            volunteers: 8,
            featured: false,
            objectives: [
                'Democratizar o acesso à cultura',
                'Desenvolver talentos artísticos',
                'Integração social pela arte',
                'Apresentações públicas'
            ],
            impacts: [
                { value: 150, label: 'Alunos Ativos' },
                { value: 12, label: 'Apresentações/Ano' },
                { value: 5, label: 'Modalidades' },
                { value: 8, label: 'Professores' }
            ],
            gallery: []
        },
        {
            id: 6,
            title: 'Esporte e Cidadania',
            description: 'Atividades esportivas para crianças e jovens.',
            fullDescription: 'Utilizamos o esporte como ferramenta de transformação social, oferecendo treinos de futebol, basquete, vôlei e atletismo.',
            category: 'esporte',
            categoryName: 'Esporte',
            image: 'imagens/projeto-esporte.jpg',
            progress: 70,
            goal: 35000,
            beneficiaries: 250,
            volunteers: 10,
            featured: false,
            objectives: [
                'Promover saúde através do esporte',
                'Disciplina e trabalho em equipe',
                'Descoberta de talentos',
                'Competições regionais'
            ],
            impacts: [
                { value: 250, label: 'Atletas' },
                { value: 6, label: 'Modalidades' },
                { value: 15, label: 'Campeonatos' },
                { value: 10, label: 'Treinadores' }
            ],
            gallery: []
        },
        {
            id: 7,
            title: 'Meio Ambiente Vivo',
            description: 'Educação ambiental e sustentabilidade.',
            fullDescription: 'Desenvolvemos projetos de educação ambiental, hortas comunitárias, reciclagem e conscientização sobre sustentabilidade.',
            category: 'ambiente',
            categoryName: 'Meio Ambiente',
            image: 'imagens/projeto-ambiente.jpg',
            progress: 40,
            goal: 20000,
            beneficiaries: 300,
            volunteers: 15,
            featured: false,
            objectives: [
                'Consciência ambiental',
                'Hortas comunitárias',
                'Reciclagem e reutilização',
                'Redução de resíduos'
            ],
            impacts: [
                { value: 5, label: 'Toneladas Recicladas' },
                { value: 3, label: 'Hortas Criadas' },
                { value: 300, label: 'Pessoas Impactadas' },
                { value: 15, label: 'Voluntários Verdes' }
            ],
            gallery: []
        }
    ],
    
    testimonials: [
        {
            name: 'Maria Silva',
            role: 'Mãe de aluno',
            text: 'O projeto mudou a vida do meu filho. Ele melhorou muito na escola e está mais confiante.',
            avatar: 'imagens/avatar-1.jpg'
        },
        {
            name: 'João Santos',
            role: 'Voluntário há 3 anos',
            text: 'É gratificante ver o impacto positivo que fazemos na comunidade. Cada sorriso vale a pena.',
            avatar: 'imagens/avatar-2.jpg'
        },
        {
            name: 'Ana Costa',
            role: 'Beneficiária',
            text: 'Recebi atendimento médico quando mais precisava. Sou eternamente grata a esta ONG.',
            avatar: 'imagens/avatar-3.jpg'
        }
    ],
    
    timeline: [
        {
            date: '2010',
            title: 'Fundação',
            description: 'Início das atividades com 10 voluntários'
        },
        {
            date: '2015',
            title: 'Primeira Sede',
            description: 'Inauguração do espaço próprio'
        },
        {
            date: '2020',
            title: 'Expansão',
            description: 'Alcançamos 5.000 famílias atendidas'
        },
        {
            date: '2024',
            title: 'Reconhecimento',
            description: 'Prêmio de Melhor ONG do Ano'
        }
    ]
};

// ====================================
// SISTEMA PRINCIPAL
// ====================================

// Aguardar DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ONG Esperança - Iniciando aplicação avançada...');
    
    // Detectar página atual
    const currentPage = detectCurrentPage();
    console.log('📄 Página atual:', currentPage);
    
    // Inicializar funcionalidades comuns
    initCommonFeatures();
    
    // Inicializar funcionalidades específicas da página
    switch(currentPage) {
        case 'index':
            initHomePage();
            break;
        case 'projetos':
            initProjectsPage();
            break;
        case 'cadastro':
            initRegistrationPage();
            break;
    }
    
    // Inicializar sistema de notificações
    initNotificationSystem();
    
    // Inicializar modo escuro
    initDarkMode();
    
    console.log('✅ Aplicação iniciada com sucesso!');
});

// ====================================
// FUNCIONALIDADES COMUNS
// ====================================

function initCommonFeatures() {
    setupMobileMenu();
    setupSmoothScroll();
    setupHeaderScroll();
    setupLazyLoading();
    setupAnimations();
    setupAccessibility();
    setupPerformanceMonitor();
}

// Menu Mobile Hambúrguer MELHORADO
function setupMobileMenu() {
    console.log('📱 Configurando menu mobile aprimorado...');
    
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Criar wrapper para o menu
    const navMenu = nav.querySelector('ul');
    if (navMenu) {
        navMenu.classList.add('nav-menu');
        
        // Adicionar logo se não existir
        if (!nav.querySelector('.logo')) {
            const logo = document.createElement('div');
            logo.className = 'logo';
            logo.innerHTML = '<a href="index.html">ONG Esperança</a>';
            nav.insertBefore(logo, navMenu);
        }
    }
    
    // Criar botão hambúrguer
    let mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-toggle';
        mobileMenuBtn.setAttribute('aria-label', 'Menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = `
            <span class="hamburger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </span>
        `;
        nav.appendChild(mobileMenuBtn);
    }
    
    // Toggle menu com animação
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('active');
        
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Acessibilidade
        mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        
        // Animar itens do menu
        if (!isOpen) {
            const menuItems = navMenu.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.animation = `slideInRight 0.3s ease ${index * 0.1}s forwards`;
            });
        }
    });
    
    // Fechar ao clicar fora
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileMenuBtn.click();
        }
    });
}

// Header com scroll
function setupHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Adicionar sombra quando rolar
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Esconder/mostrar header
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// Smooth scroll para links internos
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy Loading de Imagens
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para browsers antigos
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Animações ao aparecer na tela
function setupAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, [data-animate]');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Se tiver data-animate, adicionar essa classe também
                    const animation = entry.target.dataset.animate;
                    if (animation) {
                        entry.target.classList.add(animation);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => animationObserver.observe(el));
    }
}

// ====================================
// PÁGINA INICIAL
// ====================================

function initHomePage() {
    console.log('🏠 Inicializando página inicial...');
    
    animateCounters();
    setupTestimonials();
    loadFeaturedProjects();
    setupParallax();
}

// Animar contadores
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('pt-BR');
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Carrossel de depoimentos
function setupTestimonials() {
    const testimonials = document.querySelector('.testimonials');
    if (!testimonials) return;
    
    const slides = testimonials.querySelectorAll('.testimonial');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Criar indicadores
    const indicators = document.createElement('div');
    indicators.className = 'testimonial-indicators';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'indicator';
        dot.setAttribute('aria-label', `Depoimento ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });
    
    testimonials.appendChild(indicators);
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        indicators.children[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        indicators.children[currentSlide].classList.add('active');
    }
    
    // Auto-play
    setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
}

// Carregar projetos em destaque
function loadFeaturedProjects() {
    const container = document.querySelector('#projetos-destaque .cards-grid');
    if (!container) return;
    
    const projects = [
        {
            title: 'Educar para Transformar',
            description: 'Programa de alfabetização e reforço escolar para crianças.',
            image: 'imagens/projeto-educacao.jpg',
            category: 'Educação',
            progress: 75
        },
        {
            title: 'Saúde em Primeiro Lugar',
            description: 'Atendimento médico gratuito para comunidades carentes.',
            image: 'imagens/projeto-saude.jpg',
            category: 'Saúde',
            progress: 60
        },
        {
            title: 'Alimentação Solidária',
            description: 'Distribuição de cestas básicas e refeições.',
            image: 'imagens/projeto-alimentacao.jpg',
            category: 'Alimentação',
            progress: 90
        }
    ];
    
    container.innerHTML = projects.map(project => `
        <div class="card project-card animate-on-scroll">
            <div class="card-image">
                <img src="${project.image}" alt="${project.title}">
                <span class="card-category">${project.category}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-text">${project.description}</p>
                <div class="progress-wrapper">
                    <div class="progress">
                        <div class="progress-bar" style="width: ${project.progress}%"></div>
                    </div>
                    <span class="progress-text">${project.progress}% concluído</span>
                </div>
                <a href="projetos.html" class="btn btn-primary">Saiba Mais</a>
            </div>
        </div>
    `).join('');
}

// Parallax effect
function setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ====================================
// PÁGINA DE PROJETOS
// ====================================

function initProjectsPage() {
    console.log('📋 Inicializando página de projetos...');
    
    setupProjectFilters();
    setupProjectSearch();
    loadAllProjects();
    setupLoadMore();
}

// Filtros de projetos
function setupProjectFilters() {
    const filterContainer = document.querySelector('.project-filters');
    if (!filterContainer) {
        // Criar filtros se não existirem
        const projectsSection = document.querySelector('#projetos-ativos');
        if (projectsSection) {
            const filters = document.createElement('div');
            filters.className = 'project-filters';
            filters.innerHTML = `
                <button class="filter-btn active" data-filter="todos">Todos</button>
                <button class="filter-btn" data-filter="educacao">Educação</button>
                <button class="filter-btn" data-filter="saude">Saúde</button>
                <button class="filter-btn" data-filter="alimentacao">Alimentação</button>
                <button class="filter-btn" data-filter="cultura">Cultura</button>
            `;
            projectsSection.insertBefore(filters, projectsSection.firstChild);
        }
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card, article[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filtrar projetos
            projectCards.forEach(card => {
                const category = card.dataset.category || 
                               card.querySelector('[data-category]')?.dataset.category || 
                               'todos';
                
                if (filter === 'todos' || category === filter) {
                    card.style.display = '';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });
}

// Busca de projetos
function setupProjectSearch() {
    const searchContainer = document.querySelector('.project-search');
    if (!searchContainer) {
        // Criar barra de busca se não existir
        const projectsSection = document.querySelector('#projetos-ativos');
        if (projectsSection) {
            const search = document.createElement('div');
            search.className = 'project-search';
            search.innerHTML = `
                <input type="search" id="project-search" placeholder="Buscar projetos..." class="search-input">
            `;
            
            const filters = projectsSection.querySelector('.project-filters');
            if (filters) {
                projectsSection.insertBefore(search, filters.nextSibling);
            } else {
                projectsSection.insertBefore(search, projectsSection.firstChild);
            }
        }
    }
    
    const searchInput = document.querySelector('#project-search');
    if (!searchInput) return;
    
    const projectCards = document.querySelectorAll('.project-card, article');
    
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const text = title + ' ' + description;
            
            if (searchTerm === '' || text.includes(searchTerm)) {
                card.style.display = '';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }, 300));
}

// Carregar todos os projetos
function loadAllProjects() {
    // Adicionar categorias aos projetos existentes
    const projects = document.querySelectorAll('#projetos-ativos article');
    const categories = ['educacao', 'saude', 'alimentacao', 'capacitacao', 'cultura', 'esporte', 'ambiente'];
    
    projects.forEach((project, index) => {
        if (!project.dataset.category) {
            project.dataset.category = categories[index] || 'outros';
        }
        project.classList.add('project-card', 'animate-on-scroll');
    });
}

// Botão carregar mais
function setupLoadMore() {
    const loadMoreBtn = document.querySelector('#load-more-btn');
    if (!loadMoreBtn) {
        // Criar botão se não existir
        const projectsSection = document.querySelector('#projetos-ativos');
        if (projectsSection) {
            const btn = document.createElement('button');
            btn.id = 'load-more-btn';
            btn.className = 'btn btn-primary btn-load-more';
            btn.textContent = 'Carregar Mais Projetos';
            btn.style.display = 'none'; // Esconder por enquanto
            projectsSection.appendChild(btn);
        }
    }
}

// ====================================
// PÁGINA DE CADASTRO
// ====================================

function initRegistrationPage() {
    console.log('📝 Inicializando página de cadastro...');
    
    const form = document.querySelector('#formulario-cadastro form, form');
    if (form) {
        setupFormValidation(form);
        setupMasks();
        setupCEPSearch();
        setupFormSteps();
    }
}

// Validação do formulário
function setupFormValidation(form) {
    // Desabilitar validação HTML5 nativa
    form.setAttribute('novalidate', 'true');
    
    // Adicionar validação em tempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Validar ao sair do campo
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Remover erro ao começar a digitar
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
    
    // Validar ao enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Salvar dados
            saveFormData(form);
            
            // Mostrar mensagem de sucesso
            showSuccessMessage(form);
        } else {
            // Focar no primeiro erro
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validação de campo obrigatório
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }
    // Validação de email
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um e-mail válido';
        }
    }
    // Validação de CPF
    else if ((name === 'cpf' || field.id === 'cpf') && value) {
        if (!validateCPF(value)) {
            isValid = false;
            errorMessage = 'CPF inválido';
        }
    }
    // Validação de telefone
    else if ((name === 'telefone' || field.id === 'telefone') && value) {
        const phoneClean = value.replace(/\D/g, '');
        if (phoneClean.length < 10 || phoneClean.length > 11) {
            isValid = false;
            errorMessage = 'Telefone inválido';
        }
    }
    // Validação de CEP
    else if ((name === 'cep' || field.id === 'cep') && value) {
        const cepClean = value.replace(/\D/g, '');
        if (cepClean.length !== 8) {
            isValid = false;
            errorMessage = 'CEP inválido';
        }
    }
    // Validação de data de nascimento (idade mínima)
    else if (type === 'date' && value) {
        const birthDate = new Date(value);
        const today = new Date();
        const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
        
        if (age < 16) {
            isValid = false;
            errorMessage = 'Idade mínima: 16 anos';
        } else if (age > 120) {
            isValid = false;
            errorMessage = 'Data de nascimento inválida';
        }
    }
    
    // Mostrar erro ou sucesso
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else if (value) {
        showFieldSuccess(field);
    }
    
    return isValid;
}

// Validação de CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação do primeiro dígito
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;
    
    // Validação do segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Mostrar erro no campo
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    // Criar ou atualizar mensagem de erro
    let errorEl = field.parentElement.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

// Mostrar sucesso no campo
function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

// Limpar erro do campo
function clearFieldError(field) {
    field.classList.remove('error', 'success');
    
    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

// Configurar máscaras
function setupMasks() {
    // Máscara CPF
    const cpfInputs = document.querySelectorAll('#cpf, [name="cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
            }
            
            e.target.value = value;
        });
    });
    
    // Máscara Telefone
    const phoneInputs = document.querySelectorAll('#telefone, [name="telefone"], [type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d{0,2})/, '($1');
            }
            
            e.target.value = value;
        });
    });
    
    // Máscara CEP
    const cepInputs = document.querySelectorAll('#cep, [name="cep"]');
    cepInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            
            if (value.length > 5) {
                value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
            }
            
            e.target.value = value;
        });
    });
}

// Busca de CEP
function setupCEPSearch() {
    const cepInput = document.querySelector('#cep, [name="cep"]');
    if (!cepInput) return;
    
    cepInput.addEventListener('blur', async function() {
        const cep = this.value.replace(/\D/g, '');
        
        if (cep.length !== 8) return;
        
        // Mostrar loading
        const enderecoInput = document.querySelector('#endereco, [name="endereco"]');
        const cidadeInput = document.querySelector('#cidade, [name="cidade"]');
        const estadoInput = document.querySelector('#estado, [name="estado"]');
        
        if (enderecoInput) {
            enderecoInput.value = 'Buscando...';
            enderecoInput.disabled = true;
        }
        
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                if (enderecoInput) {
                    enderecoInput.value = data.logradouro || '';
                    enderecoInput.disabled = false;
                }
                
                if (cidadeInput) {
                    cidadeInput.value = data.localidade || '';
                }
                
                if (estadoInput) {
                    estadoInput.value = data.uf || '';
                }
                
                // Validar campos preenchidos
                [enderecoInput, cidadeInput, estadoInput].forEach(input => {
                    if (input && input.value) {
                        showFieldSuccess(input);
                    }
                });
            } else {
                if (enderecoInput) {
                    enderecoInput.value = '';
                    enderecoInput.disabled = false;
                }
                showNotification('CEP não encontrado', 'error');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            if (enderecoInput) {
                enderecoInput.value = '';
                enderecoInput.disabled = false;
            }
            showNotification('Erro ao buscar endereço', 'error');
        }
    });
}

// Formulário com etapas
function setupFormSteps() {
    const form = document.querySelector('form');
    const fieldsets = form?.querySelectorAll('fieldset');
    
    if (!fieldsets || fieldsets.length <= 1) return;
    
    let currentStep = 0;
    
    // Adicionar classe para controle
    fieldsets.forEach((fieldset, index) => {
        fieldset.classList.add('form-step');
        fieldset.dataset.step = index;
        if (index > 0) {
            fieldset.style.display = 'none';
        }
    });
    
    // Criar navegação
    const navigation = document.createElement('div');
    navigation.className = 'form-navigation';
    navigation.innerHTML = `
        <button type="button" class="btn btn-outline" id="prev-btn" style="display: none;">Anterior</button>
        <button type="button" class="btn btn-primary" id="next-btn">Próximo</button>
        <button type="submit" class="btn btn-success" id="submit-btn" style="display: none;">Enviar</button>
    `;
    
    form.appendChild(navigation);
    
    // Criar indicador de progresso
    const progressBar = document.createElement('div');
    progressBar.className = 'form-progress';
    progressBar.innerHTML = `
        <div class="progress">
            <div class="progress-bar" style="width: ${100 / fieldsets.length}%"></div>
        </div>
        <div class="step-indicators">
            ${Array.from(fieldsets).map((_, i) => `
                <span class="step-indicator ${i === 0 ? 'active' : ''}">${i + 1}</span>
            `).join('')}
        </div>
    `;
    
    form.insertBefore(progressBar, form.firstChild);
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Navegação
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < fieldsets.length - 1) {
                fieldsets[currentStep].style.display = 'none';
                currentStep++;
                fieldsets[currentStep].style.display = 'block';
                updateStepIndicators();
            }
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            fieldsets[currentStep].style.display = 'none';
            currentStep--;
            fieldsets[currentStep].style.display = 'block';
            updateStepIndicators();
        }
    });
    
    function validateStep(step) {
        const inputs = fieldsets[step].querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function updateStepIndicators() {
        // Atualizar botões
        prevBtn.style.display = currentStep > 0 ? 'inline-block' : 'none';
        nextBtn.style.display = currentStep < fieldsets.length - 1 ? 'inline-block' : 'none';
        submitBtn.style.display = currentStep === fieldsets.length - 1 ? 'inline-block' : 'none';
        
        // Atualizar barra de progresso
        const progress = ((currentStep + 1) / fieldsets.length) * 100;
        progressBar.querySelector('.progress-bar').style.width = `${progress}%`;
        
        // Atualizar indicadores
        const indicators = progressBar.querySelectorAll('.step-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active', 'completed');
            if (index < currentStep) {
                indicator.classList.add('completed');
            } else if (index === currentStep) {
                indicator.classList.add('active');
            }
        });
    }
}

// Salvar dados do formulário
function saveFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    });
    
    // Adicionar timestamp
    data.timestamp = new Date().toISOString();
    
    // Salvar no localStorage
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    volunteers.push(data);
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
    
    console.log('Dados salvos:', data);
}

// Mostrar mensagem de sucesso
function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">✓</div>
        <h2>Cadastro Realizado com Sucesso!</h2>
        <p>Obrigado por se juntar à ONG Esperança.</p>
        <p>Em breve entraremos em contato.</p>
        <a href="index.html" class="btn btn-primary">Voltar ao Início</a>
    `;
    
    form.style.display = 'none';
    form.parentElement.appendChild(successMessage);
}

// ====================================
// FUNÇÕES UTILITÁRIAS
// ====================================

// Detectar página atual
function detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');
    
    if (!filename || filename === 'index') {
        return 'index';
    }
    
    return filename;
}

// Debounce para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Notificações toast
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ====================================
// FUNCIONALIDADES GLOBAIS EXTRAS
// ====================================

// Inicializar funcionalidades da página após carregamento dinâmico
function initPageFeatures() {
    setupAnimations();
    setupLazyLoading();
    animateCounters();
}

// Mostrar loader da página
function showPageLoader() {
    let loader = document.querySelector('.page-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
}

// Esconder loader da página
function hidePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
}

// Mostrar loader genérico
function showLoader() {
    showPageLoader();
}

// Esconder loader genérico
function hideLoader() {
    hidePageLoader();
}

// Configurar funcionalidades do modal
function setupModalFeatures() {
    // Tabs do modal
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.textContent.toLowerCase().replace(' ', '-');
            switchTab(tabName);
        });
    });
    
    // Formulário de doação no modal
    const donationForm = document.querySelector('#donation-form');
    if (donationForm) {
        setupDonationForm(donationForm);
    }
}

// Trocar tabs
function switchTab(tabName) {
    // Remover active de todos
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Adicionar active ao selecionado
    document.querySelector(`.tab-button:nth-child(${getTabIndex(tabName)})`).classList.add('active');
    document.querySelector(`#${tabName}-tab`).classList.add('active');
}

// Obter índice da tab
function getTabIndex(tabName) {
    const tabs = ['about', 'impact', 'gallery', 'donate'];
    return tabs.indexOf(tabName) + 1;
}

// Animar números no modal
function animateModalNumbers() {
    const numbers = document.querySelectorAll('.impact-number[data-count]');
    numbers.forEach(number => {
        const target = parseInt(number.dataset.count);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current).toLocaleString('pt-BR');
        }, 30);
    });
}

// Configurar formulário de doação
function setupDonationForm(form) {
    const amountButtons = form.querySelectorAll('.amount-btn');
    const customAmount = form.querySelector('#custom-amount');
    
    amountButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            amountButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            if (customAmount) {
                customAmount.value = btn.dataset.amount;
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        processDonation(form);
    });
}

// Processar doação
function processDonation(form) {
    const amount = form.querySelector('#custom-amount')?.value || 
                   form.querySelector('.amount-btn.selected')?.dataset.amount;
    
    if (!amount || amount <= 0) {
        showNotification('Por favor, selecione um valor para doar', 'error');
        return;
    }
    
    // Simular processamento
    showLoader();
    
    setTimeout(() => {
        hideLoader();
        
        // Salvar doação
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations.push({
            amount: parseFloat(amount),
            date: new Date().toISOString(),
            projectId: form.dataset.projectId
        });
        localStorage.setItem('donations', JSON.stringify(donations));
        
        // Mostrar sucesso
        showNotification(`Obrigado pela doação de R$ ${amount}!`, 'success');
        
        // Fechar modal se estiver aberto
        if (typeof ModalSystem !== 'undefined') {
            ModalSystem.close();
        }
    }, 2000);
}

// Fechar modal
function closeModal() {
    if (typeof ModalSystem !== 'undefined') {
        ModalSystem.close();
    }
}

// Sistema de notificações melhorado
const NotificationSystem = {
    queue: [],
    isShowing: false,
    
    show(message, type = 'info', duration = 3000) {
        this.queue.push({ message, type, duration });
        if (!this.isShowing) {
            this.showNext();
        }
    },
    
    showNext() {
        if (this.queue.length === 0) {
            this.isShowing = false;
            return;
        }
        
        this.isShowing = true;
        const { message, type, duration } = this.queue.shift();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="notification-progress">
                <div class="notification-progress-bar" style="animation-duration: ${duration}ms"></div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remover após duração
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                this.showNext();
            }, 300);
        }, duration);
    },
    
    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
};

// Atualizar função showNotification para usar o sistema melhorado
function showNotification(message, type = 'info', duration = 3000) {
    NotificationSystem.show(message, type, duration);
}

// Sistema de dark mode
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
    
    // Criar botão de dark mode
    const darkModeBtn = document.createElement('button');
    darkModeBtn.className = 'dark-mode-toggle';
    darkModeBtn.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    darkModeBtn.title = 'Alternar Modo Escuro';
    darkModeBtn.addEventListener('click', toggleDarkMode);
    
    const accessibilityBar = document.querySelector('.accessibility-bar');
    if (accessibilityBar) {
        accessibilityBar.appendChild(darkModeBtn);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    const btn = document.querySelector('.dark-mode-toggle');
    if (btn) {
        btn.innerHTML = isDark ? '☀️' : '🌙';
    }
}

// Sistema de notificações do navegador
function initNotificationSystem() {
    // Verificar suporte e pedir permissão
    if ('Notification' in window && Notification.permission === 'default') {
        // Criar botão para solicitar notificações
        const enableNotificationsBtn = document.createElement('button');
        enableNotificationsBtn.className = 'enable-notifications-btn';
        enableNotificationsBtn.innerHTML = '🔔 Ativar Notificações';
        enableNotificationsBtn.style.display = 'none'; // Esconder por enquanto
        
        enableNotificationsBtn.addEventListener('click', () => {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showNotification('Notificações ativadas!', 'success');
                    enableNotificationsBtn.remove();
                }
            });
        });
        
        // Adicionar ao header ou outro local apropriado
        const header = document.querySelector('header');
        if (header) {
            // header.appendChild(enableNotificationsBtn);
        }
    }
}

// Verificar conexão com a internet
function checkOnlineStatus() {
    if (!navigator.onLine) {
        showNotification('Você está offline. Algumas funcionalidades podem não estar disponíveis.', 'warning');
    }
    
    window.addEventListener('online', () => {
        showNotification('Conexão restaurada!', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('Conexão perdida. Verifique sua internet.', 'error');
    });
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', () => {
    checkOnlineStatus();
});

// ====================================
// EXPORTAR FUNÇÕES GLOBAIS
// ====================================

window.ONGEsperanca = {
    showNotification,
    validateCPF,
    debounce,
    showLoader,
    hideLoader,
    openProjectModal,
    openLightbox,
    shareProject,
    closeModal,
    switchTab,
    NotificationSystem,
    toggleDarkMode
};