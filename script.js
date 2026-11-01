const backgroundVideo = document.getElementById('cinema-video');

function syncBackgroundVideo() {
  if (!backgroundVideo) return;

  backgroundVideo.muted = true;
  backgroundVideo.defaultMuted = true;
  backgroundVideo.playsInline = true;

  if (document.hidden) {
    backgroundVideo.pause();
    return;
  }

  if (backgroundVideo.paused) {
    backgroundVideo.play().catch((error) => {
      console.warn('Autoplay aguardando carregamento ou interação:', error);
    });
  }
}

if (backgroundVideo) {
  backgroundVideo.addEventListener('loadeddata', syncBackgroundVideo);
  backgroundVideo.addEventListener('canplay', syncBackgroundVideo);
  document.addEventListener('visibilitychange', syncBackgroundVideo);
  document.addEventListener('click', syncBackgroundVideo, { once: true });

  syncBackgroundVideo();
}

/* ==========================================================================
   1. DADOS REAIS DO /INVEST (OPORTUNIDADES + FILTRO DA LIA + INCLINAÇÃO 3D)
   ========================================================================== */
const realOpportunities = [
  {
    id: 1,
    type: "Apartamento",
    area: "150 a 180 m²",
    location: "Perdizes, São Paulo",
    aval: "R$ 1,4 a 1,6 mi",
    minBid: "≈ R$ 750 mil",
    range: "500a1500",
    discount: "−50% na 2ª Praça"
  },
  {
    id: 2,
    type: "Apartamento",
    area: "35 a 45 m²",
    location: "Bela Vista, São Paulo",
    aval: "R$ 490 a 550 mil",
    minBid: "≈ R$ 260 mil",
    range: "ate500",
    discount: "Alta Liquidez"
  },
  {
    id: 3,
    type: "Apartamento",
    area: "260 a 310 m²",
    location: "República, São Paulo",
    aval: "R$ 3,3 a 3,7 mi",
    minBid: "≈ R$ 1,75 mi",
    range: "acima1500",
    discount: "Margem Premium"
  },
  {
    id: 4,
    type: "Apartamento",
    area: "70 a 90 m²",
    location: "Penha de França, São Paulo",
    aval: "R$ 420 a 480 mil",
    minBid: "≈ R$ 225 mil",
    range: "ate500",
    discount: "−48% vs. Região"
  },
  {
    id: 5,
    type: "Casa",
    area: "140 a 180 m²",
    location: "Curitiba, Paraná",
    aval: "R$ 1,75 a 2,0 mi",
    minBid: "≈ R$ 940 mil",
    range: "500a1500",
    discount: "Mercado Aquecido"
  },
  {
    id: 6,
    type: "Terreno",
    area: "Área Comercial",
    location: "São Paulo Capital",
    aval: "R$ 4,4 a 4,9 mi",
    minBid: "≈ R$ 2,33 mi",
    range: "acima1500",
    discount: "Pré-Edital"
  }
];

let currentPriceFilter = 'all';

function renderProperties() {
  const typeSelect = document.getElementById('type-filter').value;
  const grid = document.getElementById('properties-grid');

  const filtered = realOpportunities.filter(item => {
    const matchPrice = currentPriceFilter === 'all' || item.range === currentPriceFilter;
    const matchType = typeSelect === 'all' || item.type === typeSelect;
    return matchPrice && matchType;
  });

  document.getElementById('count-display').innerText = filtered.length;

  grid.innerHTML = filtered.map(item => `
    <div class="prop-card" onclick="openPropertyModal(${item.id})" onmousemove="tiltCard(event, this)" onmouseleave="resetTilt(this)">
      <div class="prop-top">
        <span class="prop-type-badge">${item.type} · ${item.area}</span>
        <span class="prop-discount-tag">${item.discount}</span>
      </div>
      <div class="prop-city">${item.location}</div>
      <div class="prop-numbers">
        <div>
          <small>Avaliação no Processo</small>
          <strong>${item.aval}</strong>
        </div>
        <div>
          <small>Lances a partir de</small>
          <strong class="text-gold">${item.minBid}</strong>
        </div>
      </div>
      <div class="prop-footer">
        <span>Ver lance máximo e vendas da região</span>
        <span>→</span>
      </div>
    </div>
  `).join('');
}

