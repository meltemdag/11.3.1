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
let videoModal;
let modalVideoPlayer;
let modalVideoSource;
let modalStepBadge;
let modalTitle;
let modalNarrationText;
let modalConnectionText;
let modalCloseBtn;
let modalStepIndicators;
let sectionInfographic;
let completionModal;
let btnFinishComplete;
let btnRestartComplete;

// SCORM Tamamlama Desteği
function notifyScormCompleted() {
  if (typeof window.SCORM !== 'undefined') {
    window.SCORM.complete(true);
    window.SCORM.setStatus('completed');
  } else if (typeof pipwerks !== 'undefined' && pipwerks.scorm) {
    pipwerks.scorm.set("cmi.core.lesson_status", "completed");
    pipwerks.scorm.save();
  }
}
window.notifyScormCompleted = notifyScormCompleted;

// İlerleme Durumu Yönetimi (Her Yeniden Başlatmada Temiz Başlangıç)
function clearStoredProgress() {
  try {
    localStorage.removeItem('osmanli_11_3_1_watched');
    sessionStorage.removeItem('congratsShown');
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
    modalVideoPlayer.src = ev.video;
    modalVideoPlayer.load();
    
    const playPromise = modalVideoPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Tarayıcı otomatik oynatmaya izin vermezse kullanıcı kontrollerden başlatabilir
      });
    }
  }

  renderStepIndicators();
  if (videoModal) videoModal.classList.remove('hidden');
}
window.openEventVideo = openEventVideo;

// Zaman Kadranına Geçiş Butonlarını Güncelle
function updateAstrolabeTransitionButtons() {
  if (!btnProceedToAstrolabe) btnProceedToAstrolabe = document.getElementById('btnProceedToAstrolabe');

  const isAllWatched = Boolean(watchedEvents && watchedEvents.size === EVENTS.length);
  if (btnProceedToAstrolabe) {
    if (isAllWatched) {
      btnProceedToAstrolabe.classList.remove('hidden');
    } else {
      btnProceedToAstrolabe.classList.add('hidden');
    }
  }
}

// İzlendi Olarak İşaretle (Yalnızca video bitince veya sonraki adıma geçince çağrılır)
function markAsWatched(id) {
  if (!id) return;
  if (!watchedEvents.has(id)) {
    watchedEvents.add(id);
    renderHotspots();
    updateAstrolabeTransitionButtons();

    // 9 adımın tamamı izlendiyse SCORM bildirimi yap
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
  updateAstrolabeTransitionButtons();
}
window.closeEventVideo = closeEventVideo;

// Etkinliği Yeniden Başlat (En Başa Karşılama Ekranına Dönüş)
function resetEntireActivity() {
  notifyScormCompleted();
  clearStoredProgress();
  watchedEvents.clear();
  hasAutoTransitionedToAstrolabe = false;

  if (completionModal) completionModal.classList.add('hidden');
  if (typeof closeZamanKadrani === 'function') closeZamanKadrani();
  if (videoModal) videoModal.classList.add('hidden');

  if (typeof resetAstrolabeState === 'function') {
    resetAstrolabeState();
  }

  renderHotspots();
  updateAstrolabeTransitionButtons();

  // En başa (Giriş Karşılama Ekranına) dön
  const viewIntroPage = document.getElementById('viewIntroPage');
  if (viewIntroPage) {
    viewIntroPage.classList.remove('hidden', 'opacity-0');
    viewIntroPage.classList.add('opacity-100');
  }
}
window.resetEntireActivity = resetEntireActivity;

// Etkinliği Bitir (Pencereyi Kapatma veya Bilgilendirme)
function finishEntireActivity() {
  notifyScormCompleted();
  if (typeof window.SCORM !== 'undefined') {
    window.SCORM.terminate();
  }
  try {
    window.close();
  } catch (e) {}

  // Tarayıcı güvenlik kısıtlaması nedeniyle sekme kapatılamazsa bilgilendir
  const completionDesc = document.getElementById('completionDescription');
  const buttonsContainer = document.getElementById('completionButtonsContainer');
  if (completionDesc) {
    completionDesc.textContent = 'Etkinlik tamamlanmıştır. Tarayıcı veya sekme penceresini kapatabilirsiniz.';
  }
  if (buttonsContainer) {
    buttonsContainer.classList.add('hidden');
  }
}
window.finishEntireActivity = finishEntireActivity;

// Otomatik Geçiş Takip Bayrağı
let hasAutoTransitionedToAstrolabe = false;
let btnProceedToAstrolabe = null;

// Uygulamayı Başlat
function initApp() {
  hotspotContainer = document.getElementById('hotspotContainer');
  videoModal = document.getElementById('videoModal');
  modalVideoPlayer = document.getElementById('modalVideoPlayer');
  modalVideoSource = document.getElementById('modalVideoSource');
  modalStepBadge = document.getElementById('modalStepBadge');
  modalTitle = document.getElementById('modalTitle');
  modalNarrationText = document.getElementById('modalNarrationText');
  modalConnectionText = document.getElementById('modalConnectionText');
  modalCloseBtn = document.getElementById('modalCloseBtn');
  modalStepIndicators = document.getElementById('modalStepIndicators');
  sectionInfographic = document.getElementById('sectionInfographic');
  completionModal = document.getElementById('completionModal');
  btnFinishComplete = document.getElementById('btnFinishComplete');
  btnRestartComplete = document.getElementById('btnRestartComplete');
  btnProceedToAstrolabe = document.getElementById('btnProceedToAstrolabe');

  // Video Modal Kapat Butonu Dinleyicisi
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeEventVideo);
  }

  // Video Bittiğinde İzlenme Durumunu Kaydet
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

  // Klavye Kısayolu (ESC ile Pencereyi Kapatma)
  window.addEventListener('keydown', (e) => {
    if (videoModal && !videoModal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeEventVideo();
      }
    }
  });



  // Tebrik Modalı Butonları (Yalnızca İki Buton)
  if (btnFinishComplete) {
    btnFinishComplete.addEventListener('click', finishEntireActivity);
  }

  if (btnRestartComplete) {
    btnRestartComplete.addEventListener('click', resetEntireActivity);
  }

  // Etkinliğin Altındaki Sonraki Aşamaya Geç Butonu
  if (btnProceedToAstrolabe) {
    btnProceedToAstrolabe.addEventListener('click', () => {
      if (typeof openZamanKadrani === 'function') {
        openZamanKadrani();
      }
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

  // Başlangıç Verilerini Sıfırdan Başlat (Eski kalıntıları temizle)
  clearStoredProgress();
  watchedEvents = new Set();
  hasAutoTransitionedToAstrolabe = false;

  renderHotspots();
  updateAstrolabeTransitionButtons();

  // Zaman Kadranını Başlat
  if (typeof initAstrolabe === 'function') {
    initAstrolabe();
  }

  // SCORM Servisini Başlat
  if (typeof window.SCORM !== 'undefined') {
    window.SCORM.initialize();
  }
}

// Pencere Kapatılırken SCORM Servisini Sonlandır
window.addEventListener('beforeunload', () => {
  if (typeof window.SCORM !== 'undefined') {
    window.SCORM.terminate();
  }
});

// DOM Hazır Olduğunda Başlat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
