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
  let currentContainer = null;

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
      console.warn('TRAININGS: Could not load state', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeTrainingId: activeTraining?.id || null,
        state: trainingState
      }));
    } catch (e) {
      console.warn('TRAININGS: Could not save state', e);
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
    activeTraining = null;
    trainingState = null;
    reRender();
  }

  function goHome() {
    window.PsycheApp?.goToView?.('home');
  }

  // ── RENDER: HALL ──
  function renderHall() {
    const trainings = D.trainings || [];
    
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

    return `
      <div class="trainings-page training-active" style="--hue: ${t.hue};">
        <div class="dashboard-topbar">
          <button class="dashboard-back-btn" onclick="PsycheApp.ViewsTrainings.goToHall()">
            ← Back to Hall
          </button>
          <div class="dashboard-topbar-title">
            <span class="dashboard-topbar-icon">${t.icon}</span>
            <span>${t.title}</span>
          </div>
          <button class="dashboard-abandon-btn" onclick="PsycheApp.ViewsTrainings.abandonTraining()">
            Abandon
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

          <!-- MAIN GRID -->
          <div class="dashboard-grid">
            
            <!-- ETHOS -->
            <section class="dash-card dash-ethos">
              <h3>⚔ Your Ethos</h3>
              <p class="ethos-main">${t.immersion.ethos}</p>
              <div class="ethos-persona">
                <h4>The Persona</h4>
                <p>${t.immersion.persona}</p>
              </div>
            </section>

            <!-- TODAY'S PRACTICE -->
            <section class="dash-card dash-habits">
              <h3>◉ Today's Practice <span class="habits-count">${habitsComplete}/${t.habits.length}</span></h3>
              <div class="habits-list">
                ${t.habits.map(h => `
                  <div class="habit-row ${isHabitCompleted(h.id) ? 'done' : ''}" data-habit="${h.id}">
                    <div class="habit-check">${isHabitCompleted(h.id) ? '✓' : ''}</div>
                    <div class="habit-info">
                      <strong>${h.task}</strong>
                      <span class="habit-time">${h.duration}</span>
                      <p>${h.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- DAILY RITUALS -->
            <section class="dash-card dash-rituals">
              <h3>☽ Daily Rituals</h3>
              <ul>
                ${t.immersion.rituals.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </section>

            <!-- IMMERSION HUB -->
            <section class="dash-card dash-immersion">
              <h3>🎭 Immersion Hub</h3>
              <div class="immersion-tabs">
                <div class="immersion-tab">
                  <h4>♫ Music</h4>
                  <ul>${t.immersion.culture.music.map(m => `<li>${m}</li>`).join('')}</ul>
                </div>
                <div class="immersion-tab">
                  <h4>📖 Reading</h4>
                  <ul>${t.immersion.culture.reading.map(r => `<li>${r}</li>`).join('')}</ul>
                </div>
                <div class="immersion-tab">
                  <h4>🎨 Art</h4>
                  <ul>${t.immersion.culture.art.map(a => `<li>${a}</li>`).join('')}</ul>
                </div>
                <div class="immersion-tab">
                  <h4>🎬 Media</h4>
                  <ul>${t.immersion.culture.media.map(m => `<li>${m}</li>`).join('')}</ul>
                </div>
              </div>
              <div class="immersion-env">
                <h4>🕯 Environment</h4>
                <p>${t.immersion.environment}</p>
              </div>
            </section>

            <!-- COMPANIONS & TABOOS -->
            <section class="dash-card dash-boundaries">
              <h3>⚖ Boundaries</h3>
              <div class="boundaries-grid">
                <div>
                  <h4>Companions</h4>
                  <ul>${t.immersion.companions.map(c => `<li>◈ ${c}</li>`).join('')}</ul>
                </div>
                <div>
                  <h4>Taboos</h4>
                  <ul class="taboos-list">${t.immersion.taboos.map(tb => `<li>⊘ ${tb}</li>`).join('')}</ul>
                </div>
              </div>
            </section>

            <!-- REFLECTION -->
            <section class="dash-card dash-reflection ${isLastDay ? 'unlocked' : 'locked'}">
              <h3>${isLastDay ? '🔓' : '🔒'} Terminal Reflection</h3>
              ${isLastDay ? `
                <div class="reflection-open">
                  <p>${t.reflection.prompt.replace(/\n/g, '<br><br>')}</p>
                  <h4>Journal Prompts</h4>
                  <ul>${t.reflection.journalPrompts.map(p => `<li>${p}</li>`).join('')}</ul>
                  ${!trainingState.reflectionCompleted ? `
                    <button class="reflection-btn" onclick="PsycheApp.ViewsTrainings.completeReflection()">
                      Mark Reflection Complete
                    </button>
                  ` : `
                    <div class="reflection-done">✨ Reflection completed. The work continues...</div>
                  `}
                </div>
              ` : `
                <div class="reflection-locked">
                  <span class="lock-big">🔒</span>
                  <p>Opens on Day ${t.durationDays}</p>
                  <p class="days-left">${t.durationDays - day} days remaining</p>
                </div>
              `}
            </section>

          </div>
        </div>
      </div>
    `;
  }

  // ── BIND EVENTS ──
  function bindEvents() {
    // Training card clicks
    document.querySelectorAll('.training-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('training-card-btn')) {
          const id = card.dataset.training;
          beginTraining(id);
        }
      });
      // Also allow clicking the whole card
      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('training-card-btn')) {
          const id = card.dataset.training;
          showPreview(id);
        }
      });
    });

    // Habit toggles
    document.querySelectorAll('.habit-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.habit;
        toggleHabit(id);
      });
    });
  }

  function showPreview(trainingId) {
    const t = D.trainings?.find(tr => tr.id === trainingId);
    if (!t) return;

    // Remove existing modal
    document.querySelector('.training-modal')?.remove();

    const modal = document.createElement('div');
    modal.className = 'training-modal';
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
          <button class="modal-cancel">Not Yet</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));

    // Events
    modal.querySelector('.modal-backdrop').onclick = () => modal.remove();
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.querySelector('.modal-cancel').onclick = () => modal.remove();
    modal.querySelector('.modal-begin').onclick = () => {
      modal.remove();
      beginTraining(trainingId);
    };
  }

  // ── MAIN RENDER ──
  function render(container) {
    currentContainer = container || document.getElementById('secondary-view');
    if (!currentContainer) return;
    
    loadState();
    
    if (activeTraining && trainingState) {
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
    toggleHabit,
    completeReflection,
    goToHall,
    goHome
  };
})();
