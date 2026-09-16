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
    video: "videolar/info1.mp4",
    coords: { left: "1.04%", top: "9.38%", width: "31.64%", height: "26.37%" },
    narration: "Osmanlı Devleti, 1876 yılında ilk anayasası olan Kanun-ı Esasi’yi ilan ederek meşruti yönetime adım attı. Halkın temsilcilerinden oluşan Meclis-i Umumi açıldı. Ancak meclisin getirdiği bu yeni anayasal düzen, çok geçmeden patlak verecek büyük bir savaşla sarsılacaktı.",
    connection: "İlk anayasal yönetimin kurulması, hemen ardından gelen 93 Harbi'nin yol açtığı büyük sarsıntıya ve meclisin kapatılmasına uzanan süreci başlatmıştır."
  },
  {
    id: 2,
    stepTitle: "2. Olay",
    title: "1877-1878 – 93 Harbi",
    video: "videolar/info2.mp4",
    coords: { left: "35.16%", top: "9.38%", width: "30.47%", height: "26.37%" },
    narration: "Yeni meclisin açılışının hemen ardından Osmanlı Devleti ile Rusya arasında 93 Harbi başladı. Cephelerde yaşanan ağır mağlubiyetler ve başkente ulaşan göç dalgaları, devleti derin bir idari ve mali bunalıma sürükleyerek meclisin geleceğini tartışmalı hale getirdi.",
    connection: "Savaşın ortaya çıkardığı kriz ortamı, Sultan II. Abdülhamid'in meclisi süresiz tatil etmesine gerekçe oluşturmuştur."
  },
  {
    id: 3,
    stepTitle: "3. Olay",
    title: "1878 – Meclis-i Umumi'nin Kapatılması",
    video: "videolar/info3.mp4",
    coords: { left: "67.71%", top: "9.38%", width: "31.12%", height: "26.37%" },
    narration: "93 Harbi’nin yarattığı ağır şartları gerekçe gösteren Sultan II. Abdülhamid, 1878’de Meclis-i Umumi’yi süresiz olarak kapattı. Kanun-ı Esasi askıya alınırken meşruti idareden padişahın mutlak otoritesine dayanan otuz yıllık yeni bir yönetim evresine geçildi.",
    connection: "Meclisin kapatılması ve anayasanın askıya alınması, otuz yıl sürecek merkeziyetçi ve mutlakıyetçi yönetimi başlatmıştır."
  },
  {
    id: 4,
    stepTitle: "4. Olay",
    title: "II. Abdülhamid Dönemi (1878-1909)",
    video: "videolar/info4.mp4",
    coords: { left: "1.04%", top: "36.33%", width: "31.64%", height: "25.98%" },
    narration: "Bu dönemde devletin parçalanmasını önlemek adına merkezi otorite güçlendirildi ve sıkı bir denetim politikası uygulandı. Ancak basına uygulanan sansür ve muhalif aydınların uzaklaştırılması, meşrutiyeti savunan yeni fikir hareketlerinin yer altına inip teşkilatlanmasına ortam hazırladı.",
    connection: "Uygulanan sıkı denetim ve sürgünler, muhalif aydınların Jön Türkler adıyla gizli cemiyetler kurmasını hızlandırmıştır."
  },
  {
    id: 5,
    stepTitle: "5. Olay",
    title: "Jön Türklerin Yükselişi (1902-1907)",
    video: "videolar/info5.mp4",
    coords: { left: "35.16%", top: "36.33%", width: "30.47%", height: "25.98%" },
    narration: "Baskılara tepki gösteren aydınlar, anayasal düzeni yeniden kurmak amacıyla Jön Türkler hareketi altında birleşti. Zamanla İttihat ve Terakki Cemiyeti çatısında toplanan bu kadrolar, özellikle Rumeli’deki genç subaylar arasında yayılarak imparatorluğun kaderini değiştirecek bir güce dönüştü.",
    connection: "Rumeli'deki genç subaylar arasında güçlenen İttihat ve Terakki, dış politikadaki Reval gelişmesiyle eyleme geçme kararı almıştır."
  },
  {
    id: 6,
    stepTitle: "6. Olay",
    title: "Reval Görüşmeleri ve Denge Politikası (1908)",
    video: "videolar/info6.mp4",
    coords: { left: "67.71%", top: "36.33%", width: "31.12%", height: "25.98%" },
    narration: "1908 yılında İngiltere ile Rusya’nın Reval’de buluşması, Makedonya ve Osmanlı topraklarının paylaşılacağı endişesini doğurdu. Vatanın elden gideceğini düşünen İttihat ve Terakki mensubu subaylar, yabancı müdahalesini engellemenin tek yolunun meşrutiyeti derhal yeniden ilan etmek olduğuna inandı.",
    connection: "Toprakların paylaşılacağı endişesi, subayların Rumeli'de ayaklanarak II. Meşrutiyet'in ilanını zorlamasına yol açmıştır."
  },
  {
    id: 7,
    stepTitle: "7. Olay",
    title: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı",
    video: "videolar/info7.mp4",
    coords: { left: "1.04%", top: "62.89%", width: "31.64%", height: "26.17%" },
    narration: "Rumeli’de askerî birliklerin dağa çıkması ve halkın yoğun baskısı karşısında Sultan II. Abdülhamid, 23 Temmuz 1908’de meşrutiyeti yeniden ilan etti. Meydanlarda büyük bir hürriyet coşkusu yaşanırken meclis kapılarını otuz yıl sonra yeniden açtı.",
    connection: "Meşrutiyetin ilanı, hareketi yönlendiren İttihat ve Terakki Cemiyeti'nin ordu ve siyasette en etkin güç haline gelmesini sağlamıştır."
  },
  {
    id: 8,
    stepTitle: "8. Olay",
    title: "İttihat ve Terakki'nin Güçlenmesi (1908-1909)",
    video: "videolar/info8.mp4",
    coords: { left: "35.16%", top: "62.89%", width: "30.47%", height: "26.17%" },
    narration: "Meşrutiyetin ilanıyla birlikte İttihat ve Terakki Cemiyeti, ordudaki subayların desteğiyle yönetimde belirleyici güç oldu. Çok partili siyasi hayata geçilse de Bâbıâli ile cemiyet arasındaki rekabet ve basındaki sert tartışmalar, başkentte yeni bir çatışma ortamı doğurdu.",
    connection: "Cemiyetin siyasetteki ağırlığı ve basındaki kutuplaşma, meşrutiyet karşıtı 31 Mart ayaklanmasını tetiklemiştir."
  },
  {
    id: 9,
    stepTitle: "9. Olay",
    title: "31 Mart 1909 – 31 Mart Olayı",
    video: "videolar/info9.mp4",
    coords: { left: "67.71%", top: "62.89%", width: "31.12%", height: "26.17%" },
    narration: "Meşrutiyet yönetimine son vermek isteyen gruplar 1909’da 31 Mart İsyanı’nı başlattı. Selanik’ten gelen Hareket Ordusu ayaklanmayı bastırarak anayasal düzeni korudu. Olayın ardından II. Abdülhamid tahttan indirildi, yapılan anayasa değişiklikleriyle yönetim yetkisi tamamen halkın temsilcisi olan meclise geçti.",
    connection: "İsyanın bastırılması ve 1909 Anayasa değişiklikleri, halk iradesini ve meclis üstünlüğünü devlette kalıcı kılmıştır."
  }
];

