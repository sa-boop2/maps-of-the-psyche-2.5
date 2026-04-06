// ============================================================
// VIEWS — Shadow Scanner (Interactive Self-Inquiry)
// Enhanced: Full results summary with tallied framework mapping + 2.0-3 UI
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsScanner = (function() {
  
  const questions = [
    {
      q: "When placed under sudden, intense stress, what is your immediate biological response?",
      icon: "⚡",
      options: [
        { text: "My chest tightens, and I feel a surge of heat and anger.", result: { fw: "greek", layer: 1 } },
        { text: "I completely numb out, freeze, and detach from my body.", result: { fw: "aztec", layer: 0 } },
        { text: "My mind races endlessly, calculating worst-case scenarios.", result: { fw: "buddhist", layer: 2 } },
        { text: "I try to immediately appease others and fix the situation.", result: { fw: "ifs", layer: 1 } }
      ]
    },
    {
      q: "What trait instantly triggers profound frustration or disgust in you when you see it in other people?",
      icon: "🪞",
      options: [
        { text: "Arrogance and people taking up too much space.", result: { fw: "jungian", layer: 3 } },
        { text: "Weakness, victimhood, and failure to take responsibility.", result: { fw: "freud", layer: 0 } },
        { text: "Superficiality and obsession with physical appearances.", result: { fw: "esoteric", layer: 0 } },
        { text: "Rigid, dogmatic rule-following without heart.", result: { fw: "kabbalistic", layer: 2 } }
      ]
    },
    {
      q: "If you sit perfectly still in silence for 5 minutes, what is the loudest voice in your head?",
      icon: "🔊",
      options: [
        { text: "A harsh inner critic telling me I haven't done enough.", result: { fw: "freud", layer: 2 } },
        { text: "A deep, aching sense of separation or loneliness.", result: { fw: "erikson", layer: 5 } },
        { text: "A whirlwind of random, vivid fantasies and desires.", result: { fw: "kabbalistic", layer: 1 } },
        { text: "A quiet, terrifying vastness that feels like nothingness.", result: { fw: "buddhist", layer: 4 } }
      ]
    },
    {
      q: "When you achieve a major goal, how do you feel exactly 48 hours later?",
      icon: "🏆",
      options: [
        { text: "Empty. I immediately need the next goal to feel alive.", result: { fw: "lacanian", layer: 0 } },
        { text: "Guilty. I feel like I don't deserve it or I cheated.", result: { fw: "freud", layer: 2 } },
        { text: "Relieved, but exhausted by the mask I had to wear.", result: { fw: "jungian", layer: 0 } },
        { text: "Deeply aligned. I feel I fulfilled my destiny or purpose.", result: { fw: "yoruba", layer: 4 } }
      ]
    },
    {
      q: "How do you internally relate to the concept of 'God' or 'The Universe'?",
      icon: "∞",
      options: [
        { text: "It's an illusion created by the brain to manage death anxiety.", result: { fw: "functional", layer: 3 } },
        { text: "It is a terrifying, overwhelming force that dictates fate.", result: { fw: "gnostic", layer: 4 } },
        { text: "It is the unified ground of being that I am slowly remembering.", result: { fw: "vedantic", layer: 4 } },
        { text: "It's a web of living relationships between all living things.", result: { fw: "nativeamerican", layer: 2 } }
      ]
    },
    {
      q: "What is your primary mechanism for avoiding deep emotional pain?",
      icon: "🛡️",
      options: [
        { text: "Intellectualizing it into abstract theories and philosophies.", result: { fw: "enneagram", layer: 4 } },
        { text: "Working obsessively until I drop from exhaustion.", result: { fw: "erikson", layer: 3 } },
        { text: "Escaping into mystical states or 'spiritual bypassing'.", result: { fw: "wilber", layer: 5 } },
        { text: "Creating a completely false persona to interact with the world.", result: { fw: "jungian", layer: 0 } }
      ]
    },
    {
      q: "If true healing requires 'Ego Death', what does that phrase actually make you feel?",
      icon: "💀",
      options: [
        { text: "Absolute terror. If I lose control, I will cease to exist.", result: { fw: "jungian", layer: 1 } },
        { text: "Curiosity. I want to transcend this heavy meat-suit.", result: { fw: "egyptian", layer: 2 } },
        { text: "A sense of homecoming to a state of pure emptiness.", result: { fw: "daoist", layer: 2 } },
        { text: "Skepticism. Life is about managing practical reality, not escaping it.", result: { fw: "functional", layer: 3 } }
      ]
    },
    {
      q: "What is your deepest, unspoken fear?",
      icon: "🕳️",
      options: [
        { text: "That I am fundamentally broken or inherently evil.", result: { fw: "jungian", layer: 3 } },
        { text: "That my entire life has been meaningless and trivial.", result: { fw: "frankl", layer: 2 } },
        { text: "That I will be trapped in this painful reality forever.", result: { fw: "gnostic", layer: 0 } },
        { text: "That I will be completely abandoned and forgotten by others.", result: { fw: "bantu", layer: 1 } }
      ]
    },
    {
      q: "When someone offers me genuine, unconditional love, my immediate internal reaction is:",
      icon: "❤️",
      options: [
        { text: "Suspicion. I wonder what they want from me.", result: { fw: "freudian", layer: 1 } },
        { text: "Unworthiness. I feel like an imposter who tricked them.", result: { fw: "jungian", layer: 1 } },
        { text: "Suffocation. I immediately look for an exit or boundary.", result: { fw: "erikson", layer: 5 } },
        { text: "Dissolving. I fear losing myself entirely in them.", result: { fw: "kabbalistic", layer: 1 } },
        { text: "Numbness. I know I should feel something, but I don't.", result: { fw: "functional", layer: 0 } }
      ]
    },
    {
      q: "The trait I judge most harshly in others is:",
      icon: "⚖️",
      options: [
        { text: "Laziness or lack of ambition. People should work hard.", result: { fw: "daoist", layer: 0 } },
        { text: "Selfishness or narcissism. People should care about others.", result: { fw: "darwinian", layer: 0 } },
        { text: "Emotional volatility. People should control themselves.", result: { fw: "freudian", layer: 0 } },
        { text: "Weakness or vulnerability. People should be strong.", result: { fw: "jungian", layer: 1 } },
        { text: "Arrogance or certainty. People should stay humble.", result: { fw: "vedantic", layer: 3 } }
      ]
    },
    {
      q: "When I have absolutely nothing to do and no one to perform for, I typically feel:",
      icon: "⏳",
      options: [
        { text: "A crushing sense of emptiness or non-existence.", result: { fw: "buddhist", layer: 4 } },
        { text: "A low-level hum of anxiety that drives me to pick up my phone.", result: { fw: "functional", layer: 1 } },
        { text: "Guilt. I feel I must constantly be productive or I lose value.", result: { fw: "erikson", layer: 3 } },
        { text: "Relief. The mask can finally come off.", result: { fw: "jungian", layer: 2 } },
        { text: "Disconnection. Without others, I don't know who I am.", result: { fw: "bantu", layer: 2 } }
      ]
    },
    {
      q: "If I were completely free from all social consequences, laws, and judgment, my secret fear is that I would become:",
      icon: "🔥",
      options: [
        { text: "A tyrant who dominates and controls everyone around me.", result: { fw: "jungian", layer: 1 } },
        { text: "A pure hedonist, consuming pleasure until it destroyed me.", result: { fw: "freudian", layer: 0 } },
        { text: "A hermit who abandons all relationships and society forever.", result: { fw: "erikson", layer: 5 } },
        { text: "Nothing. A stagnant puddle completely devoid of motivation.", result: { fw: "functional", layer: 2 } },
        { text: "A trickster who breaks things just to see what happens.", result: { fw: "aztec", layer: 1 } }
      ]
    },
    {
      q: "When I feel utterly powerless in a situation, my instinctual defense is to:",
      icon: "🕸️",
      options: [
        { text: "Become hyper-rational, detached, and analytical to rise above the feeling.", result: { fw: "functional", layer: 2 } },
        { text: "Comply completely and disappear, making myself small so I won't be a target.", result: { fw: "freudian", layer: 1 } },
        { text: "Get angry and try to seize control at any cost, even destructively.", result: { fw: "jungian", layer: 1 } },
        { text: "Dissociate — tell myself none of this is real or important anyway.", result: { fw: "buddhist", layer: 2 } },
        { text: "Find someone else to blame or project my powerlessness onto.", result: { fw: "kabbalistic", layer: 1 } }
      ]
    },
    {
      q: "The most comforting lie I regularly tell myself is:",
      icon: "🎭",
      options: [
        { text: "I just need to find the right person/job/place, and then I will finally be happy.", result: { fw: "erikson", layer: 5 } },
        { text: "I am deeply unique and misunderstood by others.", result: { fw: "jungian", layer: 2 } },
        { text: "I have entirely pure intentions, unlike the selfish people around me.", result: { fw: "freudian", layer: 2 } },
        { text: "Everything happens for a reason according to a divine or cosmic plan.", result: { fw: "vedantic", layer: 1 } },
        { text: "If I just work harder and optimize better, I can control my destiny.", result: { fw: "functional", layer: 1 } }
      ]
    },
    {
      q: "If my deepest, most shameful insecurity were broadcast to the world, I would most fear being:",
      icon: "👁️",
      options: [
        { text: "Pried open. Seen without my protective armor.", result: { fw: "ifs", layer: 1 } },
        { text: "Cast out from the tribe. Exiled from my community forever.", result: { fw: "bantu", layer: 1 } },
        { text: "Judged as essentially flawed, defective, or 'bad' at my core.", result: { fw: "freudian", layer: 2 } },
        { text: "Laughed at. Dismissed as pathetic, irrelevant, or a joke.", result: { fw: "jungian", layer: 2 } },
        { text: "Pitied. I cannot bear being seen as weak or needing help.", result: { fw: "daoist", layer: 1 } }
      ]
    },
    {
      q: "When I see someone else failing spectacularly or suffering a public humiliation, my secret, unacknowledged reaction is often:",
      icon: "🎭",
      options: [
        { text: "A quiet thrill of relief. 'Better them than me.'", result: { fw: "darwinian", layer: 0 } },
        { text: "Self-righteousness. 'They got exactly what they deserved.'", result: { fw: "freudian", layer: 2 } },
        { text: "Terror. I immediately imagine it happening to me and panic.", result: { fw: "functional", layer: 1 } },
        { text: "Fascination. I am drawn to the chaos and destruction.", result: { fw: "jungian", layer: 1 } },
        { text: "Numbness. I turn away because I cannot handle feeling their pain.", result: { fw: "buddhist", layer: 1 } }
      ]
    }
  ];

  let currentStep = -1;
  let answers = [];
  let scanPhase = 'intro'; // 'intro', 'scanning', 'processing', 'result'

  function render(container) {
    currentStep = -1;
    answers = [];
    scanPhase = 'intro';
    renderIntro(container);
  }

  function renderIntro(container) {
    container.innerHTML = `
      <div class="scanner-intro">
        <div class="scanner-ambient">
          <div class="ambient-ring ring-1"></div>
          <div class="ambient-ring ring-2"></div>
          <div class="ambient-ring ring-3"></div>
        </div>

        <div class="scanner-hero fade-in">
          <div class="scanner-glyph">◖</div>
          <h1 class="scanner-title">Shadow Scanner</h1>
          <div class="scanner-divider"></div>
          <p class="scanner-tagline">An interactive self-inquiry engine</p>
        </div>

        <div class="scanner-description fade-in" style="animation-delay:0.3s">
          <p>The Psyche Map is not a passive tool. Through a series of carefully designed diagnostic probes, this engine will map your <strong>current psychological friction point</strong> directly onto the 3D consciousness sphere.</p>
          <p class="scanner-warning">⚠️ These questions are designed to reach beneath the surface. Answer with your first instinct, not your idealized self.</p>
        </div>

        <div class="scanner-stats fade-in" style="animation-delay:0.5s">
          <div class="stat-item">
            <span class="stat-number">${questions.length}</span>
            <span class="stat-label">Diagnostic Probes</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">16</span>
            <span class="stat-label">Frameworks Analyzed</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">~3</span>
            <span class="stat-label">Minutes</span>
          </div>
        </div>

        <button id="btn-initiate-scan" class="scanner-start-btn fade-in" style="animation-delay:0.7s">
          <span class="btn-icon">◉</span>
          <span class="btn-text">Initiate Diagnostic</span>
          <span class="btn-glow"></span>
        </button>

        <p class="scanner-privacy fade-in" style="animation-delay:0.9s">
          🔒 Your answers are processed locally and never stored or transmitted.
        </p>
      </div>
    `;

    const btn = document.getElementById('btn-initiate-scan');
    if (btn) btn.addEventListener('click', () => {
      if (window.PsycheApp.Sound) window.PsycheApp.Sound.playTransition();
      scanPhase = 'scanning';
      currentStep = 0;
      renderQuestion(container);
    });
  }

  function renderQuestion(container) {
    if (currentStep >= questions.length) {
      processResults(container);
      return;
    }

    const q = questions[currentStep];
    const progress = ((currentStep) / questions.length) * 100;

    container.innerHTML = `
      <div class="scanner-question-view">
        <div class="scan-progress">
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progress}%"></div>
            <div class="progress-glow" style="left: ${progress}%"></div>
          </div>
          <div class="progress-info">
            <span class="progress-step">PROBE ${currentStep + 1} OF ${questions.length}</span>
            <span class="progress-percent">${Math.round(progress)}% complete</span>
          </div>
        </div>

        <div class="question-card fade-in">
          <div class="question-icon">${q.icon || "👁️"}</div>
          <div class="question-text">${q.q}</div>
        </div>

        <div class="answer-options">
          ${q.options.map((opt, i) => `
            <button class="answer-option fade-in" data-idx="${i}" style="animation-delay:${0.1 + i * 0.08}s">
              <span class="option-marker">${['A', 'B', 'C', 'D', 'E'][i] || '*'}</span>
              <span class="option-text">${opt.text}</span>
              <span class="option-select">→</span>
            </button>
          `).join('')}
        </div>

        <div class="nav-hint fade-in" style="animation-delay:0.5s">
          <span class="hint-text">Choose the answer that feels most true, even if uncomfortable</span>
        </div>
      </div>
    `;

    container.querySelectorAll('.answer-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        btn.classList.add('selected');
        if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
        
        const idx = parseInt(btn.dataset.idx);
        answers.push(q.options[idx].result);
        
        setTimeout(() => {
          currentStep++;
          renderQuestion(container);
        }, 300);
      });

      btn.addEventListener('mouseenter', () => {
        btn.querySelector('.option-select').textContent = '→';
      });
    });
  }

  function processResults(container) {
    scanPhase = 'processing';

    container.innerHTML = `
      <div class="scanner-processing">
        <div class="processing-visual">
          <div class="process-ring"></div>
          <div class="process-core">
            <span class="core-symbol">◉</span>
          </div>
        </div>

        <h2 class="processing-title">Triangulating Shadow Vector</h2>
        
        <div class="processing-stages">
          <div class="stage-item active" data-stage="1">
            <span class="stage-icon">◯</span>
            <span class="stage-text">Analyzing response patterns...</span>
          </div>
          <div class="stage-item" data-stage="2">
            <span class="stage-icon">◯</span>
            <span class="stage-text">Cross-referencing frameworks...</span>
          </div>
          <div class="stage-item" data-stage="3">
            <span class="stage-icon">◯</span>
            <span class="stage-text">Locating psychic friction point...</span>
          </div>
          <div class="stage-item" data-stage="4">
            <span class="stage-icon">◯</span>
            <span class="stage-text">Mapping to consciousness sphere...</span>
          </div>
        </div>

        <div class="processing-bar">
          <div class="bar-fill"></div>
        </div>
      </div>
    `;

    if (window.PsycheApp.Sound) window.PsycheApp.Sound.playSearchOpen();

    const stages = container.querySelectorAll('.stage-item');
    const barFill = container.querySelector('.bar-fill');
    let stageIdx = 0;

    const advanceStage = () => {
      if (stageIdx > 0 && stages[stageIdx - 1]) {
        stages[stageIdx - 1].classList.remove('active');
        stages[stageIdx - 1].classList.add('complete');
        stages[stageIdx - 1].querySelector('.stage-icon').textContent = '✓';
      }
      if (stageIdx < stages.length) {
        stages[stageIdx].classList.add('active');
        barFill.style.width = `${((stageIdx + 1) / stages.length) * 100}%`;
        stageIdx++;
        setTimeout(advanceStage, 600);
      } else {
        setTimeout(() => showResult(container), 500);
      }
    };

    setTimeout(advanceStage, 400);
  }

  function showResult(container) {
    const fwCounts = {};
    answers.forEach(a => { fwCounts[a.fw] = (fwCounts[a.fw] || 0) + 1; });
    const sortedFw = Object.entries(fwCounts).sort((a, b) => b[1] - a[1]);
    const dominantFw = sortedFw[0];
    const finalResult = answers.find(a => a.fw === dominantFw[0]) || answers[answers.length - 1];
    
    const allFw = window.PsycheApp.allFrameworks || [];
    const maxHits = sortedFw[0]?.[1] || 1;

    let resultsGridHTML = `
      <h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 0.95rem; color: var(--gold-light);">Framework Resonance Map</h3>
      <div class="scanner-results-grid fade-in" style="animation-delay: 0.15s;">
        ${sortedFw.map(([fwId, count], i) => {
          const fw = allFw.find(f => f.id === fwId);
          const pct = Math.round((count / maxHits) * 100);
          return `
            <div class="scanner-result-row fade-in" style="animation-delay: ${0.1 + i * 0.08}s">
              <div class="scanner-result-name">${fw?.name || fwId}</div>
              <div class="scanner-result-bar-bg">
                <div class="scanner-result-bar-fill" style="width: ${pct}%"></div>
              </div>
              <div class="scanner-result-count">${count}/${answers.length}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.innerHTML = `
      <div class="scanner-result">
        <div class="result-visual">
          <div class="result-ring pulse"></div>
          <div class="result-core">
            <span class="core-symbol">◉</span>
          </div>
        </div>

        <h2 class="result-title">Shadow Vector Located</h2>
        
        <div class="result-info fade-in">
          <p class="result-description">
            Your responses indicate a primary resonance with the <strong>${getFrameworkName(finalResult.fw)}</strong> framework, 
            specifically at Layer ${finalResult.layer + 1}.
          </p>
          <p class="result-insight">
            This suggests your current psychological friction point relates to themes 
            typically addressed by this layer of consciousness.
          </p>
        </div>
        
        ${resultsGridHTML}

        <div class="result-actions fade-in" style="margin-top: 32px; animation-delay:0.3s">
          <button id="btn-view-on-map" class="result-btn primary">
            <span class="btn-icon">◉</span>
            <span class="btn-text">Locate on 3D Map</span>
          </button>
          <button id="btn-rescan" class="result-btn secondary">
            <span class="btn-icon">↻</span>
            <span class="btn-text">Run Diagnostic Again</span>
          </button>
        </div>

        <div class="result-note fade-in" style="animation-delay:0.5s">
          <p>💡 <em>This is a starting point for exploration, not a definitive diagnosis. 
          The shadow reveals itself gradually to those who seek it.</em></p>
        </div>
      </div>
    `;

    if (window.PsycheApp.Sound) window.PsycheApp.Sound.playTransition();

    const btnMap = document.getElementById('btn-view-on-map');
    if (btnMap) btnMap.addEventListener('click', () => {
      window.PsycheApp.goToView('map');
      setTimeout(() => {
        window.PsycheApp.setFrameworkById(finalResult.fw);
        setTimeout(() => {
          window.PsycheApp.selectLayer(finalResult.layer);
        }, 800);
      }, 300);
    });

    const btnRescan = document.getElementById('btn-rescan');
    if (btnRescan) btnRescan.addEventListener('click', () => {
      if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
      render(container);
    });
  }

  function getFrameworkName(fwId) {
    const allFw = window.PsycheApp.allFrameworks || [];
    const fw = allFw.find(f => f.id === fwId);
    if (fw) return fw.name;
    const names = {
      greek: 'Platonic Greek',
      aztec: 'Aztec',
      buddhist: 'Buddhist',
      ifs: 'Internal Family Systems',
      jungian: 'Jungian',
      freud: 'Freudian',
      esoteric: 'Esoteric/Theosophical',
      kabbalistic: 'Kabbalistic',
      erikson: 'Eriksonian',
      lacanian: 'Lacanian',
      yoruba: 'Yoruba',
      functional: 'Functional/Cognitive',
      gnostic: 'Gnostic',
      vedantic: 'Vedantic',
      nativeamerican: 'Native American',
      enneagram: 'Enneagram',
      wilber: 'Integral (Wilber)',
      egyptian: 'Egyptian',
      daoist: 'Daoist',
      frankl: 'Logotherapy (Frankl)',
      bantu: 'Bantu/Ubuntu'
    };
    return names[fwId] || fwId;
  }

  return { render };
})();
