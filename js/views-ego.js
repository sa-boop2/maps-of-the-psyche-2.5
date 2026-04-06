// ============================================================
// VIEWS — EGO: Deep-Dive on the Ego across all traditions
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsEgo = (function() {
  const D = () => window.PsycheData;
  let currentTab = 'what';
  let expandedSections = new Set();
  let quizState = { started: false, current: 0, answers: [] };

  function render(container) {
    const ego = D().ego;
    if (!ego) { 
      container.innerHTML = '<p style="text-align:center;color:var(--text-dim);padding:60px">Ego data not loaded.</p>'; 
      return; 
    }

    const tabs = [
      { id: 'what', label: 'What Is It?', icon: '◉', description: 'The nature of ego across traditions' },
      { id: 'operates', label: 'How It Works', icon: '⚙️', description: 'Defense mechanisms & patterns' },
      { id: 'transcend', label: 'Beyond It', icon: '∞', description: 'Paths to transcendence' },
      { id: 'traditions', label: 'Compare', icon: '⊞', description: 'Cross-tradition analysis' },
      { id: 'history', label: 'Timeline', icon: '⟡', description: '3,000 years of understanding' }
    ];

    container.innerHTML = `
      <div class="view-header ego-header">
        <div class="ego-symbol">ψ</div>
        <h1>${ego.title}</h1>
        <p class="view-intro">${ego.subtitle}</p>
      </div>

      <!-- Progress Indicator -->
      <div class="ego-journey-progress">
        <div class="journey-label">Your Exploration</div>
        <div class="journey-steps">
          ${tabs.map((t, i) => `
            <div class="journey-step ${currentTab === t.id ? 'active' : ''} ${tabs.findIndex(x => x.id === currentTab) > i ? 'completed' : ''}">
              <div class="step-dot">${t.icon}</div>
              <div class="step-label">${t.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="ego-tabs" id="ego-tabs">
        ${tabs.map(t => `
          <button class="ego-tab ${currentTab === t.id ? 'active' : ''}" data-tab="${t.id}">
            <span class="tab-icon">${t.icon}</span>
            <span class="tab-label">${t.label}</span>
            <span class="tab-description">${t.description}</span>
          </button>
        `).join('')}
      </div>

      <div id="ego-content" class="ego-content-area"></div>
    `;

    container.querySelectorAll('#ego-tabs .ego-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentTab = tab.dataset.tab;
        render(container);
        window.PsycheApp.Sound?.playUIClick();
      });
    });

    const content = container.querySelector('#ego-content');
    switch(currentTab) {
      case 'what': renderWhatIsIt(content, ego); break;
      case 'operates': renderHowItOperates(content, ego); break;
      case 'transcend': renderTranscendence(content, ego); break;
      case 'traditions': renderAcrossTraditions(content, ego); break;
      case 'history': renderHistory(content, ego); break;
    }
  }

  function renderWhatIsIt(el, ego) {
    el.innerHTML = `
      <div class="ego-intro-prompt fade-in">
        <div class="prompt-glyph">❓</div>
        <p>What IS this thing you call "I"? Each tradition has wrestled with this question...</p>
      </div>

      <div class="ego-lens-grid">
        ${ego.whatIsIt.map((item, i) => `
          <div class="ego-lens-card fade-in ${expandedSections.has('what-'+i) ? 'expanded' : ''}" style="animation-delay:${i*0.1}s" data-section="what-${i}">
            <div class="lens-header">
              <span class="lens-icon">${item.icon}</span>
              <div class="lens-info">
                <h3 class="lens-title">${item.lens}</h3>
                <p class="lens-preview">${item.description.substring(0, 80)}...</p>
              </div>
              <span class="lens-expand">+</span>
            </div>
            <div class="lens-body">
              <p class="lens-description">${item.description}</p>
              <div class="lens-insight">
                <span class="insight-icon">💡</span>
                <span class="insight-text"><strong>Key Insight:</strong> ${item.keyInsight}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Interactive Question -->
      <div class="ego-reflection-zone fade-in">
        <div class="reflection-prompt">
          <span class="reflection-icon">🪞</span>
          <h4>Pause and Reflect</h4>
          <p>Close your eyes. Ask: "Who is aware of this question?" Notice what arises.</p>
        </div>
      </div>
    `;

    // Expand/collapse
    el.querySelectorAll('.ego-lens-card').forEach(card => {
      card.querySelector('.lens-header').addEventListener('click', () => {
        const section = card.dataset.section;
        if (expandedSections.has(section)) {
          expandedSections.delete(section);
        } else {
          expandedSections.add(section);
        }
        card.classList.toggle('expanded');
        card.querySelector('.lens-expand').textContent = card.classList.contains('expanded') ? '−' : '+';
        window.PsycheApp.Sound?.playUIClick();
      });
    });
  }

  function renderHowItOperates(el, ego) {
    const d = ego.howItOperates;
    
    el.innerHTML = `
      <!-- Core Mechanisms -->
      <div class="mechanism-cards fade-in">
        <div class="mechanism-card">
          <div class="mech-icon">🔗</div>
          <h3>Identity Attachment</h3>
          <p>${d.identityAttachment}</p>
        </div>
        <div class="mechanism-card">
          <div class="mech-icon">◯</div>
          <h3>Separation from the Whole</h3>
          <p>${d.separationFromWhole}</p>
        </div>
      </div>

      <!-- Defense Mechanisms Interactive -->
      <div class="defense-section fade-in">
        <div class="section-intro">
          <h3>🛡️ The 12 Defense Mechanisms</h3>
          <p>How the ego protects its illusory sense of self. Click each to explore.</p>
        </div>

        <!-- Quiz Mode Toggle -->
        <div class="defense-mode-toggle">
          <button class="mode-btn ${!quizState.started ? 'active' : ''}" data-mode="explore">
            <span>📖</span> Explore Mode
          </button>
          <button class="mode-btn ${quizState.started ? 'active' : ''}" data-mode="quiz">
            <span>🎯</span> Quiz Yourself
          </button>
        </div>

        ${!quizState.started ? `
          <div class="defense-grid">
            ${d.defenseMechanisms.map((def, i) => `
              <div class="defense-card fade-in ${expandedSections.has('def-'+i) ? 'expanded' : ''}" 
                   style="animation-delay:${i*0.04}s" data-section="def-${i}">
                <div class="defense-header">
                  <span class="defense-num">${String(i+1).padStart(2, '0')}</span>
                  <h4 class="defense-name">${def.name}</h4>
                  <span class="defense-toggle">+</span>
                </div>
                <div class="defense-body">
                  <p class="defense-desc">${def.description}</p>
                  <div class="defense-example">
                    <span class="example-label">💬 Example:</span>
                    <span class="example-text">${def.example}</span>
                  </div>
                  <div class="defense-reflect">
                    <em>Where might this show up in your life?</em>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : renderDefenseQuiz(d.defenseMechanisms)}
      </div>

      <!-- Progress through defenses -->
      <div class="defense-progress fade-in">
        <div class="progress-label">Explored: ${expandedSections.size} / 12 defense mechanisms</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(expandedSections.size / 12) * 100}%"></div>
        </div>
      </div>
    `;

    // Mode toggle
    el.querySelectorAll('.defense-mode-toggle .mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.mode === 'quiz') {
          quizState.started = true;
          quizState.current = 0;
          quizState.answers = [];
        } else {
          quizState.started = false;
        }
        window.PsycheApp.Sound?.playUIClick();
        renderHowItOperates(el, ego);
      });
    });

    // Defense card expand
    el.querySelectorAll('.defense-card').forEach(card => {
      card.querySelector('.defense-header')?.addEventListener('click', () => {
        const section = card.dataset.section;
        if (expandedSections.has(section)) {
          expandedSections.delete(section);
        } else {
          expandedSections.add(section);
        }
        card.classList.toggle('expanded');
        card.querySelector('.defense-toggle').textContent = card.classList.contains('expanded') ? '−' : '+';
        window.PsycheApp.Sound?.playUIClick();
        
        // Update progress
        const progressFill = el.querySelector('.defense-progress .progress-fill');
        const progressLabel = el.querySelector('.defense-progress .progress-label');
        if (progressFill && progressLabel) {
          const defCount = [...expandedSections].filter(s => s.startsWith('def-')).length;
          progressFill.style.width = `${(defCount / 12) * 100}%`;
          progressLabel.textContent = `Explored: ${defCount} / 12 defense mechanisms`;
        }
      });
    });
  }

  function renderDefenseQuiz(mechanisms) {
    const q = mechanisms[quizState.current];
    if (!q) return '<p>Quiz complete!</p>';

    return `
      <div class="defense-quiz fade-in">
        <div class="quiz-progress">Question ${quizState.current + 1} of ${mechanisms.length}</div>
        <div class="quiz-scenario">
          <p class="quiz-example">"${q.example}"</p>
          <p class="quiz-question">Which defense mechanism is this an example of?</p>
        </div>
        <div class="quiz-options">
          ${shuffleArray([...mechanisms]).slice(0, 4).map(opt => `
            <button class="quiz-option" data-correct="${opt.name === q.name}">${opt.name}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function renderTranscendence(el, ego) {
    el.innerHTML = `
      <div class="transcend-intro fade-in">
        <div class="intro-glyph">∞</div>
        <h3>Paths Beyond the Ego</h3>
        <p>Every major tradition has developed methods to transcend ego identification. These aren't about destroying the ego — but seeing through its illusion.</p>
      </div>

      <div class="transcend-grid">
        ${ego.transcendence.map((method, i) => `
          <div class="transcend-card fade-in ${expandedSections.has('trans-'+i) ? 'expanded' : ''}" 
               style="animation-delay:${i*0.1}s" data-section="trans-${i}">
            <div class="trans-header">
              <span class="trans-tradition">${method.tradition}</span>
              <h3 class="trans-method">${method.method}</h3>
              <span class="trans-toggle">+</span>
            </div>
            <div class="trans-body">
              <p class="trans-description">${method.description}</p>
              
              <div class="trans-practices">
                <div class="practices-label">🧘 Practices:</div>
                <div class="practices-list">
                  ${method.practices.map(p => `<span class="practice-tag">${p}</span>`).join('')}
                </div>
              </div>
              
              <div class="trans-insight">
                <span class="insight-icon">✨</span>
                <span><strong>Key Insight:</strong> ${method.keyInsight}</span>
              </div>

              <button class="try-btn">
                <span>🎯</span> Try This Practice
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Practice Timer Widget -->
      <div class="practice-widget fade-in">
        <div class="widget-icon">⏱️</div>
        <h4>Mini Practice</h4>
        <p>Choose a method above, then sit with it for 2 minutes. Notice what happens to the sense of "I".</p>
        <button class="start-timer-btn">Start 2-Minute Timer</button>
      </div>
    `;

    // Expand/collapse
    el.querySelectorAll('.transcend-card').forEach(card => {
      card.querySelector('.trans-header').addEventListener('click', () => {
        const section = card.dataset.section;
        if (expandedSections.has(section)) {
          expandedSections.delete(section);
        } else {
          expandedSections.add(section);
        }
        card.classList.toggle('expanded');
        card.querySelector('.trans-toggle').textContent = card.classList.contains('expanded') ? '−' : '+';
        window.PsycheApp.Sound?.playUIClick();
      });
    });

    // Timer button
    el.querySelector('.start-timer-btn')?.addEventListener('click', function() {
      let seconds = 120;
      this.disabled = true;
      const interval = setInterval(() => {
        seconds--;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        this.textContent = `${mins}:${String(secs).padStart(2, '0')} remaining...`;
        if (seconds <= 0) {
          clearInterval(interval);
          this.textContent = '✓ Practice Complete';
          window.PsycheApp.Sound?.playTransition();
        }
      }, 1000);
    });
  }

  function renderAcrossTraditions(el, ego) {
    el.innerHTML = `
      <div class="traditions-intro fade-in">
        <p>How each framework conceptualizes the ego — from necessary structure to fundamental illusion.</p>
      </div>

      <div class="comparison-table-container fade-in">
        <table class="ego-comparison-table">
          <thead>
            <tr>
              <th>Framework</th>
              <th>Ego Concept</th>
              <th>Role</th>
              <th>Stance</th>
            </tr>
          </thead>
          <tbody>
            ${ego.acrossTraditions.map((row, i) => `
              <tr class="fade-in" style="animation-delay:${i * 0.05}s">
                <td class="fw-cell">
                  <span class="fw-name">${row.framework}</span>
                </td>
                <td class="concept-cell">${row.concept}</td>
                <td class="role-cell">${row.role}</td>
                <td class="stance-cell">
                  <span class="stance-badge ${getStanceClass(row.stance)}">${row.stance}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Visual Stance Spectrum -->
      <div class="stance-spectrum fade-in">
        <div class="spectrum-header">
          <h4>The Ego Stance Spectrum</h4>
          <p>From "embrace" to "dissolve" — where does each tradition fall?</p>
        </div>
        <div class="spectrum-visual">
          <div class="spectrum-bar">
            <span class="spectrum-label left">Embrace & Strengthen</span>
            <span class="spectrum-label right">Transcend & Dissolve</span>
          </div>
          <div class="spectrum-markers">
            ${ego.acrossTraditions.map((row, i) => `
              <div class="spectrum-marker" style="left: ${getStancePosition(row.stance)}%" title="${row.framework}: ${row.stance}">
                <div class="marker-dot"></div>
                <div class="marker-label">${row.framework.substring(0, 4)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function getStanceClass(stance) {
    const s = stance.toLowerCase();
    if (s.includes('transcend') || s.includes('dissolve') || s.includes('illusion')) return 'dissolve';
    if (s.includes('strengthen') || s.includes('necessary') || s.includes('healthy')) return 'embrace';
    return 'neutral';
  }

  function getStancePosition(stance) {
    const s = stance.toLowerCase();
    if (s.includes('illusion') || s.includes('dissolve')) return 90;
    if (s.includes('transcend')) return 75;
    if (s.includes('integrate')) return 50;
    if (s.includes('strengthen') || s.includes('healthy')) return 25;
    return 50;
  }

  function renderHistory(el, ego) {
    el.innerHTML = `
      <div class="history-intro fade-in">
        <p>The ego across 3,000 years of human thought — from the Upanishads to Eckhart Tolle.</p>
      </div>

      <div class="history-timeline">
        <div class="timeline-track"></div>
        ${ego.historicalThread.map((item, i) => `
          <div class="history-node fade-in ${i % 2 === 0 ? 'left' : 'right'}" style="animation-delay:${i * 0.08}s">
            <div class="node-connector"></div>
            <div class="node-card">
              <div class="node-era">${item.era}</div>
              <div class="node-figure">${item.figure}</div>
              <div class="node-insight">${item.insight}</div>
            </div>
            <div class="node-dot"></div>
          </div>
        `).join('')}
      </div>

      <!-- Historical Pattern -->
      <div class="history-pattern fade-in">
        <div class="pattern-icon">🔄</div>
        <h4>The Eternal Return</h4>
        <p>Notice how certain insights keep recurring across centuries and cultures. The question of "Who am I?" is perhaps the oldest question humanity has asked.</p>
      </div>
    `;
  }

  return { render };
})();
