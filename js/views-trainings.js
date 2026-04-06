// ============================================================
// VIEWS — TRAININGS: Immersive Philosophy Protocols
// The Path of Practice — Living the Tradition
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsTrainings = (function() {
  const STORAGE_KEY = 'psyche_trainings_data';
  const D = window.PsycheData || {};
  
  let activeTraining = null;
  let trainingState = null;
  let hallMode = false;
  let currentContainer = null;
  let delegatedClickHandler = null;

  // ── STORAGE ──
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        activeTraining = data.activeTrainingId ? D.trainings?.find(t => t.id === data.activeTrainingId) : null;
        trainingState = data.state || null;
      }
    } catch (e) {
      // Silent fail - localStorage not critical
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeTrainingId: activeTraining?.id || null,
        state: trainingState
      }));
    } catch (e) {
      // Silent fail - localStorage not critical
    }
  }

  // ── DATE/PROGRESS HELPERS ──
  function getCurrentDay() {
    if (!trainingState?.startDate) return 1;
    const start = new Date(trainingState.startDate);
    const now = new Date();
    const diffTime = now - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, Math.min(diffDays, activeTraining?.durationDays || 7));
  }

  function isReflectionDay() {
    return getCurrentDay() >= (activeTraining?.durationDays || 7);
  }

  function getProgress() {
    if (!activeTraining || !trainingState) return 0;
    return Math.min(100, Math.round((getCurrentDay() / (activeTraining.durationDays || 7)) * 100));
  }

  function isHabitCompleted(habitId) {
    const dayKey = `day${getCurrentDay()}`;
    return trainingState?.completedHabits?.[dayKey]?.includes(habitId) || false;
  }

  function toggleHabit(habitId) {
    if (!trainingState) return;
    const dayKey = `day${getCurrentDay()}`;
    if (!trainingState.completedHabits) trainingState.completedHabits = {};
    if (!trainingState.completedHabits[dayKey]) trainingState.completedHabits[dayKey] = [];
    
    const idx = trainingState.completedHabits[dayKey].indexOf(habitId);
    if (idx === -1) {
      trainingState.completedHabits[dayKey].push(habitId);
    } else {
      trainingState.completedHabits[dayKey].splice(idx, 1);
    }
    saveState();
    reRender();
  }

  // ── ACTIONS ──
  function beginTraining(trainingId) {
    const training = D.trainings?.find(t => t.id === trainingId);
    if (!training) return;
    
    activeTraining = training;
    hallMode = false;
    trainingState = {
      startDate: new Date().toISOString(),
      completedHabits: {},
      reflectionCompleted: false
    };
    saveState();
    reRender();
    window.PsycheApp?.showToast?.(`Beginning ${training.title}...`);
  }

  function abandonTraining() {
    if (!confirm('Abandon your current training? All progress will be lost.')) return;
    activeTraining = null;
    trainingState = null;
    hallMode = true;
    saveState();
    reRender();
    window.PsycheApp?.showToast?.('Training abandoned.');
  }

  function completeReflection() {
    if (!trainingState) return;
    trainingState.reflectionCompleted = true;
    saveState();
    reRender();
    window.PsycheApp?.showToast?.('Reflection completed. The path continues...');
  }

  function goToHall() {
    hallMode = true;
    reRender();
  }

  function goHome() {
    if (window.PsycheApp?.goToView) {
      window.PsycheApp.goToView('home');
    }
  }
  
  function pauseTraining() {
    hallMode = true;
    reRender();
  }

  // ── RENDER: HALL ──
  function renderHall() {
    const trainings = D.trainings || [];
    
    // Check if there's a saved training in progress
    let savedTraining = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.activeTrainingId && data.state) {
          savedTraining = D.trainings?.find(t => t.id === data.activeTrainingId);
        }
      }
    } catch (e) {}
    
    return `
      <div class="trainings-page">
        <button class="trainings-home-btn" onclick="PsycheApp.ViewsTrainings.goHome()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Home
        </button>

        <div class="trainings-hall-content">
          <header class="trainings-header">
            <div class="trainings-sigil">⚗</div>
            <h1>The Hall of Praxis</h1>
            <p class="trainings-subtitle">Stop intellectualizing. Start living.</p>
            <p class="trainings-desc">Choose a path below. For the next 7-14 days, you will adopt the persona of an initiate in that tradition — following their rhythms, their practices, their culture.</p>
          </header>
          
          ${savedTraining ? `
            <div class="resume-banner">
              <div class="resume-icon">${savedTraining.icon}</div>
              <div class="resume-info">
                <h3>Resume Your Journey</h3>
                <p>You have an active training: <strong>${savedTraining.title}</strong></p>
              </div>
              <button class="resume-btn" onclick="PsycheApp.ViewsTrainings.beginTraining('${savedTraining.id}')">
                Continue →
              </button>
            </div>
          ` : ''}

          <div class="trainings-grid">
            ${trainings.map(t => `
              <article class="training-card" data-training="${t.id}" style="--hue: ${t.hue};">
                <div class="training-card-glow"></div>
                <div class="training-card-icon">${t.icon}</div>
                <h2 class="training-card-title">${t.title}</h2>
                <p class="training-card-philosophy">${t.philosophy}</p>
                <p class="training-card-duration">${t.duration}</p>
                <blockquote class="training-card-quote">"${t.quote}"</blockquote>
                <p class="training-card-overview">${t.overview.slice(0, 150)}...</p>
                <button class="training-card-btn">Begin Path</button>
              </article>
            `).join('')}
          </div>

          <footer class="trainings-footer">
            <blockquote>"There are nowadays professors of philosophy, but not philosophers."</blockquote>
            <cite>— Thoreau</cite>
          </footer>
        </div>
      </div>
    `;
  }

  // ── RENDER: DASHBOARD ──
  function renderDashboard() {
    const t = activeTraining;
    if (!t) return renderHall();
    
    const day = getCurrentDay();
    const progress = getProgress();
    const isLastDay = isReflectionDay();
    const habitsComplete = t.habits.filter(h => isHabitCompleted(h.id)).length;
    const circumference = 2 * Math.PI * 45;
    const dashOffset = circumference - (progress / 100) * circumference;

    // Unique theme classes per training
    const themeClass = `training-theme-${t.id}`;

    return `
      <div class="trainings-page training-active ${themeClass}" style="--hue: ${t.hue};">
        <div class="dashboard-topbar">
          <button class="dashboard-home-btn" onclick="PsycheApp.ViewsTrainings.goHome()">
            ← Home
          </button>
          <div class="dashboard-topbar-title">
            <span class="dashboard-topbar-icon">${t.icon}</span>
            <span>${t.title}</span>
          </div>
          <button class="dashboard-back-btn" onclick="PsycheApp.ViewsTrainings.goToHall()">
            Hall →
          </button>
        </div>

        <div class="dashboard-content">
          <!-- HERO SECTION -->
          <section class="dashboard-hero">
            <div class="dashboard-progress-ring">
              <svg viewBox="0 0 100 100">
                <circle class="progress-bg" cx="50" cy="50" r="45"/>
                <circle class="progress-fill" cx="50" cy="50" r="45" 
                  style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${dashOffset};"/>
              </svg>
              <div class="progress-text">
                <span class="progress-day">Day ${day}</span>
                <span class="progress-total">of ${t.durationDays}</span>
              </div>
            </div>
            <div class="dashboard-hero-info">
              <h1>${t.title}</h1>
              <p class="dashboard-philosophy">${t.philosophy}</p>
              <blockquote>"${t.quote}" <cite>— ${t.author}</cite></blockquote>
            </div>
          </section>

          <!-- TABBED SECTIONS -->
          <div class="dashboard-tabs">
            <button class="tab-btn active" data-tab="practice">Today's Practice</button>
            <button class="tab-btn" data-tab="ethos">Ethos & Persona</button>
            <button class="tab-btn" data-tab="immersion">Immersion</button>
            <button class="tab-btn" data-tab="reflection">Reflection ${isLastDay ? '🔓' : '🔒'}</button>
          </div>

          <div class="dashboard-panels">
            
            <!-- PRACTICE TAB -->
            <div class="tab-panel active" data-panel="practice">
              <div class="panel-hero">
                <h2>◉ Today's Practice</h2>
                <p class="panel-subtitle">Complete these daily practices to deepen your immersion</p>
              </div>
              
              <div class="habits-list">
                ${t.habits.map(h => `
                  <div class="habit-row ${isHabitCompleted(h.id) ? 'done' : ''}" data-habit="${h.id}">
                    <div class="habit-check">${isHabitCompleted(h.id) ? '✓' : ''}</div>
                    <div class="habit-info">
                      <div class="habit-header">
                        <strong>${h.task}</strong>
                        <span class="habit-time">${h.duration}</span>
                      </div>
                      <p class="habit-desc">${h.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
              
              <div class="habits-progress">
                <div class="habits-bar">
                  <div class="habits-bar-fill" style="width: ${(habitsComplete / t.habits.length) * 100}%"></div>
                </div>
                <p>${habitsComplete} of ${t.habits.length} complete</p>
              </div>

              <div class="daily-rituals">
                <h3>☽ Daily Rituals</h3>
                <ul>
                  ${t.immersion.rituals.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- ETHOS TAB -->
            <div class="tab-panel" data-panel="ethos">
              <div class="panel-hero">
                <h2>⚔ Your Ethos</h2>
                <p class="panel-subtitle">Embody this way of being for the duration of your training</p>
              </div>
              
              <div class="ethos-main">
                <p>${t.immersion.ethos}</p>
              </div>
              
              <div class="ethos-persona">
                <h4>🎭 The Persona</h4>
                <p>${t.immersion.persona}</p>
              </div>

              <div class="boundaries-section">
                <div class="boundaries-col">
                  <h4>◈ Companions</h4>
                  <ul>${t.immersion.companions.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
                <div class="boundaries-col">
                  <h4>⊘ Taboos</h4>
                  <ul class="taboos-list">${t.immersion.taboos.map(tb => `<li>${tb}</li>`).join('')}</ul>
                </div>
              </div>
            </div>

            <!-- IMMERSION TAB -->
            <div class="tab-panel" data-panel="immersion">
              <div class="panel-hero">
                <h2>🎭 Immersion Hub</h2>
                <p class="panel-subtitle">Surround yourself with the culture and atmosphere of this tradition</p>
              </div>
              
              <div class="immersion-grid">
                <div class="immersion-card">
                  <h4>♫ Music</h4>
                  <ul>${t.immersion.culture.music.map(m => `<li>${m}</li>`).join('')}</ul>
                </div>
                <div class="immersion-card">
                  <h4>📖 Reading</h4>
                  <ul>${t.immersion.culture.reading.map(r => `<li>${r}</li>`).join('')}</ul>
                </div>
                <div class="immersion-card">
                  <h4>🎨 Art</h4>
                  <ul>${t.immersion.culture.art.map(a => `<li>${a}</li>`).join('')}</ul>
                </div>
                <div class="immersion-card">
                  <h4>🎬 Media</h4>
                  <ul>${t.immersion.culture.media.map(m => `<li>${m}</li>`).join('')}</ul>
                </div>
              </div>

              <div class="immersion-env">
                <h4>🕯 Environment</h4>
                <p>${t.immersion.environment}</p>
              </div>
            </div>

            <!-- REFLECTION TAB -->
            <div class="tab-panel" data-panel="reflection">
              ${isLastDay ? `
                <div class="panel-hero">
                  <h2>🔓 Terminal Reflection</h2>
                  <p class="panel-subtitle">The training period has ended. Reflect on your journey.</p>
                </div>
                
                <div class="reflection-open">
                  <div class="reflection-prompt">
                    ${t.reflection.prompt.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                  </div>
                  
                  <h4>Journal Prompts</h4>
                  <ul class="reflection-prompts">
                    ${t.reflection.journalPrompts.map(p => `<li>${p}</li>`).join('')}
                  </ul>
                  
                  ${!trainingState.reflectionCompleted ? `
                    <button class="reflection-btn" onclick="PsycheApp.ViewsTrainings.completeReflection()">
                      Mark Reflection Complete
                    </button>
                  ` : `
                    <div class="reflection-done">✨ Reflection completed. The work continues...</div>
                  `}
                </div>
              ` : `
                <div class="panel-hero">
                  <h2>🔒 Terminal Reflection</h2>
                  <p class="panel-subtitle">This section unlocks on the final day of your training</p>
                </div>
                
                <div class="reflection-locked">
                  <span class="lock-big">🔒</span>
                  <p>Opens on Day ${t.durationDays}</p>
                  <p class="days-left">${t.durationDays - day} days remaining</p>
                </div>
              `}
            </div>

          </div>
        </div>
        
        <button class="abandon-footer-btn" onclick="PsycheApp.ViewsTrainings.abandonTraining()">
          Abandon Training
        </button>
      </div>
    `;
  }

  // ── BIND EVENTS (Optimized with Event Delegation) ──
  function bindEvents() {
    if (!currentContainer) return;

    if (delegatedClickHandler) {
      currentContainer.removeEventListener('click', delegatedClickHandler);
    }

    // Single event listener for all in-view interactions using delegation
    delegatedClickHandler = (e) => {
      const target = e.target;
      
      // Tab switching
      if (target.classList.contains('tab-btn')) {
        const targetTab = target.dataset.tab;
        
        // Batch DOM updates to avoid layout thrashing
        requestAnimationFrame(() => {
          // Update buttons
          currentContainer.querySelectorAll('.tab-btn').forEach(b => {
            if (b.classList.contains('active')) b.classList.remove('active');
          });
          target.classList.add('active');
          
          // Update panels
          currentContainer.querySelectorAll('.tab-panel').forEach(p => {
            if (p.classList.contains('active')) p.classList.remove('active');
          });
          currentContainer.querySelector(`[data-panel="${targetTab}"]`)?.classList.add('active');
        });
        return;
      }
      
      // Training card clicks
      const card = target.closest('.training-card');
      if (card) {
        if (target.classList.contains('training-card-btn')) {
          const id = card.dataset.training;
          beginTraining(id);
        } else {
          const id = card.dataset.training;
          showPreview(id);
        }
        return;
      }
      
      // Habit toggles
      const habitRow = target.closest('.habit-row');
      if (habitRow) {
        const id = habitRow.dataset.habit;
        toggleHabit(id);
        return;
      }
      
    };

    currentContainer.addEventListener('click', delegatedClickHandler);
  }

  function showPreview(trainingId) {
    const t = D.trainings?.find(tr => tr.id === trainingId);
    if (!t) return;

    // Remove existing modal
    document.querySelector('.training-modal')?.remove();

    const modal = document.createElement('div');
    modal.className = 'training-modal';
    modal.dataset.trainingId = trainingId; // Store ID for event delegation
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content" style="--hue: ${t.hue};">
        <button class="modal-close">×</button>
        <div class="modal-icon">${t.icon}</div>
        <h2>${t.title}</h2>
        <p class="modal-duration">${t.duration}</p>
        <blockquote>"${t.quote}" <cite>— ${t.author}</cite></blockquote>
        <p class="modal-overview">${t.overview}</p>
        <div class="modal-ethos">
          <h4>Your Ethos</h4>
          <p>${t.immersion.ethos}</p>
        </div>
        <div class="modal-practices">
          <h4>Daily Practices</h4>
          <ul>${t.habits.map(h => `<li><strong>${h.task}</strong> — ${h.duration}</li>`).join('')}</ul>
        </div>
        <div class="modal-actions">
          <button class="modal-begin">Begin This Path</button>
          <button class="modal-close modal-cancel">Not Yet</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));

    modal.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('modal-backdrop') || target.closest('.modal-close')) {
        modal.remove();
        return;
      }
      if (target.closest('.modal-begin')) {
        modal.remove();
        beginTraining(trainingId);
      }
    });
  }

  // ── MAIN RENDER ──
  function render(container) {
    currentContainer = container || document.getElementById('secondary-view');
    if (!currentContainer) return;
    
    loadState();
    
    // If we have saved state but no active training loaded, set it
    if (!activeTraining && trainingState) {
      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        try {
          const data = JSON.parse(savedId);
          if (data.activeTrainingId) {
            activeTraining = D.trainings?.find(t => t.id === data.activeTrainingId);
          }
        } catch (e) {}
      }
    }
    
    if (activeTraining && trainingState && !hallMode) {
      currentContainer.innerHTML = renderDashboard();
    } else {
      currentContainer.innerHTML = renderHall();
    }
    
    bindEvents();
  }

  function reRender() {
    if (currentContainer) {
      render(currentContainer);
    }
  }

  // ── PUBLIC API ──
  return {
    render,
    beginTraining,
    abandonTraining,
    pauseTraining,
    toggleHabit,
    completeReflection,
    goToHall,
    goHome
  };
})();
