/**
 * ==========================================================================
 * MEBİ 11.3.1 - Ana Uygulama Mantığı (Bilgi Görseli, Kartlar ve Modallar)
 * ==========================================================================
 */

// Durum Değişkenleri
let currentEventIndex = null;
let watchedEvents = new Set();

// DOM Elemanları
let hotspotContainer;
let cardsContainer;
let videoModal;
let modalVideoPlayer;
let modalVideoSource;
let modalStepBadge;
let modalTitle;
let modalNarrationText;
let modalConnectionText;
let modalPrevBtn;
let modalNextBtn;
let modalCloseBtn;
let modalStepIndicators;
let btnResetProgress;
let viewTabInfographic;
let viewTabCards;
let sectionInfographic;
let sectionCards;
let completionModal;
let btnFinishComplete;
let btnRestartComplete;

// SCORM Tamamlama Desteği
function notifyScormCompleted() {
  if (typeof pipwerks !== 'undefined' && pipwerks.scorm) {
    pipwerks.scorm.set("cmi.core.lesson_status", "completed");
    pipwerks.scorm.save();
  }
}
window.notifyScormCompleted = notifyScormCompleted;

// Yerel Hafızadan Yükleme
function loadProgress() {
  try {
    const saved = localStorage.getItem('osmanli_11_3_1_watched');
    if (saved) {
      const parsed = JSON.parse(saved);
      watchedEvents = new Set(parsed);
    }
  } catch (e) {}
}

// Yerel Hafızaya Kaydetme
function saveProgress() {
  try {
    localStorage.setItem('osmanli_11_3_1_watched', JSON.stringify(Array.from(watchedEvents)));
  } catch (e) {}
}

// 1. Bilgi Görseli Hotspot Alanlarını İnşa Et
function renderHotspots() {
  if (!hotspotContainer) return;
  hotspotContainer.innerHTML = '';
  EVENTS.forEach((item, index) => {
    const isWatched = watchedEvents.has(item.id);
    const btn = document.createElement('button');
    btn.className = 'absolute group rounded-xl cursor-pointer flex items-center justify-center focus:outline-none bg-transparent border-0 shadow-none';
    btn.style.left = item.coords.left;
    btn.style.top = item.coords.top;
    btn.style.width = item.coords.width;
    btn.style.height = item.coords.height;
    btn.setAttribute('aria-label', `${item.stepTitle}: ${item.title}`);

    if (isWatched) {
      // İzlendikten sonra merkezde sabit kalan Osmanlı Zümrüt Onay Tiki
      btn.innerHTML = `
        <div class="pointer-events-none transition-all duration-300 transform scale-100 flex items-center justify-center">
          <div class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#1a5d2a] via-[#236837] to-[#13431f] border-2 border-[#caa55d] outline outline-1 outline-[#caa55d]/40 outline-offset-1 flex items-center justify-center shadow-[0_3px_12px_rgba(20,60,30,0.55),0_0_10px_rgba(202,165,93,0.35)] group-hover:scale-110 transition-transform duration-200">
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#fff9ea] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      `;
    } else {
      // Henüz izlenmediğinde üzerine gelince merkezde beliren Oynat Butonu
      btn.innerHTML = `
        <div class="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center">
          <div class="px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#7a1414] via-[#941c1c] to-[#7a1414] border border-[#e2be68] text-[#fff7e6] outline outline-1 outline-[#caa55d]/40 outline-offset-1 flex items-center gap-2 shadow-[0_0_20px_rgba(216,176,88,0.4),0_6px_16px_rgba(60,10,10,0.55)] backdrop-blur-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-[#f4cf7e] shadow-[0_0_4px_#f5df9e]"></span>
            <span class="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Oynat
            </span>
            <span class="w-1.5 h-1.5 rounded-full bg-[#f4cf7e] shadow-[0_0_4px_#f5df9e]"></span>
          </div>
        </div>
      `;
    }

    btn.addEventListener('click', () => {
      openEventVideo(index);
    });

    hotspotContainer.appendChild(btn);
  });
}