// 6 Kadran Aşaması (Her Aşamada 3 Konu Eş Zamanlı Olarak Hizalanır)
// Halkalardaki konular karışık sırada dizilmiştir; öğrenci seçtiği konuyu hizaladığında diğer iki konu da otomatik kilitlenir.
const ASTROLABE_STAGES = [
  // =========================================================================
  // 1. AŞAMA: İlk Anayasal Düzen ve Meclis (1876)
  // =========================================================================
  {
    id: 1,
    title: "1. Aşama",
    pillName: "1. Aşama",
    correct: { ring1: 0, ring2: 2, ring3: 1 },
    initial: { ring1: 0, ring2: 0, ring3: 0 },
    triads: {
      0: {
        explanation: "Genç Osmanlıların mutlak otoriteyi sınırlandırarak anayasal düzene geçişi savunması, 1876'da Kanun-ı Esasi'nin kabul edilerek I. Meşrutiyet'in ilan edilmesini sağlamış; böylece Osmanlı Devleti ilk anayasasına kavuşarak halk temsilcilerinden oluşan Meclis-i Umumi'yi açmıştır.",
        hints: {
          hintCause: "1876'da meşrutiyetin ilan edilmesinde, padişahın mutlak otoritesini anayasa ile sınırlamak isteyen aydın hareketine (Genç Osmanlılar) odaklanınız.",
          hintEffect: "I. Meşrutiyet'in ilanıyla birlikte devlette yaşanan en önemli idari değişime, yani halk temsilcilerinden oluşan ilk meclisin açılmasına odaklanınız.",
          hintBoth: "1876 Meşrutiyet adımını hazırlayan Genç Osmanlılar hareketini (neden) ve açılan meclisle başlayan ilk anayasal parlamenter dönemi (sonuç) birlikte değerlendiriniz."
        }
      },
      1: {
        explanation: "Büyük devletlerin Tersane Konferansı kararlarıyla Osmanlı iç işlerine müdahale etmesini önleme gayesi, Kanun-ı Esasi'nin kabul edilmesini hızlandırmış; böylece Türk tarihinin ilk anayasası yürürlüğe girerek padişahın mutlak yetkileri yasal sınırlara bağlanmıştır.",
        hints: {
          hintCause: "Kanun-ı Esasi'nin kabul edilmesinde, Tersane Konferansı kararlarıyla gelebilecek yabancı müdahalesini engelleme arayışına odaklanınız.",
          hintEffect: "Kanun-ı Esasi'nin kabulüyle Türk tarihinin ilk anayasasının yürürlüğe girmesi sonucuna odaklanınız.",
          hintBoth: "Tersane Konferansı'ndaki dış müdahale tehlikesini (neden) ve ilk yazılı anayasanın yürürlüğe girmesi sonucunu (sonuç) birlikte değerlendiriniz."
        }
      },
      2: {
        explanation: "İmparatorluktaki farklı din ve milletlerden tebaayı bir arada tutacak ortak bir temsil organı kurma hedefi, 1877'de Meclis-i Umumi'nin açılmasını sağlamış; bu durum Müslüman ve gayrimüslim mebusların ilk kez aynı çatı altında toplanarak ortak parlamenter deneyim kazanmasıyla sonuçlanmıştır.",
        hints: {
          hintCause: "İlk meclisin açılmasında, imparatorluktaki farklı din ve unsurlardan tebaayı ortak bir yönetimde bir arada tutma hedefine odaklanınız.",
          hintEffect: "Meclis-i Umumi'nin toplanmasıyla Müslüman ve gayrimüslim temsilcilerin ilk kez aynı meclis çatısı altında bir araya gelmesi sonucuna odaklanınız.",
          hintBoth: "Farklı milletleri ortak mecliste toplama hedefini (neden) ve mebusların bir arada kazandığı ilk parlamenter tecrübeyi (sonuç) birlikte değerlendiriniz."
        }
      }
    },
    rings: {
      ring1: [
        { triadId: 0, text: "Genç Osmanlıların mutlak otoriteyi sınırlandırarak anayasal düzene geçişi savunması", label: "Genç Osmanlılar" },
        { triadId: 1, text: "Büyük devletlerin Tersane Konferansı kararlarıyla Osmanlı iç işlerine müdahale etmesini önleme gayesi", label: "Tersane Konferansı" },
        { triadId: 2, text: "Farklı din ve milletlerden halkın temsilcileriyle ortak bir meclis oluşturma hedefi", label: "Temsil Arayışı" }
      ],
      ring2: [
        { triadId: 1, text: "1876 – Kanun-ı Esasi'nin Kabul Edilmesi", label: "Kanun-ı Esasi" },
        { triadId: 2, text: "1877 – Meclis-i Umumi'nin İlk Kez Açılması", label: "İlk Meclis" },
        { triadId: 0, text: "1876 – Kanun-ı Esasi ve I. Meşrutiyet", label: "I. Meşrutiyet" }
      ],
      ring3: [
        { triadId: 2, text: "Müslüman ve gayrimüslim tebaanın temsilcilerinin ilk kez aynı parlamentoda toplanması", label: "Parlamenter Deneyim" },
        { triadId: 0, text: "Osmanlı Devleti'nin anayasal yönetime geçmesi ve ilk kez Meclis-i Umumi'nin açılması", label: "Anayasal Yönetim" },
        { triadId: 1, text: "Türk tarihinin ilk anayasasının yürürlüğe girerek padişah yetkilerini sınırlandırması", label: "İlk Anayasa" }
      ]
    }
  },

  // =========================================================================
  // 2. AŞAMA: 93 Harbi ve Meclisin Kapatılması (1877 – 1878)
  // =========================================================================
  {
    id: 2,
    title: "2. Aşama",
    pillName: "2. Aşama",
    correct: { ring1: 2, ring2: 1, ring3: 0 },
    initial: { ring1: 0, ring2: 0, ring3: 0 },
    triads: {
      0: {
        explanation: "Balkan bunalımının tırmanması üzerine Rusya'nın Osmanlı topraklarına saldırması 93 Harbi'ni başlatmış; cephelerde yaşanan ağır yenilgiler yüz binlerce muhacirin başkente göç etmesine ve devlette büyük bir mali çöküşün doğmasına yol açmıştır.",
        hints: {
          hintCause: "93 Harbi'nin çıkışında Rus ordularının sınırları aşarak Osmanlı topraklarına saldırmasına ve Balkan bunalımının savaşa evrilmesine odaklanınız.",
          hintEffect: "93 Harbi'nin devlette açtığı derin yaralara; ağır toprak kayıpları, göç dalgaları ve mali buhrana odaklanınız.",
          hintBoth: "Rus ordularının başlattığı saldırıyı (neden) ve savaşın yol açtığı büyük göç dalgaları ile mali yıkımı (sonuç) birlikte değerlendiriniz."
        }
      },
      1: {
        explanation: "93 Harbi buhranının devlette yol açtığı olağanüstü kriz ortamı gerekçe gösterilerek 1878'de Meclis-i Umumi kapatılmış; Kanun-ı Esasi fiilen askıya alınarak padişahın mutlak otoritesine dayalı merkeziyetçi yönetim düzenine geçilmiştir.",
        hints: {
          hintCause: "Meclisin kapatılmasında, 93 Harbi buhranının devlette ortaya çıkardığı olağanüstü askeri ve idari krize odaklanınız.",
          hintEffect: "Meclisin kapatılmasıyla anayasanın askıya alınarak merkeziyetçi yönetime geçilmesi sonucuna odaklanınız.",
          hintBoth: "93 Harbi'nin getirdiği buhran ortamını (neden) ve başlayan merkeziyetçi yönetim sürecini (sonuç) birlikte değerlendiriniz."
        }
      },
      2: {
        explanation: "93 Harbi sırasında Meclis-i Mebusan'daki hükümet ve milletvekilleri arasında yaşanan sert tartışmalar ve bölünmeler meclisin tatil edilmesine gerekçe yapılmış; böylece otuz yıl boyunca meclisin toplanmadığı ve anayasal kurumların işletilmediği bir dönem başlamıştır.",
        hints: {
          hintCause: "Meclisin süresiz tatil edilmesinde, savaş esnasında mebuslar arasında meclis kürsüsünde yaşanan sert görüş ayrılıklarına odaklanınız.",
          hintEffect: "Meclisin tatil edilmesiyle anayasal kurumların otuz yıl boyunca kapalı kaldığı mutlakıyet idaresine odaklanınız.",
          hintBoth: "Meclis içindeki sert görüş ayrılıklarını (neden) ve otuz yıl sürecek meclissiz mutlakıyet sürecini (sonuç) birlikte değerlendiriniz."
        }
      }
    },
    rings: {
      ring1: [
        { triadId: 1, text: "93 Harbi mağlubiyetinin devlette ortaya çıkardığı olağanüstü askeri ve idari kriz ortamı", label: "93 Harbi Buhranı" },
        { triadId: 2, text: "Savaş sırasında meclis içindeki milletvekilleri arasında sert görüş ayrılıklarının çıkması", label: "Meclis İçi Ayrılıklar" },
        { triadId: 0, text: "Rusya'nın Osmanlı topraklarına saldırması ve Balkan bunalımının savaşa dönüşmesi", label: "Rus Saldırısı" }
      ],
      ring2: [
        { triadId: 2, text: "1878 – Meclis-i Mebusan'ın Süresiz Tatili", label: "Meclisin Tatili" },
        { triadId: 0, text: "1877-1878 – 93 Harbi", label: "93 Harbi" },
        { triadId: 1, text: "1878 – Meclis-i Umumi'nin Kapatılması", label: "Meclisin Kapatılması" }
      ],
      ring3: [
        { triadId: 0, text: "Cephelerde ağır mağlubiyetler alınması, büyük göç dalgaları ve devlette mali kriz çıkması", label: "Ağır Kayıplar ve Göç" },
        { triadId: 1, text: "Kanun-ı Esasi'nin askıya alınarak padişahın mutlak otoritesine dayanan merkeziyetçi yönetime geçilmesi", label: "Merkeziyetçi Yönetim" },
        { triadId: 2, text: "Otuz yıl boyunca anayasal kurumların çalıştırılmadığı mutlakıyet idaresine dönülmesi", label: "Anayasanın Askıya Alınması" }
      ]
    }
  },

  // =========================================================================
  // 3. AŞAMA: Merkeziyetçi İdare ve Muhalefetin Doğuşu (1878 – 1907)
  // =========================================================================
  {
    id: 3,
    title: "3. Aşama",
    pillName: "3. Aşama",
    correct: { ring1: 1, ring2: 0, ring3: 2 },
    initial: { ring1: 0, ring2: 0, ring3: 0 },
    triads: {
      0: {
        explanation: "Devletin parçalanmasını önleme ve merkezi otoriteyi güçlendirme arayışı sansür ve sıkı takip politikasının uygulanmasına yol açmış; bu baskı ortamı muhalif aydınların yer altına inerek gizli cemiyetler kurmasıyla sonuçlanmıştır.",
        hints: {
          hintCause: "Uygulanan sıkı idari politikanın arkasında, devletin parçalanmasını önleme arayışına odaklanınız.",
          hintEffect: "Sansür ve sıkı takip politikasının muhalif aydınları yer altında gizli cemiyetler kurmaya yöneltmesi sonucuna odaklanınız.",
          hintBoth: "Parçalanmayı önleme arayışını (neden) ve aydınların yer altına inerek gizli cemiyetler kurması sonucunu birlikte değerlendiriniz."
        }
      },
      1: {
        explanation: "Sıkı denetime tepki gösteren aydın muhalefeti Jön Türklerin yükselişini sağlamış; bu hareket muhalif sivil ve askeri kadroların İttihat ve Terakki Cemiyeti çatısı altında birleşmesiyle sonuçlanmıştır.",
        hints: {
          hintCause: "Jön Türklerin yükselişinde, anayasal düzeni yeniden kurmak isteyen aydın muhalefetine odaklanınız.",
          hintEffect: "Jön Türk hareketinin muhalif kadroları İttihat ve Terakki Cemiyeti çatısı altında birleştirmesi sonucuna odaklanınız.",
          hintBoth: "Aydın muhalefetinin tepkisini (neden) ve İttihat ve Terakki Cemiyeti çatısı altında toplanmasını (sonuç) birlikte değerlendiriniz."
        }
      },
      2: {
        explanation: "Devletin kurtuluşunu meşrutiyette gören hürriyet düşüncesi genç kadrolar arasında gizli cemiyetleşme sürecini başlatmış; bu teşkilatlanma özellikle Rumeli'deki ordu birliklerinin ve genç subayların desteğini almasıyla sonuçlanmıştır.",
        hints: {
          hintCause: "Gizli cemiyetleşmenin doğuşunda, devletin kurtuluşunu anayasal hürriyette gören düşünceye odaklanınız.",
          hintEffect: "Gizli cemiyetlerin Rumeli'deki ordu birlikleri ve genç subayların desteğini kazanması sonucuna odaklanınız.",
          hintBoth: "Hürriyet düşüncesinin doğurduğu inancı (neden) ve cemiyetin ordu desteğini arkasına alması sonucunu birlikte değerlendiriniz."
        }
      }
    },
    rings: {
      ring1: [
        { triadId: 2, text: "Devletin kurtuluşunun anayasal düzen ve meclisin açılmasında olduğuna inanan genç kadrolar", label: "Hürriyet Düşüncesi" },
        { triadId: 0, text: "Meclisin kapatılmasının ardından devletin parçalanmasını önleme ve merkezi otoriteyi güçlendirme arayışı", label: "Parçalanmayı Önleme" },
        { triadId: 1, text: "Sıkı denetime ve sürgünlere tepki gösteren aydınların meşruti yönetimi yeniden kurmak istemesi", label: "Aydın Muhalefeti" }
      ],
      ring2: [
        { triadId: 0, text: "II. Abdülhamid Dönemi – Sansür ve Sıkı Takip Politikası", label: "Sansür ve Takip" },
        { triadId: 1, text: "Jön Türklerin Yükselişi (1902-1907)", label: "Jön Türkler" },
        { triadId: 2, text: "Meşrutiyet Yanlısı Gizli Cemiyetleşme Süreci", label: "Gizli Cemiyetleşme" }
      ],
      ring3: [
        { triadId: 1, text: "Muhalif aydın ve subayların İttihat ve Terakki Cemiyeti çatısı altında birleşmesi", label: "İttihat ve Terakki" },
        { triadId: 2, text: "Hürriyet yanlısı cemiyetlerin özellikle Rumeli'deki ordu ve genç subayların desteğini alması", label: "Ordu ve Subay Desteği" },
        { triadId: 0, text: "Muhalif aydın ve genç subayların yer altına inerek gizli cemiyetler kurması", label: "Gizli Cemiyetler" }
      ]
    }
  },

  // =========================================================================
  // 4. AŞAMA: Reval Görüşmeleri ve Rumeli Başkaldırısı (1908)
  // =========================================================================
  {
    id: 4,
    title: "4. Aşama",
    pillName: "4. Aşama",
    correct: { ring1: 0, ring2: 1, ring3: 2 },
    initial: { ring1: 0, ring2: 0, ring3: 0 },
    triads: {
      0: {
        explanation: "İngiltere ile Rusya'nın Reval'de buluşmasıyla doğan dış müdahale tehlikesi Reval Görüşmeleri'ni gündeme taşımış; toprakların paylaşılacağını anlayan subayların saraya meşrutiyet baskısı yapmasıyla sonuçlanmıştır.",
        hints: {
          hintCause: "Reval Görüşmeleri'nin arka planında İngiltere ile Rusya'nın Osmanlı topraklarını paylaşma tehdidine odaklanınız.",
          hintEffect: "Reval buluşmasının ardından subayların vatanı korumak için saraya meşrutiyet baskısı yapması sonucuna odaklanınız.",
          hintBoth: "Reval'deki dış müdahale tehlikesini (neden) ve subayların saraya kurduğu meşrutiyet baskısını (sonuç) birlikte değerlendiriniz."
        }
      },
      1: {
        explanation: "Reval kararlarının doğurduğu tehlikeyi önlemenin tek yolunun meşrutiyet olduğuna inanan subayların harekete geçmesi; Resneli Niyazi ve Enver Bey gibi komutanların birlikleriyle dağa çıkıp yönetime karşı ayaklanarak meşrutiyetin ilanını talep etmesine yol açmıştır.",
        hints: {
          hintCause: "Subayların dağa çıkmasında, yabancı devletlerin müdahalesini durdurmanın tek yolunun meşrutiyette görülmesine odaklanınız.",
          hintEffect: "Subayların eyleminin sonucunda Rumeli'deki askeri birliklerin meşrutiyet talebiyle ayaklanmasına odaklanınız.",
          hintBoth: "Vatanı kurtarma kararını (neden) ve subayların askerleriyle Rumeli'de başlattığı askeri ayaklanmayı (sonuç) birlikte değerlendiriniz."
        }
      },
      2: {
        explanation: "Rumeli'deki askeri ayaklanmanın bastırılamaması ve ordunun saraya itaatsizliği Rumeli İhtilali'ni doğurmuş; sarayın askeri müdahale imkanını yitirerek meşrutiyeti yeniden kabul etmek zorunda kalmasıyla sonuçlanmıştır.",
        hints: {
          hintCause: "Sarayın çaresiz kalmasında, Rumeli'deki askeri ayaklanmanın bastırılamaması ve ordunun itaatsizliğine odaklanınız.",
          hintEffect: "Rumeli İhtilali karşısında merkezi yönetimin meşrutiyeti kabul etmek zorunda kalması sonucuna odaklanınız.",
          hintBoth: "Ayaklanmanın bastırılamamasını (neden) ve sarayın meşrutiyeti kabul etmek zorunda kalışını (sonuç) birlikte değerlendiriniz."
        }
      }
    },
    rings: {
      ring1: [
        { triadId: 0, text: "İngiltere ile Rusya'nın Osmanlı topraklarını ve Makedonya'yı paylaşmak üzere bir araya gelmesi", label: "Dış Müdahale Tehlikesi" },
        { triadId: 1, text: "Reval kararları karşısında yabancı devletlerin müdahalesini önlemenin tek yolunun meşrutiyet görülmesi", label: "Vatanı Kurtarma Kararı" },
        { triadId: 2, text: "Rumeli'deki askeri ayaklanmanın bastırılamaması ve ordunun saraya itaat etmemesi", label: "Ayaklanmanın Yayılması" }
      ],
      ring2: [
        { triadId: 2, text: "1908 – Rumeli İhtilali ve Sarayın Çaresizliği", label: "Rumeli İhtilali" },
        { triadId: 0, text: "Reval Görüşmeleri ve Denge Politikası (1908)", label: "Reval Görüşmeleri" },
        { triadId: 1, text: "Rumeli Subaylarının Askerleriyle Dağa Çıkması (1908)", label: "Subayların Başkaldırısı" }
      ],
      ring3: [
        { triadId: 1, text: "Rumeli'deki askerî birliklerin meşrutiyetin yeniden ilanı için yönetime karşı ayaklanması", label: "Rumeli Ayaklanması" },
        { triadId: 2, text: "Merkezi idarenin ordu isyanını durduramayarak II. Meşrutiyet'i kabul etmek zorunda kalması", label: "Meşrutiyetin Kabulü" },
        { triadId: 0, text: "Vatanın parçalanmasını önlemek isteyen subayların saraya meşrutiyet baskısı yapması", label: "Meşrutiyet Baskısı" }
      ]
    }
  },

  // =========================================================================
  // 5. AŞAMA: II. Meşrutiyet'in İlanı ve Hürriyet Ortamı (1908)
  // =========================================================================
  {
    id: 5,
    title: "5. Aşama",
    pillName: "5. Aşama",
    correct: { ring1: 2, ring2: 0, ring3: 1 },
    initial: { ring1: 0, ring2: 0, ring3: 0 },
    triads: {
      0: {
        explanation: "Rumeli'deki askeri ayaklanmalar ve cemiyetin uyguladığı yoğun baskı karşısında II. Meşrutiyet 23 Temmuz 1908'de yeniden ilan edilmiş; bu gelişme otuz yıllık aradan sonra meclisin toplanarak padişahın mutlak yetkilerini bir kez daha sınırlandırmasıyla sonuçlanmıştır.",
        hints: {
          hintCause: "II. Meşrutiyet'in ilanında, Rumeli'de dağa çıkan subayların ve halkın saraya uyguladığı yoğun baskıya odaklanınız.",
          hintEffect: "II. Meşrutiyet'in ilanıyla otuz yıllık aradan sonra meclisin yeniden açılarak otoriteyi sınırlandırması sonucuna odaklanınız.",
          hintBoth: "Rumeli'den gelen yoğun ordu baskısını (neden) ve otuz yıl sonra meclisin açılarak mutlak otoriteyi sınırlamasını (sonuç) birlikte değerlendiriniz."
        }
      },
      1: {
        explanation: "Meşrutiyetin ilanıyla birlikte basındaki sansürün kaldırılması ve anayasal güvencelerin verilmesi İstanbul meydanlarında hürriyet coşkusu yaratmış; doğan serbest tartışma ortamı ilk siyasi fırkaların kurularak çok partili hayata geçilmesini sağlamıştır.",
        hints: {
          hintCause: "Hürriyet kutlamalarında, basındaki sansürün kaldırılması ve anayasal hakların tanınmasına odaklanınız.",
          hintEffect: "Meydanlardaki serbestliğin ve coşkunun çok partili siyasi hayata geçişi başlatması sonucuna odaklanınız.",
          hintBoth: "Sansürün kalkmasıyla doğan hürriyeti (neden) ve cemiyetlerin partileşerek çok partili dönemi başlatmasını (sonuç) birlikte değerlendiriniz."
        }
      },
      2: {
        explanation: "Meşrutiyetin ilanında başrol oynayan ordunun ve genç subayların cemiyeti sahiplenmesi İttihat ve Terakki'nin gücünü pekiştirmiş; cemiyet ordu desteğiyle hükümet kararları ve devlet idaresinde en belirleyici siyasi güç hâline gelmiştir.",
        hints: {
          hintCause: "İttihat ve Terakki'nin siyasette güçlenmesinde, ordunun ve genç subayların cemiyete verdiği desteğe odaklanınız.",
          hintEffect: "Cemiyetin güçlenmesinin devlet yönetiminde ve hükümet kararlarında en belirleyici güç hâline gelmesi sonucuna odaklanınız.",
          hintBoth: "Genç subayların cemiyete sağladığı askeri desteği (neden) ve cemiyetin devlet yönetimindeki belirleyici güce dönüşmesini (sonuç) birlikte değerlendiriniz."
        }
      }
    },
    rings: {
      ring1: [
        { triadId: 1, text: "Meşrutiyetin ilanıyla birlikte basındaki sansürün kalkması ve anayasal güvencelerin verilmesi", label: "Sansürün Kalkması" },
        { triadId: 2, text: "Meşrutiyetin ilan edilmesinde başrol oynayan ordu ve genç subayların cemiyeti sahiplenmesi", label: "Genç Subay Desteği" },
        { triadId: 0, text: "Rumeli'deki askerî ayaklanma ve halkın meşrutiyetin ilanı yönündeki yoğun baskısı", label: "Halk ve Ordu Baskısı" }
      ],
      ring2: [
        { triadId: 0, text: "23 Temmuz 1908 – II. Meşrutiyet'in İlanı", label: "II. Meşrutiyet" },
        { triadId: 1, text: "1908 – İstanbul Meydanlarında Hürriyet İlanı", label: "Hürriyet Ortamı" },
        { triadId: 2, text: "İttihat ve Terakki'nin Güçlenmesi (1908-1909)", label: "İttihat ve Terakki" }
      ],
      ring3: [
        { triadId: 2, text: "Cemiyetin devlet yönetiminde ve hükümet kararlarında en belirleyici güç hâline gelmesi", label: "Yönetimde Etkinlik" },
        { triadId: 0, text: "Otuz yıllık aranın ardından Meclis-i Mebusan'ın açılarak padişahın mutlak otoritesinin sınırlandırılması", label: "Meclisin Açılması" },
        { triadId: 1, text: "Meydanlarda büyük bir coşku yaşanması ve çok partili siyasi hayata geçişin başlaması", label: "Çok Partili Dönem" }
      ]
    }
  },

  // =========================================================================
  // 6. AŞAMA: 31 Mart Olayı ve Meclis Üstünlüğü (1909)
  // =========================================================================
  {
    id: 6,
    title: "6. Aşama",
    pillName: "6. Aşama",
    correct: { ring1: 1, ring2: 2, ring3: 0 },
    initial: { ring1: 0, ring2: 0, ring3: 0 },
    triads: {
      0: {
        explanation: "Meşrutiyet yönetimine, yeniliklere ve İttihat ve Terakki'nin siyasetteki ağırlığına karşı duyulan hoşnutsuzluk kışkırtmalarla birleşmiş; bu durum başkentte anayasal meşruti düzeni devirmeyi hedefleyen büyük 31 Mart Ayaklanması'nın patlak vermesine yol açmıştır.",
        hints: {
          hintCause: "31 Mart Ayaklanması'nın çıkışında, anayasal meşrutiyet yönetimine ve cemiyetin siyasetteki ağırlığına karşı duyulan rejim karşıtı kışkırtmalara odaklanınız.",
          hintEffect: "Bu rahatsızlığın başkent İstanbul'da meşrutiyeti ortadan kaldırmayı amaçlayan gerici bir ayaklanmaya dönüşmesi sonucuna odaklanınız.",
          hintBoth: "Rejim karşıtı kışkırtmaları (neden) ve başkentte patlak veren büyük ayaklanmayı (sonuç) birlikte değerlendiriniz."
        }
      },
      1: {
        explanation: "Başkentte patlak veren 31 Mart Olayı'nın anayasal düzeni tehdit etmesi üzerine Mahmut Şevket Paşa komutasındaki Hareket Ordusu İstanbul'a girmiş; ayaklanmayı bastırarak meşruti idareyi ve anayasayı koruma altına almıştır.",
        hints: {
          hintCause: "Hareket Ordusu'nun İstanbul'a yürümesinde, başkentte patlak veren 31 Mart Olayı'nın meşruti düzeni tehdit etmesine odaklanınız.",
          hintEffect: "Hareket Ordusu'nun başkente girmesiyle isyanın bastırılması ve meşruti düzenin korunması sonucuna odaklanınız.",
          hintBoth: "31 Mart Olayı'nın doğurduğu tehlikeyi (neden) ve Hareket Ordusu'nun isyanı bastırarak anayasayı korumasını (sonuç) birlikte değerlendiriniz."
        }
      },
      2: {
        explanation: "31 Mart Ayaklanması'nın bastırılmasının ardından meclisin üstünlüğünü kanunla güvenceye alma iradesi, 1909'da Kanun-ı Esasi'de köklü değişiklikler yapılmasını sağlamış; padişahın meclisi kapatma yetkisi sınırlandırılarak hükümet saraya değil doğrudan meclise sorumlu hâle getirilmiştir.",
        hints: {
          hintCause: "1909 anayasa değişikliklerinde, isyanın ardından meclisin iradesini yasal olarak teminat altına alma kararına odaklanınız.",
          hintEffect: "Anayasa değişiklikleriyle hükümetin doğrudan meclise sorumlu kılınması ve padişah yetkilerinin kısıtlanması sonucuna odaklanınız.",
          hintBoth: "Meclis üstünlüğünü sağlama iradesini (neden) ve hükümetin meclise sorumlu kılınarak padişahın yetkilerinin sınırlandırılması sonucunu (sonuç) birlikte değerlendiriniz."
        }
      }
    },
    rings: {
      ring1: [
        { triadId: 2, text: "İsyanın bastırılmasının ardından meclisin devlet yönetimindeki üstünlüğünü yasal olarak güvenceye alma kararı", label: "Meclis İradesi" },
        { triadId: 0, text: "Meşrutiyet yönetimine ve İttihat ve Terakki'nin siyasetteki ağırlığına karşı duyulan rahatsızlık ve kışkırtmalar", label: "Rejim Karşıtlığı" },
        { triadId: 1, text: "Başkentte meşrutiyet yönetimine ve anayasaya karşı büyük bir ayaklanmanın başlaması", label: "31 Mart Olayı" }
      ],
      ring2: [
        { triadId: 1, text: "1909 – Hareket Ordusu'nun İstanbul'a Girişi", label: "Hareket Ordusu" },
        { triadId: 2, text: "1909 – Kanun-ı Esasi Değişiklikleri", label: "1909 Anayasa Değişikliği" },
        { triadId: 0, text: "31 Mart 1909 – 31 Mart Ayaklanması", label: "31 Mart Ayaklanması" }
      ],
      ring3: [
        { triadId: 0, text: "Başkentte meşrutiyet yönetimine son vermek amacıyla gerici büyük bir ayaklanmanın patlak vermesi", label: "Gerici Ayaklanma" },
        { triadId: 1, text: "Selanik'ten gelen ordunun ayaklanmayı bastırarak meşruti düzeni ve anayasayı koruması", label: "İsyanın Bastırılması" },
        { triadId: 2, text: "Padişahın meclisi kapatma yetkisinin sınırlandırılması, hükümetin meclise karşı sorumlu kılınması", label: "Meclis Üstünlüğü" }
      ]
    }
  }
];
