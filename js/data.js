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

// 7 Kadran Aşaması (1. Bölümdeki 9 Temel Olayın Anlatım ve Bağlantılarına Tam Uyumlu)
// Sıralama: 1. Halka: Neden, 2. Halka: Olay, 3. Halka: Sonuç
const ASTROLABE_STAGES = [
  // 1. Aşama: 1876 – Kanun-ı Esasi ve I. Meşrutiyet
  {
    id: 1,
    title: "1876",
    pillName: "1876",
    correct: { ring1: 0, ring2: 1, ring3: 2 },
    initial: { ring1: 1, ring2: 0, ring3: 0 },
    explanation: "Genç Osmanlıların anayasal yönetim mücadelesiyle Kanun-ı Esasi ilan edilmiş; Meclis-i Umumi açılarak Osmanlı Devleti anayasal yönetime geçiş yapmıştır.",
    hints: {
      event: "1876 yılında Kanun-ı Esasi'nin kabulüyle başlayan ilk anayasal süreci gözden geçiriniz.",
      cause: "Mutlak otoriteyi sınırlandırarak anayasal bir meclis açılmasını savunan aydın grubuna odaklanınız.",
      effect: "Anayasanın kabulüyle devlet yönetiminde ve meclis yapısında meydana gelen değişimi göz önünde bulundurunuz.",
      both: "1876'da anayasal yönetimi savunan düşünce hareketini ve anayasanın kabulüyle açılan meclisi değerlendiriniz.",
      general: "1876 yılında anayasal yönetime geçiş sürecini ve bu doğrultuda atılan adımları düşününüz."
    },
    rings: {
      ring1: [
        { text: "Genç Osmanlıların mutlak otoriteyi sınırlandırarak anayasal düzene geçişi savunması", label: "Genç Osmanlılar" },
        { text: "Meclisin açılışının hemen ardından başlayan 93 Harbi'nde yaşanan ağır kayıplar ve kriz ortamı", label: "93 Harbi Kayıpları" },
        { text: "İngiltere ile Rusya'nın Osmanlı topraklarını paylaşmak üzere bir araya gelmesi ve dış müdahale tehlikesinin doğması", label: "Dış Müdahale Tehlikesi" }
      ],
      ring2: [
        { text: "1878 – Meclis-i Umumi'nin Kapatılması", label: "Meclisin Kapatılması" },
        { text: "1876 – Kanun-ı Esasi ve I. Meşrutiyet", label: "I. Meşrutiyet" },
        { text: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı", label: "II. Meşrutiyet" }
      ],
      ring3: [
        { text: "Kanun-ı Esasi'nin askıya alınarak padişahın mutlak otoritesine dayanan merkeziyetçi yönetime geçilmesi", label: "Merkeziyetçi Yönetim" },
        { text: "Hareket Ordusu'nun isyanı bastırması, II. Abdülhamid'in tahttan indirilmesi ve meclis üstünlüğünün kesinleşmesi", label: "Meclis Üstünlüğü" },
        { text: "Osmanlı Devleti'nin anayasal yönetime geçmesi ve ilk kez Meclis-i Umumi'nin açılması", label: "Anayasal Yönetim" }
      ]
    }
  },

  // 2. Aşama: 1878 – Meclis-i Umumi'nin Kapatılması
  {
    id: 2,
    title: "1878",
    pillName: "1878",
    correct: { ring1: 1, ring2: 0, ring3: 1 },
    initial: { ring1: 0, ring2: 1, ring3: 0 },
    explanation: "93 Harbi'nde yaşanan ağır kayıpların ve kriz ortamının ardından Meclis-i Umumi kapatılmış; Kanun-ı Esasi askıya alınarak merkeziyetçi yönetime geçilmiştir.",
    hints: {
      event: "1878 yılında meclisin durumuna ve yönetimin işleyişine dair alınan kararı inceleyiniz.",
      cause: "Devlet politikasını ve meclisin durumunu derinden etkileyen büyük savaşı ve kayıpları hatırlayınız.",
      effect: "Meclisin kapatılmasının ardından anayasanın durumuna ve merkeziyetçi yönetim yapısına odaklanınız.",
      both: "93 Harbi'nin getirdiği ağır koşulları ve bu durumun meclisin kapatılmasıyla başlayan merkeziyetçi yönetim üzerindeki etkisini değerlendiriniz.",
      general: "93 Harbi'nin ardından meclisin kapatılması ve merkeziyetçi döneme geçiş sürecini düşününüz."
    },
    rings: {
      ring1: [
        { text: "Genç Osmanlıların mutlak otoriteyi sınırlandırarak anayasal düzene geçişi savunması", label: "Genç Osmanlılar" },
        { text: "Meclisin açılışının hemen ardından başlayan 93 Harbi'nde yaşanan ağır kayıplar ve kriz ortamı", label: "93 Harbi Kayıpları" },
        { text: "Meclisin kapatılmasının ardından basına uygulanan sansür ve muhalif aydınlara yönelik sıkı denetim politikası", label: "Sıkı Denetim ve Sansür" }
      ],
      ring2: [
        { text: "1878 – Meclis-i Umumi'nin Kapatılması", label: "Meclisin Kapatılması" },
        { text: "1876 – Kanun-ı Esasi ve I. Meşrutiyet", label: "I. Meşrutiyet" },
        { text: "Jön Türklerin Yükselişi (1902-1907)", label: "Jön Türkler" }
      ],
      ring3: [
        { text: "Osmanlı Devleti'nin anayasal yönetime geçmesi ve ilk kez Meclis-i Umumi'nin açılması", label: "Anayasal Yönetim" },
        { text: "Kanun-ı Esasi'nin askıya alınarak padişahın mutlak otoritesine dayanan merkeziyetçi yönetime geçilmesi", label: "Merkeziyetçi Yönetim" },
        { text: "Muhalif kadroların İttihat ve Terakki Cemiyeti çatısı altında toplanarak özellikle Rumeli'deki genç subaylar arasında yayılması", label: "Gizli Teşkilatlanma" }
      ]
    }
  },

  // 3. Aşama: 1902-1907 – Jön Türklerin Yükselişi
  {
    id: 3,
    title: "1902 – 1907",
    pillName: "1902 – 1907",
    correct: { ring1: 2, ring2: 1, ring3: 0 },
    initial: { ring1: 0, ring2: 0, ring3: 1 },
    explanation: "Baskı ve sansür ortamına tepki gösteren aydınlar Jön Türkler hareketi altında birleşmiş; İttihat ve Terakki Cemiyeti Rumeli'deki genç subaylar arasında hızla teşkilatlanmıştır.",
    hints: {
      event: "1902-1907 yılları arasında anayasal düzeni yeniden kurmak amacıyla örgütlenen muhalif harekete odaklanınız.",
      cause: "Aydınların yer altına inerek gizli cemiyetler kurmasına yol açan sansür ve sıkı denetim politikalarını hatırlayınız.",
      effect: "Hareketi oluşturan kadroların cemiyet çatısında birleşmesini ve subaylar arasındaki teşkilatlanmayı göz önünde bulundurunuz.",
      both: "Uygulanan baskı ve sansür politikasını ve bu duruma karşı aydınların cemiyet çatısında teşkilatlanmasını değerlendiriniz.",
      general: "Jön Türk hareketinin yükselişini ve cemiyetleşme sürecini düşününüz."
    },
    rings: {
      ring1: [
        { text: "Meclisin açılışının hemen ardından başlayan 93 Harbi'nde yaşanan ağır kayıplar ve kriz ortamı", label: "93 Harbi Kayıpları" },
        { text: "İngiltere ile Rusya'nın Osmanlı topraklarını paylaşmak üzere bir araya gelmesi ve dış müdahale tehlikesinin doğması", label: "Dış Müdahale Tehlikesi" },
        { text: "Meclisin kapatılmasının ardından basına uygulanan sansür ve muhalif aydınlara yönelik sıkı denetim politikası", label: "Sıkı Denetim ve Sansür" }
      ],
      ring2: [
        { text: "1878 – Meclis-i Umumi'nin Kapatılması", label: "Meclisin Kapatılması" },
        { text: "Jön Türklerin Yükselişi (1902-1907)", label: "Jön Türkler" },
        { text: "Reval Görüşmeleri ve Denge Politikası (1908)", label: "Reval Görüşmeleri" }
      ],
      ring3: [
        { text: "Muhalif kadroların İttihat ve Terakki Cemiyeti çatısı altında toplanarak özellikle Rumeli'deki genç subaylar arasında yayılması", label: "Gizli Teşkilatlanma" },
        { text: "Kanun-ı Esasi'nin askıya alınarak padişahın mutlak otoritesine dayanan merkeziyetçi yönetime geçilmesi", label: "Merkeziyetçi Yönetim" },
        { text: "Vatanın parçalanmasını önlemek isteyen İttihatçı subayların Rumeli'de ayaklanarak dağa çıkması", label: "Rumeli Ayaklanması" }
      ]
    }
  },

  // 4. Aşama: 1908 – Reval Görüşmeleri
  {
    id: 4,
    title: "1908",
    pillName: "1908",
    correct: { ring1: 0, ring2: 2, ring3: 1 },
    initial: { ring1: 1, ring2: 0, ring3: 0 },
    explanation: "İngiltere ve Rusya'nın Reval'de buluşarak Osmanlı topraklarını paylaşacağı endişesi üzerine İttihatçı subaylar Rumeli'de ayaklanarak meşrutiyet mücadelesini başlatmıştır.",
    hints: {
      event: "1908 yılında iki büyük devlet arasında gerçekleşen ve Osmanlı topraklarını tehlikeye düşüren diplomatik görüşmeyi düşününüz.",
      cause: "İngiltere ve Rusya'nın Osmanlı topraklarına yönelik dış müdahale ve paylaşım tehlikesine odaklanınız.",
      effect: "Toprakların parçalanacağı endişesi karşısında Rumeli'deki subayların başlattığı ayaklanmayı göz önünde bulundurunuz.",
      both: "Reval'de beliren dış tehlikeyi ve bu tehlike karşısında Rumeli'deki subayların dağa çıkarak başlattığı ayaklanmayı değerlendiriniz.",
      general: "Reval Görüşmeleri'nin yarattığı dış tehdidi ve subayların bu duruma gösterdiği tepkiyi düşününüz."
    },
    rings: {
      ring1: [
        { text: "İngiltere ile Rusya'nın Osmanlı topraklarını paylaşmak üzere bir araya gelmesi ve dış müdahale tehlikesinin doğması", label: "Dış Müdahale Tehlikesi" },
        { text: "Meclisin kapatılmasının ardından basına uygulanan sansür ve muhalif aydınlara yönelik sıkı denetim politikası", label: "Sıkı Denetim ve Sansür" },
        { text: "Dış müdahaleleri engellemenin ve devletin dağılmasını önlemenin tek yolunun meşrutiyet olarak görülmesi", label: "Dağılmayı Önleme Kararı" }
      ],
      ring2: [
        { text: "Jön Türklerin Yükselişi (1902-1907)", label: "Jön Türkler" },
        { text: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı", label: "II. Meşrutiyet" },
        { text: "Reval Görüşmeleri ve Denge Politikası (1908)", label: "Reval Görüşmeleri" }
      ],
      ring3: [
        { text: "Muhalif kadroların İttihat ve Terakki Cemiyeti çatısı altında toplanarak özellikle Rumeli'deki genç subaylar arasında yayılması", label: "Gizli Teşkilatlanma" },
        { text: "Vatanın parçalanmasını önlemek isteyen İttihatçı subayların Rumeli'de ayaklanarak dağa çıkması", label: "Rumeli Ayaklanması" },
        { text: "Otuz yıllık aranın ardından meclisin açılarak padişahın mutlak otoritesinin sınırlandırılması", label: "Meclisin Açılması" }
      ]
    }
  },

  // 5. Aşama: 23 Temmuz 1908 – II. Meşrutiyet'in İlanı
  {
    id: 5,
    title: "23 Temmuz 1908",
    pillName: "23 Temmuz 1908",
    correct: { ring1: 1, ring2: 0, ring3: 2 },
    initial: { ring1: 0, ring2: 1, ring3: 0 },
    explanation: "Devletin dağılmasını önlemek amacıyla başlatılan mücadele neticesinde 23 Temmuz 1908'de meşrutiyet ilan edilmiş; otuz yıl sonra meclis açılarak padişahın mutlak otoritesi sınırlandırılmıştır.",
    hints: {
      event: "23 Temmuz 1908 tarihinde ilan edilerek anayasal düzeni yeniden başlatan yönetim biçimini belirleyiniz.",
      cause: "Devletin parçalanmasını ve dış müdahaleleri önleme yönünde benimsenen kararlılığı hatırlayınız.",
      effect: "Meşrutiyetin ilanıyla otuz yıl sonra yeniden açılan meclisin padişah otoritesi üzerindeki etkisine odaklanınız.",
      both: "Dağılmayı önleme kararlılığını ve meşrutiyetin ilanıyla meclisin yeniden açılmasını değerlendiriniz.",
      general: "II. Meşrutiyet'in ilanı ve anayasal yönetimin yeniden kurulması sürecini düşününüz."
    },
    rings: {
      ring1: [
        { text: "İngiltere ile Rusya'nın Osmanlı topraklarını paylaşmak üzere bir araya gelmesi ve dış müdahale tehlikesinin doğması", label: "Dış Müdahale Tehlikesi" },
        { text: "Dış müdahaleleri engellemenin ve devletin dağılmasını önlemenin tek yolunun meşrutiyet olarak görülmesi", label: "Dağılmayı Önleme Kararı" },
        { text: "II. Meşrutiyet'in ilanının ardından ordudaki genç subayların cemiyete açık destek vermesi", label: "Genç Subay Desteği" }
      ],
      ring2: [
        { text: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı", label: "II. Meşrutiyet" },
        { text: "Reval Görüşmeleri ve Denge Politikası (1908)", label: "Reval Görüşmeleri" },
        { text: "İttihat ve Terakki'nin Güçlenmesi (1908-1909)", label: "İttihat ve Terakki" }
      ],
      ring3: [
        { text: "Vatanın parçalanmasını önlemek isteyen İttihatçı subayların Rumeli'de ayaklanarak dağa çıkması", label: "Rumeli Ayaklanması" },
        { text: "Cemiyetin devlet yönetiminde belirleyici güç hâline gelmesi ve Bâbıâli ile siyasi rekabetin başlaması", label: "Yönetimde Etkinlik" },
        { text: "Otuz yıllık aranın ardından meclisin açılarak padişahın mutlak otoritesinin sınırlandırılması", label: "Meclisin Açılması" }
      ]
    }
  },

  // 6. Aşama: 1908-1909 – İttihat ve Terakki'nin Güçlenmesi
  {
    id: 6,
    title: "1908 – 1909",
    pillName: "1908 – 1909",
    correct: { ring1: 2, ring2: 1, ring3: 0 },
    initial: { ring1: 0, ring2: 0, ring3: 1 },
    explanation: "Ordudaki genç subayların güçlü desteğini alan İttihat ve Terakki Cemiyeti, meşrutiyetin ardından devlet yönetiminde ve siyasi kararlarda en belirleyici güç hâline gelmiştir.",
    hints: {
      event: "1908-1909 sürecinde devlet kademelerinde etkinliğini artıran siyasi cemiyete odaklanınız.",
      cause: "Cemiyetin güç kazanmasında ordunun ve özellikle genç subay kesiminin sağladığı desteğe odaklanınız.",
      effect: "Cemiyetin güçlenmesiyle devlet yönetimi ve Bâbıâli üzerindeki ağırlığını göz önünde bulundurunuz.",
      both: "Genç subayların desteğini ve bu desteğin cemiyeti yönetimde nasıl en etkili güce dönüştürdüğünü düşününüz.",
      general: "İttihat ve Terakki Cemiyeti'nin ordu desteğiyle siyasette güçlenme sürecini değerlendiriniz."
    },
    rings: {
      ring1: [
        { text: "Dış müdahaleleri engellemenin ve devletin dağılmasını önlemenin tek yolunun meşrutiyet olarak görülmesi", label: "Dağılmayı Önleme Kararı" },
        { text: "Meşrutiyet yönetimine ve İttihat ve Terakki'nin siyasetteki ağırlığına karşı duyulan rahatsızlık ve kışkırtmalar", label: "Rejim Karşıtlığı" },
        { text: "II. Meşrutiyet'in ilanının ardından ordudaki genç subayların cemiyete açık destek vermesi", label: "Genç Subay Desteği" }
      ],
      ring2: [
        { text: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı", label: "II. Meşrutiyet" },
        { text: "İttihat ve Terakki'nin Güçlenmesi (1908-1909)", label: "İttihat ve Terakki" },
        { text: "31 Mart 1909 – 31 Mart Olayı", label: "31 Mart Olayı" }
      ],
      ring3: [
        { text: "Cemiyetin devlet yönetiminde belirleyici güç hâline gelmesi ve Bâbıâli ile siyasi rekabetin başlaması", label: "Yönetimde Etkinlik" },
        { text: "Otuz yıllık aranın ardından meclisin açılarak padişahın mutlak otoritesinin sınırlandırılması", label: "Meclisin Açılması" },
        { text: "Hareket Ordusu'nun isyanı bastırması, II. Abdülhamid'in tahttan indirilmesi ve meclis üstünlüğünün kesinleşmesi", label: "Meclis Üstünlüğü" }
      ]
    }
  },

  // 7. Aşama: 31 Mart 1909 – 31 Mart Olayı
  {
    id: 7,
    title: "31 Mart 1909",
    pillName: "31 Mart 1909",
    correct: { ring1: 0, ring2: 2, ring3: 1 },
    initial: { ring1: 1, ring2: 0, ring3: 0 },
    explanation: "Meşrutiyet karşıtı çevrelerin kışkırtmasıyla İstanbul'da çıkan 31 Mart Ayaklanması Hareket Ordusu tarafından bastırılmış; II. Abdülhamid tahttan indirilerek meclis üstünlüğü kesinleştirilmiştir.",
    hints: {
      event: "1909 yılında meşrutiyet yönetimine karşı başkentte patlak veren ayaklanmayı düşününüz.",
      cause: "Yeni rejime ve cemiyetin etkinliğine karşı duyulan rahatsızlık ve kışkırtmalara odaklanınız.",
      effect: "İsyanın bastırılması sonrasında meclisin konumu ve padişah değişikliğini göz önünde bulundurunuz.",
      both: "Rejim karşıtı hoşnutsuzluğu ve bu isyanın bastırılmasıyla meclis iradesinin devlette nasıl kalıcı kılındığını değerlendiriniz.",
      general: "31 Mart Olayı'nı ve meclis üstünlüğünün kesinleşme sürecini düşününüz."
    },
    rings: {
      ring1: [
        { text: "Meşrutiyet yönetimine ve İttihat ve Terakki'nin siyasetteki ağırlığına karşı duyulan rahatsızlık ve kışkırtmalar", label: "Rejim Karşıtlığı" },
        { text: "II. Meşrutiyet'in ilanının ardından ordudaki genç subayların cemiyete açık destek vermesi", label: "Genç Subay Desteği" },
        { text: "Genç Osmanlıların mutlak otoriteyi sınırlandırarak anayasal düzene geçişi savunması", label: "Genç Osmanlılar" }
      ],
      ring2: [
        { text: "İttihat ve Terakki'nin Güçlenmesi (1908-1909)", label: "İttihat ve Terakki" },
        { text: "1876 – Kanun-ı Esasi ve I. Meşrutiyet", label: "I. Meşrutiyet" },
        { text: "31 Mart 1909 – 31 Mart Olayı", label: "31 Mart Olayı" }
      ],
      ring3: [
        { text: "Cemiyetin devlet yönetiminde belirleyici güç hâline gelmesi ve Bâbıâli ile siyasi rekabetin başlaması", label: "Yönetimde Etkinlik" },
        { text: "Hareket Ordusu'nun isyanı bastırması, II. Abdülhamid'in tahttan indirilmesi ve meclis üstünlüğünün kesinleşmesi", label: "Meclis Üstünlüğü" },
        { text: "Osmanlı Devleti'nin anayasal yönetime geçmesi ve ilk kez Meclis-i Umumi'nin açılması", label: "Anayasal Yönetim" }
      ]
    }
  }
];
