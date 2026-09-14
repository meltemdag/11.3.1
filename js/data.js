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

// 3 Kritik Tarihsel Dönüm Noktası Kadran Dönemleri
const ASTROLABE_STAGES = [
  {
    id: 1,
    title: "I. Dönem: 1876 – 1878 (Meclis-i Umumi'nin Tatili)",
    pillName: "I. Dönem",
    correct: { ring1: 1, ring2: 0, ring3: 2 },
    initial: { ring1: 0, ring2: 2, ring3: 1 },
    explanation: "1877-1878 93 Harbi'nin yol açtığı buhran gerekçe gösterilerek Meclis-i Umumi kapatılmış, Kanun-ı Esasi askıya alınarak otuz yıllık mutlak otorite devri başlamıştır.",
    rings: {
      ring1: [
        { text: "1908 – II. Meşrutiyet'in Yeniden İlanı", label: "II. Meşrutiyet" },
        { text: "1878 – Meclis-i Umumi'nin Kapatılması", label: "Meclisin Tatili" },
        { text: "1909 – 31 Mart Olayı ve İsyan", label: "31 Mart Olayı" }
      ],
      ring2: [
        { text: "93 Harbi'nin ağır yenilgilerle sonuçlanması ve başkente ulaşan göç dalgalarının derin bir idari bunalım yaratması", label: "93 Harbi Buhranı" },
        { text: "Meşrutiyet idaresini ortadan kaldırmak isteyen grupların başkentte isyan başlatması", label: "Rejim Karşıtlığı" },
        { text: "Reval Zirvesi'nde İngiltere ve Rusya'nın Osmanlı topraklarını paylaşacağı endişesinin doğması", label: "Reval Görüşmesi" }
      ],
      ring3: [
        { text: "İttihat ve Terakki Cemiyeti'nin hükümette ve orduda en belirleyici siyasi güç haline gelmesi", label: "Cemiyet Gücü" },
        { text: "Hareket Ordusu'nun isyanı bastırması ve anayasa değişiklikleriyle yetkinin meclise geçmesi", label: "Meclis Yetkisi" },
        { text: "Kanun-ı Esasi'nin askıya alınması ve padişahın mutlak otoritesine dayanan otuz yıllık dönemin başlaması", label: "Mutlak İdare" }
      ]
    }
  },
  {
    id: 2,
    title: "II. Dönem: 1908 (Reval'den Meşrutiyet'in İlanına)",
    pillName: "II. Dönem",
    correct: { ring1: 0, ring2: 2, ring3: 1 },
    initial: { ring1: 2, ring2: 0, ring3: 0 },
    explanation: "Reval Görüşmeleri'nde Osmanlı topraklarının paylaşılacağı endişesiyle Rumeli'de subaylar ayaklanmış; baskı karşısında II. Meşrutiyet ilan edilerek meclis otuz yıl sonra yeniden açılmıştır.",
    rings: {
      ring1: [
        { text: "23 Temmuz 1908 – II. Meşrutiyet'in İlan Edilmesi", label: "II. Meşrutiyet" },
        { text: "1878 – Meclis-i Umumi'nin Kapatılması", label: "Meclisin Tatili" },
        { text: "1876 – İlk Osmanlı Anayasası Kanun-ı Esasi", label: "I. Meşrutiyet" }
      ],
      ring2: [
        { text: "Rus ordusunun Edirne'ye kadar ilerleyerek barış antlaşması imzalanmasını dayatması", label: "Rus İlerlemesi" },
        { text: "Sansür ve sürgün politikalarıyla aydınların yer altına inerek Jön Türkler adıyla teşkilatlanması", label: "Gizli Muhalefet" },
        { text: "Reval'de Makedonya'nın paylaşılacağını anlayan İttihatçı subayların Rumeli'de dağa çıkarak ayaklanması", label: "Rumeli Ayaklanması" }
      ],
      ring3: [
        { text: "Devletin parçalanmasını önlemek adına merkezi denetimin en üst düzeye çıkarılması", label: "Merkezi Denetim" },
        { text: "Otuz yıl sonra anayasanın tekrar yürürlüğe konması ve Meclis-i Mebusan'ın yeniden açılması", label: "Meclisin Açılması" },
        { text: "Sultan II. Abdülhamid'in tahttan indirilerek yerine V. Mehmed Reşad'ın geçirilmesi", label: "Taht Değişimi" }
      ]
    }
  },
  {
    id: 3,
    title: "III. Dönem: 1909 (31 Mart ve Meclis Üstünlüğü)",
    pillName: "III. Dönem",
    correct: { ring1: 1, ring2: 0, ring3: 2 },
    initial: { ring1: 0, ring2: 2, ring3: 1 },
    explanation: "Meşrutiyet karşıtı 31 Mart Ayaklanması Selanik'ten gelen Hareket Ordusu tarafından bastırılmış; II. Abdülhamid tahttan indirilmiş ve yapılan anayasa değişiklikleriyle yönetim yetkisi kalıcı olarak halk meclisine geçmiştir.",
    rings: {
      ring1: [
        { text: "1877 – 93 Harbi'nin Başlaması", label: "93 Harbi" },
        { text: "13 Nisan 1909 – 31 Mart Olayı ve İsyanın Bastırılması", label: "31 Mart Olayı" },
        { text: "1908 – Reval Görüşmeleri", label: "Reval Zirvesi" }
      ],
      ring2: [
        { text: "Meşrutiyet yönetimine ve cemiyete karşı olan grupların İstanbul'da ayaklanma başlatması", label: "Rejim Karşıtı İsyan" },
        { text: "Balkanlarda artan göç hareketleri ve ordu içerisindeki mali yetersizlikler", label: "Balkan Göçleri" },
        { text: "Cemiyetin Rumeli dağlarında meşrutiyeti yeniden ilan etmek için orduyu yönlendirmesi", label: "Meşrutiyet Baskısı" }
      ],
      ring3: [
        { text: "Sadrazam ve bakanlar kurulunun istifa ederek meclisi kapatması", label: "Kabine İstifası" },
        { text: "Rumeli birliklerinin sınır boylarına çekilerek savunma tedbiri alması", label: "Sınır Tedbiri" },
        { text: "Hareket Ordusu'nun isyanı bastırması, padişahın tahttan indirilmesi ve meclis üstünlüğünün pekişmesi", label: "Meclis Üstünlüğü" }
      ]
    }
  }
];
