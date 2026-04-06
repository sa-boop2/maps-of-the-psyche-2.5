// ============================================================
// VIEWS — Shadow Scanner (Interactive Self-Inquiry)
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
        <!-- Ambient Visual Effect -->
        <div class="scanner-ambient">
          <div class="ambient-ring ring-1"></div>
          <div class="ambient-ring ring-2"></div>
          <div class="ambient-ring ring-3"></div>
        </div>

        <!-- Central Content -->
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
    btn?.addEventListener('click', () => {
      window.PsycheApp.Sound?.playTransition();
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
        <!-- Progress Bar -->
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

        <!-- Question Card -->
        <div class="question-card fade-in">
          <div class="question-icon">${q.icon}</div>
          <div class="question-text">${q.q}</div>
        </div>

        <!-- Answer Options -->
        <div class="answer-options">
          ${q.options.map((opt, i) => `
            <button class="answer-option fade-in" data-idx="${i}" style="animation-delay:${0.1 + i * 0.08}s">
              <span class="option-marker">${['A', 'B', 'C', 'D'][i]}</span>
              <span class="option-text">${opt.text}</span>
              <span class="option-select">→</span>
            </button>
          `).join('')}
        </div>

        <!-- Navigation Hint -->
        <div class="nav-hint fade-in" style="animation-delay:0.5s">
          <span class="hint-text">Choose the answer that feels most true, even if uncomfortable</span>
        </div>
      </div>
    `;

    container.querySelectorAll('.answer-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Visual feedback
        btn.classList.add('selected');
        window.PsycheApp.Sound?.playUIClick();
        
        const idx = parseInt(btn.dataset.idx);
        answers.push(q.options[idx].result);
        
        // Slight delay for visual feedback
        setTimeout(() => {
          currentStep++;
          renderQuestion(container);
        }, 300);
      });

      // Hover effect
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
            <span class="stage-text">Cross-referencing 16 frameworks...</span>
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

    window.PsycheApp.Sound?.playSearchOpen();

    // Animate through stages
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
        // All stages complete
        setTimeout(() => showResult(container), 500);
      }
    };

    setTimeout(advanceStage, 400);
  }

  function showResult(container) {
    // Analyze answers to find dominant pattern
    const fwCounts = {};
    answers.forEach(a => {
      fwCounts[a.fw] = (fwCounts[a.fw] || 0) + 1;
    });
    
    // Get the most frequent framework
    const dominantFw = Object.entries(fwCounts).sort((a, b) => b[1] - a[1])[0];
    const finalResult = answers.find(a => a.fw === dominantFw[0]) || answers[answers.length - 1];

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

        <div class="result-actions fade-in" style="animation-delay:0.3s">
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

    window.PsycheApp.Sound?.playTransition();

    document.getElementById('btn-view-on-map')?.addEventListener('click', () => {
      window.PsycheApp.goToView('map');
      setTimeout(() => {
        window.PsycheApp.setFrameworkById(finalResult.fw);
        setTimeout(() => {
          window.PsycheApp.selectLayer(finalResult.layer);
        }, 800);
      }, 300);
    });

    document.getElementById('btn-rescan')?.addEventListener('click', () => {
      window.PsycheApp.Sound?.playUIClick();
      render(container);
    });
  }

  function getFrameworkName(fwId) {
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
