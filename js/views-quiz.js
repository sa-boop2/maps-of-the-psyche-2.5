// ============================================================
// VIEWS — QUIZ: "Find Your Path" Framework Compatibility Quiz
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsQuiz = (function() {
  const STORAGE_KEY = 'psyche_quiz_data';
  let currentQ = -1;
  let answers = [];

  const quizQuestions = [
    {
      q: "How do you primarily understand suffering?",
      options: [
        { text: "Suffering comes from distorted thinking patterns that can be corrected.", scores: { cbt: 3, functional: 2 } },
        { text: "Suffering is clinging to impermanent things and the illusion of a fixed self.", scores: { buddhist: 3, daoist: 2, vedantic: 1 } },
        { text: "Suffering comes from repressed material in the unconscious forcing its way out.", scores: { jungian: 3, freud: 2, psychodynamic: 1 } },
        { text: "Suffering is disconnection from community, ancestors, and the living world.", scores: { indigenous: 3, bantu: 2, yoruba: 1, nativeamerican: 1 } }
      ]
    },
    {
      q: "When you face a personal crisis, what feels most healing?",
      options: [
        { text: "Analyzing the problem logically, making a plan, and taking structured action.", scores: { cbt: 3, erikson: 1, functional: 2 } },
        { text: "Sitting with the pain in silence, letting it transform through awareness.", scores: { buddhist: 2, daoist: 3, vedantic: 2 } },
        { text: "Talking to someone deeply about my feelings and early experiences.", scores: { freud: 2, jungian: 2, psychodynamic: 3 } },
        { text: "Moving my body, being in nature, reconnecting with physical sensation.", scores: { somatic: 3, indigenous: 2, nativeamerican: 1 } }
      ]
    },
    {
      q: "Which of these concepts resonates most deeply?",
      options: [
        { text: "The Shadow — the hidden parts of ourselves we refuse to see.", scores: { jungian: 3, ifs: 2 } },
        { text: "Emptiness (Śūnyatā) — the liberating realization that nothing has fixed essence.", scores: { buddhist: 3, daoist: 2 } },
        { text: "The Tree of Life — reality as a structured emanation from the divine.", scores: { kabbalistic: 3, esoteric: 2 } },
        { text: "Neuroplasticity — the brain's capacity to rewire itself through practice.", scores: { functional: 3, cbt: 2, wilber: 1 } }
      ]
    },
    {
      q: "What does 'spiritual growth' mean to you?",
      options: [
        { text: "Integrating all parts of myself — dark and light — into wholeness.", scores: { jungian: 3, ifs: 2, wilber: 1 } },
        { text: "Dissolving the ego entirely and merging with the Absolute.", scores: { vedantic: 3, buddhist: 2, sufi: 1 } },
        { text: "Developing along a structured path of stages, each with its own challenge.", scores: { erikson: 2, wilber: 3, kabbalistic: 2 } },
        { text: "Becoming a better ancestor and contributing to collective healing.", scores: { indigenous: 3, bantu: 2, yoruba: 1 } }
      ]
    },
    {
      q: "How do you relate to your emotions?",
      options: [
        { text: "They are data — signals to be understood, sometimes corrected.", scores: { cbt: 3, functional: 2 } },
        { text: "They are weather passing through — I am the sky, not the storm.", scores: { buddhist: 3, act: 2, daoist: 1 } },
        { text: "They are messages from parts of me that need compassion and listening.", scores: { ifs: 3, gestalt: 2, jungian: 1 } },
        { text: "They live in my body — I feel them as physical sensations first.", scores: { somatic: 3, gestalt: 2, indigenous: 1 } }
      ]
    },
    {
      q: "What is the unconscious?",
      options: [
        { text: "A repository of repressed memories, drives, and childhood programming.", scores: { freud: 3, psychodynamic: 2 } },
        { text: "A vast collective ocean of archetypes, myths, and primordial images.", scores: { jungian: 3, esoteric: 1 } },
        { text: "An illusion — there is only present-moment awareness and its contents.", scores: { buddhist: 2, daoist: 1, functional: 2 } },
        { text: "A hidden dimension where ancestral wisdom and spiritual forces operate.", scores: { indigenous: 2, yoruba: 3, kabbalistic: 1, egyptian: 1 } }
      ]
    },
    {
      q: "What draws you to explore psychology and the psyche?",
      options: [
        { text: "I want practical tools to manage my anxiety, depression, or habits.", scores: { cbt: 3, dbt: 2, act: 1 } },
        { text: "I'm fascinated by the hidden depths of the human mind.", scores: { jungian: 2, freud: 2, psychodynamic: 2 } },
        { text: "I am on a spiritual path and want to understand consciousness.", scores: { vedantic: 2, buddhist: 2, wilber: 2, sufi: 1 } },
        { text: "I want to understand my relationships and relational patterns.", scores: { erikson: 2, ifs: 2, psychodynamic: 2, bantu: 1 } }
      ]
    },
    {
      q: "Which metaphor for the mind resonates most?",
      options: [
        { text: "The mind is a computer that can be reprogrammed.", scores: { cbt: 3, functional: 2 } },
        { text: "The mind is a mirror — its nature is clear, but it gathers dust.", scores: { buddhist: 2, daoist: 2, vedantic: 2 } },
        { text: "The mind is a family of inner characters, each with their own voice.", scores: { ifs: 3, jungian: 2 } },
        { text: "The mind is a tree whose roots reach into ancestral soil.", scores: { jungian: 1, indigenous: 2, yoruba: 2, kabbalistic: 2 } }
      ]
    },
    {
      q: "How important is the body in psychological healing?",
      options: [
        { text: "Somewhat — but the real work happens in changing thoughts and beliefs.", scores: { cbt: 3, act: 1 } },
        { text: "Centrally — the body stores trauma and must be included in healing.", scores: { somatic: 3, gestalt: 2, indigenous: 1 } },
        { text: "The body is a vehicle for consciousness — important but not ultimate.", scores: { vedantic: 2, kabbalistic: 1, wilber: 2 } },
        { text: "Body and mind are inseparable — one continuous flow.", scores: { daoist: 3, buddhist: 1, somatic: 1 } }
      ]
    },
    {
      q: "How do you view death?",
      options: [
        { text: "A biological event. The end of consciousness. Focus on this life.", scores: { functional: 3, cbt: 1 } },
        { text: "A transition — the soul continues its journey through other realms.", scores: { egyptian: 2, vedantic: 2, kabbalistic: 2, indigenous: 1 } },
        { text: "An illusion — what you truly are was never born and cannot die.", scores: { buddhist: 2, vedantic: 3, daoist: 1 } },
        { text: "A return to the ancestors and the communal web of being.", scores: { bantu: 3, yoruba: 2, indigenous: 2 } }
      ]
    },
    {
      q: "What is your relationship with mystery?",
      options: [
        { text: "I prefer clarity and evidence. Mystery is just unexplained phenomena.", scores: { cbt: 2, functional: 3 } },
        { text: "Mystery is the heart of existence. I am drawn to what cannot be known.", scores: { jungian: 2, esoteric: 3, sufi: 2 } },
        { text: "Mystery dissolves when awareness becomes clear enough.", scores: { buddhist: 2, vedantic: 3, daoist: 1 } },
        { text: "Mystery is lived through ritual, ceremony, and direct encounter with spirit.", scores: { indigenous: 3, yoruba: 2, nativeamerican: 2 } }
      ]
    },
    {
      q: "If you could spend a year studying with any teacher, who would you choose?",
      options: [
        { text: "A neuroscientist studying consciousness and the brain.", scores: { functional: 3, wilber: 1 } },
        { text: "A Zen master in silent retreat at a mountain monastery.", scores: { buddhist: 2, daoist: 3 } },
        { text: "A Jungian analyst who works with dreams, myth, and the imagination.", scores: { jungian: 3, esoteric: 1 } },
        { text: "An indigenous elder who carries ancestral wisdom and leads ceremony.", scores: { indigenous: 3, nativeamerican: 2, yoruba: 1 } }
      ]
    }
  ];

  // Framework display metadata
  const fwMeta = {
    jungian: { name: 'Jungian Depth Psychology', icon: '🌙', color: '#c9a84c', desc: 'You are drawn to the depths — shadow, archetypes, dreams, and the collective unconscious. You see the psyche as a vast inner landscape full of meaning.' },
    buddhist: { name: 'Buddhist Psychology', icon: '☸', color: '#4cd49a', desc: 'You resonate with non-attachment, impermanence, and the radical freedom of emptiness. Suffering is understood — and transcended — through awareness.' },
    freud: { name: 'Freudian Psychoanalysis', icon: '🛋', color: '#d4884c', desc: 'You sense the power of the unconscious, childhood patterns, and repressed material. The past shapes the present until it is made conscious.' },
    vedantic: { name: 'Vedantic Philosophy', icon: '🕉', color: '#e8836b', desc: 'You intuit that your deepest Self is identical with the Absolute. The journey is one of recognition — you are already what you seek.' },
    functional: { name: 'Functional Neuroscience', icon: '🧬', color: '#4cbcd4', desc: 'You trust evidence, neural circuits, and the brain\'s capacity for change. The mind is understood through its biological substrate.' },
    indigenous: { name: 'Indigenous Psychology', icon: '🌿', color: '#4cd49a', desc: 'You feel the living web of relationships — ancestors, land, community, spirit. Healing is relational and communal, never isolated.' },
    daoist: { name: 'Daoist Philosophy', icon: '☯', color: '#9a4cd4', desc: 'You are drawn to flow, emptiness, and wu wei. The way that can be named is not the eternal Way. You heal by un-doing.' },
    ifs: { name: 'Internal Family Systems', icon: '🔮', color: '#e8836b', desc: 'You experience yourself as multiple — a family of parts with a wise Self at the center. Healing comes through inner relationship and unburdening.' },
    cbt: { name: 'Cognitive-Behavioral', icon: '🧠', color: '#4c8cd4', desc: 'You value practical, structured tools for changing thoughts and behaviors. The mind can be trained, and evidence matters.' },
    kabbalistic: { name: 'Kabbalistic Mysticism', icon: '✡', color: '#c9a84c', desc: 'You sense a structured emanation from the divine — the Tree of Life maps consciousness from the infinite to the manifest.' },
    erikson: { name: 'Eriksonian Development', icon: '📈', color: '#4cbcd4', desc: 'You see life as a series of meaningful stages, each with its crisis and gift. Growth is a lifelong spiral of challenge and resolution.' },
    wilber: { name: 'Integral Theory (Wilber)', icon: '🌀', color: '#9a4cd4', desc: 'You want to include everything — East and West, science and spirit, individual and collective. The map must be as vast as the territory.' },
    somatic: { name: 'Somatic / Body-Based', icon: '🫁', color: '#4cd49a', desc: 'You know that the body keeps the score. Healing happens through sensation, movement, and completing the body\'s interrupted responses.' },
    yoruba: { name: 'Yoruba / Ifá', icon: '🔅', color: '#d4884c', desc: 'You feel the presence of Orí (inner head/destiny) and the Orishas. Your path is guided by ancestral wisdom and spiritual forces.' },
    bantu: { name: 'Bantu / Ubuntu', icon: '🤝', color: '#e8836b', desc: 'I am because we are. You understand that the self is inherently relational — personhood emerges through community and belonging.' },
    nativeamerican: { name: 'Native American', icon: '🦅', color: '#c9a84c', desc: 'The Medicine Wheel turns. You feel the four directions, the web of all relations, and the sacred hoop of life that connects all beings.' },
    esoteric: { name: 'Esoteric / Theosophical', icon: '⚗', color: '#9a4cd4', desc: 'You sense hidden layers of reality — astral, mental, causal bodies. The psyche has dimensions that mainstream psychology ignores.' },
    gestalt: { name: 'Gestalt Therapy', icon: '🪑', color: '#d4544c', desc: 'You believe awareness itself is healing. The present moment contains everything — feel it fully, express it fully, complete it fully.' },
    psychodynamic: { name: 'Psychodynamic', icon: '🪞', color: '#d4884c', desc: 'You value deep relational work. The therapeutic relationship itself is the agent of change — transference reveals what words cannot.' },
    egyptian: { name: 'Egyptian Psychology', icon: '𓂀', color: '#c9a84c', desc: 'You resonate with the ancient Egyptian understanding of the soul — Ka, Ba, Akh. The journey through the underworld is the journey of transformation.' },
    sufi: { name: 'Sufi Mysticism', icon: '🌹', color: '#e8836b', desc: 'The Beloved calls. You are drawn to the ecstatic dissolution of self into the divine — through love, poetry, and whirling presence.' },
    act: { name: 'ACT (Acceptance & Commitment)', icon: '🧭', color: '#4cd49a', desc: 'You value psychological flexibility — the ability to be present, open, and do what matters even when it\'s hard.' },
    dbt: { name: 'DBT (Dialectical Behavior)', icon: '☯', color: '#9a4cd4', desc: 'Acceptance AND change. You feel emotions intensely and need both validation and practical skills to navigate the storm.' }
  };

  function render(container) {
    currentQ = -1;
    answers = [];

    const saved = loadData();

    container.innerHTML = `
      <div class="view-header">
        <h1>Find Your Path</h1>
        <p>Which psychological and spiritual frameworks resonate most with your inner landscape? Answer honestly — there are no right or wrong answers.</p>
      </div>

      <div id="quiz-main" style="max-width: 700px; margin: 0 auto;">
        <div class="card fade-in" style="cursor:default; padding: 32px; text-align: center; border-top: 3px solid var(--gold);">
          <div style="font-size: 3rem; margin-bottom: 16px;">⟐</div>
          <div class="card-title" style="font-size: 1.3rem; margin-bottom: 12px;">Framework Compatibility Assessment</div>
          <div class="card-text" style="margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">
            12 questions mapping your psychological and philosophical orientations. Discover which traditions speak most directly to your inner architecture.
          </div>
          <button class="btn btn-primary" id="quiz-start" style="padding: 14px 48px; font-size: 1rem; letter-spacing: 0.06em;">Begin Assessment</button>
        </div>
      </div>

      ${saved.lastResults ? `
        <div style="max-width: 700px; margin: 32px auto 0;">
          <div class="card fade-in" style="cursor:default; padding: 24px; border-left: 3px solid var(--gold-dark); animation-delay: 0.1s;">
            <div class="card-subtitle" style="margin-bottom: 8px;">Previous Results · ${saved.lastDate || ''}</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${saved.lastResults.slice(0, 5).map(r => `
                <div class="sb-tag" style="font-size: 0.78rem;">${fwMeta[r.id]?.icon || ''} ${fwMeta[r.id]?.name || r.id} (${r.pct}%)</div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}
    `;

    document.getElementById('quiz-start')?.addEventListener('click', () => {
      window.PsycheApp.Sound?.playTransition();
      currentQ = 0;
      renderQuizQuestion(container.querySelector('#quiz-main'));
    });
  }

  function renderQuizQuestion(el) {
    if (currentQ >= quizQuestions.length) {
      showResults(el);
      return;
    }

    const q = quizQuestions[currentQ];
    const progress = (currentQ / quizQuestions.length) * 100;

    el.innerHTML = `
      <div class="fade-in">
        <div class="scanner-progress-bar" style="margin-bottom: 20px;">
          <div class="scanner-progress-fill" style="width: ${progress}%; background: var(--gold);"></div>
        </div>
        <div style="font-size: 0.72rem; color: var(--text-dim); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px;">
          QUESTION ${currentQ + 1} OF ${quizQuestions.length}
        </div>
        <div class="quiz-question" style="font-size: 1.4rem; margin-bottom: 28px;">${q.q}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-idx="${i}" style="margin-bottom: 10px; font-size: 0.98rem; padding: 18px 20px;">
              ${opt.text}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    el.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        window.PsycheApp.Sound?.playUIClick();
        const idx = parseInt(btn.dataset.idx);
        answers.push(q.options[idx].scores);
        currentQ++;
        renderQuizQuestion(el);
      });
    });
  }

  function showResults(el) {
    // Tally all scores
    const totals = {};
    answers.forEach(scoreMap => {
      Object.entries(scoreMap).forEach(([fw, score]) => {
        totals[fw] = (totals[fw] || 0) + score;
      });
    });

    const maxPossible = Math.max(...Object.values(totals));
    const sorted = Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .map(([id, score]) => ({
        id,
        score,
        pct: Math.round((score / maxPossible) * 100),
        meta: fwMeta[id] || { name: id, icon: '◯', color: 'var(--gold)', desc: '' }
      }));

    const top3 = sorted.slice(0, 3);
    const rest = sorted.slice(3);

    // Save results
    const saveResults = sorted.map(r => ({ id: r.id, pct: r.pct }));
    const data = loadData();
    data.lastResults = saveResults;
    data.lastDate = new Date().toLocaleDateString();
    saveData(data);

    // Build radar chart
    const radarHtml = buildRadarChart(sorted.slice(0, 8));

    el.innerHTML = `
      <div class="fade-in" style="text-align: center; margin-bottom: 32px;">
        <div style="font-size: 0.7rem; letter-spacing: 0.25em; color: var(--gold-dark); text-transform: uppercase; font-weight: 700; margin-bottom: 12px;">ASSESSMENT COMPLETE</div>
        <h2 style="font-family:var(--font-display);color:var(--gold);font-size:2rem;margin-bottom:8px;">Your Framework Affinity Profile</h2>
        <div style="height: 1px; width: 60px; background: var(--gold); margin: 0 auto 24px; opacity: 0.4;"></div>
      </div>

      <div style="display: flex; justify-content: center; margin-bottom: 32px;">
        ${radarHtml}
      </div>

      <h3 style="margin-bottom: 16px; font-size: 0.95rem; color: var(--gold-light); text-align: center;">Your Top Resonances</h3>

      ${top3.map((r, i) => `
        <div class="card fade-in" style="cursor:default; margin-bottom: 16px; padding: 24px; animation-delay: ${i * 0.1}s; border-left: 4px solid ${r.meta.color};">
          <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
            <div style="font-size: 2rem;">${r.meta.icon}</div>
            <div style="flex: 1;">
              <div class="card-title" style="font-size: 1.1rem; margin-bottom: 2px;">${r.meta.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-dim);">${r.pct}% resonance</div>
            </div>
            <div class="quiz-rank" style="--rank-color: ${r.meta.color};">#${i + 1}</div>
          </div>
          <div class="card-text" style="line-height: 1.7;">${r.meta.desc}</div>
          ${(() => {
            // Find matching framework in allFrameworks
            const fw = (window.PsycheApp.allFrameworks || []).find(f => f.id === r.id);
            return fw ? `<button class="btn btn-ghost" style="margin-top: 14px; font-size: 0.78rem;" data-explore-fw="${r.id}">Explore ${fw.name} on Map →</button>` : '';
          })()}
        </div>
      `).join('')}

      ${rest.length > 0 ? `
        <h3 style="margin: 24px 0 12px; font-size: 0.88rem; color: var(--text-dim);">Other Resonances</h3>
        <div class="quiz-secondary-grid">
          ${rest.filter(r => r.pct > 15).map((r, i) => `
            <div class="quiz-secondary-item fade-in" style="animation-delay: ${0.3 + i * 0.04}s">
              <span class="quiz-secondary-icon">${r.meta.icon}</span>
              <span class="quiz-secondary-name">${r.meta.name}</span>
              <div class="quiz-secondary-bar-bg">
                <div class="quiz-secondary-bar-fill" style="width: ${r.pct}%; background: ${r.meta.color};"></div>
              </div>
              <span class="quiz-secondary-pct">${r.pct}%</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="display: flex; gap: 12px; justify-content: center; margin-top: 32px; flex-wrap: wrap;">
        <button class="btn btn-ghost" id="quiz-retake">Retake Assessment</button>
      </div>
    `;

    // Bind explore buttons
    el.querySelectorAll('[data-explore-fw]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.PsycheApp.Sound?.playTransition();
        window.PsycheApp.setFrameworkById(btn.dataset.exploreFw);
        window.PsycheApp.goToView('map');
      });
    });

    document.getElementById('quiz-retake')?.addEventListener('click', () => {
      window.PsycheApp.Sound?.playUIClick();
      const container = el.closest('#secondary-view');
      if (container) render(container);
    });
  }

  function buildRadarChart(items) {
    const w = 300, h = 300;
    const cx = w / 2, cy = h / 2, r = w * 0.35;
    const n = items.length;
    if (n < 3) return '';

    // Grid rings
    let rings = '';
    for (let g = 25; g <= 100; g += 25) {
      const gr = (g / 100) * r;
      let pts = '';
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        pts += `${cx + gr * Math.cos(angle)},${cy + gr * Math.sin(angle)} `;
      }
      rings += `<polygon points="${pts}" fill="none" stroke="rgba(201,168,76,0.08)" stroke-width="1"/>`;
    }

    // Axes
    let axes = '';
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      axes += `<line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(angle)}" y2="${cy + r * Math.sin(angle)}" stroke="rgba(201,168,76,0.1)" stroke-width="1"/>`;
    }

    // Data shape
    let polygon = '', dots = '', labels = '';
    items.forEach((item, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const vr = (item.pct / 100) * r;
      const x = cx + vr * Math.cos(angle);
      const y = cy + vr * Math.sin(angle);
      polygon += `${x},${y} `;
      dots += `<circle cx="${x}" cy="${y}" r="4" fill="${item.meta.color}" stroke="var(--bg-primary)" stroke-width="1.5"/>`;

      const lx = cx + (r + 22) * Math.cos(angle);
      const ly = cy + (r + 22) * Math.sin(angle);
      const anchor = Math.abs(Math.cos(angle)) < 0.3 ? 'middle' : (Math.cos(angle) > 0 ? 'start' : 'end');
      labels += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" fill="var(--gold)" font-size="10" font-family="Inter">${item.meta.icon}</text>`;
    });

    return `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow: visible;">
        ${rings}${axes}
        <polygon points="${polygon}" fill="rgba(201,168,76,0.12)" stroke="var(--gold)" stroke-width="2"/>
        ${dots}${labels}
      </svg>
    `;
  }

  function loadData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  }
  function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) { console.warn('Storage failed', e); }
  }

  return { render };
})();
