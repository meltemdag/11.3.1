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

// Kadran Çevirme (Dönüş ve Çark Mekanizması) Sesi - kadran.mp3
let kadranAudio = null;
let lastKadranSoundTime = 0;

// Dişli / Tıkırtı (Ratchet & Snap) Sesi - 2.disli_ses.mp3
let disliAudio = null;
let lastDisliSoundTime = 0;

// Doğru Eşleşme ve Kilit Açılma (Başarı) Sesi - dogru.mp3
let dogruAudio = null;

// Yanlış Eşleşme / Kilit Hatası Sesi - yanlis.mp3
let yanlisAudio = null;

function initAstrolabeSounds() {
  if (!kadranAudio) {
    kadranAudio = new Audio('kadran.mp3');
    kadranAudio.preload = 'auto';
  }
  if (!disliAudio) {
    disliAudio = new Audio('2.disli_ses.mp3');
    disliAudio.preload = 'auto';
  }
  if (!dogruAudio) {
    dogruAudio = new Audio('dogru.mp3');
    dogruAudio.preload = 'auto';
  }
  if (!yanlisAudio) {
    yanlisAudio = new Audio('yanlis.mp3');
    yanlisAudio.preload = 'auto';
  }
}
const initKadranAudio = initAstrolabeSounds;

function playKadranRotateSound(volume = 0.75) {
  try {
    const now = Date.now();
    if (now - lastKadranSoundTime < 110) return;
    lastKadranSoundTime = now;

    initAstrolabeSounds();
    kadranAudio.volume = volume;
    kadranAudio.currentTime = 0;
    const playPromise = kadranAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        playAstrolabeTickFallback();
      });
    }
  } catch (e) {
    playAstrolabeTickFallback();
  }
}

const playAstrolabeTickSound = playDisliSnapSound;

function playDisliSnapSound(volume = 0.85) {
  try {
    const now = Date.now();
    if (now - lastDisliSoundTime < 80) return;
    lastDisliSoundTime = now;

    initAstrolabeSounds();
    disliAudio.volume = volume;
    disliAudio.currentTime = 0;
    const playPromise = disliAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        playAstrolabeTickFallback();
      });
    }
  } catch (e) {
    playAstrolabeTickFallback();
  }
}

function playDogruSuccessSound(volume = 0.85) {
  try {
    initAstrolabeSounds();
    dogruAudio.volume = volume;
    dogruAudio.currentTime = 0;
    const playPromise = dogruAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        playAstrolabeLockFallback();
      });
    }
  } catch (e) {
    playAstrolabeLockFallback();
  }
}

const playAstrolabeLockSound = playDogruSuccessSound;

function playAstrolabeTickFallback() {
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

function playAstrolabeLockFallback() {
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

function playYanlisErrorSound(volume = 0.85) {
  try {
    initAstrolabeSounds();
    if (yanlisAudio) {
      yanlisAudio.volume = volume;
      yanlisAudio.currentTime = 0;
      const playPromise = yanlisAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          playAstrolabeMismatchFallback();
        });
      }
    } else {
      playAstrolabeMismatchFallback();
    }
  } catch (e) {
    playAstrolabeMismatchFallback();
  }
}

const playAstrolabeMismatchSound = playYanlisErrorSound;

function playAstrolabeMismatchFallback() {
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

// DOM Öğeleri (Zaman Kadranı Sayfası)
let viewInfographicPage;
let viewAstrolabePage;
let btnOpenAstrolabe;
let btnBackToInfographic;
let btnStartAstrolabeFromComplete;
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
      astrolabeStatusText.innerHTML = `<span class="text-emerald-800 font-bold">Bu aşama başarıyla kilitlendi.</span> ${stage.explanation}`;
    }
    if (btnCheckLock) btnCheckLock.classList.add('hidden');
    if (btnNextKadran) {
      btnNextKadran.classList.remove('hidden');
      if (currentAstrolabeStageIndex < ASTROLABE_STAGES.length - 1) {
        btnNextKadran.textContent = 'Sonraki Aşamaya Geç';
      } else {
        btnNextKadran.textContent = 'Etkinliği Tamamla';
      }
    }
  } else {
    setAstrolabeSealState(false);
    if (astrolabeStatusText) {
      astrolabeStatusText.className = 'hidden';
      astrolabeStatusText.textContent = '';
    }
    if (btnCheckLock) btnCheckLock.classList.remove('hidden');
    if (btnNextKadran) btnNextKadran.classList.add('hidden');
  }
}

