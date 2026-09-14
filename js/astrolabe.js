/**
 * ==========================================================================
 * MEBİ 11.3.1 - Zaman Kadranı: Neden ve Sonuç Usturlabı Motoru
 * ==========================================================================
 */

// Web Audio API ile Mekanik Çark ve Kilit Sesleri
let astrolabeAudioCtx = null;

function getAstrolabeAudioContext() {
  if (!astrolabeAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) astrolabeAudioCtx = new AudioContextClass();
  }
  if (astrolabeAudioCtx && astrolabeAudioCtx.state === 'suspended') {
    astrolabeAudioCtx.resume();
  }
  return astrolabeAudioCtx;
}

function playAstrolabeTickSound() {
  try {
    const ctx = getAstrolabeAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

function playAstrolabeLockSound() {
  try {
    const ctx = getAstrolabeAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      gain.gain.setValueAtTime(0.12, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.6);
    });
  } catch (e) {}
}

function playAstrolabeMismatchSound() {
  try {
    const ctx = getAstrolabeAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {}
}

// Kadran Durum Değişkenleri
let currentAstrolabeStageIndex = 0;
let ringState = { ring1: 0, ring2: 0, ring3: 0 };
let completedAstrolabeStages = new Set();
let isCurrentStageLocked = false;

// DOM Öğeleri (Zaman Kadranı)
let astrolabeModal;
let btnOpenAstrolabe;
let btnStartAstrolabeFromComplete;
let btnAstrolabeClose;
let astrolabeStageTitle;
let astrolabeStagePills;
let ringElement1;
let ringElement2;
let ringElement3;
let astrolabeCenterSeal;
let centerSealIcon;
let cardAligned1;
let cardAligned2;
let cardAligned3;
let textAligned1;
let textAligned2;
let textAligned3;
let astrolabeStatusText;
let btnCheckLock;
let btnNextKadran;

// Kadran Aşamasını Yükle
function loadAstrolabeStage(index) {
  if (index < 0 || index >= ASTROLABE_STAGES.length) return;
  currentAstrolabeStageIndex = index;
  const stage = ASTROLABE_STAGES[index];
  isCurrentStageLocked = completedAstrolabeStages.has(index);

  // Başlık
  if (astrolabeStageTitle) astrolabeStageTitle.textContent = stage.title;

  // Aşama Butonları
  renderAstrolabePills();

  // Başlangıç pozisyonları
  if (isCurrentStageLocked) {
    ringState.ring1 = stage.correct.ring1;
    ringState.ring2 = stage.correct.ring2;
    ringState.ring3 = stage.correct.ring3;
  } else {
    ringState.ring1 = stage.initial.ring1;
    ringState.ring2 = stage.initial.ring2;
    ringState.ring3 = stage.initial.ring3;
  }

  // Halka Dilim Etiketlerini Doldur
  for (let r = 1; r <= 3; r++) {
    const ringData = stage.rings[`ring${r}`];
    for (let i = 0; i < 3; i++) {
      const lbl = document.getElementById(`ringLabel${r}_${i}`);
      if (lbl && ringData[i]) {
        lbl.textContent = ringData[i].label;
      }
    }
  }

  // Görsel ve Metin Güncellemesi
  updateAstrolabeVisuals();

  // Kilit Durumu ve Butonlar
  if (isCurrentStageLocked) {
    setAstrolabeSealState(true);
    if (astrolabeStatusText) {
      astrolabeStatusText.className = 'font-lora text-sm sm:text-base text-emerald-950 leading-relaxed font-bold';
      astrolabeStatusText.innerHTML = `<span class="text-emerald-800 font-bold">Bu dönem başarıyla kilitlendi.</span> ${stage.explanation}`;
    }
    if (btnCheckLock) btnCheckLock.classList.add('hidden');
    if (btnNextKadran) {
      btnNextKadran.classList.remove('hidden');
      if (currentAstrolabeStageIndex < ASTROLABE_STAGES.length - 1) {
        btnNextKadran.textContent = 'Sonraki Döneme Geç';
      } else {
        btnNextKadran.textContent = 'Etkinliği Tamamla';
      }
    }
  } else {
    setAstrolabeSealState(false);
    if (astrolabeStatusText) {
      astrolabeStatusText.className = 'font-lora text-sm sm:text-base text-stone-900 leading-relaxed font-bold';
      astrolabeStatusText.textContent = 'Kadranları çevirerek gelişme, tetikleyici neden ve ortaya çıkan sonucu altın ibre hizasında birleştiriniz; ardından kilidi kontrol ediniz.';
    }
    if (btnCheckLock) btnCheckLock.classList.remove('hidden');
    if (btnNextKadran) btnNextKadran.classList.add('hidden');
  }
}

// Aşama Rozetlerini Çiz (İkonsuz)
function renderAstrolabePills() {
  if (!astrolabeStagePills) return;
  astrolabeStagePills.innerHTML = '';
  ASTROLABE_STAGES.forEach((st, idx) => {
    const isCurrent = idx === currentAstrolabeStageIndex;
    const isDone = completedAstrolabeStages.has(idx);
    const pill = document.createElement('button');
    pill.className = `px-2.5 py-1 rounded-md text-xs font-serif font-bold transition-all cursor-pointer ${
      isCurrent
        ? 'bg-gradient-to-r from-[#caa55d] to-[#e2be68] text-[#261508] shadow ring-1 ring-[#8c6520]'
        : isDone
          ? 'bg-[#1b5e20] text-[#fff9ea] border border-[#caa55d]'
          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
    }`;
    pill.textContent = st.pillName;
    pill.addEventListener('click', () => {
      loadAstrolabeStage(idx);
    });
    astrolabeStagePills.appendChild(pill);
  });
}

// Halka Çevirme Fonksiyonu (Düğmeyle Adımlama veya Doğrudan Slot Seçimi)
function rotateRingManual(ringNumber, directionOrSlot, isDirectSlot = false) {
  if (isCurrentStageLocked) return;
  playAstrolabeTickSound();
  
  const key = `ring${ringNumber}`;
  if (isDirectSlot) {
    ringState[key] = directionOrSlot;
  } else {
    ringState[key] = (ringState[key] + directionOrSlot + 3) % 3;
  }

  const ringElem = document.getElementById(`ringElement${ringNumber}`);
  if (ringElem) {
    ringElem.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2)';
  }

  for (let i = 0; i < 3; i++) {
    const lbl = document.getElementById(`ringLabel${ringNumber}_${i}`);
    if (lbl) {
      lbl.style.transition = 'transform 0.45s ease-out, opacity 0.3s, box-shadow 0.3s';
    }
  }

  updateAstrolabeVisuals();

  // Durum metnini sıfırla
  if (astrolabeStatusText) {
    astrolabeStatusText.textContent = 'Kadranları çevirerek gelişme, tetikleyici neden ve ortaya çıkan sonucu altın ibre hizasında birleştiriniz; ardından kilidi kontrol ediniz.';
    astrolabeStatusText.className = 'font-lora text-sm sm:text-base text-stone-900 leading-relaxed font-bold';
  }
}
window.rotateRingManual = rotateRingManual;

