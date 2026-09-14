/**
 * Tailwind CSS Tema Yapılandırması
 * Döneme uygun Osmanlı serlevha, parşömen ve altın renk paleti
 */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Lora', 'Georgia', 'serif'],
      },
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#f8f4eb',
          200: '#eee3d0',
          300: '#e1cdb0',
          800: '#644e33',
          900: '#433422',
        },
        ottoman: {
          red: '#8b1e1e',
          darkred: '#661414',
          gold: '#c49a45',
          darkgold: '#9a752b',
          navy: '#18263e',
        }
      }
    }
  }
};