// Aşama Butonları (Arayüzden kaldırıldı)
function renderAstrolabePills() {
  if (astrolabeStagePills) {
    astrolabeStagePills.innerHTML = '';
  }
}

// Halka Çevirme Fonksiyonu (Düğmeyle Adımlama veya Doğrudan Slot Seçimi)
function rotateRingManual(ringNumber, directionOrSlot, isDirectSlot = false) {
  if (isCurrentStageLocked) return;
  
  const key = `ring${ringNumber}`;
  if (isDirectSlot) {
    if (ringState[key] === directionOrSlot) return;
    ringState[key] = directionOrSlot;
  } else {
    ringState[key] = (ringState[key] + directionOrSlot + 3) % 3;
  }

  // Dilime geçiş ve oturma (2.disli_ses.mp3)
  playDisliSnapSound();

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

  // Durum metnini sıfırla (Kilit kontrol edilene kadar gizli tut)
  if (astrolabeStatusText && !isCurrentStageLocked) {
    astrolabeStatusText.className = 'hidden';
    astrolabeStatusText.textContent = '';
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
  const r2 = dialD * 0.280;
  const r3 = dialD * 0.150;
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

  // Ekran boyutuna göre etiket boyutlandırma sınıfları
  const isSmall = dialD < 290;
  const isMed = dialD >= 290 && dialD < 360;

  // Her halkanın 3 slotunu, kavisli yazılarını ve üst düz madalyonunu kutupsal koordinatlara yerleştir
  for (let r = 1; r <= 3; r++) {
    const radius = ringRadii[r];
    const currentAngle = angles[r];
    const selectedSlot = ringState[`ring${r}`];
    const ringData = stage.rings[`ring${r}`];

    for (let i = 0; i < 3; i++) {
      const slot = document.getElementById(`ringSlot${r}_${i}`);
      const lbl = document.getElementById(`ringLabel${r}_${i}`);
      const curvedLbl = document.getElementById(`curvedLabel${r}_${i}`);
      const curvedTextPath = curvedLbl ? curvedLbl.querySelector('textPath') : null;

      if (slot) {
        slot.style.transform = `rotate(${i * 120}deg) translateY(-${radius}px)`;
      }

      const isSelected = (i === selectedSlot);
      const labelText = ringData && ringData[i] ? ringData[i].label : '';

      if (lbl) {
        lbl.textContent = labelText;
        if (isSelected) {
          // Üstteki seçili madalyon: Daima yatay (0°), gösterge hizasında, altın ve beyaz varaklı
          lbl.style.display = 'inline-block';
          const counterAngle = -currentAngle - (i * 120);
          lbl.style.transform = `rotate(${counterAngle}deg) scale(${isSmall ? 1.0 : 1.05})`;
          lbl.style.transformOrigin = 'center center';
          lbl.style.opacity = '1';

          if (isSmall) {
            lbl.className = 'inline-block font-lora font-bold text-[8.5px] text-[#140b03] tracking-tight px-2 py-0.5 rounded bg-gradient-to-b from-[#ffffff] via-[#fffef7] to-[#f7e8c6] border border-[#caa55d] ring-1 ring-[#ffd978] shadow-[0_2px_8px_rgba(255,217,120,0.6)] whitespace-nowrap text-center pointer-events-auto leading-none';
          } else if (isMed) {
            lbl.className = 'inline-block font-lora font-bold text-[10.5px] text-[#140b03] tracking-wide px-2.5 py-0.5 rounded-md bg-gradient-to-b from-[#ffffff] via-[#fffef7] to-[#f7e8c6] border-2 border-[#caa55d] ring-2 ring-[#ffd978] shadow-[0_3px_12px_rgba(255,217,120,0.65)] whitespace-nowrap text-center pointer-events-auto leading-tight';
          } else {
            lbl.className = 'inline-block font-lora font-bold text-xs sm:text-[12.5px] text-[#140b03] tracking-wide px-3 py-1 rounded-md bg-gradient-to-b from-[#ffffff] via-[#fffef7] to-[#f7e8c6] border-2 border-[#caa55d] ring-2 ring-[#ffd978] shadow-[0_4px_16px_rgba(255,217,120,0.65),0_1px_4px_rgba(0,0,0,0.4)] whitespace-nowrap text-center pointer-events-auto leading-tight';
          }
        } else {
          // Seçili olmayan slotlar için düz madalyon gizlenir (kavisli SVG yazısı gösterilir)
          lbl.style.display = 'none';
          lbl.style.opacity = '0';
        }
      }

      // Kavisli Halka Yazısı (SVG textPath)
      if (curvedLbl) {
        if (isSelected) {
          // Üstte düz madalyon olduğu için kavisli yazı gizlenir
          curvedLbl.setAttribute('display', 'none');
          if (curvedTextPath) curvedTextPath.textContent = '';
        } else {
          // Yanlarda ve altta çember yayına uygun kavisli yazı gösterilir
          curvedLbl.removeAttribute('display');
          if (curvedTextPath) curvedTextPath.textContent = labelText;
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
  let lastDragSoundAngle = 0;

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
    lastDragSoundAngle = currentDragAngle;
    playKadranRotateSound();

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

    // Belirli açı değişiminde mekanik çark dönüş sesini tetikle
    if (Math.abs(currentDragAngle - lastDragSoundAngle) >= 30) {
      playKadranRotateSound();
      lastDragSoundAngle = currentDragAngle;
    }

    // Çevirme anında seçili üst madalyonu anlık olarak yatay tut
    for (let i = 0; i < 3; i++) {
      const isSelected = (i === ringState[`ring${activeDragRingNumber}`]);
      const lbl = document.getElementById(`ringLabel${activeDragRingNumber}_${i}`);
      if (lbl && isSelected) {
        lbl.style.transition = 'none';
        const counterAngle = -currentDragAngle - (i * 120);
        lbl.style.transform = `rotate(${counterAngle}deg) scale(1.05)`;
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

    // Dilime oturma / mandal tıkırtısı sesi (2.disli_ses.mp3)
    playDisliSnapSound();
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
    astrolabeCenterSeal.className = 'absolute z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#1b5e20] via-[#2e7d32] to-[#144718] border-2 border-[#caa55d] shadow-[0_0_24px_rgba(46,125,50,0.9),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center transition-all duration-500 scale-110 pointer-events-none';
    if (centerSealIcon.tagName === 'IMG') {
      centerSealIcon.src = 'unlock.png';
      centerSealIcon.alt = 'Kilit Açıldı';
      centerSealIcon.className = 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 object-contain drop-shadow-[0_0_12px_rgba(255,230,120,0.95)] brightness-110 transition-all duration-300 pointer-events-none select-none';
    } else {
      centerSealIcon.textContent = 'Uyumlu';
      centerSealIcon.className = 'font-serif font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#fff9ea] drop-shadow text-center';
    }

    // Kartlara yeşil onay çerçevesi
    if (cardAligned1) cardAligned1.className = 'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 border-emerald-600 bg-emerald-50/50 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned2) cardAligned2.className = 'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 border-emerald-600 bg-emerald-50/50 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned3) cardAligned3.className = 'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 border-emerald-600 bg-emerald-50/50 shadow-sm transition-all flex flex-col justify-center';
  } else {
    astrolabeCenterSeal.className = 'absolute z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#7a1414] via-[#941c1c] to-[#540d0d] border-2 border-[#e2be68] shadow-[0_0_18px_rgba(180,30,30,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center transition-all duration-500 pointer-events-none';
    if (centerSealIcon.tagName === 'IMG') {
      centerSealIcon.src = 'lock.png';
      centerSealIcon.alt = 'Kilitli';
      centerSealIcon.className = 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-none select-none';
    } else {
      centerSealIcon.textContent = 'Kilit';
      centerSealIcon.className = 'font-serif font-bold text-[9px] sm:text-[11px] md:text-xs lg:text-sm text-[#fff7e6] tracking-wider drop-shadow text-center';
    }

    // Kartları varsayılan renge döndür
    if (cardAligned1) cardAligned1.className = 'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 border-[#caa55d] bg-[#fffdf9]/95 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned2) cardAligned2.className = 'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 border-[#dfb76c] bg-[#fffdf9]/95 shadow-sm transition-all flex flex-col justify-center';
    if (cardAligned3) cardAligned3.className = 'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 border-[#f3d07e] bg-[#fffdf9]/95 shadow-sm transition-all flex flex-col justify-center';
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
        btnNextKadran.textContent = 'Sonraki Aşamaya Geç';
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
      astrolabeStatusText.textContent = 'Halkalar henüz doğru neden ve sonuç bağıyla hizalanmadı. Tekrar deneyiniz.';
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
    closeZamanKadrani();
    if (typeof notifyScormCompleted === 'function') {
      notifyScormCompleted();
    }
    setTimeout(() => {
      const completionModal = document.getElementById('completionModal');
      if (completionModal) completionModal.classList.remove('hidden');
    }, 300);
  }
}

// Zaman Kadranı Tam Ekran Sayfası Aç / Kapat
function openZamanKadrani() {
  viewInfographicPage = document.getElementById('viewInfographicPage');
  viewAstrolabePage = document.getElementById('viewAstrolabePage');

  if (viewInfographicPage) viewInfographicPage.classList.add('hidden');
  if (viewAstrolabePage) {
    viewAstrolabePage.classList.remove('hidden');
    viewAstrolabePage.scrollTop = 0;
  }

  initKadranAudio();
  loadAstrolabeStage(currentAstrolabeStageIndex);
  requestAnimationFrame(() => {
    updateAstrolabeVisuals();
  });
}
window.openZamanKadrani = openZamanKadrani;

function closeZamanKadrani() {
  viewInfographicPage = document.getElementById('viewInfographicPage');
  viewAstrolabePage = document.getElementById('viewAstrolabePage');

  if (viewAstrolabePage) viewAstrolabePage.classList.add('hidden');
  if (viewInfographicPage) viewInfographicPage.classList.remove('hidden');
}
window.closeZamanKadrani = closeZamanKadrani;

// Zaman Kadranı Başlatıcı
function initAstrolabe() {
  initKadranAudio();
  viewInfographicPage = document.getElementById('viewInfographicPage');
  viewAstrolabePage = document.getElementById('viewAstrolabePage');
  btnOpenAstrolabe = document.getElementById('btnOpenAstrolabe');
  const btnOpenAstrolabeMobile = document.getElementById('btnOpenAstrolabeMobile');
  btnStartAstrolabeFromComplete = document.getElementById('btnStartAstrolabeFromComplete');
  btnBackToInfographic = document.getElementById('btnBackToInfographic');
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

  if (btnOpenAstrolabeMobile) {
    btnOpenAstrolabeMobile.addEventListener('click', openZamanKadrani);
  }

  if (btnStartAstrolabeFromComplete) {
    btnStartAstrolabeFromComplete.addEventListener('click', () => {
      const completionModal = document.getElementById('completionModal');
      if (completionModal) completionModal.classList.add('hidden');
      openZamanKadrani();
    });
  }

  if (btnBackToInfographic) {
    btnBackToInfographic.addEventListener('click', closeZamanKadrani);
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

  // ESC Tuşu ile Kadran Sayfasından Ana Sayfaya Dönüş
  window.addEventListener('keydown', (e) => {
    if (viewAstrolabePage && !viewAstrolabePage.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeZamanKadrani();
      }
    }
  });

  // Pencere Boyutu Değiştiğinde Kadranı Anında Yeniden Hesapla
  window.addEventListener('resize', () => {
    if (viewAstrolabePage && !viewAstrolabePage.classList.contains('hidden')) {
      updateAstrolabeVisuals();
    }
  });

  initAstrolabeDragAndDrop();
}

window.initAstrolabe = initAstrolabe;
