// ============================================================
// APP CONTROLLER — Navigation, keyboard, theme, initialization
// ============================================================
(function() {
  const App = window.PsycheApp = window.PsycheApp || {};
  const D = window.PsycheData || {};
  const trainingFrameworkMap = {
    hermeticism: ['esoteric', 'alchemy', 'egyptian'],
    daoism: ['daoist'],
    individuation: ['jungian', 'ifs'],
    buddhist: ['buddhist'],
    chakra: ['chakra', 'vedantic'],
    egyptian: ['egyptian'],
    gnostic: ['gnostic'],
    kabbalah: ['kabbalah'],
    alchemy: ['alchemy', 'esoteric'],
    ifs: ['ifs', 'jungian'],
    sufi: ['sufi'],
    frankl: ['frankl', 'erikson'],
    spiral: ['spiral', 'integral']
  };

  // Combine all frameworks
  App.allFrameworks = [
    ...(D.frameworksWestern || []),
    ...(D.frameworksEastern || []),
    ...(D.frameworksIndigenous || []),
    ...(D.frameworksEsoteric || []),
    ...(D.frameworksModern || []),
    ...(D.frameworksSpiritual || [])
  ];

  App.currentFramework = App.allFrameworks[0];
  let currentView = 'map';
  let currentTradition = 'all';
  let mapMode = '3d'; // '3d' or '2d'
  let viewPageIndex = 0;
  const VIEW_PAGE_COUNT = 2;

  // ── VIEWS CONFIG ──
  const views = [
    { id: 'home', label: 'Home', icon: 'Ψ', group: 'core' },
    { id: 'map', label: 'Map', icon: '◉', group: 'core' },
    { id: '_sep1', sep: true },
    { id: 'ego', label: 'Ego', icon: 'ψ', group: 'explore' },
    { id: 'therapy', label: 'Therapy', icon: '⚕', group: 'explore' },
    { id: 'darknight', label: 'Dark Night', icon: '☾', group: 'explore' },
    { id: 'development', label: 'Growth', icon: '↑', group: 'explore' },
    { id: 'scanner', label: 'Scanner', icon: '◖', group: 'explore' },
    { id: 'archetypes', label: 'Archetypes', icon: '☿', group: 'explore' },
    { id: '_sep2', sep: true },
    { id: 'figures', label: 'Figures', icon: '♰', group: 'more' },
    { id: 'cases', label: 'Cases', icon: '◈', group: 'more' },
    { id: 'disagree', label: 'Tensions', icon: '⚡', group: 'more' },
    { id: 'relationships', label: 'Relations', icon: '∞', group: 'more' },
    { id: 'meditation', label: 'Practice', icon: '◯', group: 'more' },
    { id: 'trainings', label: 'Trainings', icon: '⚗', group: 'more' },
    { id: 'chronos', label: 'Chronos', icon: '🌀', group: 'more' },
    { id: 'alchemy', label: 'Alchemy Lab', icon: '⚗', group: 'more' },
    { id: 'personal', label: 'My Map', icon: '◎', group: 'you' },
    { id: 'quiz', label: 'Find Path', icon: '⟐', group: 'you' },
    { id: 'resources', label: 'Library', icon: '⊡', group: 'you' },
  ];
  const navigableViews = views.filter(v => !v.sep);

  // ── INIT ──
  function init() {
    // Production: console.log removed for performance
    
    if (!App.allFrameworks || App.allFrameworks.length === 0) {
      console.error("PSYCHE: No frameworks loaded");
      const errorMsg = document.createElement('div');
      errorMsg.style = "position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(20,0,0,0.95); color:#ff4d4d; z-index:9999; font-family:monospace; padding:40px; text-align:center;";
      errorMsg.innerHTML = "<h1>Data Load Error</h1><p>No frameworks found. Please ensure the 'data/' folder is correctly uploaded to your server.</p>";
      document.body.appendChild(errorMsg);
      return;
    }

    App.Sidebar.init();
    App.Sphere3D.init();
    App.View2D?.init();
    App.Sound?.init();
    App.Search?.init();

    buildFrameworkTabs();
    buildViewTabs();
    bindMapQuickTools();
    bindTraditionFilter();
    bindMapModeToggle();
    bindUtilityButtons();
    bindKeyboard();
    bindLogoClick();
    bindPhase8Expansions();
    loadTheme();

    setFramework(App.allFrameworks[0]);
    setView('home');

    setTimeout(() => {
      const ls = document.getElementById('loading-screen');
      if (ls) { ls.classList.add('done'); setTimeout(() => ls.remove(), 1000); }
    }, 2200);
  }

  // ── GLOBAL TOAST ──
  App.showToast = function(message, duration = 2800) {
    let container = document.getElementById('global-toast');
    if (!container) {
      container = document.createElement('div');
      container.id = 'global-toast';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  };

  // ── PUBLIC API (for search/other modules) ──
  App.setFrameworkById = function(id, targetLayerIdx = null, noSwitch = false) {
    const fw = App.allFrameworks.find(f => f.id === id);
    if (fw) {
      setFramework(fw);
      if (targetLayerIdx !== null) {
        // Delay slightly for 3D map to prep
        setTimeout(() => App.selectLayer(targetLayerIdx, noSwitch), 100);
      }
    }
  };
  App.selectLayer = function(idx, noSwitch = false) {
    // 3D sync should happen regardless of noSwitch
    if (App.Sphere3D && App.Sphere3D.selectNodeByIndex) {
      App.Sphere3D.selectNodeByIndex(idx);
    }
    // Only redirect if explicitly allowed
    if (noSwitch === false && currentView !== 'map') {
      setView('map');
    }
  };
  App.goToView = function(id) { setView(id); };
  App.getFrameworksForTraining = function(trainingId) {
    const ids = trainingFrameworkMap[trainingId] || [];
    return ids.map(id => App.allFrameworks.find(f => f.id === id)).filter(Boolean);
  };
  App.getTrainingsForFramework = function(frameworkId) {
    const trainings = D.trainings || [];
    return trainings.filter(t => (trainingFrameworkMap[t.id] || []).includes(frameworkId));
  };
  App.openTraining = function(trainingId) {
    if (!trainingId) return;
    setView('trainings');
    requestAnimationFrame(() => {
      window.PsycheApp?.ViewsTrainings?.beginTraining(trainingId);
    });
  };

  // ── FRAMEWORK TABS ──
  function buildFrameworkTabs() {
    const c = document.getElementById('framework-tabs');
    if (!c) return;
    renderFrameworkTabs(c, App.allFrameworks);
  }
  function renderFrameworkTabs(container, frameworks) {
    const year = App.currentYear || 2026;
    const visible = frameworks.filter(f => (f.year || 0) <= year);
    
    container.innerHTML = visible.map(fw =>
      `<button class="fw-tab ${fw.id === App.currentFramework?.id ? 'active':''}" data-id="${fw.id}" title="${fw.fullName}">${fw.name}</button>`
    ).join('');
    container.querySelectorAll('.fw-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const fw = App.allFrameworks.find(f => f.id === tab.dataset.id);
        if (fw) setFramework(fw);
      });
    });
  }
  function setFramework(fw) {
    if (!fw) return;
    const prev = App.currentFramework;
    App.currentFramework = fw;
    
    // Safety check for ID
    const fwId = fw.id || '';
    document.querySelectorAll('.fw-tab').forEach(t => t.classList.toggle('active', t.dataset.id === fwId));
    
    // ALWAYS sync 3D map in background if available
    if (App.Sphere3D && App.Sphere3D.setFramework) {
      App.Sphere3D.setFramework(fw);
    }

    if (currentView === 'map' && mapMode !== '3d') {
      App.View2D?.setFramework(fw);
    }
    if (prev?.id !== fwId && fwId) App.Sound?.playTransition();
  }

  // ── TRADITION FILTER ──
  function bindTraditionFilter() {
    document.querySelectorAll('#tradition-filter .trad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTradition = btn.dataset.tradition;
        document.querySelectorAll('#tradition-filter .trad-btn').forEach(b => b.classList.toggle('active', b === btn));
        const filtered = currentTradition === 'all' ? App.allFrameworks : App.allFrameworks.filter(f => f.tradition === currentTradition);
        renderFrameworkTabs(document.getElementById('framework-tabs'), filtered);
        if (!filtered.find(f => f.id === App.currentFramework?.id) && filtered.length) setFramework(filtered[0]);
        App.Sound?.playUIClick();
      });
    });
  }

  // ── PHASE 8 EXPANSIONS ──
  function bindPhase8Expansions() {
    const atmoSelect = document.getElementById('atmosphere-select');
    if (atmoSelect) {
      atmoSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (App.Sphere3D && App.Sphere3D.setAtmosphere) {
          App.Sphere3D.setAtmosphere(val);
        }
        if (window.PsycheApp.Sound) {
          window.PsycheApp.Sound.updateAmbientAtmo(val);
        }
      });
    }

    const slider = document.getElementById('timeline-slider');
    const label = document.getElementById('timeline-current');
    const eraInd = document.getElementById('timeline-era-indicator');

    // Auto-generate evenly spaced epochs based on loaded frameworks
    const tempEpochs = [...new Set(App.allFrameworks.map(f => f.year || 2026))].sort((a,b) => a - b);
    if (!tempEpochs.includes(2026)) tempEpochs.push(2026);
    App.timelineEpochs = tempEpochs;
    App.currentYear = 2026;

    if (slider) {
      slider.disabled = false;
      slider.min = 0;
      slider.max = tempEpochs.length - 1;
      slider.value = tempEpochs.length - 1;
      
      updateTimelineHistogram();

      slider.addEventListener('input', (e) => {
        const valIdx = parseInt(e.target.value);
        const year = App.timelineEpochs[valIdx];
        App.currentYear = year; // Sync global state
        
        if (label) {
          if (year === 2026) label.textContent = "Present (2026 CE)";
          else label.textContent = year < 0 ? Math.abs(year).toLocaleString() + " BCE" : year.toLocaleString() + " CE";
        }

        updateEraIndicator(year, slider);
        
        // Rise of Frameworks: Sync Navigation UI
        const filtered = currentTradition === 'all' ? App.allFrameworks : App.allFrameworks.filter(f => f.tradition === currentTradition);
        renderFrameworkTabs(document.getElementById('framework-tabs'), filtered);

        // Sync 3D Map Visual Evolution
        if (currentView === 'map' && mapMode === '3d' && App.Sphere3D.updateYearVisibility) {
          App.Sphere3D.updateYearVisibility(year);
        }
      });
      // Init
      updateEraIndicator(tempEpochs[tempEpochs.length-1], slider);
    }
  }

  function updateTimelineHistogram() {
    const container = document.getElementById('timeline-epoch-map');
    if (!container) return;
    
    // We want to show density where 'spikes' happen
    const bins = 40; 
    const years = App.allFrameworks.map(f => f.year || 2026);
    const min = Math.min(...years), max = 2026;
    const range = max - min;
    const histogram = new Array(bins).fill(0);
    
    years.forEach(y => {
      const pos = (y - min) / (range || 1);
      const binIdx = Math.min(bins - 1, Math.floor(pos * bins));
      histogram[binIdx]++;
    });
    
    const maxVal = Math.max(...histogram) || 1;
    let svg = `<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 ${bins} 20" style="display:block">`;
    svg += `<path d="M 0 20 `;
    histogram.forEach((val, i) => {
      const h = (val / maxVal) * 16;
      svg += `L ${i} ${20 - h} L ${i+1} ${20 - h} `;
    });
    svg += `L ${bins} 20 Z" fill="rgba(201, 168, 76, 0.4)" />`;
    svg += `</svg>`;
    container.innerHTML = svg;
  }

  function updateEraIndicator(year, slider) {
    const ind = document.getElementById('timeline-era-indicator');
    if (!ind || !slider) return;
    
    let label = "ANCIENT WISDOM";
    if (year > 1950) label = "MODERN NEUROLOGY";
    else if (year > 1850) label = "PSYCHOANALYSIS ERA";
    else if (year > 1700) label = "ENLIGHTENMENT";
    else if (year > 1400) label = "RENAISSANCE HUMANISM";
    else if (year > 500) label = "MEDIEVAL SCHOLASTICISM";
    else if (year > -400) label = "CLASSICAL PHILOSOPHY";
    else if (year > -3000) label = "BRONZE AGE MYSTICISM";
    else label = "PREHISTORIC ORIGINS";
    
    ind.textContent = label;
    const percent = slider.value / (slider.max || 1);
    ind.style.left = `calc(${percent * 100}% )`;
  }

  // ── MAP MODE (2D/3D) ──
  function bindMapModeToggle() {
    document.querySelectorAll('#map-mode-toggle .mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setMapMode(btn.dataset.mode);
        App.Sound?.playUIClick();
      });
    });
  }

  function bindMapQuickTools() {
    document.querySelectorAll('#map-quick-tools .map-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.mapView;
        if (!targetView) return;
        setView(targetView);
        App.Sound?.playUIClick();
      });
    });
  }
  function setMapMode(mode) {
    mapMode = mode;
    document.querySelectorAll('#map-mode-toggle .mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    const canvas3d = document.getElementById('three-canvas');
    const canvas2d = document.getElementById('canvas-2d');
    if (mode === '3d') {
      canvas3d.style.display = 'block';
      canvas2d.style.display = 'none';
      App.View2D?.hide();
      App.Sphere3D.setFramework(App.currentFramework);
    } else {
      canvas3d.style.display = 'none';
      canvas2d.style.display = 'block';
      App.View2D?.show();
      App.View2D?.setFramework(App.currentFramework);
    }
  }

  // ── VIEW TABS ──
  function buildViewTabs() {
    const container = document.getElementById('view-tabs');
    if (!container) return;
    const allViews = views.filter(v => !v.sep);
    const half = Math.ceil(allViews.length / 2);
    const pageSets = [allViews.slice(0, half), allViews.slice(half)];
    viewPageIndex = Math.max(0, Math.min(viewPageIndex, pageSets.length - 1));
    const inlineViews = pageSets[viewPageIndex] || allViews;
    const compactViews = new Set(['figures', 'cases', 'disagree', 'relationships', 'chronos', 'alchemy', 'personal', 'quiz', 'resources']);
    container.innerHTML = inlineViews.map(v => {
      const compactClass = compactViews.has(v.id) ? ' compact' : '';
      return `<button class="view-btn${compactClass} ${v.id === 'map' ? 'active':''}" data-view="${v.id}" title="${v.label}"><span class="view-btn-icon">${v.icon}</span><span class="view-btn-label">${v.label}</span></button>`;
    }).join('');
    container.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => { setView(btn.dataset.view); App.Sound?.playUIClick(); });
    });
    const prevBtn = document.getElementById('btn-view-page-prev');
    const nextBtn = document.getElementById('btn-view-page-next');
    if (prevBtn && nextBtn) {
      prevBtn.style.display = '';
      nextBtn.style.display = '';
      prevBtn.disabled = viewPageIndex === 0;
      nextBtn.disabled = viewPageIndex === pageSets.length - 1;
    }
  }
  
  function bindLogoClick() {
    const brand = document.querySelector('.nav-brand');
    if (brand) {
      brand.style.cursor = 'pointer';
      brand.addEventListener('click', () => {
        if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
        setView('home');
      });
    }
  }
  function setView(viewId) {
    if (currentView === viewId && viewId !== 'home') return;
    currentView = viewId;
    document.querySelectorAll('#view-tabs .view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
    const mapView = document.getElementById('map-view');
    const secView = document.getElementById('secondary-view');
    const mainNav = document.getElementById('main-nav');
    const subNav = document.getElementById('sub-nav');
    const mapQuickTools = document.getElementById('map-quick-tools');
    const traditionFilter = document.getElementById('tradition-filter');
    const frameworkTabs = document.getElementById('framework-tabs');
    const mapModeToggle = document.getElementById('map-mode-toggle');
    const subNavDividers = subNav ? Array.from(subNav.querySelectorAll('.sub-nav-divider')) : [];
    const appMain = document.getElementById('app-main');
    const mapContextViews = new Set(['map', 'lineage', 'compare']);
    const compactMapViews = new Set(['lineage', 'compare']);

    if (viewId === 'home') {
      // Full immersive home
      mapView.classList.remove('active');
      secView.classList.add('active');
      if (mainNav) mainNav.classList.add('nav-hidden');
      if (subNav) subNav.style.display = 'none';
      if (appMain) appMain.classList.add('home-active');
      App.View2D?.hide();
      secView.scrollTop = 0;
      renderSecondaryView(secView, viewId);
    } else if (viewId === 'trainings') {
      // Trainings keep top navigation visible
      mapView.classList.remove('active');
      secView.classList.add('active');
      if (mainNav) mainNav.classList.remove('nav-hidden');
      if (subNav) subNav.style.display = 'none';
      if (appMain) appMain.classList.remove('home-active');
      App.View2D?.hide();
      secView.scrollTop = 0;
      window.PsycheApp?.ViewsTrainings?.showHall?.();
      renderSecondaryView(secView, viewId);
    } else if (viewId === 'map') {
      mapView.classList.add('active');
      secView.classList.remove('active');
      if (mainNav) mainNav.classList.remove('nav-hidden');
      if (subNav) subNav.style.display = '';
      if (mapQuickTools) mapQuickTools.style.display = '';
      if (appMain) appMain.classList.remove('home-active');
      if (mapMode === '3d') App.Sphere3D.setFramework(App.currentFramework);
      else { App.View2D?.show(); App.View2D?.setFramework(App.currentFramework); }
    } else {
      mapView.classList.remove('active');
      secView.classList.add('active');
      if (mainNav) mainNav.classList.remove('nav-hidden');
      if (subNav) subNav.style.display = 'none';
      if (mapQuickTools) mapQuickTools.style.display = mapContextViews.has(viewId) ? '' : 'none';
      if (appMain) appMain.classList.remove('home-active');
      App.View2D?.hide();
      secView.scrollTop = 0;
      renderSecondaryView(secView, viewId);
    }
    if (mapQuickTools) {
      mapQuickTools.querySelectorAll('.map-quick-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mapView === viewId);
      });
    }
    const showFullMapControls = viewId === 'map';
    const showCompactMapControls = compactMapViews.has(viewId);
    if (traditionFilter) traditionFilter.style.display = showFullMapControls ? '' : 'none';
    if (frameworkTabs) frameworkTabs.style.display = showFullMapControls ? '' : 'none';
    if (mapModeToggle) mapModeToggle.style.display = showFullMapControls ? '' : 'none';
    subNavDividers.forEach(d => {
      d.style.display = (showFullMapControls || showCompactMapControls) ? '' : 'none';
    });
    App.Sidebar.hide();
  }
  function renderSecondaryView(container, viewId) {
    container.innerHTML = '';
    switch(viewId) {
      case 'home': App.ViewsHome?.render(container); break;
      case 'archetypes': App.ViewsExplore.renderArchetypes(container); break;
      case 'development': App.ViewsDevelop.renderDevelopmentalArc(container); break;
      case 'trauma': App.ViewsMap.renderTraumaCartography(container); break;
      case 'figures': App.ViewsExplore.renderHistoricalFigures(container); break;
      case 'relationships': App.ViewsMap.renderRelationships(container); break;
      case 'darknight': App.ViewsMap.renderDarkNight(container); break;
      case 'cases': App.ViewsExplore.renderCaseStudies(container); break;
      case 'disagree': App.ViewsExplore.renderDisagreements(container); break;
      case 'scanner': App.ViewsScanner?.render(container); break;
      case 'ego': App.ViewsEgo?.render(container); break;
      case 'therapy': App.ViewsTherapy?.render(container); break;
      case 'meditation': App.ViewsMeditation?.render(container); break;
      case 'trainings': App.ViewsTrainings?.render(container); break;
      case 'chronos': App.ViewsMap.renderHerosPath(container); break;
      case 'alchemy': App.ViewsMap.renderAlchemicalLab(container); break;
      case 'quiz': App.ViewsQuiz?.render(container); break;
      case 'personal': App.ViewsDevelop.renderPersonalMapping(container); break;
      case 'compare': App.ViewsMap.renderCulturalComparison(container); break;
      case 'resources': App.ViewsMap.renderResources(container); break;
      case 'lineage': App.Lineage?.render(container); break;
      default: container.innerHTML = '<p style="text-align:center;color:var(--text-dim);padding:60px">View not found.</p>';
    }
  }

  // ── UTILITY BUTTONS ──
  function bindUtilityButtons() {
    document.getElementById('btn-search')?.addEventListener('click', () => App.Search?.open());
    document.getElementById('btn-theme')?.addEventListener('click', toggleTheme);
    document.getElementById('btn-view-page-prev')?.addEventListener('click', () => {
      viewPageIndex = Math.max(0, viewPageIndex - 1);
      buildViewTabs();
    });
    document.getElementById('btn-view-page-next')?.addEventListener('click', () => {
      const maxPage = VIEW_PAGE_COUNT - 1;
      viewPageIndex = Math.min(maxPage, viewPageIndex + 1);
      buildViewTabs();
    });
    document.getElementById('btn-keyboard')?.addEventListener('click', () => {
      document.getElementById('keyboard-hints')?.classList.toggle('hidden');
    });
    document.getElementById('btn-toggle-sound')?.addEventListener('click', function() {
      const on = App.Sound?.toggle();
      this.classList.toggle('active', on);
    });
    document.getElementById('btn-export')?.addEventListener('click', () => App.Export?.exportMapView());
  }

  // ── THEME ──
  function loadTheme() {
    const saved = localStorage.getItem('psyche-theme') || 'dark';
    applyTheme(saved);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('psyche-theme', next);
    App.Sound?.playUIClick();
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sun = document.querySelector('.icon-sun');
    const moon = document.querySelector('.icon-moon');
    if (sun && moon) {
      sun.style.display = theme === 'dark' ? 'block' : 'none';
      moon.style.display = theme === 'light' ? 'block' : 'none';
    }
    // Re-apply atmosphere to pick up the new light/dark bg colors
    const atmoSelect = document.getElementById('atmosphere-select');
    if (atmoSelect && App.Sphere3D && App.Sphere3D.setAtmosphere) {
      const val = atmoSelect.value;
      App.Sphere3D.setAtmosphere(val);
      if (window.PsycheApp.Sound) {
        window.PsycheApp.Sound.updateAmbientAtmo(val);
      }
    } else {
      if (theme === 'light') {
        App.Sphere3D.setBackground?.(0xFAF8F0);
      } else {
        App.Sphere3D.setBackground?.(0x060612);
      }
    }
  }

  // ── KEYBOARD NAVIGATION ──
  function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Don't capture when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (App.Search?.isSearchOpen()) return;

      const key = e.key;
      const ctrl = e.ctrlKey || e.metaKey;

      // Ctrl+K — Search
      if (ctrl && key === 'k') { e.preventDefault(); App.Search?.open(); return; }
      // Escape — close things
      if (key === 'Escape') {
        App.Sidebar.hide();
        App.Search?.close();
        document.getElementById('keyboard-hints')?.classList.add('hidden');
        return;
      }
      // ? — keyboard hints
      if (key === '?') { document.getElementById('keyboard-hints')?.classList.toggle('hidden'); return; }
      // T — toggle theme
      if (key === 't' || key === 'T') { toggleTheme(); return; }
      // S — toggle sound
      if (key === 's' || key === 'S') {
        const on = App.Sound?.toggle();
        document.getElementById('btn-toggle-sound')?.classList.toggle('active', on);
        return;
      }
      // L — toggle labels
      // L — no longer bound (labels button removed)

      // ← → — cycle frameworks
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        e.preventDefault();
        const filtered = currentTradition === 'all' ? App.allFrameworks : App.allFrameworks.filter(f => f.tradition === currentTradition);
        const idx = filtered.findIndex(f => f.id === App.currentFramework?.id);
        const next = key === 'ArrowRight' ? (idx + 1) % filtered.length : (idx - 1 + filtered.length) % filtered.length;
        if (filtered[next]) setFramework(filtered[next]);
        return;
      }
      // ↑ ↓ — cycle views
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        const idx = navigableViews.findIndex(v => v.id === currentView);
        const next = key === 'ArrowDown' ? (idx + 1) % navigableViews.length : (idx - 1 + navigableViews.length) % navigableViews.length;
        setView(navigableViews[next].id);
        return;
      }
      // 1-9 — select layer
      if (key >= '1' && key <= '9') {
        const layerIdx = parseInt(key) - 1;
        if (App.currentFramework?.layers[layerIdx]) {
          App.selectLayer(layerIdx);
          App.Sound?.playNodeClick(layerIdx, App.currentFramework.layers.length);
        }
        return;
      }
    });
    // Global Ctrl+K capture even in inputs
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); App.Search?.open(); }
    });
  }

  // ── BOOT ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