// Görsel Kadran Açılarını, Yatay Madalyon Duruşunu ve Kart Metinlerini Güncelle
function updateAstrolabeVisuals() {
  const stage = ASTROLABE_STAGES[currentAstrolabeStageIndex];
  const dial = document.getElementById('astrolabeDialContainer');
  const dialD = dial && dial.offsetWidth > 0 ? dial.offsetWidth : 400;

  // Radyal yarıçaplar (Kusursuz dairesel yörüngeler)
  const r1 = dialD * 0.415;
  const r2 = dialD * 0.305;
  const r3 = dialD * 0.190;
  const ringRadii = { 1: r1, 2: r2, 3: r3 };

  // Kadran ana dönüş açıları (Her dilim 120°)
  const angles = {
    1: -ringState.ring1 * 120,
    2: -ringState.ring2 * 120,
    3: -ringState.ring3 * 120
  };

  if (ringElement1) ringElement1.style.transform = `rotate(${angles[1]}deg)`;
  if (ringElement2) ringElement2.style.transform = `rotate(${angles[2]}deg)`;
  if (ringElement3) ringElement3.style.transform = `rotate(${angles[3]}deg)`;

  // Her halkanın 3 slotunu ve madalyonunu kutupsal koordinatlara yerleştir ve daima yatay tut
  for (let r = 1; r <= 3; r++) {
    const radius = ringRadii[r];
    const currentAngle = angles[r];
    const selectedSlot = ringState[`ring${r}`];

    for (let i = 0; i < 3; i++) {
      const slot = document.getElementById(`ringSlot${r}_${i}`);
      const lbl = document.getElementById(`ringLabel${r}_${i}`);

      if (slot) {
        slot.style.transform = `rotate(${i * 120}deg) translateY(-${radius}px)`;
      }

      if (lbl) {
        const isSelected = (i === selectedSlot);
        const counterAngle = -currentAngle - (i * 120);
        lbl.style.transform = `rotate(${counterAngle}deg) scale(${isSelected ? 1.0 : 0.88})`;
        lbl.style.transformOrigin = 'center center';
        lbl.style.opacity = isSelected ? '1' : '0.62';

        if (isSelected) {
          lbl.className = 'inline-block font-serif font-bold text-[11px] sm:text-xs text-[#241407] tracking-wider px-2.5 py-1 rounded-md bg-gradient-to-b from-[#fffef9] via-[#f9f1de] to-[#eedab4] border border-[#caa55d] ring-1 ring-[#ffd978]/90 shadow-[0_2px_8px_rgba(255,217,120,0.5),0_1px_3px_rgba(0,0,0,0.35)] whitespace-nowrap text-center transition-all duration-300 pointer-events-auto leading-tight';
        } else {
          lbl.className = 'inline-block font-serif font-semibold text-[10px] sm:text-[10.5px] text-[#eedab4] hover:text-[#fffef9] tracking-wider px-2 py-0.5 rounded bg-[#2b180a]/85 hover:bg-[#3d230e]/95 border border-[#caa55d]/40 hover:border-[#caa55d] shadow-[0_1px_4px_rgba(0,0,0,0.4)] whitespace-nowrap text-center transition-all duration-300 pointer-events-auto leading-tight';
        }
      }
    }
  }

  // Sağ taraftaki kartların metinlerini güncelle
  if (textAligned1 && stage.rings.ring1[ringState.ring1]) {
    textAligned1.textContent = stage.rings.ring1[ringState.ring1].text;
  }
  if (textAligned2 && stage.rings.ring2[ringState.ring2]) {
    textAligned2.textContent = stage.rings.ring2[ringState.ring2].text;
  }
  if (textAligned3 && stage.rings.ring3[ringState.ring3]) {
    textAligned3.textContent = stage.rings.ring3[ringState.ring3].text;
  }
}

