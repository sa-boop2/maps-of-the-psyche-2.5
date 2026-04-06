// ============================================================
// VIEWS — THERAPY: Practical psychotherapy modalities
// CBT, DBT, ACT, Psychodynamic, EMDR, IFS, Gestalt, Somatic
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsTherapy = (function() {
  const D = () => window.PsycheData;
  const STORAGE_KEY = 'psyche_therapy_data';
  let activeTherapy = 'cbt';
  let activeTab = 'overview';

  function render(container) {
    const therapies = D().therapies || [];
    if (!therapies.length) { container.innerHTML = '<p style="text-align:center;color:var(--text-dim);padding:60px">Therapy data not loaded.</p>'; return; }

    const therapy = therapies.find(t => t.id === activeTherapy) || therapies[0];

    container.innerHTML = `
      <div class="view-header">
        <h1>Psychotherapy Toolkit</h1>
        <p>Practical tools and techniques from evidence-based psychotherapy. Explore each modality, learn its theory, practice its exercises, and find the right approach for your current challenges.</p>
      </div>

      <div class="therapy-nav" id="therapy-nav">
        ${therapies.map(t => `
          <button class="therapy-pill ${t.id === activeTherapy ? 'active' : ''}" data-id="${t.id}" style="--pill-color: ${t.color}">
            <span class="therapy-pill-icon">${t.icon}</span>
            <span class="therapy-pill-name">${t.shortName}</span>
          </button>
        `).join('')}
      </div>

      <div class="therapy-hero fade-in" style="--hero-color: ${therapy.color}">
        <div class="therapy-hero-left">
          <div class="therapy-hero-icon">${therapy.icon}</div>
          <div class="therapy-hero-info">
            <h2 class="therapy-hero-name">${therapy.name}</h2>
            <div class="therapy-hero-meta">${therapy.founder} · ${therapy.tradition}</div>
          </div>
        </div>
        <div class="therapy-hero-premise">${therapy.corePremise}</div>
      </div>

      <div class="view-tabs" id="therapy-tabs">
        <button class="view-tab ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview">Theory</button>
        <button class="view-tab ${activeTab === 'techniques' ? 'active' : ''}" data-tab="techniques">Techniques</button>
        <button class="view-tab ${activeTab === 'exercises' ? 'active' : ''}" data-tab="exercises">Practice</button>
        <button class="view-tab ${activeTab === 'evidence' ? 'active' : ''}" data-tab="evidence">Evidence & Use</button>
        <button class="view-tab ${activeTab === 'compare' ? 'active' : ''}" data-tab="compare">Compare All</button>
        <button class="view-tab ${activeTab === 'matcher' ? 'active' : ''}" data-tab="matcher">Find Your Fit</button>
      </div>

      <div id="therapy-content" class="therapy-content"></div>
    `;

    // Therapy pill navigation
    container.querySelectorAll('.therapy-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTherapy = btn.dataset.id;
        activeTab = 'overview';
        render(container);
        window.PsycheApp.Sound?.playUIClick();
      });
    });

    // Tab navigation
    container.querySelectorAll('#therapy-tabs .view-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        render(container);
        window.PsycheApp.Sound?.playUIClick();
      });
    });

    const content = container.querySelector('#therapy-content');
    switch(activeTab) {
      case 'overview': renderOverview(content, therapy); break;
      case 'techniques': renderTechniques(content, therapy); break;
      case 'exercises': renderExercises(content, therapy); break;
      case 'evidence': renderEvidence(content, therapy); break;
      case 'compare': renderCompare(content); break;
      case 'matcher': renderMatcher(content); break;
    }
  }

  // ── THEORY / OVERVIEW ──
  function renderOverview(el, therapy) {
    const t = therapy.theory;
    let distortionsHTML = '';
    if (t.cognitiveDistortions) {
      distortionsHTML = `
        <h3 style="margin: 30px 0 16px; color: var(--gold-light)">The ${t.cognitiveDistortions.length} Cognitive Distortions</h3>
        <div class="card-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))">
          ${t.cognitiveDistortions.map((d, i) => `
            <div class="card card-distortion fade-in" style="cursor:default; animation-delay:${i * 0.04}s; border-left: 3px solid ${therapy.color}">
              <div class="card-title" style="font-size: 0.95rem; color: ${therapy.color}">${d.name}</div>
              <div class="card-text" style="margin-top: 6px">${d.description}</div>
              <div style="margin-top: 10px; padding: 8px 12px; background: rgba(255,255,255,0.02); border-radius: var(--r-xs); font-size: 0.82rem; color: var(--text-dim); font-style: italic">
                <strong style="color: var(--gold); font-style: normal">Example:</strong> ${d.example}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    let modulesHTML = '';
    if (t.fourModules) {
      modulesHTML = `
        <h3 style="margin: 30px 0 16px; color: var(--gold-light)">The Four Modules</h3>
        <div class="card-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))">
          ${t.fourModules.map((m, i) => `
            <div class="card fade-in" style="cursor:default; animation-delay:${i * 0.08}s; border-top: 3px solid ${therapy.color}">
              <div class="card-title" style="color: ${therapy.color}">${m.name}</div>
              <div class="card-text" style="margin-top: 8px">${m.description}</div>
              <div style="margin-top: 14px">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 6px">Key Skills</div>
                ${m.keySkills.map(s => `<div class="sb-tag">${s}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    let hexaflexHTML = '';
    if (t.hexaflex) {
      hexaflexHTML = `
        <h3 style="margin: 30px 0 16px; color: var(--gold-light)">The Hexaflex — 6 Core Processes</h3>
        <div class="card-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))">
          ${t.hexaflex.map((h, i) => `
            <div class="card fade-in" style="cursor:default; animation-delay:${i * 0.06}s; border-left: 3px solid ${therapy.color}">
              <div class="card-title" style="font-size: 0.95rem; color: ${therapy.color}">${h.name}</div>
              <div class="card-text" style="margin-top: 6px">${h.description}</div>
              <div style="margin-top: 10px; padding: 6px 10px; background: rgba(212,84,76,0.05); border-radius: var(--r-xs); font-size: 0.78rem; color: var(--accent-red)">
                <strong>When blocked:</strong> ${h.opposite}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    let partTypesHTML = '';
    if (t.partTypes) {
      partTypesHTML = `
        <h3 style="margin: 30px 0 16px; color: var(--gold-light)">The Three Types of Parts</h3>
        <div class="card-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))">
          ${t.partTypes.map((p, i) => `
            <div class="card fade-in" style="cursor:default; animation-delay:${i * 0.08}s; border-top: 3px solid ${therapy.color}">
              <div class="card-title" style="color: ${therapy.color}">${p.name}</div>
              <div class="card-text" style="margin-top: 8px">${p.description}</div>
              <div style="margin-top: 14px">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 6px">Common Examples</div>
                ${p.examples.map(e => `<div class="sb-tag">${e}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    el.innerHTML = `
      <div class="card fade-in" style="cursor:default; margin-bottom: 24px; padding: 28px; border-left: 4px solid ${therapy.color}">
        <div class="card-subtitle" style="color: ${therapy.color}; margin-bottom: 12px">Core Model</div>
        <div class="card-text" style="font-size: 0.92rem; line-height: 1.8">${t.model}</div>
      </div>

      <h3 style="margin-bottom: 16px; color: var(--gold-light)">Key Principles</h3>
      <div class="therapy-principles fade-in" style="animation-delay: 0.1s">
        ${t.keyPrinciples.map((p, i) => `
          <div class="therapy-principle" style="animation-delay: ${i * 0.05}s">
            <span class="principle-num" style="color: ${therapy.color}">${i + 1}</span>
            <span class="principle-text">${p}</span>
          </div>
        `).join('')}
      </div>

      ${distortionsHTML}
      ${modulesHTML}
      ${hexaflexHTML}
      ${partTypesHTML}
    `;
  }

  // ── TECHNIQUES ──
  function renderTechniques(el, therapy) {
    el.innerHTML = `
      <div class="therapy-techniques">
        ${therapy.techniques.map((tech, i) => `
          <div class="card fade-in" style="cursor:default; margin-bottom: 20px; animation-delay:${i * 0.08}s">
            <div class="card-title" style="color: ${therapy.color}; font-size: 1.05rem">${tech.name}</div>
            <div class="card-text" style="margin-top: 8px; margin-bottom: 16px">${tech.description}</div>
            <div class="technique-steps">
              <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--gold); font-weight: 600; letter-spacing: 0.08em; margin-bottom: 10px">How To Do It</div>
              ${tech.steps.map((step, si) => `
                <div class="technique-step fade-in" style="animation-delay: ${(i * 0.08) + (si * 0.03)}s">
                  <span class="step-num" style="background: ${therapy.color}">${si + 1}</span>
                  <span class="step-text">${step}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── EXERCISES (Interactive) ──
  function renderExercises(el, therapy) {
    const saved = loadData();

    el.innerHTML = `
      <div style="margin-bottom: 24px; text-align: center">
        <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 600px; margin: 0 auto">
          These are practical exercises you can do right now. Your responses are saved privately in your browser.
        </p>
      </div>
      ${therapy.exercises.map((ex, ei) => `
        <div class="card fade-in" style="cursor:default; margin-bottom: 24px; animation-delay:${ei * 0.1}s; border-top: 3px solid ${therapy.color}">
          <div class="card-title" style="color: ${therapy.color}; font-size: 1.1rem">${ex.name}</div>
          <div class="card-text" style="margin: 8px 0 4px">${ex.description}</div>
          <div class="sb-question" style="margin-bottom: 20px">${ex.prompt}</div>
          ${ex.fields.map(f => {
            const key = `${therapy.id}_${ex.name}_${f.key}`;
            const val = saved[key] || '';
            return `
              <div style="margin-bottom: 14px">
                <label style="display: block; font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px; line-height: 1.5">${f.label}</label>
                <textarea class="journal-textarea therapy-field" data-key="${key}" style="min-height: 70px" placeholder="Write your reflection here...">${val}</textarea>
              </div>
            `;
          }).join('')}
        </div>
      `).join('')}
      <div style="text-align: center; margin-top: 20px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap">
        <button class="btn btn-primary" id="save-therapy">Save Responses</button>
        <button class="btn btn-ghost" id="export-therapy">Export as Text</button>
      </div>
      <div id="therapy-toast" class="toast hidden"></div>
    `;

    // Save handler
    document.getElementById('save-therapy')?.addEventListener('click', () => {
      const data = loadData();
      el.querySelectorAll('.therapy-field').forEach(ta => {
        data[ta.dataset.key] = ta.value;
      });
      data['_lastSaved'] = new Date().toISOString();
      saveData(data);
      showToast('Responses saved to your browser');
    });

    // Export handler
    document.getElementById('export-therapy')?.addEventListener('click', () => {
      let text = `=== ${therapy.name} — Exercise Responses ===\n`;
      text += `Date: ${new Date().toLocaleDateString()}\n\n`;
      therapy.exercises.forEach(ex => {
        text += `--- ${ex.name} ---\n${ex.prompt}\n\n`;
        ex.fields.forEach(f => {
          const key = `${therapy.id}_${ex.name}_${f.key}`;
          const val = el.querySelector(`[data-key="${key}"]`)?.value || '';
          text += `${f.label}\n${val || '(not answered)'}\n\n`;
        });
        text += '\n';
      });
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `psyche-${therapy.id}-exercises.txt`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exercise exported as text file');
    });
  }

  // ── EVIDENCE & WHEN TO USE ──
  function renderEvidence(el, therapy) {
    el.innerHTML = `
      <div class="card-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 24px">
        <div class="card fade-in" style="cursor:default; border-top: 3px solid ${therapy.color}">
          <div class="card-subtitle" style="color: ${therapy.color}; margin-bottom: 12px">When to Use ${therapy.shortName}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px">
            ${therapy.whenToUse.map(w => `<div class="sb-tag" style="background: rgba(76,212,154,0.06); border-color: rgba(76,212,154,0.2); color: var(--accent-green)">${w}</div>`).join('')}
          </div>
        </div>
        <div class="card fade-in" style="cursor:default; animation-delay: 0.08s; border-top: 3px solid var(--accent-orange)">
          <div class="card-subtitle" style="color: var(--accent-orange); margin-bottom: 12px">Limitations</div>
          <div class="card-text" style="line-height: 1.7">${therapy.limitations}</div>
        </div>
      </div>

      <div class="card fade-in" style="cursor:default; margin-bottom: 24px; animation-delay: 0.12s">
        <div class="card-subtitle" style="color: var(--accent-blue); margin-bottom: 12px">📊 Evidence Base</div>
        <div class="card-text" style="line-height: 1.8">${therapy.evidenceBase}</div>
      </div>

      <div class="card fade-in" style="cursor:default; margin-bottom: 24px; animation-delay: 0.16s">
        <div class="card-subtitle" style="color: var(--gold); margin-bottom: 12px">📚 Key Texts</div>
        ${therapy.keyTexts.map(t => `<div class="sb-resource"><span class="sb-resource-title">${t}</span></div>`).join('')}
      </div>

      ${therapy.psycheMapLink ? `
        <div class="card fade-in" style="cursor:default; animation-delay: 0.2s; border-left: 3px solid var(--gold); background: rgba(201,168,76,0.03)">
          <div class="card-subtitle" style="color: var(--gold); margin-bottom: 8px">🗺️ Connection to the Psyche Map</div>
          <div class="card-text">${therapy.psycheMapLink.note}</div>
          <button class="btn btn-ghost" style="margin-top: 14px; font-size: 0.78rem" id="therapy-map-link">View on Map →</button>
        </div>
      ` : ''}
    `;

    document.getElementById('therapy-map-link')?.addEventListener('click', () => {
      if (therapy.psycheMapLink) {
        window.PsycheApp.setFrameworkById(therapy.psycheMapLink.framework, therapy.psycheMapLink.layer);
        window.PsycheApp.goToView('map');
      }
    });
  }

  // ── COMPARE ALL ──
  function renderCompare(el) {
    const comp = D().therapyComparisons;
    if (!comp) return;
    const therapies = D().therapies || [];

    el.innerHTML = `
      <div style="overflow-x: auto">
        <table class="comp-table fade-in">
          <thead>
            <tr>
              <th>Therapy</th>
              ${comp.dimensions.map(d => `<th>${d}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${comp.comparisons.map((c, i) => {
              const therapy = therapies.find(t => t.shortName === c.therapy);
              const color = therapy?.color || 'var(--gold)';
              return `
                <tr class="fade-in" style="animation-delay: ${i * 0.05}s">
                  <td style="font-weight: 600; color: ${color}; white-space: nowrap">${therapy?.icon || ''} ${c.therapy}</td>
                  <td>${c.focus}</td>
                  <td>${c.timeframe}</td>
                  <td>${c.structure}</td>
                  <td>${c.clientRole}</td>
                  <td>${c.therapistRole}</td>
                  <td>${c.mechanism}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ── SYMPTOM MATCHER ──
  function renderMatcher(el) {
    const matcher = D().therapyMatcher || [];
    const therapies = D().therapies || [];
    let selected = [];

    function renderMatcherUI() {
      el.innerHTML = `
        <div style="max-width: 700px; margin: 0 auto">
          <div class="card fade-in" style="cursor:default; padding: 28px; margin-bottom: 24px; border-top: 3px solid var(--gold)">
            <div class="card-title" style="font-size: 1.1rem; margin-bottom: 8px">What Are You Experiencing?</div>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 20px">Select all that apply. We'll suggest which therapy approaches may be most helpful.</p>
            <div class="matcher-options">
              ${matcher.map((m, i) => `
                <button class="matcher-option ${selected.includes(i) ? 'selected' : ''}" data-idx="${i}">
                  ${m.symptom}
                </button>
              `).join('')}
            </div>
          </div>

          ${selected.length > 0 ? renderMatcherResults() : ''}
        </div>
      `;

      el.querySelectorAll('.matcher-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          if (selected.includes(idx)) {
            selected = selected.filter(s => s !== idx);
          } else {
            selected.push(idx);
          }
          window.PsycheApp.Sound?.playUIClick();
          renderMatcherUI();
        });
      });
    }

    function renderMatcherResults() {
      // Tally therapy recommendations
      const scores = {};
      selected.forEach(idx => {
        const m = matcher[idx];
        m.primary.forEach(t => { scores[t] = (scores[t] || 0) + 3; });
        m.secondary.forEach(t => { scores[t] = (scores[t] || 0) + 1; });
      });

      const ranked = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(([id, score]) => {
          const therapy = therapies.find(t => t.id === id);
          return { id, score, therapy };
        })
        .filter(r => r.therapy);

      const maxScore = ranked[0]?.score || 1;

      return `
        <div class="card fade-in" style="cursor:default; padding: 28px; border-top: 3px solid var(--accent-green)">
          <div class="card-title" style="color: var(--accent-green); margin-bottom: 16px">Recommended Approaches</div>
          ${ranked.map((r, i) => `
            <div class="matcher-result fade-in" style="animation-delay: ${i * 0.08}s">
              <div class="matcher-result-header">
                <span class="matcher-result-icon" style="color: ${r.therapy.color}">${r.therapy.icon}</span>
                <span class="matcher-result-name" style="color: ${r.therapy.color}">${r.therapy.name}</span>
                <span class="matcher-result-score">${Math.round((r.score / maxScore) * 100)}% match</span>
              </div>
              <div class="matcher-bar-bg">
                <div class="matcher-bar-fill" style="width: ${(r.score / maxScore) * 100}%; background: ${r.therapy.color}"></div>
              </div>
              <div style="font-size: 0.82rem; color: var(--text-dim); margin-top: 4px">${r.therapy.corePremise.substring(0, 120)}...</div>
              <button class="btn btn-ghost" style="margin-top: 8px; font-size: 0.72rem; padding: 6px 14px" data-explore="${r.id}">Explore ${r.therapy.shortName} →</button>
            </div>
          `).join('')}

          <div style="margin-top: 24px; padding: 14px; background: rgba(201,168,76,0.04); border-radius: var(--r-xs); border-left: 3px solid var(--gold)">
            <p style="font-size: 0.82rem; color: var(--text-secondary); font-style: italic; margin: 0">
              <strong style="color: var(--gold); font-style: normal">Note:</strong> This is an educational tool, not a diagnosis. For personalized recommendations, consult a qualified mental health professional. Many therapists integrate multiple approaches.
            </p>
          </div>
        </div>
      `;
    }

    renderMatcherUI();

    // Defer binding explore buttons
    setTimeout(() => {
      el.querySelectorAll('[data-explore]').forEach(btn => {
        btn.addEventListener('click', () => {
          activeTherapy = btn.dataset.explore;
          activeTab = 'overview';
          const container = el.closest('#secondary-view');
          if (container) render(container);
        });
      });
    }, 100);
  }

  // ── STORAGE ──
  function loadData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  }
  function saveData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) { console.warn('Storage failed', e); }
  }

  // ── TOAST (shared utility) ──
  function showToast(message) {
    // Use global toast if available
    if (window.PsycheApp.showToast) {
      window.PsycheApp.showToast(message);
    } else {
      let t = document.getElementById('therapy-toast');
      if (!t) {
        t = document.createElement('div');
        t.id = 'therapy-toast';
        t.className = 'toast hidden';
        document.body.appendChild(t);
      }
      t.textContent = message;
      t.classList.remove('hidden');
      t.classList.add('show');
      setTimeout(() => { t.classList.remove('show'); t.classList.add('hidden'); }, 2500);
    }
  }

  return { render };
})();