// 2. Kart Akışı Görünümünü İnşa Et
function renderCards() {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = '';
  EVENTS.forEach((item, index) => {
    const isWatched = watchedEvents.has(item.id);
    const card = document.createElement('div');
    card.className = `bg-white rounded-xl overflow-hidden shadow-sm border transition-all flex flex-col ${
      isWatched ? 'border-emerald-300 ring-1 ring-emerald-300' : 'border-stone-200 hover:border-stone-400'
    }`;

    card.innerHTML = `
      <div class="relative aspect-video bg-stone-900 overflow-hidden group cursor-pointer" onclick="openEventVideo(${index})">
        <img 
          src="${encodeURI(item.image)}" 
          alt="${item.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute top-2.5 left-2.5">
          <span class="px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-amber-300 text-xs font-bold border border-amber-500/30">
            ${item.stepTitle}
          </span>
        </div>
        <!-- Merkez Katman: İzlendiyse sabit onay tiki, izlenmediyse hover ile Oynat -->
        <div class="absolute inset-0 flex items-center justify-center">
          ${
            isWatched
              ? `<div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a5d2a] via-[#236837] to-[#13431f] border-2 border-[#caa55d] outline outline-1 outline-[#caa55d]/40 outline-offset-1 flex items-center justify-center shadow-[0_3px_12px_rgba(20,60,30,0.55),0_0_10px_rgba(202,165,93,0.35)] group-hover:scale-110 transition-transform duration-200 pointer-events-none">
                   <svg class="w-4.5 h-4.5 text-[#fff9ea] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                     <polyline points="20 6 9 17 4 12"></polyline>
                   </svg>
                 </div>`
              : `<div class="opacity-0 group-hover:opacity-100 transition-opacity">
                   <div class="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#7a1414] via-[#941c1c] to-[#7a1414] border border-[#e2be68] text-[#fff7e6] outline outline-1 outline-[#caa55d]/40 outline-offset-1 flex items-center gap-2 shadow-lg backdrop-blur-sm">
                     <span class="w-1.5 h-1.5 rounded-full bg-[#f4cf7e] shadow-[0_0_4px_#f5df9e]"></span>
                     <span class="font-serif font-bold text-xs uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                       Oynat
                     </span>
                     <span class="w-1.5 h-1.5 rounded-full bg-[#f4cf7e] shadow-[0_0_4px_#f5df9e]"></span>
                   </div>
                 </div>`
          }
        </div>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between gap-3 bg-gradient-to-b from-[#fffdf9] to-[#fcf6e8]">
        <div>
          <h3 class="font-serif font-bold text-[#221206] text-base mb-1.5">${item.title}</h3>
          <p class="font-serif text-[#4a3522] text-xs sm:text-sm line-clamp-3 leading-relaxed">${item.narration}</p>
        </div>
        <button 
          class="w-full py-2 px-3 rounded-lg text-xs sm:text-sm font-serif font-semibold tracking-wider transition-all cursor-pointer ${
            isWatched 
              ? 'bg-gradient-to-r from-[#184d28] via-[#236837] to-[#184d28] text-[#fff9ea] border border-[#caa55d] shadow-sm' 
              : 'bg-gradient-to-r from-[#7a1414] via-[#941c1c] to-[#7a1414] text-[#fff7e6] border border-[#d8b058] shadow-sm'
          }"
          onclick="openEventVideo(${index})"
        >
          ${isWatched ? 'Tekrar Oynat' : 'Oynat'}
        </button>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

// Modal Adım Göstergeleri
function renderStepIndicators() {
  if (!modalStepIndicators) return;
  modalStepIndicators.innerHTML = '';
  EVENTS.forEach((ev, idx) => {
    const dot = document.createElement('button');
    const isCurrent = idx === currentEventIndex;
    const isWatched = watchedEvents.has(ev.id);

    dot.className = `h-7 px-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
      isCurrent 
        ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400' 
        : isWatched 
          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300' 
          : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
    }`;
    dot.textContent = `${idx + 1}. Olay`;
    dot.title = ev.title;
    dot.addEventListener('click', () => {
      openEventVideo(idx);
    });
    modalStepIndicators.appendChild(dot);
  });
}

// Videoyu Aç ve Bilgileri Doldur
function openEventVideo(index) {
  if (index < 0 || index >= EVENTS.length) return;
  currentEventIndex = index;
  const ev = EVENTS[index];

  if (modalStepBadge) modalStepBadge.textContent = ev.stepTitle;
  if (modalTitle) modalTitle.textContent = ev.title;
  if (modalNarrationText) modalNarrationText.textContent = ev.narration;
  if (modalConnectionText) modalConnectionText.textContent = ev.connection;

  // Video kaynağını güncelle ve başlat
  if (modalVideoPlayer && modalVideoSource) {
    modalVideoPlayer.pause();
    modalVideoSource.src = ev.video;
    modalVideoPlayer.load();
    
    const playPromise = modalVideoPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Tarayıcı otomatik oynatmaya izin vermezse kullanıcı kontrollerden başlatabilir
      });
    }
  }

  // Buton Durumları
  if (modalPrevBtn) modalPrevBtn.disabled = index === 0;
  if (modalNextBtn) modalNextBtn.disabled = index === EVENTS.length - 1;

  // İzlenme durumunu kaydet
  markAsWatched(ev.id);

  renderStepIndicators();
  if (videoModal) videoModal.classList.remove('hidden');
}
window.openEventVideo = openEventVideo;

// İzlendi Olarak İşaretle
function markAsWatched(id) {
  if (!watchedEvents.has(id)) {
    watchedEvents.add(id);
    saveProgress();
    renderHotspots();
    renderCards();

    // 9 adımın tamamı izlendiyse tamamlandı modalını hazırla ve SCORM bildirimi yap
    if (watchedEvents.size === EVENTS.length) {
      notifyScormCompleted();
    }
  }
}

// Modalı Kapat
function closeEventVideo() {
  if (modalVideoPlayer) modalVideoPlayer.pause();
  if (videoModal) videoModal.classList.add('hidden');
  renderHotspots();
  renderCards();

  // Eğer hepsi izlendiyse ve tamamlanma modalı henüz açılmadıysa göster
  if (watchedEvents.size === EVENTS.length && !sessionStorage.getItem('congratsShown')) {
    sessionStorage.setItem('congratsShown', 'true');
    setTimeout(() => {
      if (completionModal) completionModal.classList.remove('hidden');
    }, 350);
  }
}
window.closeEventVideo = closeEventVideo;

// Uygulamayı Başlat
function initApp() {
  hotspotContainer = document.getElementById('hotspotContainer');
  cardsContainer = document.getElementById('cardsContainer');
  videoModal = document.getElementById('videoModal');
  modalVideoPlayer = document.getElementById('modalVideoPlayer');
  modalVideoSource = document.getElementById('modalVideoSource');
  modalStepBadge = document.getElementById('modalStepBadge');
  modalTitle = document.getElementById('modalTitle');
  modalNarrationText = document.getElementById('modalNarrationText');
  modalConnectionText = document.getElementById('modalConnectionText');
  modalPrevBtn = document.getElementById('modalPrevBtn');
  modalNextBtn = document.getElementById('modalNextBtn');
  modalCloseBtn = document.getElementById('modalCloseBtn');
  modalStepIndicators = document.getElementById('modalStepIndicators');
  btnResetProgress = document.getElementById('btnResetProgress');
  viewTabInfographic = document.getElementById('viewTabInfographic');
  viewTabCards = document.getElementById('viewTabCards');
  sectionInfographic = document.getElementById('sectionInfographic');
  sectionCards = document.getElementById('sectionCards');
  completionModal = document.getElementById('completionModal');
  btnFinishComplete = document.getElementById('btnFinishComplete');
  btnRestartComplete = document.getElementById('btnRestartComplete');

  // Video Modal Dinleyicileri
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeEventVideo);
  }
  
  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => {
      if (currentEventIndex > 0) {
        openEventVideo(currentEventIndex - 1);
      }
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      if (currentEventIndex < EVENTS.length - 1) {
        openEventVideo(currentEventIndex + 1);
      }
    });
  }

  if (modalVideoPlayer) {
    modalVideoPlayer.addEventListener('ended', () => {
      if (currentEventIndex !== null) {
        markAsWatched(EVENTS[currentEventIndex].id);
      }
    });
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeEventVideo();
      }
    });
  }

  // Klavye Kısayolları (ESC, Sol, Sağ Ok)
  window.addEventListener('keydown', (e) => {
    if (videoModal && !videoModal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeEventVideo();
      } else if (e.key === 'ArrowLeft' && currentEventIndex > 0) {
        openEventVideo(currentEventIndex - 1);
      } else if (e.key === 'ArrowRight' && currentEventIndex < EVENTS.length - 1) {
        openEventVideo(currentEventIndex + 1);
      }
    }
  });

  // Görünüm Sekmeleri
  if (viewTabInfographic && viewTabCards) {
    viewTabInfographic.addEventListener('click', () => {
      if (sectionInfographic) sectionInfographic.classList.remove('hidden');
      if (sectionCards) sectionCards.classList.add('hidden');
    });

    viewTabCards.addEventListener('click', () => {
      if (sectionCards) sectionCards.classList.remove('hidden');
      if (sectionInfographic) sectionInfographic.classList.add('hidden');
    });
  }

  // Sıfırlama Butonu
  if (btnResetProgress) {
    btnResetProgress.addEventListener('click', () => {
      if (confirm('İzleme durumunu sıfırlayarak etkinliği baştan başlatmak istediğinize emin misiniz?')) {
        watchedEvents.clear();
        saveProgress();
        sessionStorage.removeItem('congratsShown');
        renderHotspots();
        renderCards();
        notifyScormCompleted();
      }
    });
  }

  // Tebrik Modalı Butonları
  if (btnFinishComplete) {
    btnFinishComplete.addEventListener('click', () => {
      if (completionModal) completionModal.classList.add('hidden');
      notifyScormCompleted();
    });
  }

  if (btnRestartComplete) {
    btnRestartComplete.addEventListener('click', () => {
      if (completionModal) completionModal.classList.add('hidden');
      watchedEvents.clear();
      saveProgress();
      sessionStorage.removeItem('congratsShown');
      renderHotspots();
      renderCards();
      notifyScormCompleted();
    });
  }

  // Giriş Ekranı (Karşılama Sayfası) Başlat Butonu
  const viewIntroPage = document.getElementById('viewIntroPage');
  const btnStartActivity = document.getElementById('btnStartActivity');
  if (btnStartActivity && viewIntroPage) {
    btnStartActivity.addEventListener('click', () => {
      viewIntroPage.classList.add('opacity-0');
      setTimeout(() => {
        viewIntroPage.classList.add('hidden');
      }, 300);
    });
  }

  // Başlangıç Verilerini Yükle ve Çiz
  loadProgress();
  renderHotspots();
  renderCards();

  // Zaman Kadranını Başlat
  if (typeof initAstrolabe === 'function') {
    initAstrolabe();
  }
}

// DOM Hazır Olduğunda Başlat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
