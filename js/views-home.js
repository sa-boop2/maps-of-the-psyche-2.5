// ============================================================
// VIEWS — HOME: Premium landing page & navigation hub
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsHome = (function() {

  const cards = [
    {
      id: 'map',
      title: 'Psyche Maps',
      subtitle: 'Explore the architecture of consciousness',
      description: '28 frameworks across 6 traditions rendered as interactive 3D spheres. Compare, trace lineage, and navigate the full topology of the human psyche.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="18" opacity="0.3"/><circle cx="24" cy="24" r="12" opacity="0.5"/><circle cx="24" cy="24" r="6"/><circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none"/><line x1="24" y1="6" x2="24" y2="42" opacity="0.15"/><line x1="6" y1="24" x2="42" y2="24" opacity="0.15"/></svg>`,
      accent: 'var(--gold)',
      featured: true,
      tags: ['3D Map', 'Compare', 'Lineage', 'Timeline']
    },
    {
      id: 'trainings',
      title: 'Trainings',
      subtitle: 'The Path of Practice',
      description: 'Stop intellectualizing. Start living. Week-long immersive protocols: Hermeticism, Daoism, Jungian Individuation.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24 6 L24 18 M20 14 L24 18 L28 14" stroke-width="2"/><circle cx="24" cy="28" r="10" opacity="0.3"/><circle cx="24" cy="28" r="6"/><path d="M18 38 L30 38" stroke-width="2" opacity="0.5"/><path d="M14 42 L34 42" stroke-width="1.5" opacity="0.3"/></svg>`,
      accent: 'var(--accent-purple)',
      tags: ['7-14 Days', 'Immersion', 'Practice']
    },
    {
      id: 'ego',
      title: 'Ego',
      subtitle: 'The center of identity',
      description: 'How 28 frameworks conceptualize the conscious self — from illusion to sovereign navigator.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="16"/><path d="M24 8 C18 18, 18 30, 24 40" opacity="0.4"/><path d="M24 8 C30 18, 30 30, 24 40" opacity="0.4"/><circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" opacity="0.6"/></svg>`,
      accent: 'var(--accent-purple)'
    },
    {
      id: 'therapy',
      title: 'Therapy',
      subtitle: 'Evidence-based healing modalities',
      description: 'CBT, EMDR, IFS, Somatic therapy and more — with interactive exercises, trauma cartography, and personalized matching.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24 6v36"/><path d="M16 14h16"/><circle cx="24" cy="24" r="14" opacity="0.2"/><path d="M14 28 Q24 20 34 28" opacity="0.4"/></svg>`,
      accent: 'var(--accent-green)',
      tags: ['Modalities', 'Trauma', 'Exercises']
    },
    {
      id: 'darknight',
      title: 'Dark Night',
      subtitle: 'The descent that transforms',
      description: 'The universal spiritual crisis mapped across mystical traditions — from St. John of the Cross to the Buddhist dukkha nanas.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M34 16 A12 12 0 1 0 34 32 A8 8 0 1 1 34 16z"/><circle cx="14" cy="36" r="1" fill="currentColor" opacity="0.3"/><circle cx="38" cy="10" r="1" fill="currentColor" opacity="0.3"/><circle cx="10" cy="14" r="0.8" fill="currentColor" opacity="0.2"/></svg>`,
      accent: 'var(--accent-blue)'
    },
    {
      id: 'development',
      title: 'Growth',
      subtitle: 'Stages of psychosocial development',
      description: 'Erikson\'s eight crises from Trust vs. Mistrust to Integrity vs. Despair — the full arc of human becoming.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 38 L18 28 L26 32 L34 18 L40 10" stroke-width="2"/><circle cx="10" cy="38" r="2" fill="currentColor"/><circle cx="40" cy="10" r="2" fill="currentColor"/><path d="M10 42 L40 42" opacity="0.15"/></svg>`,
      accent: 'var(--accent-orange)'
    },
    {
      id: 'scanner',
      title: 'Shadow Scanner',
      subtitle: 'Interactive self-inquiry',
      description: '16 diagnostic probes mapping your current psychological friction point directly onto the consciousness sphere.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="18" opacity="0.2"/><circle cx="24" cy="24" r="10"/><path d="M24 14 L24 6" stroke-width="2"/><path d="M24 42 L24 34" stroke-width="2"/><path d="M14 24 L6 24" stroke-width="2"/><path d="M42 24 L34 24" stroke-width="2"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/></svg>`,
      accent: 'var(--accent-red)'
    },
    {
      id: 'archetypes',
      title: 'Archetypes',
      subtitle: 'Universal patterns of the collective unconscious',
      description: 'The Persona, Shadow, Anima/Animus, and Self — Jung\'s primordial images that shape every human story.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24 8 L14 20 L18 20 L12 32 L17 32 L8 44 L40 44 L31 32 L36 32 L30 20 L34 20 Z" opacity="0.3"/><circle cx="24" cy="18" r="6"/><path d="M18 26 Q24 34 30 26"/></svg>`,
      accent: 'var(--gold-light)'
    },
    {
      id: 'personal',
      title: 'My Map',
      subtitle: 'Personal psyche reflection',
      description: 'Rate your relationship with each layer of consciousness. Track your integration over time.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="18" opacity="0.15"/><circle cx="24" cy="24" r="12" opacity="0.25"/><circle cx="24" cy="24" r="6" opacity="0.4"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>`,
      accent: 'var(--accent-teal)'
    },
    {
      id: 'resources',
      title: 'Library',
      subtitle: 'Reading & resources',
      description: 'Curated books, papers, and references across all traditions and modalities.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="8" width="8" height="32" rx="1"/><rect x="20" y="12" width="8" height="28" rx="1" opacity="0.6"/><rect x="30" y="10" width="8" height="30" rx="1" opacity="0.3"/></svg>`,
      accent: 'var(--text-secondary)'
    },
    {
      id: 'chronos',
      title: 'Chronos',
      subtitle: 'Heroic timeline mapping',
      description: 'Plot your life chapters as mythic milestones and link each phase to fitting frameworks.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="16"/><path d="M24 14v11l7 4"/><path d="M9 24h4M35 24h4M24 9v4M24 35v4"/></svg>`,
      accent: 'var(--accent-orange)'
    },
    {
      id: 'alchemy',
      title: 'Alchemy Lab',
      subtitle: 'Nigredo → Rubedo integration',
      description: 'Convert shadow insights into embodied change using a ritualized transformation workflow.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h12"/><path d="M20 8v8l-8 16a8 8 0 0 0 7 12h10a8 8 0 0 0 7-12l-8-16V8"/><path d="M16 28h16"/></svg>`,
      accent: 'var(--gold)'
    },
    {
      id: 'compare',
      title: 'Comparison',
      subtitle: 'Cross-tradition layer study',
      description: 'Compare equivalent layers across traditions in one synchronized table.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="10" width="14" height="28"/><rect x="27" y="10" width="14" height="28"/><path d="M21 24h6"/></svg>`,
      accent: 'var(--accent-blue)'
    },
    {
      id: 'lineage',
      title: 'Lineage',
      subtitle: 'Transmission pathways',
      description: 'Trace how ideas passed from ancient schools into modern psychological systems.',
      icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="38" cy="38" r="3"/><path d="M13 13l8 8M27 27l8 8"/></svg>`,
      accent: 'var(--accent-teal)'
    }
  ];

  function render(container) {
    const primaryOrder = ['map', 'trainings', 'ego', 'therapy', 'scanner', 'resources'];
    const primaryCards = primaryOrder.map(id => cards.find(c => c.id === id)).filter(Boolean);
    const secondaryCards = cards.filter(c => !primaryOrder.includes(c.id));

    container.innerHTML = `
      <div class="home-page">
        <!-- Home Theme Toggle -->
        <button id="home-theme-btn" class="home-theme-btn" title="Toggle Light/Dark">
          <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Ambient background elements -->
        <div class="home-ambient">
          <div class="home-orb home-orb--1"></div>
          <div class="home-orb home-orb--2"></div>
          <div class="home-orb home-orb--3"></div>
        </div>

        <div class="home-content">
          <div class="home-hero fade-in">
            <div class="home-hero-sigil">Ψ</div>
            <h1 class="home-hero-title">PSYCHE</h1>
            <div class="home-hero-rule"></div>
            <p class="home-hero-sub">An Interactive Map of the Human Psyche</p>
            <p class="home-hero-desc">28 frameworks · 6 traditions · 65,000 years of human wisdom</p>
          </div>

          <section class="home-primary-section fade-in" style="animation-delay: 0.2s">
            <div class="home-section-title">Core Gateways</div>
            <p class="home-section-subtitle">Psyche Maps, Trainings, Ego, Therapy, Shadow Scanner, and Library</p>
            <div class="home-primary-row">
              ${primaryCards.map((card, i) => renderPrimaryCard(card, i)).join('')}
            </div>
          </section>

          <section class="home-more-section fade-in" style="animation-delay: 0.35s">
            <div class="home-more-kicker">More Views</div>
            <p class="home-more-sub">Expand into advanced lenses, synthesis tools, and developmental pathways.</p>
            <div class="home-more-count">${secondaryCards.length} additional views</div>
          </section>

          <div class="home-grid home-grid-compact">
            ${secondaryCards.map((card, i) => renderCard(card, i)).join('')}
          </div>

          <div class="home-footer fade-in" style="animation-delay: 1.2s">
            <p>Built with reverence for the cartographers of consciousness — from the Buddha to Jung, from the Yoruba to Freud.</p>
          </div>
        </div>
      </div>
    `;

    // Bind card clicks
    container.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', () => {
        const viewId = el.dataset.navigate;
        window.PsycheApp.Sound?.playUIClick();
        window.PsycheApp.goToView(viewId);
      });
    });

    // Theme toggle bind
    const homeThemeBtn = container.querySelector('#home-theme-btn');
    if (homeThemeBtn) {
      // Sync initial icon state
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      homeThemeBtn.querySelector('.icon-sun').style.display = isLight ? 'none' : 'block';
      homeThemeBtn.querySelector('.icon-moon').style.display = isLight ? 'block' : 'none';
      
      homeThemeBtn.addEventListener('click', () => {
        // Trigger the main nav theme button logic
        const mainBtn = document.getElementById('btn-theme');
        if (mainBtn) mainBtn.click();
        
        // Update local icons immediately
        const nowLight = document.documentElement.getAttribute('data-theme') === 'light';
        homeThemeBtn.querySelector('.icon-sun').style.display = nowLight ? 'none' : 'block';
        homeThemeBtn.querySelector('.icon-moon').style.display = nowLight ? 'block' : 'none';
      });
    }
  }

  function renderPrimaryCard(card, index) {
    return `
      <div class="home-primary-card fade-in" style="animation-delay: ${0.26 + index * 0.06}s" data-navigate="${card.id}">
        <div class="home-primary-icon" style="color: ${card.accent}">
          ${card.icon}
        </div>
        <div class="home-primary-body">
          <h2 class="home-primary-title">${card.title}</h2>
          <p class="home-primary-subtitle">${card.subtitle}</p>
          <p class="home-primary-desc">${card.description}</p>
          ${card.tags ? `<div class="home-card-tags">${card.tags.map(t => `<span class="home-tag home-tag--sm">${t}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    `;
  }

  function renderCard(card, index) {
    const classes = ['home-card', 'home-card--compact', 'fade-in'];
    if (card.comingSoon) classes.push('home-card--soon');
    if (card.highlight) classes.push('home-card--highlight');
    
    return `
      <div class="${classes.join(' ')}" style="animation-delay: ${0.42 + index * 0.05}s" data-navigate="${card.id}">
        ${card.comingSoon ? '<span class="home-badge">Coming Soon</span>' : ''}
        <div class="home-card-icon" style="color: ${card.accent}">
          ${card.icon}
        </div>
        <div class="home-card-body">
          <h3 class="home-card-title">${card.title}</h3>
          <p class="home-card-subtitle">${card.subtitle}</p>
          <p class="home-card-desc">${card.description}</p>
          ${card.tags ? `<div class="home-card-tags">${card.tags.map(t => `<span class="home-tag home-tag--sm">${t}</span>`).join('')}</div>` : ''}
        </div>
        <div class="home-card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    `;
  }

  function renderFeaturedCard(card) {
    return `
      <div class="home-featured fade-in" style="animation-delay: 0.3s" data-navigate="${card.id}">
        <div class="home-featured-glow"></div>
        <div class="home-featured-content">
          <div class="home-featured-icon" style="color: ${card.accent}">
            ${card.icon}
          </div>
          <div class="home-featured-text">
            <h2 class="home-featured-title">${card.title}</h2>
            <p class="home-featured-subtitle">${card.subtitle}</p>
            <p class="home-featured-desc">${card.description}</p>
            ${card.tags ? `<div class="home-featured-tags">${card.tags.map(t => `<span class="home-tag">${t}</span>`).join('')}</div>` : ''}
          </div>
        </div>
        <div class="home-featured-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    `;
  }

  return { render };
})();
