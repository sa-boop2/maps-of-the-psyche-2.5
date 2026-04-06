// ============================================================
// VIEWS — MAP: Trauma, Dark Night, Relationships, Cultural Comparison, Resources
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsMap = (function() {
  const D = () => window.PsycheData;
  const HERO_PATH_KEY = 'psyche_hero_path_state';
  const ALCHEMY_KEY = 'psyche_alchemy_lab_state';

  // ── TRAUMA CARTOGRAPHY ──
  function renderTraumaCartography(container) {
    const trauma = D().trauma;
    if (!trauma) return;
    container.innerHTML = `
      <div class="view-header">
        <h1>Trauma Cartography</h1>
        <p>${trauma.description}</p>
      </div>
      <div class="card-grid">${trauma.types.map((t, i) => `
        <div class="card fade-in" style="cursor:default;animation-delay:${i*0.08}s">
          <div class="card-title">${t.name}</div>
          <div class="card-tags" style="margin-bottom:10px">${t.layers.map(l => `<span class="sb-tag">${l}</span>`).join('')}</div>
          <div class="card-text">${t.description}</div>
          <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:10px">
            <div style="font-size:0.7rem;text-transform:uppercase;color:var(--gold);font-weight:600;letter-spacing:0.08em;margin-bottom:6px">Healing Modalities</div>
            ${t.healing.map(h => `<div class="sb-tag" style="background:rgba(76,212,154,0.06);border-color:rgba(76,212,154,0.2);color:var(--accent-green)">${h}</div>`).join('')}
          </div>
        </div>
      `).join('')}</div>`;
  }

  // ── DARK NIGHT OF THE SOUL ──
  function renderDarkNight(container) {
    const dn = D().darkNight;
    if (!dn) return;
    container.innerHTML = `
      <div class="view-header">
        <h1>Dark Night of the Soul</h1>
        <p>${dn.description}</p>
      </div>
      <div class="timeline">${dn.stages.map((s, i) => `
        <div class="timeline-item fade-in" style="animation-delay:${i*0.1}s;cursor:default">
          <div class="timeline-title">Stage ${i+1}: ${s.name}</div>
          <div class="timeline-text" style="margin-bottom:12px">${s.description}</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${Object.entries(s.traditions).map(([fw, desc]) => `
              <div style="padding:6px 10px;background:rgba(201,168,76,0.04);border:1px solid var(--border);border-radius:var(--r-xs);font-size:0.78rem">
                <span style="color:var(--gold);font-weight:600">${fw}:</span>
                <span style="color:var(--text-secondary)">${desc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}</div>
      <div class="card" style="cursor:default;margin-top:24px;padding:24px;border-color:var(--accent-red);border-left:3px solid var(--accent-red)">
        <div class="card-title" style="color:var(--accent-red);font-size:0.95rem">Important Note</div>
        <div class="card-text" style="margin-top:8px">The Dark Night is not depression, though it can look similar. Depression is a clinical condition requiring medical attention. The Dark Night is a transformative process that occurs within an existing contemplative or psychological practice. If you are in crisis, please seek professional help.</div>
      </div>`;
  }

  // ── RELATIONSHIP DYNAMICS ──
  function renderRelationships(container) {
    const rels = D().relationships;
    if (!rels) return;
    container.innerHTML = `
      <div class="view-header">
        <h1>Relationship Dynamics</h1>
        <p>${rels.description}</p>
      </div>
      ${rels.dynamics.map((d, i) => `
        <div class="card fade-in" style="cursor:default;margin-bottom:20px;animation-delay:${i*0.07}s">
          <div class="card-title">${d.name}</div>
          <div class="card-tags" style="margin-bottom:10px">${d.layers.map(l => `<span class="sb-tag">${l}</span>`).join('')}</div>
          <div class="card-text">${d.description}</div>
          <div style="margin-top:12px;padding:10px 14px;background:rgba(201,168,76,0.04);border-radius:var(--r-xs);font-size:0.82rem;color:var(--text-secondary);font-style:italic">
            <strong style="color:var(--gold);font-style:normal">Example:</strong> ${d.example}
          </div>
        </div>
      `).join('')}`;
  }

  // ── CULTURAL COMPARISON ──
  // Layer equivalence data — parallel concepts across traditions
  const layerEquivalences = [
    { theme: 'Physical / Material Body', concepts: [
      { fw: 'Freud', term: 'Id (somatic drives)' }, { fw: 'Vedantic', term: 'Annamaya Kosha' },
      { fw: 'Buddhist', term: 'Rūpa (Form)' }, { fw: 'Kabbalistic', term: 'Malkuth' },
      { fw: 'Daoist', term: 'Jing (Essence)' }, { fw: 'Functional', term: 'Reptilian Brain' }
    ]},
    { theme: 'Emotional / Feeling Body', concepts: [
      { fw: 'Vedantic', term: 'Pranamaya Kosha' }, { fw: 'Buddhist', term: 'Vedanā (Feeling-tone)' },
      { fw: 'Jungian', term: 'Shadow / Anima' }, { fw: 'IFS', term: 'Exiles' },
      { fw: 'Kabbalistic', term: 'Yesod / Netzach' }, { fw: 'Daoist', term: 'Qi' }
    ]},
    { theme: 'Mental / Cognitive Processing', concepts: [
      { fw: 'Freud', term: 'Ego' }, { fw: 'Vedantic', term: 'Manomaya Kosha' },
      { fw: 'Buddhist', term: 'Saññā (Perception)' }, { fw: 'Functional', term: 'Neocortex / System 2' },
      { fw: 'Jungian', term: 'Persona / Ego' }, { fw: 'IFS', term: 'Managers' }
    ]},
    { theme: 'Wisdom / Higher Knowing', concepts: [
      { fw: 'Vedantic', term: 'Vijñānamaya Kosha' }, { fw: 'Buddhist', term: 'Saṅkhāra (Formations)' },
      { fw: 'Jungian', term: 'Self (archetype)' }, { fw: 'Kabbalistic', term: 'Tiphereth' },
      { fw: 'Wilber', term: 'Vision-Logic / Centaur' }, { fw: 'Daoist', term: 'Shen (Spirit)' }
    ]},
    { theme: 'Transcendent / Non-Dual Ground', concepts: [
      { fw: 'Vedantic', term: 'Ānandamaya Kosha / Ātman' }, { fw: 'Buddhist', term: 'Nibbāna / Śūnyatā' },
      { fw: 'Kabbalistic', term: 'Kether / Ein Sof' }, { fw: 'Daoist', term: 'Dao' },
      { fw: 'Jungian', term: 'The Self (totality)' }, { fw: 'Wilber', term: 'Nondual / Kosmic' }
    ]}
  ];

  function renderCulturalComparison(container) {
    const allFw = window.PsycheApp.allFrameworks || [];
    const traditions = { western: 'Western', eastern: 'Eastern', indigenous: 'Indigenous', esoteric: 'Esoteric', modern: 'Modern' };
    let activeTraditions = ['western', 'eastern', 'modern'];
    let showEquivalence = false;
    const SYNTH_KEY = 'psyche_synthesis_notes';

    function loadNotes() {
      try { return JSON.parse(localStorage.getItem(SYNTH_KEY) || '{}'); } catch { return {}; }
    }
    function saveNotes(data) {
      try { localStorage.setItem(SYNTH_KEY, JSON.stringify(data)); } catch(e) { console.warn('Storage failed', e); }
    }

    function render() {
      const fws = allFw.filter(f => activeTraditions.includes(f.tradition));
      const maxLayers = Math.max(...fws.map(f => f.layers.length));
      const savedNotes = loadNotes();

      container.innerHTML = `
        <div class="view-header">
          <h1>Cultural Comparison</h1>
          <p>Side-by-side view of how different traditions map the same psychic territory. Click any layer to synchronize the map and see that concept in context.</p>
        </div>
        <div class="view-tabs">
          ${Object.entries(traditions).map(([key, label]) => `
            <button class="view-tab ${activeTraditions.includes(key)?'active':''}" data-trad="${key}">${label}</button>
          `).join('')}
          <div style="width: 1px; height: 20px; background: var(--border); margin: 0 4px;"></div>
          <button class="view-tab ${showEquivalence ? 'active' : ''}" id="btn-equivalence" style="border-color: var(--accent-purple); color: ${showEquivalence ? 'var(--accent-purple)' : 'var(--text-dim)'};">⟷ Layer Equivalence</button>
        </div>

        ${showEquivalence ? renderEquivalenceTable() : ''}

        <div style="overflow-x:auto">
          <table class="comp-table">
            <thead><tr>
              <th style="width:40px">Depth</th>
              ${fws.map(fw => `<th>${fw.name}</th>`).join('')}
            </tr></thead>
            <tbody>
              ${Array.from({length: maxLayers}, (_, i) => `
                <tr>
                  <td style="color:var(--text-dim);font-size:0.72rem">${i === 0 ? '↑ Surface' : i === maxLayers-1 ? '↓ Depth' : 'Layer ' + (i+1)}</td>
                  ${fws.map(fw => {
                    const layer = fw.layers[i];
                    if (!layer) return '<td style="color:var(--text-dim)">—</td>';
                    return `<td class="comp-cell-clickable" data-fw="${fw.id}" data-layer-idx="${i}">
                      <div style="font-weight:600;color:${layer.color};font-size:0.82rem;margin-bottom:2px">${layer.name}</div>
                      <div style="font-size:0.72rem;color:var(--text-dim)">${layer.subtitle}</div>
                    </td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="margin-top:24px;padding:20px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r)">
          <h3 style="margin-bottom:12px;font-size:0.95rem">Key Observations</h3>
          <div class="card-text" style="line-height:1.8">
            <p>• <strong>Convergence:</strong> Almost all traditions recognize a layered structure from gross/physical to subtle/spiritual.</p>
            <p>• <strong>Body:</strong> Every tradition starts with the physical body but differs on its significance — from prison (Platonic Greek) to sacred site (Daoist, Aboriginal).</p>
            <p>• <strong>Middle layers:</strong> All traditions identify emotional/mental processing as a distinct zone, though they describe it differently.</p>
            <p>• <strong>Deepest layer:</strong> Indigenous frameworks tend toward relational/communal depth; Eastern toward transcendent dissolution; Western toward structural integration.</p>
            <p>• <strong>Core tension:</strong> Is the deepest reality personal (Atman, Self, Orí) or impersonal (Anatta, Dao, NTU)? This is the fault line between traditions.</p>
          </div>
        </div>

        <div style="margin-top:24px;padding:24px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r);border-left:3px solid var(--gold)">
          <h3 style="margin-bottom:8px;font-size:0.95rem;color:var(--gold-light)">✍ Your Synthesis Notes</h3>
          <p style="font-size:0.82rem;color:var(--text-dim);margin-bottom:14px;">What patterns do you see as you compare these traditions? What contradictions are meaningful? Record your own insights below — they are saved privately in your browser.</p>
          <textarea id="synthesis-notes" class="journal-textarea" style="min-height:100px;" placeholder="Write your own synthesis observations here...">${savedNotes.text || ''}</textarea>
          <div style="display:flex;gap:12px;margin-top:12px;">
            <button class="btn btn-primary" id="save-synthesis" style="font-size:0.78rem;padding:8px 20px;">Save Notes</button>
            <span id="synthesis-saved-indicator" style="font-size:0.75rem;color:var(--text-dim);align-self:center;"></span>
          </div>
        </div>`;

      // Event Listeners
      container.querySelectorAll('.view-tab[data-trad]').forEach(tab => {
        tab.addEventListener('click', () => {
          const trad = tab.dataset.trad;
          if (activeTraditions.includes(trad)) {
            if (activeTraditions.length > 1) activeTraditions = activeTraditions.filter(t => t !== trad);
          } else {
            activeTraditions.push(trad);
          }
          render();
        });
      });

      document.getElementById('btn-equivalence')?.addEventListener('click', () => {
        showEquivalence = !showEquivalence;
        window.PsycheApp.Sound?.playUIClick();
        render();
      });

      document.getElementById('save-synthesis')?.addEventListener('click', () => {
        const text = document.getElementById('synthesis-notes')?.value || '';
        saveNotes({ text, lastSaved: new Date().toISOString() });
        window.PsycheApp.showToast('✓ Synthesis notes saved');
      });

      container.querySelectorAll('.comp-cell-clickable').forEach(cell => {
        cell.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.currentTarget;
          const fwId = target.dataset.fw;
          const layerIdx = parseInt(target.dataset.layerIdx);
          const fw = allFw.find(f => f.id === fwId);
          if (!fw || !fw.layers[layerIdx]) return;
          
          if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
          
          // Show Sidebar
          window.PsycheApp.Sidebar.show(fw.layers[layerIdx]);
          
          // Switch Framework and Select Node in BACKGROUND (noSwitch = true)
          // noSwitch is explicitly TRUE here to prevent any view redirects
          window.PsycheApp.setFrameworkById(fwId, layerIdx, true);
        });
      });

    }

    function renderEquivalenceTable() {
      return `
        <div class="card fade-in" style="cursor:default; margin-bottom: 24px; padding: 24px; border-top: 3px solid var(--accent-purple);">
          <div class="card-subtitle" style="color: var(--accent-purple); margin-bottom: 16px;">Layer Equivalence Map — Parallel Concepts Across Traditions</div>
          ${layerEquivalences.map((eq, i) => `
            <div class="equivalence-row fade-in" style="animation-delay: ${i * 0.06}s">
              <div class="equivalence-theme">${eq.theme}</div>
              <div class="equivalence-concepts">
                ${eq.concepts.map(c => `
                  <div class="equivalence-chip">
                    <span class="equivalence-fw">${c.fw}</span>
                    <span class="equivalence-term">${c.term}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    render();
  }

  // ── RESOURCES ──
  function renderResources(container) {
    const resources = D().resources;
    if (!resources) return;
    let activeIdx = 0;
    const allTrainings = window.PsycheData?.trainings || [];

    function findRelatedTrainings(topic) {
      const q = topic.toLowerCase();
      return allTrainings
        .filter(t => {
          const hay = `${t.title} ${t.philosophy} ${t.overview}`.toLowerCase();
          return hay.includes(q.split(' ')[0]) || hay.includes(q.split(' & ')[0]);
        })
        .slice(0, 3);
    }

    function render() {
      const topics = resources.byTopic;
      const active = topics[activeIdx];
      const relatedTrainings = findRelatedTrainings(active.topic);
      const papers = active.papers || [];
      const media = active.media || [];
      const courses = active.courses || [];
      container.innerHTML = `
        <div class="view-header">
          <h1>Living Library</h1>
          <p>Expanded curation of books, papers, practices, thinkers, and related trainings to turn study into lived transformation.</p>
        </div>
        <div class="view-tabs">${topics.map((t, i) => `
          <button class="view-tab ${i === activeIdx ? 'active':''}" data-idx="${i}">${t.topic}</button>
        `).join('')}</div>
        <div class="fade-in" style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
          <div class="card" style="cursor:default">
            <div class="card-subtitle" style="margin-bottom:12px">📚 Key Texts</div>
            ${active.books.map(b => `<div class="sb-resource"><span class="sb-resource-title">${b}</span></div>`).join('')}
            ${papers.length ? `
              <div class="card-subtitle" style="margin:18px 0 12px;">🧪 Papers & Essays</div>
              ${papers.map(p => `<div class="sb-resource"><span class="sb-resource-title">${p}</span></div>`).join('')}
            ` : ''}
          </div>
          <div class="card" style="cursor:default">
            <div class="card-subtitle" style="margin-bottom:12px">🧘 Practices</div>
            ${active.practices.map(p => `<div class="sb-tag" style="margin-bottom:4px">${p}</div>`).join('')}
            <div class="card-subtitle" style="margin-top:16px;margin-bottom:8px">🧠 Key Thinkers</div>
            ${active.thinkers.map(t => `<div class="sb-tag" style="background:rgba(76,140,212,0.06);border-color:rgba(76,140,212,0.2);color:var(--accent-blue)">${t}</div>`).join('')}
            ${media.length ? `
              <div class="card-subtitle" style="margin-top:16px;margin-bottom:8px">🎧 Media</div>
              ${media.map(m => `<div class="sb-tag" style="background:rgba(154,76,212,0.08);border-color:rgba(154,76,212,0.24);color:var(--accent-purple)">${m}</div>`).join('')}
            ` : ''}
            ${courses.length ? `
              <div class="card-subtitle" style="margin-top:16px;margin-bottom:8px">🧭 Courses & Programs</div>
              ${courses.map(c => `<div class="sb-tag" style="background:rgba(76,212,154,0.08);border-color:rgba(76,212,154,0.24);color:var(--accent-green)">${c}</div>`).join('')}
            ` : ''}
          </div>
        </div>
        ${relatedTrainings.length ? `
          <div class="card fade-in" style="cursor:default;margin-top:20px;">
            <div class="card-subtitle" style="margin-bottom:12px">⚗ Related Trainings</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${relatedTrainings.map(t => `<button class="view-tab go-training" data-training-id="${t.id}" style="font-size:0.76rem;">${t.icon} ${t.title}</button>`).join('')}
            </div>
          </div>
        ` : ''}
        <div class="card fade-in" style="cursor:default;margin-top:20px;">
          <div class="card-subtitle" style="margin-bottom:10px">Integration Prompt</div>
          <div class="card-text">Pick one text, one practice, and one training from this topic. Commit to a 7-day micro-immersion and track what changes in mood, behavior, and worldview.</div>
        </div>`;
      container.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => { activeIdx = parseInt(tab.dataset.idx); render(); });
      });
      container.querySelectorAll('.go-training').forEach(btn => {
        btn.addEventListener('click', () => {
          const trainingId = btn.dataset.trainingId;
          window.PsycheApp.goToView('trainings');
          setTimeout(() => window.PsycheApp?.ViewsTrainings?.beginTraining(trainingId), 100);
        });
      });
    }
    render();
  }

  function renderHerosPath(container) {
    const allFw = window.PsycheApp.allFrameworks || [];
    const fwById = new Map(allFw.map(fw => [fw.id, fw]));
    const defaultMilestones = [
      { id: 'call', phase: 'The Call to Adventure', age: 'Adolescence', ageBand: '12-18', tradition: 'Rite of passage' },
      { id: 'crossing', phase: 'Crossing the Threshold', age: 'Young Adult', ageBand: '18-28', tradition: 'Initiation into duty' },
      { id: 'ordeal', phase: 'The Ordeal', age: 'Maturity Crisis', ageBand: '29-45', tradition: 'Dark night / trial by fire' },
      { id: 'boon', phase: 'The Boon', age: 'Elder Formation', ageBand: '46-60', tradition: 'Wisdom extraction' },
      { id: 'return', phase: 'The Return', age: 'Elderhood', ageBand: '60+', tradition: 'Giving back to the village' }
    ];
    const agesOfMan = [
      { tradition: 'Greek', stages: 'Childhood, Ephebic Formation, Civic Prime, Gerousia' },
      { tradition: 'Hindu Ashrama', stages: 'Brahmacharya, Grihastha, Vanaprastha, Sannyasa' },
      { tradition: 'Confucian', stages: 'Learning, Standing Firm, Understanding Mandate, Following Heart-Mind' },
      { tradition: 'Yoruba', stages: 'Akomolede, Agba, Elder-Council, Ancestor Orientation' },
      { tradition: 'Jungian-Depth', stages: 'Persona Formation, Ego Achievement, Midlife Descent, Individuation' }
    ];

    function loadState() {
      try {
        const parsed = JSON.parse(localStorage.getItem(HERO_PATH_KEY) || '{}');
        if (!Array.isArray(parsed.milestones)) parsed.milestones = defaultMilestones;
        if (!parsed.bioTitle) parsed.bioTitle = '';
        if (!parsed.bioThesis) parsed.bioThesis = '';
        return parsed;
      } catch {
        return {
          bioTitle: '',
          bioThesis: '',
          milestones: defaultMilestones
        };
      }
    }

    function saveState(state) {
      try {
        localStorage.setItem(HERO_PATH_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn('Hero Path save failed', error);
      }
    }

    function frameworkOptions(selectedId) {
      return `<option value="">Map to framework...</option>${allFw.map(fw => `<option value="${fw.id}" ${fw.id === selectedId ? 'selected' : ''}>${fw.name}</option>`).join('')}`;
    }

    function milestoneCardHtml(m, idx) {
      const mapped = m.frameworkId ? fwById.get(m.frameworkId) : null;
      const mappedText = mapped ? `<span class="hp-chip mapped">${mapped.name}</span>` : `<span class="hp-chip">Unmapped</span>`;
      return `
        <div class="hp-milestone-card">
          <div class="hp-milestone-head">
            <div>
              <div class="hp-step-index">Milestone ${idx + 1}</div>
              <div class="hp-phase">${m.phase || 'Untitled Phase'}</div>
            </div>
            <div class="hp-badges">
              <span class="hp-chip">${m.age || 'Life Stage'}</span>
              <span class="hp-chip">${m.ageBand || 'Age Band'}</span>
              ${mappedText}
            </div>
          </div>
          <div class="hp-grid">
            <label>Life Event
              <input type="text" class="hp-input hp-event" data-id="${m.id}" value="${escapeHtml(m.event || '')}" placeholder="What happened here?" />
            </label>
            <label>Meaning / Narrative
              <textarea class="hp-textarea hp-meaning" data-id="${m.id}" placeholder="How did this chapter shape your identity?">${escapeHtml(m.meaning || '')}</textarea>
            </label>
            <label>Mythic Theme
              <input type="text" class="hp-input hp-theme" data-id="${m.id}" value="${escapeHtml(m.theme || '')}" placeholder="e.g., exile, sacrifice, initiation" />
            </label>
            <label>Framework Correlation
              <select class="hp-select hp-framework" data-id="${m.id}">
                ${frameworkOptions(m.frameworkId || '')}
              </select>
            </label>
          </div>
          <div class="hp-actions">
            <button class="view-tab hp-jump-map" data-framework="${m.frameworkId || ''}" ${m.frameworkId ? '' : 'disabled'}>Open on 3D Map</button>
            <span class="hp-tradition">Ages of Man lens: ${m.tradition}</span>
          </div>
        </div>
      `;
    }

    function render() {
      const state = loadState();
      const completeness = state.milestones.reduce((acc, m) => acc + (m.event && m.meaning ? 1 : 0), 0);
      const progressPercent = Math.round((completeness / state.milestones.length) * 100);

      container.innerHTML = `
        <div class="view-header">
          <h1>The Hero's Path — Chronos View</h1>
          <p>A narrative-therapy timeline mapped onto the psyche sphere. Plot your biography as mythic progression and correlate each chapter with philosophical frameworks.</p>
        </div>

        <div class="hp-hero card">
          <div class="hp-hero-left">
            <h3>Temporal Spiral</h3>
            <p>The spiral represents recursive growth: themes return, but at higher fidelity. Anchor your life chapters below and map them to the psyche framework where they resonate most.</p>
          </div>
          <div class="hp-progress">
            <div class="hp-progress-value">${progressPercent}%</div>
            <div class="hp-progress-label">Narrative mapped</div>
            <div class="hp-progress-bar"><span style="width:${progressPercent}%"></span></div>
          </div>
        </div>

        <div class="hp-biography card">
          <div class="card-subtitle">Biography Anchor</div>
          <label>Current Chapter Title
            <input id="hp-bio-title" class="hp-input" type="text" value="${escapeHtml(state.bioTitle)}" placeholder="e.g., Rebuilding After Collapse" />
          </label>
          <label>Narrative Thesis
            <textarea id="hp-bio-thesis" class="hp-textarea" placeholder="What story are you currently living, and what does it demand from you next?">${escapeHtml(state.bioThesis)}</textarea>
          </label>
        </div>

        <div class="hp-spiral card">
          <div class="card-subtitle">Chronos Spiral Milestones</div>
          <div class="hp-spiral-track">
            ${state.milestones.map((m, idx) => milestoneCardHtml(m, idx)).join('')}
          </div>
        </div>

        <div class="hp-ages card">
          <div class="card-subtitle">Ages of Man — Cross-Tradition Correlation</div>
          <div class="hp-ages-grid">
            ${agesOfMan.map(row => `
              <div class="hp-age-row">
                <div class="hp-age-tradition">${row.tradition}</div>
                <div class="hp-age-stages">${row.stages}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const update = () => {
        const next = loadState();
        const titleEl = document.getElementById('hp-bio-title');
        const thesisEl = document.getElementById('hp-bio-thesis');
        next.bioTitle = titleEl?.value || '';
        next.bioThesis = thesisEl?.value || '';
        container.querySelectorAll('.hp-event').forEach(el => {
          const id = el.dataset.id;
          const target = next.milestones.find(m => m.id === id);
          if (target) target.event = el.value || '';
        });
        container.querySelectorAll('.hp-meaning').forEach(el => {
          const id = el.dataset.id;
          const target = next.milestones.find(m => m.id === id);
          if (target) target.meaning = el.value || '';
        });
        container.querySelectorAll('.hp-theme').forEach(el => {
          const id = el.dataset.id;
          const target = next.milestones.find(m => m.id === id);
          if (target) target.theme = el.value || '';
        });
        container.querySelectorAll('.hp-framework').forEach(el => {
          const id = el.dataset.id;
          const target = next.milestones.find(m => m.id === id);
          if (target) target.frameworkId = el.value || '';
        });
        saveState(next);
      };

      container.querySelectorAll('#hp-bio-title, #hp-bio-thesis, .hp-event, .hp-meaning, .hp-theme, .hp-framework').forEach(el => {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
      });

      container.querySelectorAll('.hp-jump-map').forEach(btn => {
        btn.addEventListener('click', () => {
          const frameworkId = btn.dataset.framework;
          if (!frameworkId) return;
          window.PsycheApp.goToView('map');
          setTimeout(() => window.PsycheApp.setFrameworkById(frameworkId, 0, false), 140);
        });
      });
    }

    render();
  }

  function renderAlchemicalLab(container) {
    const allFw = window.PsycheApp.allFrameworks || [];
    const shadowResult = loadShadowResult();
    const dominantFramework = shadowResult?.dominant?.frameworkId || '';
    const stages = [
      { id: 'nigredo', title: 'Nigredo — Blackening', icon: '⚫', prompt: 'Confront the pattern honestly. What repetitive shadow behavior is active now?', help: 'Name the loop, trigger, and cost without spiritual bypassing.' },
      { id: 'albedo', title: 'Albedo — Whitening', icon: '⚪', prompt: 'Extract the gift. What protected intelligence is hidden inside this shadow?', help: 'Translate defense into virtue-in-potential (boundary, drive, precision, courage).' },
      { id: 'rubedo', title: 'Rubedo — Reddening', icon: '🔴', prompt: 'Embody integration. What daily action proves this trait is now conscious?', help: 'Commit to measurable behavior in relationship, work, or discipline.' }
    ];

    function loadState() {
      try {
        const parsed = JSON.parse(localStorage.getItem(ALCHEMY_KEY) || '{}');
        parsed.entries = parsed.entries || {};
        parsed.progress = parsed.progress || { nigredo: false, albedo: false, rubedo: false };
        parsed.frameworkId = parsed.frameworkId || dominantFramework;
        parsed.leadScore = typeof parsed.leadScore === 'number' ? parsed.leadScore : 72;
        parsed.goldScore = typeof parsed.goldScore === 'number' ? parsed.goldScore : 28;
        return parsed;
      } catch {
        return {
          frameworkId: dominantFramework,
          leadScore: 72,
          goldScore: 28,
          entries: {},
          progress: { nigredo: false, albedo: false, rubedo: false }
        };
      }
    }

    function saveState(state) {
      try {
        localStorage.setItem(ALCHEMY_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn('Alchemy save failed', error);
      }
    }

    function frameworkSelect(selectedId) {
      return `<option value="">Link a framework...</option>${allFw.map(fw => `<option value="${fw.id}" ${fw.id === selectedId ? 'selected' : ''}>${fw.name}</option>`).join('')}`;
    }

    function render() {
      const state = loadState();
      const completionCount = stages.reduce((acc, s) => acc + (state.progress[s.id] ? 1 : 0), 0);
      const transmutation = Math.round((completionCount / stages.length) * 100);

      container.innerHTML = `
        <div class="view-header">
          <h1>The Alchemical Lab</h1>
          <p>A hermetic integration workflow for turning Shadow Scanner insight into embodied transformation from lead to gold.</p>
        </div>

        <div class="alchemy-hero card">
          <div class="alchemy-title-wrap">
            <div class="alchemy-glyph">⚗</div>
            <div>
              <h3>Lead → Gold Integration Engine</h3>
              <p class="card-text">Track your transmutation cycle through Nigredo, Albedo, and Rubedo. Each stage stores your entries locally and builds measurable integration momentum.</p>
            </div>
          </div>
          <div class="alchemy-meter">
            <div class="alchemy-meter-label">Transmutation</div>
            <div class="alchemy-meter-value">${transmutation}%</div>
            <div class="alchemy-meter-bar"><span style="width:${transmutation}%"></span></div>
          </div>
        </div>

        <div class="alchemy-metrics card">
          <div class="alchemy-score lead">
            <div class="alchemy-score-num">${state.leadScore}</div>
            <div class="alchemy-score-label">Lead (Unconscious Habit)</div>
          </div>
          <div class="alchemy-score gold">
            <div class="alchemy-score-num">${state.goldScore}</div>
            <div class="alchemy-score-label">Gold (Integrated Awareness)</div>
          </div>
          <div class="alchemy-controls">
            <button class="view-tab alchemy-shift" data-shift="minus">Mark Regression</button>
            <button class="view-tab alchemy-shift" data-shift="plus">Mark Embodied Win</button>
          </div>
        </div>

        <div class="alchemy-link card">
          <div class="card-subtitle">Framework Correlation</div>
          <label>Primary active framework
            <select id="alchemy-framework" class="hp-select">${frameworkSelect(state.frameworkId)}</select>
          </label>
          <div class="alchemy-link-actions">
            <button id="alchemy-open-map" class="view-tab" ${state.frameworkId ? '' : 'disabled'}>Open Correlated Framework on Map</button>
            ${shadowResult ? `<span class="alchemy-shadow-hint">Scanner resonance: ${shadowResult.dominant.frameworkName} (Layer ${shadowResult.dominant.layerIndex + 1})</span>` : '<span class="alchemy-shadow-hint">Run Shadow Scanner to auto-seed this section.</span>'}
          </div>
        </div>

        <div class="alchemy-stages">
          ${stages.map(stage => `
            <div class="alchemy-stage card ${state.progress[stage.id] ? 'done' : ''}">
              <div class="alchemy-stage-head">
                <div class="alchemy-stage-title">${stage.icon} ${stage.title}</div>
                <label class="alchemy-check">
                  <input type="checkbox" class="alchemy-complete" data-stage="${stage.id}" ${state.progress[stage.id] ? 'checked' : ''} />
                  Complete
                </label>
              </div>
              <p class="alchemy-stage-prompt">${stage.prompt}</p>
              <p class="alchemy-stage-help">${stage.help}</p>
              <textarea class="alchemy-notes" data-stage="${stage.id}" placeholder="Write your stage work...">${escapeHtml(state.entries[stage.id] || '')}</textarea>
            </div>
          `).join('')}
        </div>
      `;

      const persist = () => {
        const next = loadState();
        const fwEl = document.getElementById('alchemy-framework');
        next.frameworkId = fwEl?.value || '';
        container.querySelectorAll('.alchemy-notes').forEach(el => {
          next.entries[el.dataset.stage] = el.value || '';
        });
        container.querySelectorAll('.alchemy-complete').forEach(el => {
          next.progress[el.dataset.stage] = !!el.checked;
        });
        saveState(next);
      };

      container.querySelectorAll('.alchemy-notes, .alchemy-complete, #alchemy-framework').forEach(el => {
        el.addEventListener('input', persist);
        el.addEventListener('change', persist);
      });

      container.querySelectorAll('.alchemy-shift').forEach(btn => {
        btn.addEventListener('click', () => {
          const next = loadState();
          const plus = btn.dataset.shift === 'plus';
          if (plus) {
            next.goldScore = Math.min(100, next.goldScore + 6);
            next.leadScore = Math.max(0, next.leadScore - 6);
          } else {
            next.goldScore = Math.max(0, next.goldScore - 5);
            next.leadScore = Math.min(100, next.leadScore + 5);
          }
          saveState(next);
          render();
        });
      });

      document.getElementById('alchemy-open-map')?.addEventListener('click', () => {
        const state = loadState();
        if (!state.frameworkId) return;
        window.PsycheApp.goToView('map');
        setTimeout(() => window.PsycheApp.setFrameworkById(state.frameworkId, 0, false), 140);
      });
    }

    render();
  }

  function loadShadowResult() {
    try {
      const parsed = JSON.parse(localStorage.getItem('psyche_shadow_scan_result') || 'null');
      if (!parsed || !parsed.dominant) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return { renderTraumaCartography, renderDarkNight, renderRelationships, renderCulturalComparison, renderResources, renderHerosPath, renderAlchemicalLab };
})();
