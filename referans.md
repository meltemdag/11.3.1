
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mekanik Pirinç Kilit Bileşeni (Standalone Padlock Component)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

  <style>
    /* ==========================================================================
       1. MEKANİK KİLİT CSS FİZİĞİ & ANİMASYONLARI (KOPYALANABİLİR STİLLER)
       ========================================================================== */
    
    /* Kilit Kulpu (Shackle) Dönüş ve Yukarı Fırlama Eksen Ayarı */
    .lock-shackle {
      transform-origin: 38px 18px;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    /* Kilidin Açık Hali: 8px yukarı fırlar ve 26 derece yana yatar */
    .lock-shackle.unlocked {
      transform: translateY(-8px) rotate(-26deg);
    }

    /* Kilit Doğru Hizalandığında (Açılmaya Hazır) Verilen Parlama */
    .lock-core-ready {
      filter: drop-shadow(0 0 16px rgba(245, 203, 92, 0.9));
    }

    /* Kilit Başarıyla Açıldığında Verilen Zümrüt Işıma */
    .lock-core-unlocked {
      filter: drop-shadow(0 0 20px rgba(74, 222, 128, 0.95));
    }

    /* Hatalı Giriş / Reddedilme Sarsıntısı (Mechanical Jiggle) */
    @keyframes lockJiggleAnim {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px) rotate(-4deg); }
      40%, 80% { transform: translateX(5px) rotate(4deg); }
    }
    .lock-jiggle {
      animation: lockJiggleAnim 0.38s ease-in-out;
    }

    /* Arka plan metalik çerçeve dokusu */
    .bg-brass-mount {
      background: radial-gradient(circle at 50% 30%, #3e2613 0%, #1f1107 70%, #0c0602 100%);
      box-shadow: 0 15px 35px -5px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255, 230, 160, 0.25);
    }
  </style>
</head>