// ===============================================
// DOKUNMATİK VE FARE İLE DÖNDÜRME (DRAG & ROTATE)
// ===============================================
let isDraggingRing = false;
let activeDragRingNumber = null;
let dragStartPointerAngle = 0;
let dragStartRingAngle = 0;
let currentDragAngle = 0;

function getPointerAngleFromCenter(e, centerX, centerY) {
  const clientX = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
}

function initAstrolabeDragAndDrop() {
  const dial = document.getElementById('astrolabeDialContainer');
  if (!dial) return;

  function onPointerStart(e) {
    if (isCurrentStageLocked) return;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;

    const dist = Math.hypot(clientX - centerX, clientY - centerY);
    const maxRadius = rect.width / 2;
    const relRadius = dist / maxRadius;

    // Yarıçap oranına göre hangi halkanın çevrildiğini hassas tespit et
    if (relRadius >= 0.68 && relRadius <= 1.05) {
      activeDragRingNumber = 1;
    } else if (relRadius >= 0.44 && relRadius < 0.68) {
      activeDragRingNumber = 2;
    } else if (relRadius >= 0.18 && relRadius < 0.44) {
      activeDragRingNumber = 3;
    } else {
      return;
    }

    isDraggingRing = true;
    dragStartPointerAngle = getPointerAngleFromCenter(e, centerX, centerY);
    const currentSlot = ringState[`ring${activeDragRingNumber}`];
    dragStartRingAngle = -currentSlot * 120;
    currentDragAngle = dragStartRingAngle;

    const ringElem = document.getElementById(`ringElement${activeDragRingNumber}`);
    if (ringElem) {
      ringElem.style.transition = 'none';
    }

    for (let i = 0; i < 3; i++) {
      const lbl = document.getElementById(`ringLabel${activeDragRingNumber}_${i}`);
      if (lbl) {
        lbl.style.transition = 'none';
      }
    }

    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
  }

  function onPointerMove(e) {
    if (!isDraggingRing || !activeDragRingNumber) return;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const currentPointerAngle = getPointerAngleFromCenter(e, centerX, centerY);
    let diff = currentPointerAngle - dragStartPointerAngle;

    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;

    currentDragAngle = dragStartRingAngle + diff;
    const ringElem = document.getElementById(`ringElement${activeDragRingNumber}`);
    if (ringElem) {
      ringElem.style.transform = `rotate(${currentDragAngle}deg)`;
    }

    // Çevirme anında madalyonları anlık olarak yatay tut
    for (let i = 0; i < 3; i++) {
      const lbl = document.getElementById(`ringLabel${activeDragRingNumber}_${i}`);
      if (lbl) {
        lbl.style.transition = 'none';
        const counterAngle = -currentDragAngle - (i * 120);
        const isSelected = (i === ringState[`ring${activeDragRingNumber}`]);
        lbl.style.transform = `rotate(${counterAngle}deg) scale(${isSelected ? 1.0 : 0.88})`;
      }
    }

    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
  }

  function onPointerEnd() {
    if (!isDraggingRing || !activeDragRingNumber) return;
    const ringNum = activeDragRingNumber;
    isDraggingRing = false;
    activeDragRingNumber = null;

    // En yakın 120° dilimine (0, 1 veya 2) otomatik kenetlen (Snap)
    let norm = ((-currentDragAngle % 360) + 360) % 360;
    let slot = Math.round(norm / 120) % 3;

    playAstrolabeTickSound();
    ringState[`ring${ringNum}`] = slot;

    // Akıcı yaylanma fiziğini geri yükle
    const ringElem = document.getElementById(`ringElement${ringNum}`);
    if (ringElem) {
      ringElem.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2)';
    }

    for (let i = 0; i < 3; i++) {
      const lbl = document.getElementById(`ringLabel${ringNum}_${i}`);
      if (lbl) {
        lbl.style.transition = 'transform 0.45s ease-out, opacity 0.3s, box-shadow 0.3s';
      }
    }

    updateAstrolabeVisuals();
  }

  dial.addEventListener('mousedown', onPointerStart);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerEnd);

  dial.addEventListener('touchstart', onPointerStart, { passive: false });
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('touchend', onPointerEnd);
  window.addEventListener('touchcancel', onPointerEnd);
}