function filterProperties(range, btn) {
  currentPriceFilter = range;
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProperties();
}

function applySelectFilters() {
  renderProperties();
}

// Efeito Cinematográfico 3D Tilt nos Cards
function tiltCard(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 10;
  const rotateX = ((y / rect.height) - 0.5) * -10;
  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
}

function resetTilt(card) {
  card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)`;
}

function openPropertyModal(id) {
  const prop = realOpportunities.find(p => p.id === id);
  if (!prop) return;
  document.getElementById('modal-title').innerText = `${prop.type} · ${prop.area}`;
  document.getElementById('modal-loc').innerText = prop.location;
  document.getElementById('modal-aval').innerText = prop.aval;
  document.getElementById('modal-lance').innerText = prop.minBid;
  document.getElementById('property-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('property-modal').classList.add('hidden');
}

/* ==========================================================================
   2. PALCO DE 5 ATOS NO SCROLL ("DO PROCESSO NA JUSTIÇA AO SEU LANCE")
   ========================================================================== */
const cinemaActs = [
  {
    badge: "ATO 1 / 5 · O CARD ESSENCIAL",
    url: "app.preleilaobr.com.br/invest/card-moema",
    html: `
      <div class="moema-header">
        <div>
          <span class="eyebrow">EXEMPLO REAL · MOEMA, SÃO PAULO</span>
          <h3 style="font-size:1.6rem;">Apartamento · ≈ 85 m²</h3>
        </div>
        <span class="prop-discount-tag">★ Melhor Margem</span>
      </div>
      <div class="moema-grid">
        <div class="moema-stat">
          <small>Avaliação Judicial</small>
          <strong>R$ 820 mil</strong>
        </div>
        <div class="moema-stat">
          <small>2ª Praça (50%)</small>
          <strong style="color:#34d399;">R$ 410 mil</strong>
        </div>
        <div class="moema-stat" style="border-color:rgba(163,230,53,0.5);">
          <small>Lance até (Sua Margem)</small>
          <strong class="text-gold">R$ 577 mil</strong>
        </div>
      </div>
      <small style="color:#94a3b8;">Régua comparativa: 2ª Praça (R$ 410 mil) vs. Vendas Reais na Região (R$ 790 mil)</small>
      <div class="ruler-bar"><div class="ruler-fill"></div></div>
      <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#94a3b8;">
        <span>Leiloeiro nomeado · 12/09</span>
        <span style="color:#34d399;">● Mercado Aquecido</span>
      </div>
    `
  },
  {
    badge: "ATO 2 / 5 · RAIO-X DA REGIÃO",
    url: "app.preleilaobr.com.br/invest/analise-predio",
    html: `
      <span class="eyebrow">AV. EXEMPLO, 100 · APTO 52 · MATRÍCULA Confirmada</span>
      <h3 style="font-size:1.45rem; margin-bottom:18px;">Comparativo de Vendas no Mesmo Prédio</h3>
      <div class="moema-grid" style="grid-template-columns: 1fr 1fr;">
        <div class="moema-stat">
          <small>R$/m² em Moema</small>
          <strong>R$ 9.900 / m²</strong>
        </div>
        <div class="moema-stat">
          <small>Vendidos no Mesmo Prédio</small>
          <strong style="color:#34d399;">R$ 790 mil <small style="display:inline;">(3 vendas)</small></strong>
        </div>
        <div class="moema-stat">
          <small>Média de Arremates na Região</small>
          <strong class="text-gold">R$ 498 mil <small style="display:inline;">(63% do valor)</small></strong>
        </div>
        <div class="moema-stat">
          <small>Fase do Processo</small>
          <strong>Penhora + Avaliação ✓</strong>
        </div>
      </div>
    `
  },
  {
    badge: "ATO 3 / 5 · TERMÔMETRO DO BAIRRO",
    url: "app.preleilaobr.com.br/invest/liquidez-moema",
    html: `
      <div class="moema-header">
        <div>
          <span class="eyebrow">LIQUIDEZ COMPROVADA EM 24 MESES</span>
          <h3 style="font-size:1.5rem;">386 vendas registradas no bairro</h3>
        </div>
        <span class="prop-discount-tag">Volume +8% · m² +5%</span>
      </div>
      <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:16px;">
        Metade das vendas do bairro ocorre entre <strong>R$ 8.900/m²</strong> e <strong>R$ 11.200/m²</strong>. A avaliação deste processo está em <strong>R$ 9.647/m²</strong>.
      </p>
      <div style="display:flex; align-items:flex-end; gap:10px; height:90px; padding:14px; background:rgba(0,0,0,0.35); border-radius:14px;">
        <div style="flex:1; height:45%; background:rgba(163,230,53,0.3); border-radius:4px;"></div>
        <div style="flex:1; height:60%; background:rgba(163,230,53,0.45); border-radius:4px;"></div>
        <div style="flex:1; height:75%; background:rgba(163,230,53,0.65); border-radius:4px;"></div>
        <div style="flex:1; height:95%; background:#34d399; border-radius:4px;"></div>
      </div>
    `
  },
  {
    badge: "ATO 4 / 5 · LANCE MÁXIMO AUTOMÁTICO",
    url: "app.preleilaobr.com.br/invest/calculadora",
    html: `
      <span class="eyebrow">CÁLCULO DE SEGURANÇA JÁ PREENCHIDO</span>
      <h3 style="font-size:1.5rem; margin-bottom:14px;">Teto de Lance: <span class="text-gold">R$ 577.169</span></h3>
      <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:18px;">
        Para revender por <strong>R$ 790.000</strong> e garantir <strong>20% de margem líquida</strong> após pagar Comissão do Leiloeiro (5%), ITBI (3%) e Registro (1,5%).
      </p>
      <div class="viability-badge">✓ CABE COM FOLGA NA 2ª PRAÇA (MÍNIMO R$ 410.000)</div>
    `
  },
  {
    badge: "ATO 5 / 5 · CRM MEUS IMÓVEIS",
    url: "app.preleilaobr.com.br/invest/meus-imoveis",
    html: `
      <span class="eyebrow">ACOMPANHAMENTO ATÉ O ARREMATE</span>
      <h3 style="font-size:1.4rem; margin-bottom:16px;">Quadro Organizador + Exportação Excel</h3>
      <div class="kanban-mini">
        <div class="kanban-col">
          <h5>Interesse (2)</h5>
          <div class="kanban-item"><strong>R$ 820 mil</strong><br>Moema · Apto</div>
          <div class="kanban-item"><strong>R$ 450 mil</strong><br>Penha · Apto</div>
        </div>
        <div class="kanban-col">
          <h5>Matrícula (1)</h5>
          <div class="kanban-item"><strong>R$ 1,5 mi</strong><br>Perdizes · Checklist 2/4</div>
        </div>
        <div class="kanban-col">
          <h5>Vou Participar (1)</h5>
          <div class="kanban-item" style="border:1px solid #a3e635;"><strong>R$ 520 mil</strong><br>Bela Vista · 12/11</div>
        </div>
      </div>
    `
  }
];

let currentActIndex = -1;

function setCinemaAct(index) {
  if (index === currentActIndex) return;
  currentActIndex = index;

  document.querySelectorAll('.act-item').forEach((el, idx) => {
    el.classList.toggle('active', idx === index);
  });

  const contentBox = document.getElementById('stage-dynamic-content');
  const act = cinemaActs[index];

  contentBox.style.opacity = '0';
  contentBox.style.transform = 'translateY(10px)';

  setTimeout(() => {
    document.getElementById('stage-badge').innerText = act.badge;
    document.getElementById('stage-url').innerText = act.url;
    contentBox.innerHTML = act.html;
    contentBox.style.opacity = '1';
    contentBox.style.transform = 'translateY(0)';
  }, 160);
}

/* ==========================================================================
   3. CALCULADORA INTERATIVA DE LANCE MÁXIMO
   ========================================================================== */
function runBidCalculator() {
  const venda = Number(document.getElementById('inp-venda').value);
  const margemPct = Number(document.getElementById('inp-margem').value) / 100;

  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  // Desconta margem desejada + custos de aquisição (5% leiloeiro + 3% ITBI + 1.5% escritura = 9.5%)
  const lanceMaximo = Math.round((venda * (1 - margemPct)) / 1.095);
  const avaliacaoEstimada = Math.round(venda * 1.038);
  const segundaPraca = Math.round(avaliacaoEstimada * 0.5);
  const lucroEstimado = Math.round(venda * margemPct);

  document.getElementById('lbl-venda').innerText = fmt(venda);
  document.getElementById('lbl-margem').innerText = `${Math.round(margemPct * 100)}%`;
  document.getElementById('res-lance-max').innerText = fmt(lanceMaximo);
  document.getElementById('res-praca1').innerText = fmt(avaliacaoEstimada);
  document.getElementById('res-praca2').innerText = fmt(segundaPraca);
  document.getElementById('res-explicacao').innerHTML = `
    Para vender por <strong>${fmt(venda)}</strong> e embolsar <strong>${Math.round(margemPct * 100)}% de margem</strong> (≈ ${fmt(lucroEstimado)} de lucro).
  `;
}

/* ==========================================================================
   4. LISTENERS DE SCROLL E INICIALIZAÇÃO
   ========================================================================== */
let scrollUpdateFrame = 0;
let maxScroll = 0;
let stageTop = 0;
let stageHeight = 0;
let viewportHeight = window.innerHeight;
const stageTrack = document.querySelector('.cinema-scrolly-track');
const readingProgress = document.getElementById('reading-progress');

function refreshScrollMetrics() {
  viewportHeight = window.innerHeight;
  maxScroll = Math.max(document.documentElement.scrollHeight - viewportHeight, 0);

  if (stageTrack) {
    const bounds = stageTrack.getBoundingClientRect();
    stageTop = bounds.top + window.scrollY;
    stageHeight = bounds.height;
  }
}

function updateScrollEffects() {
  scrollUpdateFrame = 0;

  const scrollY = window.scrollY;
  const pct = maxScroll > 0 ? scrollY / maxScroll : 0;
  readingProgress.style.transform = `scaleX(${pct})`;

  if (stageTrack) {
    const stageBottom = stageTop + stageHeight;
    const scrollable = stageHeight - viewportHeight;
    if (stageTop - scrollY <= 90 && stageBottom - scrollY >= viewportHeight && scrollable > 0) {
      const progress = Math.min(Math.max((scrollY - stageTop + 90) / scrollable, 0), 0.99);
      const actIdx = Math.floor(progress * cinemaActs.length);
      setCinemaAct(actIdx);
    }
  }
}

window.addEventListener('scroll', () => {
  if (!scrollUpdateFrame) {
    scrollUpdateFrame = requestAnimationFrame(updateScrollEffects);
  }
}, { passive: true });
window.addEventListener('resize', refreshScrollMetrics, { passive: true });
window.addEventListener('load', refreshScrollMetrics, { once: true });
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(refreshScrollMetrics);
}

// Observer para animar entrada suave das seções
const revealElements = [...document.querySelectorAll('.reveal-up')];
let revealObserver = null;

function revealVisibleContent() {
  revealElements.forEach(element => {
    if (element.classList.contains('visible')) return;
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.88 && bounds.bottom > 0) {
      element.classList.add('visible');
      if (revealObserver) revealObserver.unobserve(element);
    }
  });
}

if ('IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  window.addEventListener('scroll', revealVisibleContent, { passive: true });
}

window.addEventListener('resize', revealVisibleContent);
revealVisibleContent();

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('primary-navigation');

function closeMobileNav() {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menu');
  navMenu.classList.remove('is-open');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    navMenu.classList.toggle('is-open', !isOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMobileNav();
});

// Inicializa a página
renderProperties();
setCinemaAct(0);
runBidCalculator();
refreshScrollMetrics();
updateScrollEffects();