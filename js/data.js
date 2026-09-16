/**
 * MEBİ 11.3.1 Tarih Dersi - Veri Tanımları
 * 9 Temel Olay ve 3 Dönemlik Zaman Kadranı (Osmanlı Usturlabı) Veri Modelleri
 */

// 9 Olayın Veri Yapısı (PDF'teki kazanımlar ve kronolojik akışa tam uyumlu)
const EVENTS = [
  {
    id: 1,
    stepTitle: "1. Olay",
    title: "1876 – Kanun-ı Esasi ve I. Meşrutiyet",
    image: "1.görsel.png",
    video: "videolar/info1.mp4",
    coords: { left: "1.04%", top: "9.38%", width: "31.64%", height: "26.37%" },
    narration: "Osmanlı Devleti, 1876 yılında ilk anayasası olan Kanun-ı Esasi’yi ilan ederek meşruti yönetime adım attı. Halkın temsilcilerinden oluşan Meclis-i Umumi açıldı. Ancak meclisin getirdiği bu yeni anayasal düzen, çok geçmeden patlak verecek büyük bir savaşla sarsılacaktı.",
    connection: "İlk anayasal yönetimin kurulması, hemen ardından gelen 93 Harbi'nin yol açtığı büyük sarsıntıya ve meclisin kapatılmasına uzanan süreci başlatmıştır."
  },
  {
    id: 2,
    stepTitle: "2. Olay",
    title: "1877-1878 – 93 Harbi",
    image: "2.görsel.png",
    video: "videolar/info2.mp4",
    coords: { left: "35.16%", top: "9.38%", width: "30.47%", height: "26.37%" },
    narration: "Yeni meclisin açılışının hemen ardından Osmanlı Devleti ile Rusya arasında 93 Harbi başladı. Cephelerde yaşanan ağır mağlubiyetler ve başkente ulaşan göç dalgaları, devleti derin bir idari ve mali bunalıma sürükleyerek meclisin geleceğini tartışmalı hale getirdi.",
    connection: "Savaşın ortaya çıkardığı kriz ortamı, Sultan II. Abdülhamid'in meclisi süresiz tatil etmesine gerekçe oluşturmuştur."
  },
  {
    id: 3,
    stepTitle: "3. Olay",
    title: "1878 – Meclis-i Umumi'nin Kapatılması",
    image: "3.görsel.png",
    video: "videolar/info3.mp4",
    coords: { left: "67.71%", top: "9.38%", width: "31.12%", height: "26.37%" },
    narration: "93 Harbi’nin yarattığı ağır şartları gerekçe gösteren Sultan II. Abdülhamid, 1878’de Meclis-i Umumi’yi süresiz olarak kapattı. Kanun-ı Esasi askıya alınırken meşruti idareden padişahın mutlak otoritesine dayanan otuz yıllık yeni bir yönetim evresine geçildi.",
    connection: "Meclisin kapatılması ve anayasanın askıya alınması, otuz yıl sürecek merkeziyetçi ve mutlakıyetçi yönetimi başlatmıştır."
  },
  {
    id: 4,
    stepTitle: "4. Olay",
    title: "II. Abdülhamid Dönemi (1878-1909)",
    image: "4.görsel.png",
    video: "videolar/info4.mp4",
    coords: { left: "1.04%", top: "36.33%", width: "31.64%", height: "25.98%" },
    narration: "Bu dönemde devletin parçalanmasını önlemek adına merkezi otorite güçlendirildi ve sıkı bir denetim politikası uygulandı. Ancak basına uygulanan sansür ve muhalif aydınların uzaklaştırılması, meşrutiyeti savunan yeni fikir hareketlerinin yer altına inip teşkilatlanmasına ortam hazırladı.",
    connection: "Uygulanan sıkı denetim ve sürgünler, muhalif aydınların Jön Türkler adıyla gizli cemiyetler kurmasını hızlandırmıştır."
  },
  {
    id: 5,
    stepTitle: "5. Olay",
    title: "Jön Türklerin Yükselişi (1902-1907)",
    image: "5.görsel.png",
    video: "videolar/info5.mp4",
    coords: { left: "35.16%", top: "36.33%", width: "30.47%", height: "25.98%" },
    narration: "Baskılara tepki gösteren aydınlar, anayasal düzeni yeniden kurmak amacıyla Jön Türkler hareketi altında birleşti. Zamanla İttihat ve Terakki Cemiyeti çatısında toplanan bu kadrolar, özellikle Rumeli’deki genç subaylar arasında yayılarak imparatorluğun kaderini değiştirecek bir güce dönüştü.",
    connection: "Rumeli'deki genç subaylar arasında güçlenen İttihat ve Terakki, dış politikadaki Reval gelişmesiyle eyleme geçme kararı almıştır."
  },
  {
    id: 6,
    stepTitle: "6. Olay",
    title: "Reval Görüşmeleri ve Denge Politikası (1908)",
    image: "6.görsel.png",
    video: "videolar/info6.mp4",
    coords: { left: "67.71%", top: "36.33%", width: "31.12%", height: "25.98%" },
    narration: "1908 yılında İngiltere ile Rusya’nın Reval’de buluşması, Makedonya ve Osmanlı topraklarının paylaşılacağı endişesini doğurdu. Vatanın elden gideceğini düşünen İttihat ve Terakki mensubu subaylar, yabancı müdahalesini engellemenin tek yolunun meşrutiyeti derhal yeniden ilan etmek olduğuna inandı.",
    connection: "Toprakların paylaşılacağı endişesi, subayların Rumeli'de ayaklanarak II. Meşrutiyet'in ilanını zorlamasına yol açmıştır."
  },
  {
    id: 7,
    stepTitle: "7. Olay",
    title: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı",
    image: "7.görsel.png",
    video: "videolar/info7.mp4",
    coords: { left: "1.04%", top: "62.89%", width: "31.64%", height: "26.17%" },
    narration: "Rumeli’de askerî birliklerin dağa çıkması ve halkın yoğun baskısı karşısında Sultan II. Abdülhamid, 23 Temmuz 1908’de meşrutiyeti yeniden ilan etti. Meydanlarda büyük bir hürriyet coşkusu yaşanırken meclis kapılarını otuz yıl sonra yeniden açtı.",
    connection: "Meşrutiyetin ilanı, hareketi yönlendiren İttihat ve Terakki Cemiyeti'nin ordu ve siyasette en etkin güç haline gelmesini sağlamıştır."
  },
  {
    id: 8,
    stepTitle: "8. Olay",
    title: "İttihat ve Terakki'nin Güçlenmesi (1908-1909)",
    image: "8.görsel.png",
    video: "videolar/info8.mp4",
    coords: { left: "35.16%", top: "62.89%", width: "30.47%", height: "26.17%" },
    narration: "Meşrutiyetin ilanıyla birlikte İttihat ve Terakki Cemiyeti, ordudaki subayların desteğiyle yönetimde belirleyici güç oldu. Çok partili siyasi hayata geçilse de Bâbıâli ile cemiyet arasındaki rekabet ve basındaki sert tartışmalar, başkentte yeni bir çatışma ortamı doğurdu.",
    connection: "Cemiyetin siyasetteki ağırlığı ve basındaki kutuplaşma, meşrutiyet karşıtı 31 Mart ayaklanmasını tetiklemiştir."
  },
  {
    id: 9,
    stepTitle: "9. Olay",
    title: "31 Mart 1909 – 31 Mart Olayı",
    image: "9.görsel.png",
    video: "videolar/info9.mp4",
    coords: { left: "67.71%", top: "62.89%", width: "31.12%", height: "26.17%" },
    narration: "Meşrutiyet yönetimine son vermek isteyen gruplar 1909’da 31 Mart İsyanı’nı başlattı. Selanik’ten gelen Hareket Ordusu ayaklanmayı bastırarak anayasal düzeni korudu. Olayın ardından II. Abdülhamid tahttan indirildi, yapılan anayasa değişiklikleriyle yönetim yetkisi tamamen halkın temsilcisi olan meclise geçti.",
    connection: "İsyanın bastırılması ve 1909 Anayasa değişiklikleri, halk iradesini ve meclis üstünlüğünü devlette kalıcı kılmıştır."
  }
];