// Merkez Mührü Kilit Görseli
function setAstrolabeSealState(isLocked) {
  if (!astrolabeCenterSeal || !centerSealIcon) return;
  if (isLocked) {
    astrolabeCenterSeal.className = 'absolute z-30 w-14 h-14 sm:w-16 sm:h-16 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1b5e20] via-[#2e7d32] to-[#144718] border-2 border-[#caa55d] shadow-[0_0_20px_rgba(46,125,50,0.8),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center transition-all duration-500 scale-105 pointer-events-none';
    centerSealIcon.textContent = 'Uyumlu';
    centerSealIcon.className = 'font-serif font-bold text-[11px] sm:text-xs text-[#fff9ea] drop-shadow text-center';

    // Kartlara yeşil onay çerçevesi
    if (cardAligned1) cardAligned1.className = 'flex-1 p-3.5 sm:p-4 md:p-4.5 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned2) cardAligned2.className = 'flex-1 p-3.5 sm:p-4 md:p-4.5 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned3) cardAligned3.className = 'flex-1 p-3.5 sm:p-4 md:p-4.5 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 shadow-sm transition-all flex flex-col justify-center';
  } else {
    astrolabeCenterSeal.className = 'absolute z-30 w-14 h-14 sm:w-16 sm:h-16 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#7a1414] via-[#941c1c] to-[#540d0d] border-2 border-[#e2be68] shadow-[0_0_18px_rgba(180,30,30,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center transition-all duration-500 pointer-events-none';
    centerSealIcon.textContent = 'Kilit';
    centerSealIcon.className = 'font-serif font-bold text-xs sm:text-sm text-[#fff7e6] tracking-wider drop-shadow text-center';

    // Kartları varsayılan renge döndür
    if (cardAligned1) cardAligned1.className = 'flex-1 p-3.5 sm:p-4 md:p-4.5 rounded-xl border-2 border-[#caa55d] bg-[#fffdf9]/95 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned2) cardAligned2.className = 'flex-1 p-3.5 sm:p-4 md:p-4.5 rounded-xl border-2 border-[#dfb76c] bg-[#fffdf9]/95 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned3) cardAligned3.className = 'flex-1 p-3.5 sm:p-4 md:p-4.5 rounded-xl border-2 border-[#f3d07e] bg-[#fffdf9]/95 shadow-sm transition-all flex flex-col justify-center';
  }
}