<body class="bg-[#0f172a] text-slate-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans selection:bg-amber-400 selection:text-black">

  <main class="max-w-2xl w-full flex flex-col items-center gap-6">
    
    <!-- Başlık & Açıklama -->
    <div class="text-center space-y-1">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
        <span>●</span> STANDALONE COMPONENT
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold tracking-wide text-amber-200" style="font-family: 'Cinzel', serif;">
        Osmanlı Pirinç Mekanik Kilit
      </h1>
      <p class="text-slate-400 text-xs sm:text-sm max-w-md">
        Harici görsel veya ses dosyası gerektirmeyen, AI ajanlarına doğrudan aktarılabilir tam modül.
      </p>
    </div>

    <!-- KİLİT BİLEŞENİ MONTAJ ALANI (COMPONENT WRAPPER) -->
    <div class="relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl flex flex-col items-center justify-center gap-4">
      
      <!-- Arka Plan Montaj Plakası / Bezel -->
      <div class="relative w-36 h-36 rounded-full bg-brass-mount border-[3px] border-[#caa043] flex items-center justify-center transition-all duration-300">
        
        <!-- Durum Işıma Halkası (Pulse Halo) -->
        <span id="lockPulseRing" class="absolute inset-0 rounded-full bg-amber-500/0 transition-all duration-300 pointer-events-none"></span>

        <!-- ==========================================================================
             2. SAF SVG KİLİT VEŞVEŞE KODU (PROJENE BURAYI KOPYALAYABİLİRSİN)
             ========================================================================== -->
        <button id="padlockBtn" class="group relative flex flex-col items-center justify-center focus:outline-none transition-transform duration-200 active:scale-95" aria-label="Mekanik Kilit">
          
          <svg class="w-20 h-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- 1. Metalik Pirinç Kulp Gradyanı -->
              <linearGradient id="shackleMetal" x1="18" y1="8" x2="46" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fff8d6"/>
                <stop offset="30%" stop-color="#caa043"/>
                <stop offset="70%" stop-color="#735212"/>
                <stop offset="100%" stop-color="#caa043"/>
              </linearGradient>

              <!-- 2. Tombak Pirinç Kilit Gövde Gradyanı -->
              <linearGradient id="lockBodyGradient" x1="14" y1="25" x2="50" y2="58" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fce5a3"/>
                <stop offset="25%" stop-color="#d4af37"/>
                <stop offset="65%" stop-color="#8a661f"/>
                <stop offset="100%" stop-color="#4a330b"/>
              </linearGradient>

              <!-- 3. Yakut Mühür / Yuva Merkez Radyal Gradyanı -->
              <radialGradient id="keyholeRuby" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ff4757"/>
                <stop offset="65%" stop-color="#990d18"/>
                <stop offset="100%" stop-color="#2a0306"/>
              </radialGradient>
            </defs>

            <!-- KİLİT KULPU (SHACKLE) - .unlocked SINIFI EKLENDİĞİNDE AÇILIR -->
            <g id="shackleGroup" class="lock-shackle">
              <!-- Derinlik gölgesi -->
              <path d="M23 27V18C23 13.0294 27.0294 9 32 9C36.9706 9 41 13.0294 41 18V27" stroke="rgba(0,0,0,0.5)" stroke-width="5.5" stroke-linecap="round"/>
              <!-- Metal kulp yüzeyi -->
              <path d="M23 27V18C23 13.0294 27.0294 9 32 9C36.9706 9 41 13.0294 41 18V27" stroke="url(#shackleMetal)" stroke-width="4.5" stroke-linecap="round"/>
              <!-- Işık yansıması (Gleam) -->
              <path d="M23 22V26" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.65"/>
            </g>

            <!-- TOMBAK KİLİT GÖVDESİ -->
            <rect x="16" y="25" width="32" height="27" rx="5" fill="url(#lockBodyGradient)" stroke="#ffd87d" stroke-width="1.2"/>
            
            <!-- GRAVÜR VE RUMİ İŞLEMELER -->
            <path d="M20 29C24 32 28 32 32 29C36 32 40 32 44 29" stroke="#664610" stroke-width="0.8" fill="none" opacity="0.85"/>
            <path d="M20 47C24 44 28 44 32 47C36 44 40 44 44 47" stroke="#664610" stroke-width="0.8" fill="none" opacity="0.85"/>

            <!-- PİRİNÇ KÖŞE PERÇİNLERİ (4 Adet) -->
            <circle cx="19.5" cy="28.5" r="1.1" fill="#fff5cc" stroke="#664610" stroke-width="0.4"/>
            <circle cx="44.5" cy="28.5" r="1.1" fill="#fff5cc" stroke="#664610" stroke-width="0.4"/>
            <circle cx="19.5" cy="47.5" r="1.1" fill="#fff5cc" stroke="#664610" stroke-width="0.4"/>
            <circle cx="44.5" cy="47.5" r="1.1" fill="#fff5cc" stroke="#664610" stroke-width="0.4"/>

            <!-- MERKEZİ YAKUT GÖZ / ANAHTAR YUVASI ESCUTCHEON -->
            <circle cx="32" cy="38" r="5.5" fill="#120a03" stroke="#ffd87d" stroke-width="0.9"/>
            <path id="keyholeSlot" d="M32 35C31.05 35 30.28 35.77 30.28 36.72C30.28 37.31 30.58 37.83 31.03 38.13L30.28 42H33.72L32.97 38.13C33.42 37.83 33.72 37.31 33.72 36.72C33.72 35.77 32.95 35 32 35Z" fill="url(#keyholeRuby)"/>
            <circle cx="32" cy="36.7" r="1" fill="#ffffff" opacity="0.75"/>
          </svg>

        </button>

      </div>

      <!-- Durum Etiketi (Badge) -->
      <span id="lockBadge" class="px-3 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow">
        DURUM: KİLİTLİ
      </span>

    </div>

    <!-- AI AJANI VE TEST KONTROL PANELİ -->
    <div class="w-full bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400">AJAN ENTEGRASYON TESTİ</h2>
        <span class="text-[11px] text-slate-500 font-mono">PadlockController API</span>
      </div>

      <!-- Test Butonları -->
      <div class="grid grid-cols-3 gap-2.5">
        <button id="btnTriggerUnlock" class="py-2.5 px-3 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>
          unlock()
        </button>

        <button id="btnTriggerLock" class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          lock()
        </button>

        <button id="btnTriggerReject" class="py-2.5 px-3 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-white font-medium text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          reject()
        </button>
      </div>

      <!-- AI Entegrasyon Kod Blok İpuçları -->
      <div class="bg-black/50 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
        <p class="text-amber-400">// AI Ajanı İçin Hızlı Kullanım Rehberi:</p>
        <p><span class="text-purple-400">PadlockController</span>.<span class="text-emerald-400">unlock</span>(); <span class="text-slate-500">// Kulpu açar, yay sesini ve çanı çalar</span></p>
        <p><span class="text-purple-400">PadlockController</span>.<span class="text-emerald-400">reject</span>(); <span class="text-slate-500">// Sarsılır ve tok mekanik red sesi verir</span></p>
        <p><span class="text-purple-400">PadlockController</span>.<span class="text-emerald-400">lock</span>();   <span class="text-slate-500">// Kulpu geri indirip kilitler</span></p>
      </div>

    </div>

  </main>

  <script>
    /* ==========================================================================
       3. WEB AUDIO API MEKANİK SES MOTORU (HARİCİ MP3 GEREKTİRMEZ)
       ========================================================================== */
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    // A. Yaylı Mekanik Kilit Kurtulma Sesi (Double-Action Spring Release)
    function playSpringReleaseSound() {
      try {
        const ctx = getAudioContext();
        
        // 1. Aşama: Pirinç mandal kurtulma tıkırtısı (High-pitch metal click)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1800, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.04);
        gain1.gain.setValueAtTime(0.3, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.04);

        // 2. Aşama: 50ms sonra çelik yayın fırlama rezonansı
        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1200, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.35);
          gain2.gain.setValueAtTime(0.22, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.35);
        }, 50);

        if (navigator.vibrate) navigator.vibrate([25, 35, 55]);
      } catch (e) {
        console.warn("Audio unavailable:", e);
      }
    }

    // B. Hatalı Kombinasyon / Reddedilme Tok Metal Darbe Sesi
    function playRejectClunkSound() {
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);

        if (navigator.vibrate) navigator.vibrate([40, 50, 40]);
      } catch (e) {}
    }

    // C. Kapanma / Kilitlenme Sesi (Lock Snap)
    function playLockSnapSound() {
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);

        if (navigator.vibrate) navigator.vibrate(20);
      } catch (e) {}
    }

    /* ==========================================================================
       4. PADLOCK KONTROL API'Sİ (AJANIN KULLANACAĞI MERKEZİ NESNE)
       ========================================================================== */
    const PadlockController = {
      isUnlocked: false,
      
      elements: {
        shackle: document.getElementById('shackleGroup'),
        button: document.getElementById('padlockBtn'),
        badge: document.getElementById('lockBadge'),
        pulse: document.getElementById('lockPulseRing')
      },

      // Kilidi Açar
      unlock: function() {
        this.isUnlocked = true;
        this.elements.shackle.classList.add('unlocked');
        this.elements.button.classList.remove('lock-jiggle');
        this.elements.button.classList.add('lock-core-unlocked');
        
        this.elements.pulse.className = "absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none";
        this.elements.badge.textContent = "DURUM: AÇILDI";
        this.elements.badge.className = "px-3 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-sm";

        playSpringReleaseSound();
      },

      // Kilidi Kapatır
      lock: function() {
        this.isUnlocked = false;
        this.elements.shackle.classList.remove('unlocked');
        this.elements.button.classList.remove('lock-core-unlocked', 'lock-jiggle');
        
        this.elements.pulse.className = "absolute inset-0 rounded-full bg-amber-500/0 pointer-events-none";
        this.elements.badge.textContent = "DURUM: KİLİTLİ";
        this.elements.badge.className = "px-3 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow";

        playLockSnapSound();
      },

      // Hatalı Kod Girildiğinde Sarsılır ve Red Sesi Çalar
      reject: function() {
        playRejectClunkSound();
        this.elements.button.classList.remove('lock-jiggle');
        // Yeniden tetiklemek için reflow
        void this.elements.button.offsetWidth;
        this.elements.button.classList.add('lock-jiggle');

        this.elements.badge.textContent = "HATALI KOMBİNASYON!";
        this.elements.badge.className = "px-3 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-sm";
        
        setTimeout(() => {
          if (!this.isUnlocked) {
            this.elements.badge.textContent = "DURUM: KİLİTLİ";
            this.elements.badge.className = "px-3 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow";
          }
        }, 1200);
      }
    };

    /* ==========================================================================
       5. ARAYÜZ ETKİLEŞİMLERİ VE BUTON DİNLEYİCİLERİ
       ========================================================================== */
    document.getElementById('btnTriggerUnlock').addEventListener('click', () => {
      PadlockController.unlock();
    });

    document.getElementById('btnTriggerLock').addEventListener('click', () => {
      PadlockController.lock();
    });

    document.getElementById('btnTriggerReject').addEventListener('click', () => {
      PadlockController.reject();
    });

    // Kilit düğmesine doğrudan tıklandığında aç / reddet testi
    document.getElementById('padlockBtn').addEventListener('click', () => {
      if (PadlockController.isUnlocked) {
        PadlockController.lock();
      } else {
        PadlockController.unlock();
      }
    });
  </script>

</body>
</html>