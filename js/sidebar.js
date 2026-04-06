// ============================================================
// SIDEBAR — Floating detail panel for selected psyche nodes
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Sidebar = (function() {
  let sidebarEl, titleEl, subtitleEl, contentEl, closeBtn;
  let isOpen = false;
  let contentClickHandler = null;

  function init() {
    sidebarEl = document.getElementById('sidebar');
    titleEl = document.getElementById('sidebar-title');
    subtitleEl = document.getElementById('sidebar-subtitle');
    contentEl = document.getElementById('sidebar-content');
    closeBtn = document.getElementById('sidebar-close');
    closeBtn.addEventListener('click', hide);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  }

  function show(data) {
    if (!data) return;
    titleEl.textContent = data.name || '';
    subtitleEl.textContent = data.subtitle || data.framework || '';
    const accent = typeof data.color === 'string' ? data.color : 'var(--gold)';
    sidebarEl.style.setProperty('--node-accent', accent);
    contentEl.innerHTML = buildContent(data);
    sidebarEl.classList.remove('hidden');
    isOpen = true;
    if (!contentClickHandler) {
      contentClickHandler = (e) => {
        const sectionHeader = e.target.closest('.sb-section-header');
        if (sectionHeader) {
          sectionHeader.classList.toggle('open');
          sectionHeader.nextElementSibling?.classList.toggle('open');
          return;
        }
        const crossRef = e.target.closest('.sb-crossref');
        if (crossRef) {
          const fw = crossRef.dataset.fw;
          const layerIdx = Number(crossRef.dataset.layer);
          if (!fw || Number.isNaN(layerIdx)) return;
          window.PsycheApp?.setFrameworkById?.(fw, layerIdx, false);
          return;
        }
        const trainingLink = e.target.closest('.sb-training-link');
        if (trainingLink) {
          const trainingId = trainingLink.dataset.trainingId;
          if (!trainingId) return;
          window.PsycheApp?.goToView?.('trainings');
          setTimeout(() => window.PsycheApp?.ViewsTrainings?.beginTraining(trainingId), 100);
        }
      };
      contentEl.addEventListener('click', contentClickHandler);
    }
    // Auto-open first two sections
    const headers = contentEl.querySelectorAll('.sb-section-header');
    headers.forEach((h, i) => {
      if (i < 2) { h.classList.add('open'); h.nextElementSibling?.classList.add('open'); }
    });
  }

  function hide() {
    sidebarEl.classList.add('hidden');
    isOpen = false;
    if (window.PsycheApp.onSidebarClose) window.PsycheApp.onSidebarClose();
  }

  function buildContent(data) {
    let html = '';
    const lead = data.description || data.pathology || data.shadow || data.history || '';
    if (lead) {
      html += `
        <div class="sb-intro-card">
          <div class="sb-intro-kicker">Essence</div>
          <p>${esc(lead)}</p>
        </div>
      `;
    }
    
    // Core Data
    if (data.pathology) html += section('What Goes Wrong', `<p>${esc(data.pathology)}</p>`, '⚠');
    if (data.shadow) html += section('Shadow Aspect', `<p>${esc(data.shadow)}</p>`, '◒');
    if (data.history) html += section('Historical Context', `<p>${esc(data.history)}</p>`, '⌛');
    if (data.philosophy) html += section('Philosophical Connections', `<p>${esc(data.philosophy)}</p>`, '◈');
    if (data.psychology) html += section('Modern Psychology', `<p>${esc(data.psychology)}</p>`, '🧠');

    // == PHASE 8 DEEP DIVE EXPANDED CARDS ==
    const hasDeepDive = data.neurology || data.archetype || data.trauma || data.development || data.culturalLens;
    if (hasDeepDive) {
      let dd = '<div class="deep-dive-grid">';
      if (data.neurology) dd += `<div class="dd-card"><div class="dd-icon">🧠</div><div class="dd-title">Neurology & Hardware</div><div class="dd-text">${esc(data.neurology)}</div></div>`;
      if (data.archetype) dd += `<div class="dd-card"><div class="dd-icon">🎭</div><div class="dd-title">Archetypal & Mythic</div><div class="dd-text">${esc(data.archetype)}</div></div>`;
      if (data.trauma) dd += `<div class="dd-card"><div class="dd-icon">⚡</div><div class="dd-title">Trauma & Healing</div><div class="dd-text">${esc(data.trauma)}</div></div>`;
      if (data.development) dd += `<div class="dd-card"><div class="dd-icon">🌱</div><div class="dd-title">Developmental</div><div class="dd-text">${esc(data.development)}</div></div>`;
      if (data.culturalLens) dd += `<div class="dd-card"><div class="dd-icon">👁️</div><div class="dd-title">Cultural Lens</div><div class="dd-text">${esc(data.culturalLens)}</div></div>`;
      dd += '</div>';
      html += section('Deep Dive Analysis', dd, '✦');
    }

    // Lists & Tags
    if (data.practices && data.practices.length) {
      html += section('Practices', data.practices.map(p => `<div class="sb-tag">${esc(p)}</div>`).join(''), '☽');
    }
    if (data.reflections && data.reflections.length) {
      html += section('Reflect', data.reflections.map(q => `<div class="sb-question">${esc(q)}</div>`).join(''), '✍');
    }
    if (data.resources && data.resources.length) {
      html += section('Resources', data.resources.map(r =>
        `<div class="sb-resource"><span class="sb-resource-title">${esc(typeof r === 'string' ? r : r.title)}</span></div>`
      ).join(''), '⊡');
    }
    
    // Cross-framework connections
    if (data.crossRefs && data.crossRefs.length) {
      html += section('Universal Resonance', data.crossRefs.map(cr =>
        `<div class="sb-crossref" data-fw="${cr.frameworkId}" data-layer="${cr.layerIdx}"><strong>${esc(cr.frameworkName)}:</strong> ${esc(cr.layerName)}</div>`
      ).join(''), '↔');
    }

    const relatedTrainings = window.PsycheApp?.getTrainingsForFramework?.(data.frameworkId) || [];
    if (relatedTrainings.length) {
      html += section(
        'Related Trainings',
        relatedTrainings.map(t => `<button class="sb-training-link" data-training-id="${t.id}">${esc(t.icon)} ${esc(t.title)}</button>`).join(''),
        '⚗'
      );
    }
    return html;
  }

  function section(title, body, icon = '') {
    return `<div class="sb-section"><div class="sb-section-header"><span class="sb-section-icon">${icon}</span>${esc(title)}</div><div class="sb-section-body">${body}</div></div>`;
  }

  function esc(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  return { init, show, hide, get isOpen() { return isOpen; } };
})();
