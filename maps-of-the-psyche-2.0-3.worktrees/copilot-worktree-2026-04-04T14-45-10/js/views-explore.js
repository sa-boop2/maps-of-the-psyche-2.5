// ============================================================
// VIEWS — EXPLORE: Archetypes, Historical Figures, Case Studies, Disagreements
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsExplore = (function() {
  const D = () => window.PsycheData;

  // Archetype symbols for visual engagement
  const archetypeSymbols = {
    'The Hero': '⚔️',
    'The Shadow': '🌑',
    'The Trickster': '🃏',
    'Anima / Animus': '☯️',
    'The Wise Old Man': '🧙',
    'The Great Mother': '🌙',
    'The Child': '✨',
    'The Self': '☀️',
    'The Persona': '🎭',
    'The Outcast': '🚶'
  };

  function renderArchetypes(container) {
    const archetypes = D().archetypes || [];
    let selectedArchetype = null;
    let viewMode = 'gallery'; // 'gallery' or 'deep-dive'

    function render() {
      container.innerHTML = `
        <div class="view-header">
          <h1>⟡ The Living Archetypes</h1>
          <p class="view-intro">Universal patterns dwelling in the collective unconscious — primordial images that shape human experience across all cultures and time.</p>
        </div>

        <!-- Interactive Mode Selector -->
        <div class="explore-modes">
          <button class="explore-mode-btn ${viewMode === 'gallery' ? 'active' : ''}" data-mode="gallery">
            <span class="mode-icon">◐</span>
            <span class="mode-label">Gallery View</span>
          </button>
          <button class="explore-mode-btn ${viewMode === 'deep-dive' ? 'active' : ''}" data-mode="deep-dive">
            <span class="mode-icon">◉</span>
            <span class="mode-label">Deep Dive</span>
          </button>
        </div>

        <!-- Archetype Prompt -->
        <div class="archetype-prompt fade-in">
          <div class="prompt-icon">❓</div>
          <div class="prompt-text">Which archetype calls to you today? Hover to explore, click to dive deeper.</div>
        </div>

        ${viewMode === 'gallery' ? renderGalleryView(archetypes) : renderDeepDiveView(archetypes)}
      `;

      // Mode switchers
      container.querySelectorAll('.explore-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          viewMode = btn.dataset.mode;
          window.PsycheApp.Sound?.playUIClick();
          render();
        });
      });

      // Card interactions
      if (viewMode === 'gallery') {
        bindGalleryCards(container, archetypes);
      } else {
        bindDeepDiveCards(container, archetypes);
      }
    }

    function renderGalleryView(archetypes) {
      return `
        <div class="archetype-gallery">
          ${archetypes.map((a, i) => `
            <div class="archetype-flip-card fade-in" style="animation-delay:${i * 0.08}s" data-idx="${i}">
              <div class="flip-card-inner">
                <!-- Front: Light Side -->
                <div class="flip-card-front">
                  <div class="archetype-symbol">${archetypeSymbols[a.name] || '◈'}</div>
                  <div class="archetype-name">${a.name}</div>
                  <div class="archetype-subtitle">${a.subtitle}</div>
                  <div class="archetype-hint">↻ Flip to see Shadow</div>
                </div>
                <!-- Back: Shadow Side -->
                <div class="flip-card-back">
                  <div class="shadow-label">🌑 Shadow Aspect</div>
                  <div class="shadow-text">${a.shadowAspect || 'The unintegrated aspects remain hidden...'}</div>
                  <div class="archetype-hint">Click to explore fully</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Cultural Examples Ticker -->
        <div class="cultural-ticker">
          <div class="ticker-label">Across Cultures:</div>
          <div class="ticker-content">
            ${archetypes.flatMap(a => (a.culturalExamples || []).slice(0, 2)).map(ex => `<span class="ticker-item">${ex}</span>`).join('')}
          </div>
        </div>
      `;
    }

    function renderDeepDiveView(archetypes) {
      return `
        <div class="archetype-deep-dive">
          <!-- Archetype Selector -->
          <div class="archetype-selector">
            ${archetypes.map((a, i) => `
              <button class="archetype-select-btn ${selectedArchetype === i ? 'active' : ''}" data-idx="${i}">
                <span class="select-symbol">${archetypeSymbols[a.name] || '◈'}</span>
                <span class="select-name">${a.name.replace('The ', '')}</span>
              </button>
            `).join('')}
          </div>

          <!-- Deep Dive Content -->
          ${selectedArchetype !== null ? renderArchetypeDetail(archetypes[selectedArchetype]) : `
            <div class="select-prompt fade-in">
              <div class="prompt-glyph">☉</div>
              <p>Select an archetype above to begin your exploration</p>
            </div>
          `}
        </div>
      `;
    }

    function renderArchetypeDetail(a) {
      return `
        <div class="archetype-detail fade-in">
          <!-- Hero Section -->
          <div class="detail-hero">
            <div class="hero-symbol">${archetypeSymbols[a.name] || '◈'}</div>
            <div class="hero-info">
              <h2>${a.name}</h2>
              <p class="hero-subtitle">${a.subtitle}</p>
            </div>
          </div>

          <!-- Description with Progressive Reveal -->
          <div class="detail-section">
            <div class="section-header" data-section="essence">
              <span class="section-icon">◉</span>
              <span class="section-title">The Essence</span>
              <span class="section-toggle">+</span>
            </div>
            <div class="section-content">
              <p>${a.description}</p>
            </div>
          </div>

          <!-- Shadow Integration -->
          <div class="detail-section shadow-section">
            <div class="section-header" data-section="shadow">
              <span class="section-icon">🌑</span>
              <span class="section-title">The Shadow Side</span>
              <span class="section-toggle">+</span>
            </div>
            <div class="section-content">
              <p>${a.shadowAspect || 'When unintegrated, this archetype can possess and distort...'}</p>
            </div>
          </div>

          <!-- Cultural Manifestations -->
          <div class="detail-section">
            <div class="section-header" data-section="cultures">
              <span class="section-icon">🌍</span>
              <span class="section-title">Across Cultures</span>
              <span class="section-toggle">+</span>
            </div>
            <div class="section-content">
              <div class="culture-grid">
                ${(a.culturalExamples || []).map(ex => `
                  <div class="culture-chip">${ex}</div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Framework Connections -->
          <div class="detail-section">
            <div class="section-header" data-section="frameworks">
              <span class="section-icon">🔗</span>
              <span class="section-title">Framework Connections</span>
              <span class="section-toggle">+</span>
            </div>
            <div class="section-content">
              <div class="framework-connections">
                ${Object.entries(a.frameworkConnections || {}).map(([fw, conn]) => `
                  <div class="fw-connection">
                    <span class="fw-name">${fw}</span>
                    <span class="fw-link">→</span>
                    <span class="fw-concept">${conn}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Reflection Questions -->
          <div class="reflection-zone">
            <div class="reflection-header">
              <span class="reflection-icon">💭</span>
              <span>Questions for Reflection</span>
            </div>
            ${(a.reflections || []).map((q, i) => `
              <div class="reflection-question fade-in" style="animation-delay:${i * 0.15}s">
                <span class="q-number">${i + 1}</span>
                <span class="q-text">${q}</span>
              </div>
            `).join('')}
          </div>

          <!-- Further Reading -->
          ${a.books && a.books.length > 0 ? `
            <div class="reading-list">
              <div class="reading-header">📚 Dive Deeper</div>
              ${a.books.map(b => `<div class="book-item">${b}</div>`).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }

    function bindGalleryCards(container, archetypes) {
      container.querySelectorAll('.archetype-flip-card').forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.dataset.idx);
          window.PsycheApp.Sound?.playNodeClick(idx, archetypes.length);
          window.PsycheApp.Sidebar.show(archetypes[idx]);
        });
      });
    }

    function bindDeepDiveCards(container, archetypes) {
      container.querySelectorAll('.archetype-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedArchetype = parseInt(btn.dataset.idx);
          window.PsycheApp.Sound?.playUIClick();
          render();
        });
      });

      // Collapsible sections
      container.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
          const section = header.closest('.detail-section');
          section.classList.toggle('expanded');
          header.querySelector('.section-toggle').textContent = section.classList.contains('expanded') ? '−' : '+';
          window.PsycheApp.Sound?.playUIClick();
        });
      });
    }

    render();
  }

  function renderHistoricalFigures(container) {
    const figures = D().historicalFigures || [];
    let selectedEra = 'all';
    let hoveredFigure = null;

    // Group figures by era
    const eras = {
      ancient: { label: 'Ancient World', range: [-3000, 500], icon: '🏛️' },
      medieval: { label: 'Medieval Era', range: [500, 1500], icon: '⚔️' },
      modern: { label: 'Modern Age', range: [1500, 1900], icon: '📚' },
      contemporary: { label: 'Contemporary', range: [1900, 2100], icon: '🧠' }
    };

    function getEra(yearsStr) {
      const match = yearsStr?.match(/-?\d+/);
      if (!match) return 'contemporary';
      const year = parseInt(match[0]);
      if (year < 500) return 'ancient';
      if (year < 1500) return 'medieval';
      if (year < 1900) return 'modern';
      return 'contemporary';
    }

    function render() {
      const filteredFigures = selectedEra === 'all' ? figures : figures.filter(f => getEra(f.years) === selectedEra);

      container.innerHTML = `
        <div class="view-header">
          <h1>♰ Luminaries of the Psyche</h1>
          <p class="view-intro">How the landscape of consciousness manifests in notable lives. Each figure embodies particular layers, struggles, and transformations.</p>
        </div>

        <!-- Era Filter -->
        <div class="era-timeline">
          <button class="era-btn ${selectedEra === 'all' ? 'active' : ''}" data-era="all">
            <span class="era-icon">◉</span>
            <span class="era-label">All Eras</span>
          </button>
          ${Object.entries(eras).map(([key, era]) => `
            <button class="era-btn ${selectedEra === key ? 'active' : ''}" data-era="${key}">
              <span class="era-icon">${era.icon}</span>
              <span class="era-label">${era.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Figures Counter -->
        <div class="figure-counter fade-in">
          <span class="count-number">${filteredFigures.length}</span>
          <span class="count-label">psyches to explore</span>
        </div>

        <!-- Figures Grid -->
        <div class="figures-grid">
          ${filteredFigures.map((f, i) => `
            <div class="figure-card fade-in" style="animation-delay:${i * 0.05}s" data-idx="${figures.indexOf(f)}">
              <div class="figure-era-badge">${eras[getEra(f.years)]?.icon || '◈'}</div>
              <div class="figure-portrait">
                <div class="portrait-glyph">${f.name.charAt(0)}</div>
              </div>
              <div class="figure-info">
                <div class="figure-name">${f.name}</div>
                <div class="figure-years">${f.years}</div>
              </div>
              <div class="figure-preview">${f.description.substring(0, 100)}...</div>
              <div class="figure-layers">
                ${(f.primaryLayers || []).slice(0, 3).map(l => `<span class="layer-tag">${l}</span>`).join('')}
              </div>
              <div class="figure-cta">
                <span class="cta-text">Explore Psyche</span>
                <span class="cta-arrow">→</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Insight Banner -->
        <div class="insight-banner fade-in">
          <div class="insight-icon">💡</div>
          <div class="insight-text">Click any figure to see how their psyche maps onto the frameworks — then find them in the 3D visualization.</div>
        </div>
      `;

      // Era filter
      container.querySelectorAll('.era-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedEra = btn.dataset.era;
          window.PsycheApp.Sound?.playUIClick();
          render();
        });
      });

      // Figure cards
      container.querySelectorAll('.figure-card').forEach(card => {
        card.addEventListener('click', () => {
          const f = figures[parseInt(card.dataset.idx)];
          window.PsycheApp.Sound?.playNodeClick(0, 1);
          window.PsycheApp.Sidebar.show({
            name: f.name,
            subtitle: f.years,
            description: f.description,
            practices: f.frameworks,
            reflections: [
              'How does this figure\'s journey mirror your own?',
              'What aspect of their psyche resonates with you?',
              'What can their struggles teach you about your shadow?'
            ]
          });
        });

        // Hover effect
        card.addEventListener('mouseenter', () => {
          card.querySelector('.figure-portrait').classList.add('hovered');
        });
        card.addEventListener('mouseleave', () => {
          card.querySelector('.figure-portrait').classList.remove('hovered');
        });
      });
    }

    render();
  }

  function renderCaseStudies(container) {
    const cases = D().caseStudies || [];
    let activeCase = 0;
    let revealedLenses = [];
    let showingAnalysis = false;

    function render() {
      const c = cases[activeCase];
      
      container.innerHTML = `
        <div class="view-header">
          <h1>◈ Case Studies</h1>
          <p class="view-intro">Real-world psychological scenarios analyzed through multiple frameworks. See how different traditions illuminate the same human struggle.</p>
        </div>

        <!-- Case Navigator -->
        <div class="case-navigator">
          <div class="case-progress">
            <span class="progress-label">Case Study</span>
            <span class="progress-count">${activeCase + 1} of ${cases.length}</span>
          </div>
          <div class="case-tabs-scroll">
            ${cases.map((cs, i) => `
              <button class="case-tab ${i === activeCase ? 'active' : ''}" data-idx="${i}">
                <span class="case-num">${String(i + 1).padStart(2, '0')}</span>
                <span class="case-name">${cs.title}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Main Case Content -->
        <div class="case-content fade-in">
          <!-- The Scenario (Story First) -->
          <div class="scenario-card">
            <div class="scenario-header">
              <div class="scenario-icon">📖</div>
              <div class="scenario-meta">
                <h2 class="scenario-title">${c.title}</h2>
                <p class="scenario-subtitle">${c.subtitle}</p>
              </div>
            </div>
            <div class="scenario-body">
              <div class="scenario-text">${c.scenario}</div>
            </div>
            
            <!-- Engagement Prompt -->
            ${!showingAnalysis ? `
              <div class="scenario-prompt">
                <div class="prompt-question">🤔 Before reading the analysis: What do YOU think is happening here?</div>
                <div class="prompt-hint">Take a moment to form your own hypothesis...</div>
                <button class="reveal-btn" id="reveal-analyses">
                  <span class="reveal-icon">◈</span>
                  <span class="reveal-text">Reveal Multi-Framework Analysis</span>
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Framework Analyses (Revealed progressively) -->
          ${showingAnalysis ? `
            <div class="analyses-section">
              <div class="analyses-header">
                <h3>🔮 Multi-Framework Analysis</h3>
                <p class="analyses-intro">Each lens reveals different dimensions of the same experience. Click to explore each perspective.</p>
              </div>
              
              <div class="lens-selector">
                ${c.lenses.map((l, i) => `
                  <button class="lens-btn ${revealedLenses.includes(i) ? 'revealed' : ''}" data-idx="${i}">
                    <span class="lens-name">${l.framework}</span>
                    <span class="lens-status">${revealedLenses.includes(i) ? '✓' : '?'}</span>
                  </button>
                `).join('')}
              </div>

              <div class="lens-cards">
                ${c.lenses.map((l, i) => `
                  <div class="lens-card ${revealedLenses.includes(i) ? 'revealed' : 'hidden'} fade-in" style="animation-delay:${i * 0.1}s">
                    <div class="lens-card-header">
                      <span class="lens-framework">${l.framework}</span>
                    </div>
                    <div class="lens-card-body">
                      <p>${l.analysis || l.position}</p>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Progress Indicator -->
              <div class="lens-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${(revealedLenses.length / c.lenses.length) * 100}%"></div>
                </div>
                <span class="progress-text">${revealedLenses.length} of ${c.lenses.length} perspectives explored</span>
              </div>

              <!-- Synthesis Question -->
              ${revealedLenses.length === c.lenses.length ? `
                <div class="synthesis-prompt fade-in">
                  <div class="synthesis-icon">💭</div>
                  <div class="synthesis-content">
                    <h4>Reflection</h4>
                    <p>Having seen all perspectives: Which framework resonates most with your understanding? What do they collectively reveal that no single one could?</p>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Case Navigation -->
        <div class="case-nav-footer">
          <button class="case-nav-btn prev" ${activeCase === 0 ? 'disabled' : ''}>
            <span class="nav-arrow">←</span>
            <span class="nav-label">Previous Case</span>
          </button>
          <button class="case-nav-btn next" ${activeCase === cases.length - 1 ? 'disabled' : ''}>
            <span class="nav-label">Next Case</span>
            <span class="nav-arrow">→</span>
          </button>
        </div>
      `;

      // Tab switching
      container.querySelectorAll('.case-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          activeCase = parseInt(tab.dataset.idx);
          revealedLenses = [];
          showingAnalysis = false;
          window.PsycheApp.Sound?.playUIClick();
          render();
        });
      });

      // Reveal analyses button
      container.querySelector('#reveal-analyses')?.addEventListener('click', () => {
        showingAnalysis = true;
        window.PsycheApp.Sound?.playSearchOpen();
        render();
      });

      // Lens buttons
      container.querySelectorAll('.lens-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          if (!revealedLenses.includes(idx)) {
            revealedLenses.push(idx);
            window.PsycheApp.Sound?.playNodeClick(idx, c.lenses.length);
            render();
          }
        });
      });

      // Navigation
      container.querySelector('.case-nav-btn.prev')?.addEventListener('click', () => {
        if (activeCase > 0) {
          activeCase--;
          revealedLenses = [];
          showingAnalysis = false;
          window.PsycheApp.Sound?.playUIClick();
          render();
        }
      });

      container.querySelector('.case-nav-btn.next')?.addEventListener('click', () => {
        if (activeCase < cases.length - 1) {
          activeCase++;
          revealedLenses = [];
          showingAnalysis = false;
          window.PsycheApp.Sound?.playUIClick();
          render();
        }
      });
    }

    render();
  }

  function renderDisagreements(container) {
    const disags = D().disagreements || [];
    let userPositions = {};
    let expandedIdx = null;

    const levelColors = {
      fundamental: '#d4544c',
      significant: '#d4884c',
      nuanced: '#4cd49a'
    };

    const levelDescriptions = {
      fundamental: 'These traditions make incompatible metaphysical claims',
      significant: 'Major practical differences in approach and outcome',
      nuanced: 'Subtle distinctions that may be more terminological'
    };

    function render() {
      container.innerHTML = `
        <div class="view-header">
          <h1>⚡ Where Frameworks Collide</h1>
          <p class="view-intro">Not mere differences in terminology — these are genuine philosophical fault lines. The unresolved tensions of human understanding.</p>
        </div>

        <!-- Legend -->
        <div class="tension-legend">
          <div class="legend-title">Tension Levels:</div>
          ${Object.entries(levelColors).map(([level, color]) => `
            <div class="legend-item">
              <span class="legend-dot" style="background: ${color}"></span>
              <span class="legend-label">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
            </div>
          `).join('')}
        </div>

        <!-- Disagreement Cards -->
        <div class="disagreements-list">
          ${disags.map((d, i) => `
            <div class="disagreement-card ${expandedIdx === i ? 'expanded' : ''} fade-in" style="animation-delay:${i * 0.08}s" data-idx="${i}">
              <!-- Header (Always Visible) -->
              <div class="disagree-header" data-idx="${i}">
                <div class="disagree-indicator" style="background: ${levelColors[d.level] || levelColors.nuanced}"></div>
                <div class="disagree-title-area">
                  <h3 class="disagree-title">${d.title}</h3>
                  <span class="disagree-level-badge" style="color: ${levelColors[d.level]}">${d.level}</span>
                </div>
                <div class="disagree-expand">${expandedIdx === i ? '−' : '+'}</div>
              </div>

              <!-- Expanded Content -->
              <div class="disagree-body">
                <p class="disagree-description">${d.description}</p>
                
                <!-- Visual Debate Format -->
                <div class="debate-arena">
                  <div class="debate-label">The Positions:</div>
                  ${d.positions.map((p, pi) => `
                    <div class="position-card">
                      <div class="position-framework">${p.framework}</div>
                      <div class="position-stance">${p.position}</div>
                    </div>
                  `).join('')}
                </div>

                <!-- Where Do You Stand? Interactive Slider -->
                <div class="stance-section">
                  <div class="stance-header">
                    <span class="stance-icon">🎯</span>
                    <span class="stance-title">Where do YOU stand?</span>
                  </div>
                  <div class="stance-slider-container">
                    <div class="stance-labels">
                      ${d.positions.slice(0, 2).map((p, idx) => `
                        <span class="stance-label ${idx === 0 ? 'left' : 'right'}">${p.framework}</span>
                      `).join('')}
                    </div>
                    <input type="range" class="stance-slider" min="0" max="100" value="${userPositions[i] ?? 50}" data-disagree="${i}">
                    <div class="stance-indicator" style="left: ${userPositions[i] ?? 50}%">
                      <div class="indicator-dot"></div>
                      <div class="indicator-label">${getStanceLabel(userPositions[i] ?? 50)}</div>
                    </div>
                  </div>
                </div>

                <!-- Implication -->
                <div class="implication-box">
                  <div class="implication-header">💡 The Implication</div>
                  <p class="implication-text">${d.implication}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Summary Insight -->
        <div class="summary-insight fade-in">
          <div class="insight-glyph">∿</div>
          <p>These tensions aren't problems to solve — they're koans to sit with. Each represents a genuine mystery of consciousness that humanity hasn't fully resolved.</p>
        </div>
      `;

      // Expand/collapse
      container.querySelectorAll('.disagree-header').forEach(header => {
        header.addEventListener('click', () => {
          const idx = parseInt(header.dataset.idx);
          expandedIdx = expandedIdx === idx ? null : idx;
          window.PsycheApp.Sound?.playUIClick();
          render();
        });
      });

      // Stance sliders
      container.querySelectorAll('.stance-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
          const idx = parseInt(e.target.dataset.disagree);
          userPositions[idx] = parseInt(e.target.value);
          const indicator = e.target.parentElement.querySelector('.stance-indicator');
          indicator.style.left = `${e.target.value}%`;
          indicator.querySelector('.indicator-label').textContent = getStanceLabel(e.target.value);
        });
      });
    }

    function getStanceLabel(value) {
      if (value < 20) return 'Strongly Left';
      if (value < 40) return 'Lean Left';
      if (value < 60) return 'Center/Both';
      if (value < 80) return 'Lean Right';
      return 'Strongly Right';
    }

    render();
  }

  return { renderArchetypes, renderHistoricalFigures, renderCaseStudies, renderDisagreements };
})();