// Kilidi Kontrol Et (Doğru Yeşil, Yanlış Kırmızı Geri Bildirim)
function checkAstrolabeLock() {
  const stage = ASTROLABE_STAGES[currentAstrolabeStageIndex];
  const isCorrect = (
    ringState.ring1 === stage.correct.ring1 &&
    ringState.ring2 === stage.correct.ring2 &&
    ringState.ring3 === stage.correct.ring3
  );

  if (isCorrect) {
    isCurrentStageLocked = true;
    completedAstrolabeStages.add(currentAstrolabeStageIndex);
    playAstrolabeLockSound();
    setAstrolabeSealState(true);
    renderAstrolabePills();

    if (astrolabeStatusText) {
      astrolabeStatusText.className = 'font-lora text-sm sm:text-base text-emerald-950 leading-relaxed font-bold';
      astrolabeStatusText.innerHTML = `<span class="text-emerald-800 font-bold">Kilit açıldı.</span> ${stage.explanation}`;
    }

    if (btnCheckLock) btnCheckLock.classList.add('hidden');
    if (btnNextKadran) {
      btnNextKadran.classList.remove('hidden');
      if (currentAstrolabeStageIndex < ASTROLABE_STAGES.length - 1) {
        btnNextKadran.textContent = 'Sonraki Döneme Geç';
      } else {
        btnNextKadran.textContent = 'Etkinliği Tamamla';
        if (typeof notifyScormCompleted === 'function') {
          notifyScormCompleted();
        }
      }
    }
  } else {
    // Yanlış işlem geri bildirimi: Kırmızı renk ve açıklama
    playAstrolabeMismatchSound();
    if (astrolabeStatusText) {
      astrolabeStatusText.className = 'font-lora text-sm sm:text-base text-[#8c1e1e] leading-relaxed font-bold';
      astrolabeStatusText.textContent = 'Halkalar henüz doğru neden ve sonuç bağıyla hizalanmadı. Gelişmeleri ve gerekçeleri gözden geçirerek tekrar deneyiniz.';
    }
    
    // Kartlarda geçici kırmızı uyarı çerçevesi
    [cardAligned1, cardAligned2, cardAligned3].forEach(c => {
      if (c) {
        c.classList.add('border-red-600', 'bg-red-50/40');
        setTimeout(() => {
          c.classList.remove('border-red-600', 'bg-red-50/40');
        }, 1000);
      }
    });
  }
}

// Sonraki Kadran veya Tamamlama
function nextAstrolabeStage() {
  if (currentAstrolabeStageIndex < ASTROLABE_STAGES.length - 1) {
    loadAstrolabeStage(currentAstrolabeStageIndex + 1);
  } else {
    // Tüm 3 Dönem Tamamlandı
    if (astrolabeModal) astrolabeModal.classList.add('hidden');
    if (typeof notifyScormCompleted === 'function') {
      notifyScormCompleted();
    }
    setTimeout(() => {
      const completionModal = document.getElementById('completionModal');
      if (completionModal) completionModal.classList.remove('hidden');
    }, 300);
  }
}

