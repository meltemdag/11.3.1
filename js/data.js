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
    title: "13 Nisan 1909 – 31 Mart Olayı",
    image: "9.görsel.png",
    video: "videolar/info9.mp4",
    coords: { left: "67.71%", top: "62.89%", width: "31.12%", height: "26.17%" },
    narration: "Meşrutiyet yönetimine son vermek isteyen gruplar 1909’da 31 Mart İsyanı’nı başlattı. Selanik’ten gelen Hareket Ordusu ayaklanmayı bastırarak anayasal düzeni korudu. Olayın ardından II. Abdülhamid tahttan indirildi, yapılan anayasa değişiklikleriyle yönetim yetkisi tamamen halkın temsilcisi olan meclise geçti.",
    connection: "İsyanın bastırılması ve 1909 Anayasa değişiklikleri, halk iradesini ve meclis üstünlüğünü devlette kalıcı kılmıştır."
  }
];

// 3 Dönem, Her Dönemde 2 Olay (Toplam 6 Kadran Aşaması)
// Sıralama: 1. Halka: Neden, 2. Halka: Olay, 3. Halka: Sonuç
const ASTROLABE_STAGES = [
  // --- I. DÖNEM (1876 – 1878) ---
  // 1. Olay: 1876 Kanun-ı Esasi ve I. Meşrutiyet
  {
    id: 1,
    title: "1876",
    pillName: "1876",
    correct: { ring1: 0, ring2: 1, ring3: 1 },
    initial: { ring1: 1, ring2: 0, ring3: 0 },
    explanation: "Genç Osmanlıların meşrutiyet baskısı ve Tersane Konferansı kararlarını engelleme arzusuyla ilk anayasa Kanun-ı Esasi ilan edilmiş; halk temsilcilerinden oluşan Meclis-i Umumi açılarak anayasal düzene geçilmiştir.",
    rings: {
      ring1: [
        { text: "Genç Osmanlılar aydınlarının mutlak otoriteyi sınırlandırmak ve Tersane Konferansı'nda Avrupalıların müdahalesini önlemek istemesi", label: "Genç Osmanlılar" },
        { text: "Balkanlarda artan göç hareketleri nedeniyle başkentte genel seferberlik ilan edilmesi", label: "Balkan Göçleri" },
        { text: "Rus ordusunun Edirne sınırını geçerek barış antlaşması imzalamayı dayatması", label: "Rus İlerlemesi" }
      ],
      ring2: [
        { text: "1876 – Tersane Konferansı'nın toplanması", label: "Tersane Zirvesi" },
        { text: "23 Aralık 1876 – Kanun-ı Esasi'nin ilanı ve I. Meşrutiyet", label: "Kanun-ı Esasi" },
        { text: "1876 – Sultan Abdülaziz'in tahttan indirilmesi", label: "Taht Değişimi" }
      ],
      ring3: [
        { text: "Padişahın mutlak otoritesine dayanan sıkı denetim evresinin başlaması", label: "Mutlak İdare" },
        { text: "Halk temsilcilerinden oluşan Meclis-i Umumi'nin açılarak anayasal düzene geçilmesi", label: "Meclisin Açılışı" },
        { text: "Osmanlı Devleti'nin Balkan topraklarının yönetimini tamamen terk etmesi", label: "Toprak Terki" }
      ]
    }
  },

  // 2. Olay: 1877-1878 93 Harbi ve Meclisin Kapatılması
  {
    id: 2,
    title: "1877 – 1878",
    pillName: "1877 – 1878",
    correct: { ring1: 1, ring2: 0, ring3: 2 },
    initial: { ring1: 0, ring2: 1, ring3: 1 },
    explanation: "1877-1878 Osmanlı-Rus Savaşı'nın (93 Harbi) yarattığı askeri ve mali buhran gerekçe gösterilerek Meclis-i Umumi süresiz tatil edilmiş; Kanun-ı Esasi askıya alınarak otuz yıllık mutlak yönetim evresine geçilmiştir.",
    rings: {
      ring1: [
        { text: "Balkanlarda Hristiyan tebaanın güvenliğini gerekçe gösteren Avrupalı devletlerin baskı kurması", label: "Avrupa Baskısı" },
        { text: "93 Harbi'nde alınan ağır yenilgiler ve başkente yaşanan göç dalgalarının derin bir idari-mali bunalım yaratması", label: "93 Harbi Buhranı" },
        { text: "İstanbul'daki Avcı Taburlarının anayasa talebiyle Yıldız Sarayı'nı kuşatması", label: "Saray Kuşatması" }
      ],
      ring2: [
        { text: "13 Şubat 1878 – Meclis-i Umumi'nin tatil edilmesi (kapatılması)", label: "Meclisin Tatili" },
        { text: "1877 – Rusya'ya karşı kutsal cihat ilan edilmesi", label: "Cihat İlanı" },
        { text: "1878 – Ayastefanos Antlaşması'nın imzalanması", label: "Ayastefanos" }
      ],
      ring3: [
        { text: "Rus ordusunun İstanbul Boğazı'na girerek Osmanlı yönetimine doğrudan el koyması", label: "Rus İşgali" },
        { text: "Halk temsilcilerinin meclisi kendi kararıyla feshederek yetkileri sadrazama devretmesi", label: "Meclis Feshi" },
        { text: "Kanun-ı Esasi'nin askıya alınması ve Sultan II. Abdülhamid'in merkeziyetçi mutlak otorite devrinin başlaması", label: "Mutlak İdare" }
      ]
    }
  },

  // --- II. DÖNEM (1908) ---
  // 3. Olay: Reval Görüşmeleri ve Rumeli Ayaklanması
  {
    id: 3,
    title: "1908",
    pillName: "1908",
    correct: { ring1: 0, ring2: 1, ring3: 1 },
    initial: { ring1: 1, ring2: 0, ring3: 0 },
    explanation: "Reval Görüşmeleri'nde Makedonya'nın paylaşılacağını anlayan İttihatçı subaylar Rumeli'de dağa çıkarak isyan etmiş; meclisin yeniden açılması talebiyle saraya telgraflar yağdırarak II. Meşrutiyet sürecini tetiklemiştir.",
    rings: {
      ring1: [
        { text: "İngiltere ve Rusya'nın Reval'de görüşerek Makedonya ve Osmanlı topraklarını paylaşacağı endişesinin doğması", label: "Reval Endişesi" },
        { text: "Avusturya-Macaristan'ın Bosna-Hersek topraklarını resmen ilhak ettiğini duyurması", label: "Bosna'nın İlhakı" },
        { text: "Bulgaristan'ın bağımsızlık ilanına karşı Osmanlı ordusunun hudutlara asker yığması", label: "Sınır Yığınağı" }
      ],
      ring2: [
        { text: "Haziran 1908 – Baltık kıyısında Reval diplomatik zirvesi", label: "Reval Zirvesi" },
        { text: "Temmuz 1908 – İttihatçı subayların Rumeli'de meşrutiyet için dağa çıkması", label: "Rumeli Ayaklanması" },
        { text: "1908 – Paris'te II. Jön Türk Kongresi'nin toplanması", label: "Paris Kongresi" }
      ],
      ring3: [
        { text: "Osmanlı Devleti'nin Balkan devletleriyle tek taraflı sınır antlaşması yapması", label: "Sınır Antlaşması" },
        { text: "Padişaha meclisin toplanması için yüzlerce telgraf çekilerek II. Meşrutiyet'in ilanının zorlanması", label: "Meşrutiyet Baskısı" },
        { text: "Avrupa devletlerinin Rumeli bölgesine doğrudan askeri vali ataması", label: "Avrupa Valisi" }
      ]
    }
  },

  // 4. Olay: 23 Temmuz 1908 II. Meşrutiyet'in İlanı
  {
    id: 4,
    title: "23 Temmuz 1908",
    pillName: "23 Temmuz 1908",
    correct: { ring1: 0, ring2: 1, ring3: 0 },
    initial: { ring1: 1, ring2: 0, ring3: 1 },
    explanation: "Rumeli'deki subay ayaklanması ve halkın yoğun hürriyet talebi karşısında Sultan II. Abdülhamid meşrutiyeti yeniden ilan etmiş; otuz yıl aradan sonra meclis açılarak çok partili siyasi hayata geçilmiştir.",
    rings: {
      ring1: [
        { text: "Rumeli askerî birliklerinin isyanı ve halkın anayasanın yürürlüğe girmesi yönündeki yoğun baskısı", label: "Halk ve Ordu Baskısı" },
        { text: "İtalya donanmasının Çanakkale Boğazı'nı topa tutarak barış şartları dayatması", label: "İtalyan Ablukası" },
        { text: "Sadrazam Hüseyin Hilmi Paşa'nın meclisi feshetmek için saraya baskı yapması", label: "Sadrazam Baskısı" }
      ],
      ring2: [
        { text: "1908 – Osmanlı Hürriyet Cemiyeti'nin kurulması", label: "Cemiyet Kuruluşu" },
        { text: "23 Temmuz 1908 – II. Meşrutiyet'in resmen ilan edilmesi", label: "II. Meşrutiyet" },
        { text: "1908 – Selanik Hürriyet Meydanı gösterileri", label: "Selanik Gösterisi" }
      ],
      ring3: [
        { text: "Meclis-i Mebusan'ın otuz yıl sonra yeniden açılması, seçimlerin yapılması ve çok partili hayata geçilmesi", label: "Çok Partili Düzen" },
        { text: "Sultan II. Abdülhamid'in kendi isteğiyle tahttan feragat etmesi", label: "Taht Feragati" },
        { text: "Kanun-ı Esasi'nin yerine yeni bir anayasa komisyonu kurulması", label: "Yeni Anayasa" }
      ]
    }
  },

  // --- III. DÖNEM (1909) ---
  // 5. Olay: 13 Nisan 1909 31 Mart İsyanı
  {
    id: 5,
    title: "13 Nisan 1909",
    pillName: "13 Nisan 1909",
    correct: { ring1: 1, ring2: 1, ring3: 0 },
    initial: { ring1: 0, ring2: 0, ring3: 1 },
    explanation: "Siyasi kutuplaşma, mektepli-alaylı subay çatışması ve gazeteci Hasan Fehmi Bey suikastıyla tırmanan gerilim sonucu meşrutiyet karşıtı 31 Mart İsyanı patlak vermiş; başkentte hükümet istifa etmek zorunda kalmıştır.",
    rings: {
      ring1: [
        { text: "Bulgaristan'ın bağımsızlık ilanına karşı başkentte genel seferberlik duyurulması", label: "Seferberlik Kararı" },
        { text: "İttihat ve Terakki ile muhalifler arasındaki iktidar mücadelesi, ordudaki mektepli-alaylı çatışması ve Hasan Fehmi Bey cinayeti", label: "Siyasi Gerilim" },
        { text: "Girit Meclisi'nin Yunanistan'a katılma kararının başkentte infial yaratması", label: "Girit Tepkisi" }
      ],
      ring2: [
        { text: "1909 – Serbestî gazetesi başyazarı Hasan Fehmi Bey suikastı", label: "Gazeteci Suikastı" },
        { text: "13 Nisan 1909 – 31 Mart Olayı (Meşrutiyet karşıtı ayaklanma)", label: "31 Mart Olayı" },
        { text: "1909 – Mahmud Şevket Paşa'nın Harbiye Nazırlığına getirilmesi", label: "Nazır Ataması" }
      ],
      ring3: [
        { text: "İsyancıların baskısıyla Sadrazam Hüseyin Hilmi Paşa kabinesinin istifa etmesi ve başkentin denetiminin kaybedilmesi", label: "Hükümet İstifası" },
        { text: "Avrupalı devletlerin asayiş gerekçesiyle İstanbul'u fiilen işgal etmesi", label: "Başkent İşgali" },
        { text: "İsyancıların meclis binasını tamamen kapatarak anayasayı feshetmesi", label: "Meclisin Feshi" }
      ]
    }
  },

  // 6. Olay: 1909 Hareket Ordusu ve Meclis Üstünlüğü
  {
    id: 6,
    title: "1909",
    pillName: "1909",
    correct: { ring1: 0, ring2: 1, ring3: 0 },
    initial: { ring1: 1, ring2: 0, ring3: 1 },
    explanation: "31 Mart İsyanı'nı bastırmak üzere Selanik'ten gelen Hareket Ordusu başkente girerek asayişi sağlamış; II. Abdülhamid tahttan indirilmiş ve yapılan anayasa değişiklikleriyle meclis üstünlüğü kalıcı hale getirilmiştir.",
    rings: {
      ring1: [
        { text: "Başkentte patlak veren 31 Mart Ayaklanması'nın meşrutiyet rejimini ve anayasal düzeni doğrudan tehdit etmesi", label: "Rejim Tehdidi" },
        { text: "Balkan devletlerinin ortak bir ordu kurarak Edirne üzerine yürümeye başlaması", label: "Balkan Tehdidi" },
        { text: "Trablusgarp bölgesindeki İtalyan işgaline karşı ordu birliklerinin teyakkuzda olması", label: "Trablusgarp İstilası" }
      ],
      ring2: [
        { text: "1909 – Kolağası Mustafa Kemal'in Yeşilköy'e ulaşması", label: "Yeşilköy İntikali" },
        { text: "Nisan 1909 – Hareket Ordusu'nun İstanbul'a girerek isyanı bastırması", label: "Hareket Ordusu" },
        { text: "1909 – Sıkıyönetim Komutanlığı Divan-ı Harbi'nin kurulması", label: "Divan-ı Harp" }
      ],
      ring3: [
        { text: "Sultan II. Abdülhamid'in tahttan indirilmesi ve Kanun-ı Esasi değişiklikleriyle meclis üstünlüğünün pekişmesi", label: "Meclis Üstünlüğü" },
        { text: "Sadrazamlık makamının kaldırılarak tüm yürütme yetkisinin orduya devredilmesi", label: "Askeri İdare" },
        { text: "Hareket Ordusu'nun seçimleri askıya alarak Meclis-i Mebusan'ı feshetmesi", label: "Meclis Feshi" }
      ]
    }
  }
];