// 3 Kadran Aşaması (Her Aşamada 3 Konu Eş Zamanlı Olarak Hizalanır)
// Öğrenci bildiği konuyu üst ibreye hizaladığında, diğer iki konu da otomatik olarak doğru eşleşir.
const ASTROLABE_STAGES = [
  // =========================================================================
  // 1. AŞAMA
  // Dilim 0: Kanun-ı Esasi ve I. Meşrutiyet (1876)
  // Dilim 1: 93 Harbi (1877-1878)
  // Dilim 2: Meclis-i Umumi'nin Kapatılması (1878)
  // =========================================================================
  {
    id: 1,
    title: "1. Aşama",
    pillName: "1. Aşama",
    correct: { ring1: 0, ring2: 0, ring3: 0 },
    initial: { ring1: 1, ring2: 0, ring3: 2 },
    explanation: "I. Meşrutiyet, 93 Harbi ve Meclisin Kapatılması süreçlerinin tüm neden ve sonuç bağları eş zamanlı olarak başarıyla hizalandı.",
    hints: {
      event: "Kadranda yer alan olaylardan bildiğiniz birini belirleyiniz ve bu olayın neden-sonuç zincirine odaklanınız.",
      cause: "2. kadranda seçtiğiniz olaya yol açan nedene odaklanarak 1. kadranı hizalayınız.",
      effect: "2. kadranda seçtiğiniz olayın devlette doğurduğu sonuca odaklanarak 3. kadranı hizalayınız.",
      both: "Seçtiğiniz olayın hem nedenini hem de sonucunu gözden geçirerek üç halkayı aynı hizaya getiriniz.",
      general: "Kadrandaki üç konunun neden ve sonuç ilişkilerini değerlendiriniz."
    },
    rings: {
      ring1: [
        { text: "Genç Osmanlıların mutlak otoriteyi sınırlandırarak anayasal düzene geçişi savunması", label: "Genç Osmanlılar" },
        { text: "Rusya'nın Osmanlı topraklarına saldırması ve Balkan bunalımının savaşa dönüşmesi", label: "Rus Saldırısı" },
        { text: "93 Harbi'nin devlette ortaya çıkardığı ağır buhran ve kriz ortamı", label: "93 Harbi Buhranı" }
      ],
      ring2: [
        { text: "1876 – Kanun-ı Esasi ve I. Meşrutiyet", label: "I. Meşrutiyet" },
        { text: "1877-1878 – 93 Harbi", label: "93 Harbi" },
        { text: "1878 – Meclis-i Umumi'nin Kapatılması", label: "Meclisin Kapatılması" }
      ],
      ring3: [
        { text: "Osmanlı Devleti'nin anayasal yönetime geçmesi ve ilk kez Meclis-i Umumi'nin açılması", label: "Anayasal Yönetim" },
        { text: "Cephelerde ağır mağlubiyetler alınması, büyük göç dalgaları ve devlette mali kriz çıkması", label: "Ağır Kayıplar ve Göç" },
        { text: "Kanun-ı Esasi'nin askıya alınarak padişahın mutlak otoritesine dayanan merkeziyetçi yönetime geçilmesi", label: "Merkeziyetçi Yönetim" }
      ]
    }
  },

  // =========================================================================
  // 2. AŞAMA
  // Dilim 0: II. Abdülhamid Dönemi (1878-1909)
  // Dilim 1: Jön Türklerin Yükselişi (1902-1907)
  // Dilim 2: Reval Görüşmeleri ve Denge Politikası (1908)
  // =========================================================================
  {
    id: 2,
    title: "2. Aşama",
    pillName: "2. Aşama",
    correct: { ring1: 0, ring2: 0, ring3: 0 },
    initial: { ring1: 2, ring2: 1, ring3: 0 },
    explanation: "Merkeziyetçi yönetim ve sansür, Jön Türklerin teşkilatlanması ve Reval Görüşmeleri süreçlerinin tüm neden ve sonuç bağları eş zamanlı olarak başarıyla hizalandı.",
    hints: {
      event: "Kadranda yer alan olaylardan bildiğiniz birini belirleyiniz ve bu olayın neden-sonuç zincirine odaklanınız.",
      cause: "2. kadranda seçtiğiniz olaya yol açan nedene odaklanarak 1. kadranı hizalayınız.",
      effect: "2. kadranda seçtiğiniz olayın doğurduğu doğrudan sonuca odaklanarak 3. kadranı hizalayınız.",
      both: "Seçtiğiniz olayın hem nedenini hem de sonucunu gözden geçirerek üç halkayı aynı hizaya getiriniz.",
      general: "Kadrandaki üç konunun neden ve sonuç ilişkilerini değerlendiriniz."
    },
    rings: {
      ring1: [
        { text: "Meclisin kapatılmasının ardından devletin parçalanmasını önleme ve merkezi otoriteyi güçlendirme arayışı", label: "Merkezi Otorite" },
        { text: "Sıkı denetim ve sansüre tepki gösteren aydınların anayasal düzeni yeniden kurmak istemesi", label: "Aydın Muhalefeti" },
        { text: "İngiltere ile Rusya'nın Osmanlı topraklarını ve Makedonya'yı paylaşmak üzere buluşması", label: "Dış Müdahale Tehlikesi" }
      ],
      ring2: [
        { text: "II. Abdülhamid Dönemi (1878-1909)", label: "II. Abdülhamid Dönemi" },
        { text: "Jön Türklerin Yükselişi (1902-1907)", label: "Jön Türkler" },
        { text: "Reval Görüşmeleri ve Denge Politikası (1908)", label: "Reval Görüşmeleri" }
      ],
      ring3: [
        { text: "Basına sansür uygulanması ve muhalif aydınların yer altına inerek gizli cemiyetler kurması", label: "Sıkı Takip ve Sansür" },
        { text: "Muhalif kadroların İttihat ve Terakki çatısında birleşerek özellikle Rumeli subayları arasında yayılması", label: "Gizli Teşkilatlanma" },
        { text: "Vatanın parçalanacağını anlayan İttihatçı subayların Rumeli'de meşrutiyet için ayaklanarak dağa çıkması", label: "Rumeli Ayaklanması" }
      ]
    }
  },

  // =========================================================================
  // 3. AŞAMA
  // Dilim 0: 23 Temmuz 1908 – II. Meşrutiyet'in İlanı
  // Dilim 1: İttihat ve Terakki'nin Güçlenmesi (1908-1909)
  // Dilim 2: 31 Mart 1909 – 31 Mart Olayı
  // =========================================================================
  {
    id: 3,
    title: "3. Aşama",
    pillName: "3. Aşama",
    correct: { ring1: 0, ring2: 0, ring3: 0 },
    initial: { ring1: 0, ring2: 2, ring3: 1 },
    explanation: "II. Meşrutiyet'in ilanı, İttihat ve Terakki'nin güçlenmesi ve 31 Mart Olayı süreçlerinin tüm neden ve sonuç bağları eş zamanlı olarak başarıyla hizalandı.",
    hints: {
      event: "Kadranda yer alan olaylardan bildiğiniz birini belirleyiniz ve bu olayın neden-sonuç zincirine odaklanınız.",
      cause: "2. kadranda seçtiğiniz olaya yol açan nedene odaklanarak 1. kadranı hizalayınız.",
      effect: "2. kadranda seçtiğiniz olayın devlette doğurduğu sonuca odaklanarak 3. kadranı hizalayınız.",
      both: "Seçtiğiniz olayın hem nedenini hem de sonucunu gözden geçirerek üç halkayı aynı hizaya getiriniz.",
      general: "Kadrandaki üç konunun neden ve sonuç ilişkilerini değerlendiriniz."
    },
    rings: {
      ring1: [
        { text: "Dış müdahaleleri engellemenin ve devletin dağılmasını önlemenin tek yolunun meşrutiyet olarak görülmesi", label: "Dağılmayı Önleme Kararı" },
        { text: "Meşrutiyetin ilanında başrol oynayan ordu ve genç subayların cemiyeti desteklemesi", label: "Genç Subay Desteği" },
        { text: "Meşrutiyet yönetimine ve İttihat ve Terakki'nin siyasetteki ağırlığına karşı duyulan rahatsızlık ve kışkırtmalar", label: "Rejim Karşıtlığı" }
      ],
      ring2: [
        { text: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı", label: "II. Meşrutiyet" },
        { text: "İttihat ve Terakki'nin Güçlenmesi (1908-1909)", label: "İttihat ve Terakki" },
        { text: "31 Mart 1909 – 31 Mart Olayı", label: "31 Mart Olayı" }
      ],
      ring3: [
        { text: "Otuz yıllık aranın ardından Meclis-i Mebusan'ın açılarak padişahın mutlak otoritesinin sınırlandırılması", label: "Meclisin Açılması" },
        { text: "Cemiyetin devlet yönetiminde ve siyasi kararlarda en belirleyici güç hâline gelmesi", label: "Yönetimde Etkinlik" },
        { text: "Hareket Ordusu'nun isyanı bastırması, II. Abdülhamid'in tahttan indirilmesi ve meclis üstünlüğünün kesinleşmesi", label: "Meclis Üstünlüğü" }
      ]
    }
  }
];