// Zaman Kadranı Modalı Aç / Kapat
function openZamanKadrani() {
  if (astrolabeModal) astrolabeModal.classList.remove('hidden');
  loadAstrolabeStage(currentAstrolabeStageIndex);
  requestAnimationFrame(() => {
    updateAstrolabeVisuals();
  });
}
window.openZamanKadrani = openZamanKadrani;

function closeZamanKadrani() {
  if (astrolabeModal) astrolabeModal.classList.add('hidden');
}
window.closeZamanKadrani = closeZamanKadrani;

// Zaman Kadranı Başlatıcı
function initAstrolabe() {
  astrolabeModal = document.getElementById('astrolabeModal');
  btnOpenAstrolabe = document.getElementById('btnOpenAstrolabe');
  btnStartAstrolabeFromComplete = document.getElementById('btnStartAstrolabeFromComplete');
  btnAstrolabeClose = document.getElementById('btnAstrolabeClose');
  astrolabeStageTitle = document.getElementById('astrolabeStageTitle');
  astrolabeStagePills = document.getElementById('astrolabeStagePills');
  ringElement1 = document.getElementById('ringElement1');
  ringElement2 = document.getElementById('ringElement2');
  ringElement3 = document.getElementById('ringElement3');
  astrolabeCenterSeal = document.getElementById('astrolabeCenterSeal');
  centerSealIcon = document.getElementById('centerSealIcon');
  cardAligned1 = document.getElementById('cardAligned1');
  cardAligned2 = document.getElementById('cardAligned2');
  cardAligned3 = document.getElementById('cardAligned3');
  textAligned1 = document.getElementById('textAligned1');
  textAligned2 = document.getElementById('textAligned2');
  textAligned3 = document.getElementById('textAligned3');
  astrolabeStatusText = document.getElementById('astrolabeStatusText');
  btnCheckLock = document.getElementById('btnCheckLock');
  btnNextKadran = document.getElementById('btnNextKadran');

  if (btnOpenAstrolabe) {
    btnOpenAstrolabe.addEventListener('click', openZamanKadrani);
  }

  if (btnStartAstrolabeFromComplete) {
    btnStartAstrolabeFromComplete.addEventListener('click', () => {
      const completionModal = document.getElementById('completionModal');
      if (completionModal) completionModal.classList.add('hidden');
      openZamanKadrani();
    });
  }

  if (btnAstrolabeClose) {
    btnAstrolabeClose.addEventListener('click', closeZamanKadrani);
  }

  if (btnCheckLock) {
    btnCheckLock.addEventListener('click', checkAstrolabeLock);
  }

  if (btnNextKadran) {
    btnNextKadran.addEventListener('click', nextAstrolabeStage);
  }

  // Kadran Düğmeleri Dinleyicileri
  const btnR1P = document.getElementById('btnRotateRing1Prev');
  const btnR1N = document.getElementById('btnRotateRing1Next');
  const btnR2P = document.getElementById('btnRotateRing2Prev');
  const btnR2N = document.getElementById('btnRotateRing2Next');
  const btnR3P = document.getElementById('btnRotateRing3Prev');
  const btnR3N = document.getElementById('btnRotateRing3Next');

  if (btnR1P) btnR1P.addEventListener('click', () => rotateRingManual(1, -1));
  if (btnR1N) btnR1N.addEventListener('click', () => rotateRingManual(1, 1));
  if (btnR2P) btnR2P.addEventListener('click', () => rotateRingManual(2, -1));
  if (btnR2N) btnR2N.addEventListener('click', () => rotateRingManual(2, 1));
  if (btnR3P) btnR3P.addEventListener('click', () => rotateRingManual(3, -1));
  if (btnR3N) btnR3N.addEventListener('click', () => rotateRingManual(3, 1));

  // ESC Tuşu ile Kadranı Kapatma
  window.addEventListener('keydown', (e) => {
    if (astrolabeModal && !astrolabeModal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeZamanKadrani();
      }
    }
  });

  // Pencere Boyutu Değiştiğinde Kadranı Anında Yeniden Hesapla
  window.addEventListener('resize', () => {
    if (astrolabeModal && !astrolabeModal.classList.contains('hidden')) {
      updateAstrolabeVisuals();
    }
  });

  initAstrolabeDragAndDrop();
}

window.initAstrolabe = initAstrolabe;
