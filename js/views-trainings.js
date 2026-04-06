// ============================================================
// VIEWS — TRAININGS: Immersive Philosophy Protocols
// The Path of Practice — Living the Tradition
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsTrainings = (function() {
  const STORAGE_KEY = 'psyche_trainings_data';
  const D = window.PsycheData || {};
  
  let activeTraining = null;
  let trainingState = null; // { startDate, completedHabits: { day1: ['h1', 'h2'], ... }, reflectionUnlocked, reflectionCompleted }
  let currentScreen = 'hall'; // 'hall' | 'dashboard'

  // ── STORAGE HELPERS ──
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

  // ── DATE HELPERS ──
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
    const totalDays = activeTraining.durationDays || 7;
    const currentDay = getCurrentDay();
    return Math.min(100, Math.round((currentDay / totalDays) * 100));
  }

  // ── HABIT HELPERS ──
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
    render();
  }

  // ── TRAINING ACTIONS ──
  function beginTraining(trainingId) {
    const training = D.trainings?.find(t => t.id === trainingId);
    if (!training) return;
    
    activeTraining = training;
    trainingState = {
      startDate: new Date().toISOString(),
      completedHabits: {},
      reflectionUnlocked: false,
      reflectionCompleted: false
    };
    currentScreen = 'dashboard';
    saveState();
    render();
    
    window.PsycheApp?.showToast?.(`Beginning ${training.title}...`);
  }

  function abandonTraining() {
    if (!confirm('Abandon your current training? All progress will be lost.')) return;
    activeTraining = null;
    trainingState = null;
    currentScreen = 'hall';
    saveState();
    render();
    window.PsycheApp?.showToast?.('Training abandoned.');
  }

  function completeReflection() {
    if (!trainingState) return;
    trainingState.reflectionCompleted = true;
    saveState();
    render();
    window.PsycheApp?.showToast?.('Reflection completed. The path continues...');
  }

  // ── RENDER: 3D HALL OF MONOLITHS ──
  function renderHall() {
    const trainings = D.trainings || [];
    
    return `
      <div class="trainings-hall">
        <div class="hall-header">
          <h1 class="hall-title">The Hall of Praxis</h1>
          <p class="hall-subtitle">Choose your path. Live the tradition.</p>
        </div>
        
        <div class="hall-corridor">
          <div class="hall-floor"></div>
          <div class="monoliths-container">
            ${trainings.map((t, i) => `
              <div class="monolith" data-id="${t.id}" style="--hue: ${t.hue}; --index: ${i};">
                <div class="monolith-inner">
                  <div class="monolith-glow"></div>
                  <div class="monolith-face monolith-front">
                    <span class="monolith-icon">${t.icon}</span>
                    <h2 class="monolith-title">${t.title}</h2>
                    <span class="monolith-duration">${t.duration}</span>
                  </div>
                  <div class="monolith-face monolith-back"></div>
                  <div class="monolith-face monolith-left"></div>
                  <div class="monolith-face monolith-right"></div>
                  <div class="monolith-face monolith-top"></div>
                </div>
                <div class="monolith-reflection"></div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="hall-quote">
          <blockquote>"There are nowadays professors of philosophy, but not philosophers."</blockquote>
          <cite>— Thoreau</cite>
        </div>
      </div>
    `;
  }

  // ── RENDER: TRAINING DASHBOARD ──
  function renderDashboard() {
    if (!activeTraining) return renderHall();
    
    const t = activeTraining;
    const day = getCurrentDay();
    const progress = getProgress();
    const isLastDay = isReflectionDay();
    const allHabitsToday = t.habits.every(h => isHabitCompleted(h.id));
    
    return `
      <div class="training-dashboard" style="--hue: ${t.hue};">
        <div class="dashboard-header">
          <button class="dashboard-back" onclick="PsycheApp.ViewsTrainings.goToHall()">
            ← Hall
          </button>
          <div class="dashboard-title-block">
            <span class="dashboard-icon">${t.icon}</span>
            <div>
              <h1 class="dashboard-title">${t.title}</h1>
              <span class="dashboard-philosophy">${t.philosophy}</span>
            </div>
          </div>
          <button class="dashboard-abandon" onclick="PsycheApp.ViewsTrainings.abandonTraining()">
            Abandon
          </button>
        </div>

        <div class="dashboard-progress-section">
          <div class="progress-ring-container">
            <svg class="progress-ring" viewBox="0 0 120 120">
              <circle class="progress-ring-bg" cx="60" cy="60" r="52" />
              <circle class="progress-ring-fill" cx="60" cy="60" r="52" 
                style="stroke-dasharray: ${(progress / 100) * 327} 327;" />
            </svg>
            <div class="progress-ring-text">
              <span class="progress-day">Day ${day}</span>
              <span class="progress-of">of ${t.durationDays}</span>
            </div>
          </div>
          <div class="progress-quote">
            <blockquote>"${t.quote}"</blockquote>
            <cite>— ${t.author}</cite>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- ETHOS CARD -->
          <div class="dashboard-card ethos-card">
            <h3 class="card-title">⚔ Your Ethos</h3>
            <p class="ethos-text">${t.immersion.ethos}</p>
            <div class="ethos-persona">
              <h4>The Persona</h4>
              <p>${t.immersion.persona}</p>
            </div>
          </div>

          <!-- DAILY RITUALS -->
          <div class="dashboard-card rituals-card">
            <h3 class="card-title">☽ Daily Rituals</h3>
            <ul class="rituals-list">
              ${t.immersion.rituals.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>

          <!-- HABITS CHECKLIST -->
          <div class="dashboard-card habits-card">
            <h3 class="card-title">◉ Today's Practice</h3>
            <div class="habits-list">
              ${t.habits.map(h => `
                <div class="habit-item ${isHabitCompleted(h.id) ? 'completed' : ''}" 
                     onclick="PsycheApp.ViewsTrainings.toggleHabit('${h.id}')">
                  <div class="habit-checkbox">
                    ${isHabitCompleted(h.id) ? '✓' : ''}
                  </div>
                  <div class="habit-content">
                    <span class="habit-task">${h.task}</span>
                    <span class="habit-duration">${h.duration}</span>
                    <p class="habit-desc">${h.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            ${allHabitsToday ? '<div class="habits-complete-msg">✨ All practices complete for today</div>' : ''}
          </div>

          <!-- IMMERSION HUB -->
          <div class="dashboard-card immersion-card">
            <h3 class="card-title">🎭 Immersion Hub</h3>
            
            <div class="immersion-section">
              <h4>♫ Music</h4>
              <ul>${t.immersion.culture.music.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>
            
            <div class="immersion-section">
              <h4>🎨 Art & Visual</h4>
              <ul>${t.immersion.culture.art.map(a => `<li>${a}</li>`).join('')}</ul>
            </div>
            
            <div class="immersion-section">
              <h4>📖 Reading</h4>
              <ul>${t.immersion.culture.reading.map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
            
            <div class="immersion-section">
              <h4>🎬 Media</h4>
              <ul>${t.immersion.culture.media.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>
            
            <div class="immersion-environment">
              <h4>🕯 Environment</h4>
              <p>${t.immersion.environment}</p>
            </div>
          </div>

          <!-- TABOOS & COMPANIONS -->
          <div class="dashboard-card companions-card">
            <h3 class="card-title">⚖ Boundaries</h3>
            
            <div class="companions-section">
              <h4>Your Companions</h4>
              <ul>${t.immersion.companions.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
            
            <div class="taboos-section">
              <h4>Taboos</h4>
              <ul>${t.immersion.taboos.map(tb => `<li>${tb}</li>`).join('')}</ul>
            </div>
          </div>

          <!-- REFLECTION (LOCKED UNTIL FINAL DAY) -->
          <div class="dashboard-card reflection-card ${isLastDay ? 'unlocked' : 'locked'}">
            <h3 class="card-title">
              ${isLastDay ? '🔓' : '🔒'} Terminal Reflection
            </h3>
            ${isLastDay ? `
              <div class="reflection-content">
                <p class="reflection-prompt">${t.reflection.prompt.replace(/\n/g, '<br><br>')}</p>
                <div class="reflection-journal-prompts">
                  <h4>Journal Prompts</h4>
                  <ul>${t.reflection.journalPrompts.map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
                ${!trainingState.reflectionCompleted ? `
                  <button class="reflection-complete-btn" onclick="PsycheApp.ViewsTrainings.completeReflection()">
                    Mark Reflection Complete
                  </button>
                ` : `
                  <div class="reflection-completed-msg">
                    ✨ Reflection completed. The work continues...
                  </div>
                `}
              </div>
            ` : `
              <div class="reflection-locked-msg">
                <span class="lock-icon">🔒</span>
                <p>The reflection gateway opens on Day ${t.durationDays}.</p>
                <p class="days-remaining">${t.durationDays - day} days remaining</p>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // ── RENDER: TRAINING PREVIEW MODAL ──
  function renderPreview(trainingId) {
    const t = D.trainings?.find(tr => tr.id === trainingId);
    if (!t) return;
    
    const modal = document.createElement('div');
    modal.className = 'training-preview-modal';
    modal.innerHTML = `
      <div class="preview-backdrop" onclick="this.parentElement.remove()"></div>
      <div class="preview-content" style="--hue: ${t.hue};">
        <button class="preview-close" onclick="this.closest('.training-preview-modal').remove()">×</button>
        
        <div class="preview-header">
          <span class="preview-icon">${t.icon}</span>
          <h2>${t.title}</h2>
          <span class="preview-duration">${t.duration}</span>
        </div>
        
        <blockquote class="preview-quote">
          "${t.quote}"
          <cite>— ${t.author}</cite>
        </blockquote>
        
        <p class="preview-overview">${t.overview}</p>
        
        <div class="preview-ethos">
          <h4>Your Ethos</h4>
          <p>${t.immersion.ethos}</p>
        </div>
        
        <div class="preview-habits">
          <h4>Daily Practices</h4>
          <ul>
            ${t.habits.map(h => `<li><strong>${h.task}</strong> (${h.duration})</li>`).join('')}
          </ul>
        </div>
        
        <div class="preview-actions">
          <button class="preview-begin-btn" onclick="PsycheApp.ViewsTrainings.beginTraining('${t.id}'); this.closest('.training-preview-modal').remove();">
            Begin This Path
          </button>
          <button class="preview-cancel-btn" onclick="this.closest('.training-preview-modal').remove()">
            Not Yet
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));
  }

  // ── MAIN RENDER ──
  function render(container) {
    // Accept container argument or fallback to secondary-view
    const target = container || document.getElementById('secondary-view');
    if (!target) return;
    
    // Wrap content in a trainings container div
    loadState();
    
    if (activeTraining && trainingState) {
      currentScreen = 'dashboard';
      target.innerHTML = `<div id="view-trainings">${renderDashboard()}</div>`;
    } else {
      currentScreen = 'hall';
      target.innerHTML = `<div id="view-trainings">${renderHall()}</div>`;
      bindMonolithClicks();
    }
  }

  function bindMonolithClicks() {
    document.querySelectorAll('.monolith').forEach(m => {
      m.addEventListener('click', () => {
        const id = m.dataset.id;
        renderPreview(id);
      });
    });
  }

  function goToHall() {
    currentScreen = 'hall';
    const container = document.getElementById('secondary-view');
    render(container);
  }

  // ── INIT ──
  function init() {
    loadState();
    render();
  }

  // ── PUBLIC API ──
  return {
    init,
    render,
    beginTraining,
    abandonTraining,
    toggleHabit,
    completeReflection,
    goToHall
  };
})();
