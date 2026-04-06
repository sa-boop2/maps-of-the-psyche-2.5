// ============================================================
// VIEWS — MEDITATION TIMER: Tradition-aware guided practice
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsMeditation = (function() {
  const STORAGE_KEY = 'psyche_meditation_data';
  let selectedTradition = 'mindfulness';
  let selectedDuration = 600; // seconds
  let timerInterval = null;
  let timeRemaining = 0;
  let isRunning = false;
  let sessionPhase = 'setup'; // 'setup' | 'running' | 'complete'

  const traditions = [
    {
      id: 'mindfulness',
      name: 'Mindfulness',
      icon: '🧘',
      color: '#4cd49a',
      tradition: 'Buddhist',
      description: 'Present-moment awareness without judgment. The foundation of vipassanā — simply observing what is.',
      instructions: [
        'Sit comfortably with your spine straight but not rigid.',
        'Close your eyes. Let your breath find its natural rhythm.',
        'Bring attention to the sensation of breathing — nostrils, chest, or belly.',
        'When thoughts arise, notice them without judgment. Label them "thinking" and return to the breath.',
        'Each return to the breath is a moment of awakening, not a failure.',
        'Rest in the space between breaths. Be the awareness that notices.'
      ],
      bellPrompts: ['Breathe. You are here.', 'Notice what is present.', 'Return to sensation.', 'Let thoughts float past like clouds.'],
      closer: 'Slowly expand your awareness to include sounds, sensations, the room around you. When ready, gently open your eyes.'
    },
    {
      id: 'selfInquiry',
      name: 'Self-Inquiry',
      icon: '🪞',
      color: '#d4884c',
      tradition: 'Vedantic (Ramana Maharshi)',
      description: 'Who am I? The radical investigation into the nature of the self — peeling away every layer until only awareness remains.',
      instructions: [
        'Sit in stillness. Close your eyes.',
        'Ask yourself: "Who am I?"',
        'Do not answer with words, roles, or descriptions. Those are objects — you are the subject.',
        'Whatever arises — thought, feeling, memory — ask: "To whom does this arise?"',
        'The answer is always: "To me." Then ask again: "Who am I?"',
        'Follow the thread of "I" back to its source. Rest in that sourceless awareness.'
      ],
      bellPrompts: ['Who is aware right now?', 'To whom does this thought arise?', 'Rest in the I before the I.', 'The seeker and the sought are one.'],
      closer: 'Rest in the spacious awareness that remains when all seeking stops. You are that which you have been looking for.'
    },
    {
      id: 'emptiness',
      name: 'Emptiness',
      icon: '☯',
      color: '#9a4cd4',
      tradition: 'Daoist / Zen',
      description: 'Wu wei — the art of non-doing. Emptying the cup of the mind so the Dao can flow through without obstruction.',
      instructions: [
        'Sit like a mountain — unmoved, rooted, silent.',
        'Release all effort. Stop trying to meditate.',
        'Let thoughts arise and dissolve like mist over a lake.',
        'Do not grasp. Do not push away. Do not even observe — just be.',
        'Empty the cup. The emptier you become, the more you contain.',
        'Rest in the Great Emptiness that is also the Great Fullness.'
      ],
      bellPrompts: ['Let go of letting go.', 'The river flows without effort.', 'Empty. Full. Same.', 'Be nobody, going nowhere.'],
      closer: 'The meditation never began, and it never ends. Carry this emptiness into whatever arises next.'
    },
    {
      id: 'lovingKindness',
      name: 'Loving-Kindness',
      icon: '💛',
      color: '#d4544c',
      tradition: 'Buddhist (Mettā)',
      description: 'Mettā bhāvanā — the systematic cultivation of unconditional love, starting with yourself and expanding outward to all beings.',
      instructions: [
        'Sit comfortably. Bring to mind your own image or felt sense of yourself.',
        'Silently repeat: "May I be safe. May I be happy. May I be healthy. May I live with ease."',
        'Feel the warmth in your chest. Stay with this feeling.',
        'Now bring to mind someone you love. Extend the same wishes to them.',
        'Next, someone neutral. Then someone difficult. Then all beings everywhere.',
        'Let the love expand until it has no boundary, no limit, no exception.'
      ],
      bellPrompts: ['May all beings be at peace.', 'Include yourself in this circle of love.', 'Even the difficult ones deserve love.', 'Your heart has no walls.'],
      closer: 'Let the warmth in your heart radiate outward like a sun. Carry this mettā with you as you re-enter the world.'
    },
    {
      id: 'partsWork',
      name: 'Parts Meditation',
      icon: '🔮',
      color: '#e8836b',
      tradition: 'Internal Family Systems',
      description: 'A guided meditation to connect with your internal parts from Self-energy — the calm, curious, compassionate center.',
      instructions: [
        'Close your eyes. Take several deep breaths to settle.',
        'Notice your inner landscape. Who is present? What parts are active?',
        'Find Self-energy: the place of calm, curiosity, compassion. You are the sky — parts are the weather.',
        'Gently ask: "Who needs my attention right now?"',
        'Notice what part shows up. Where do you feel it in your body?',
        'With genuine curiosity (not from another part), ask it: "What do you want me to know?"',
        'Listen. Validate. Thank it for its protection.',
        'Ask: "What would you need from me to feel safer?"'
      ],
      bellPrompts: ['Listen from Self, not from another part.', 'All parts are welcome.', 'What does this part protect?', 'You are the Self — whole, unbroken.'],
      closer: 'Thank all parts for showing up. Assure them you will return. Slowly come back to the room, carrying Self-energy with you.'
    },
    {
      id: 'breathwork',
      name: 'Breath Work',
      icon: '🫁',
      color: '#4cbcd4',
      tradition: 'Somatic / Pranayama',
      description: 'Using the breath as a bridge between conscious and unconscious — regulating the nervous system through deliberate breathing patterns.',
      instructions: [
        'Sit or lie down comfortably. Place one hand on chest, one on belly.',
        'Begin with natural breath observation for 1 minute.',
        'Transition to box breathing: Inhale 4 counts → Hold 4 → Exhale 4 → Hold 4.',
        'After 3-5 rounds, shift to extended exhale: Inhale 4 counts → Exhale 8 counts.',
        'Feel your nervous system downshift. Notice the space between breaths.',
        'Return to natural breathing. Let the body breathe itself.'
      ],
      bellPrompts: ['Inhale calm. Exhale tension.', 'The breath is your anchor.', 'Your body knows how to heal.', 'Slower. Deeper. Easier.'],
      closer: 'Return to natural breathing. Notice how different your body feels now compared to when you began. Carry this regulation with you.'
    }
  ];

  function render(container) {
    sessionPhase = 'setup';
    isRunning = false;
    if (timerInterval) clearInterval(timerInterval);

    const history = loadData();
    const sessions = history.sessions || [];

    container.innerHTML = `
      <div class="view-header">
        <h1>Contemplative Practice</h1>
        <p>Tradition-aware meditation timer with guided instruction. Choose a practice, set your duration, and begin.</p>
      </div>

      <div class="meditation-traditions" id="med-traditions">
        ${traditions.map(t => `
          <button class="med-tradition-pill ${t.id === selectedTradition ? 'active' : ''}" data-id="${t.id}" style="--pill-color: ${t.color}">
            <span class="med-pill-icon">${t.icon}</span>
            <span class="med-pill-name">${t.name}</span>
            <span class="med-pill-tradition">${t.tradition}</span>
          </button>
        `).join('')}
      </div>

      <div id="med-main" style="max-width: 700px; margin: 0 auto;"></div>

      ${sessions.length > 0 ? `
        <div style="max-width: 700px; margin: 40px auto 0;">
          <h3 style="margin-bottom: 16px; font-size: 0.95rem; color: var(--gold-light);">Recent Sessions</h3>
          <div class="med-history">
            ${sessions.slice(-8).reverse().map((s, i) => `
              <div class="med-history-item fade-in" style="animation-delay: ${i * 0.05}s">
                <div class="med-history-icon">${traditions.find(t => t.id === s.tradition)?.icon || '🧘'}</div>
                <div class="med-history-info">
                  <div class="med-history-name">${traditions.find(t => t.id === s.tradition)?.name || s.tradition}</div>
                  <div class="med-history-meta">${s.date} · ${Math.round(s.duration / 60)} min</div>
                </div>
                ${s.reflection ? `<div class="med-history-reflection" title="${s.reflection}">📝</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    // Tradition pill navigation
    container.querySelectorAll('.med-tradition-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedTradition = btn.dataset.id;
        window.PsycheApp.Sound?.playUIClick();
        render(container);
      });
    });

    renderSetup(container.querySelector('#med-main'));
  }

  function renderSetup(el) {
    const t = traditions.find(tr => tr.id === selectedTradition) || traditions[0];

    el.innerHTML = `
      <div class="card fade-in" style="cursor:default; padding: 32px; border-top: 3px solid ${t.color}; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div style="font-size: 2.5rem;">${t.icon}</div>
          <div>
            <div class="card-title" style="font-size: 1.2rem; margin-bottom: 2px;">${t.name}</div>
            <div style="font-size: 0.78rem; color: var(--text-dim);">${t.tradition}</div>
          </div>
        </div>
        <div class="card-text" style="margin-bottom: 20px; line-height: 1.8;">${t.description}</div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 10px;">Instructions</div>
          ${t.instructions.map((inst, i) => `
            <div class="med-instruction fade-in" style="animation-delay: ${i * 0.04}s">
              <span class="med-instruction-num" style="background: ${t.color}">${i + 1}</span>
              <span>${inst}</span>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 10px;">Duration</div>
          <div class="med-duration-options">
            ${[300, 600, 900, 1200, 1800].map(d => `
              <button class="med-duration-btn ${d === selectedDuration ? 'active' : ''}" data-dur="${d}">${d / 60} min</button>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 8px;">Intention (Optional)</div>
          <textarea id="med-intention" class="journal-textarea" style="min-height: 60px;" placeholder="What do you bring to this practice today?"></textarea>
        </div>

        <div style="text-align: center;">
          <button class="btn btn-primary" id="med-start" style="padding: 14px 48px; font-size: 1rem; letter-spacing: 0.08em;">Begin Practice</button>
        </div>
      </div>
    `;

    el.querySelectorAll('.med-duration-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDuration = parseInt(btn.dataset.dur);
        el.querySelectorAll('.med-duration-btn').forEach(b => b.classList.toggle('active', b === btn));
        window.PsycheApp.Sound?.playUIClick();
      });
    });

    document.getElementById('med-start')?.addEventListener('click', () => {
      const intention = document.getElementById('med-intention')?.value || '';
      window.PsycheApp.Sound?.playTransition();
      startTimer(el, intention);
    });
  }

  function startTimer(el, intention) {
    sessionPhase = 'running';
    timeRemaining = selectedDuration;
    const t = traditions.find(tr => tr.id === selectedTradition) || traditions[0];

    function renderTimerUI() {
      const mins = Math.floor(timeRemaining / 60);
      const secs = timeRemaining % 60;
      const progress = 1 - (timeRemaining / selectedDuration);
      const circumference = 2 * Math.PI * 120;
      const offset = circumference * (1 - progress);

      // Pick a prompt based on progress
      const promptIdx = Math.min(Math.floor(progress * t.bellPrompts.length), t.bellPrompts.length - 1);
      const currentPrompt = t.bellPrompts[promptIdx];

      el.innerHTML = `
        <div class="med-timer-view fade-in">
          <div class="med-timer-circle-container">
            <svg class="med-timer-svg" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r="120" fill="none" stroke="var(--border)" stroke-width="3" />
              <circle cx="130" cy="130" r="120" fill="none" stroke="${t.color}" stroke-width="3"
                      stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                      stroke-linecap="round" transform="rotate(-90 130 130)"
                      style="transition: stroke-dashoffset 1s linear;" />
            </svg>
            <div class="med-timer-display">
              <div class="med-timer-time">${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}</div>
              <div class="med-timer-tradition">${t.name}</div>
            </div>
          </div>

          <div class="med-timer-prompt fade-in" style="color: ${t.color}; animation-delay: 0.2s;">
            "${currentPrompt}"
          </div>

          <div class="breathing-indicator">
            <div class="breathing-dot" style="background: ${t.color};"></div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: center; margin-top: 24px;">
            <button class="btn btn-ghost" id="med-pause">${isRunning ? 'Pause' : 'Resume'}</button>
            <button class="btn btn-ghost" id="med-stop" style="border-color: var(--accent-red); color: var(--accent-red);">End Session</button>
          </div>
        </div>
      `;

      document.getElementById('med-pause')?.addEventListener('click', () => {
        isRunning = !isRunning;
        if (isRunning) {
          timerInterval = setInterval(tick, 1000);
        } else {
          clearInterval(timerInterval);
        }
        renderTimerUI();
      });

      document.getElementById('med-stop')?.addEventListener('click', () => {
        clearInterval(timerInterval);
        isRunning = false;
        const elapsed = selectedDuration - timeRemaining;
        completeSession(el, intention, elapsed);
      });
    }

    function tick() {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        window.PsycheApp.Sound?.playTransition();
        completeSession(el, intention, selectedDuration);
        return;
      }
      renderTimerUI();
    }

    isRunning = true;
    timerInterval = setInterval(tick, 1000);
    renderTimerUI();
  }

  function completeSession(el, intention, elapsed) {
    sessionPhase = 'complete';
    const t = traditions.find(tr => tr.id === selectedTradition) || traditions[0];

    el.innerHTML = `
      <div class="med-complete fade-in" style="text-align: center; padding: 40px 0;">
        <div style="font-size: 3rem; margin-bottom: 16px;">${t.icon}</div>
        <h2 style="font-family: var(--font-display); color: var(--gold); font-size: 1.8rem; margin-bottom: 8px;">Session Complete</h2>
        <div style="color: var(--text-dim); font-size: 0.92rem; margin-bottom: 32px;">${Math.round(elapsed / 60)} minutes of ${t.name} practice</div>

        <div class="card" style="cursor:default; padding: 24px; text-align: left; margin-bottom: 24px; border-top: 3px solid ${t.color};">
          <div style="font-size: 0.88rem; color: var(--text-secondary); font-style: italic; line-height: 1.7; margin-bottom: 20px;">
            "${t.closer}"
          </div>

          <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 8px;">Post-Practice Reflection (Optional)</div>
          <textarea id="med-reflection" class="journal-textarea" style="min-height: 80px;" placeholder="What did you notice? What arose? How do you feel now compared to before?"></textarea>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" id="med-save">Save Session</button>
          <button class="btn btn-ghost" id="med-new">New Session</button>
        </div>
      </div>
    `;

    document.getElementById('med-save')?.addEventListener('click', () => {
      const reflection = document.getElementById('med-reflection')?.value || '';
      const data = loadData();
      if (!data.sessions) data.sessions = [];
      data.sessions.push({
        tradition: selectedTradition,
        duration: elapsed,
        intention: intention,
        reflection: reflection,
        date: new Date().toLocaleDateString()
      });
      saveData(data);
      window.PsycheApp.showToast('✓ Meditation session saved');
      // Re-render the whole view to show updated history
      const container = el.closest('#secondary-view');
      if (container) render(container);
    });

    document.getElementById('med-new')?.addEventListener('click', () => {
      const container = el.closest('#secondary-view');
      if (container) render(container);
    });
  }

  // Storage
  function loadData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  }
  function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) { console.warn('Storage failed', e); }
  }

  return { render };
})();
