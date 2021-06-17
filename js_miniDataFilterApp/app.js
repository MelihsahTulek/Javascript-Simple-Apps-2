/***********************************    KONUMLAR    ***************************************/

let sehirList = [
    {
      "il":"Antalya",
      "ilceler": {
          "Alanya":["A Mahallesi"],
          "Gazipaşa":["A-1 Mahallesi","A-2 Mahallesi"]
      }
    },
    {
      "il":"İstanbul",
      "ilceler": {
          "Ataşehir":["İ Mahallesi"]
      }
    }
]

let ilListesiElem = document.querySelector("#ilListesi");
let ilceListesi = document.querySelector("#ilceListesi");
let mahalleListesi = document.querySelector("#mahalleListesi");

ilceListesi.setAttribute("disabled","true");
mahalleListesi.setAttribute("disabled","true");
// İL LİSTESİ EKLENDİ
(() => {
    sehirList.forEach((data) => {
        ilListesiElem.innerHTML += `<option value="${data.il}">${data.il}</option>`;
    });
})();

// İLÇE LİSTESİ EKLENDİ
ilListesiElem.addEventListener("change", (e) => {
    ilceListesi.innerHTML = '<option value="selected" selected>İlçe Seçiniz</option>';
    ilceListesi.removeAttribute("disabled");
    if (e.target.value == "selected") {
        ilceListesi.setAttribute("disabled","true");
        ilanYazdir(undefined)
        return false;
    }else{
        sehirList.forEach((data) => {
            if (data.il == e.target.value) {
                Object.keys(data.ilceler).forEach(ilce => {
                    ilceListesi.innerHTML += `<option value="${ilce}">${ilce}</option>`;
                });
                
            }
        });
    }
    ilanYazdir(e.target.value);
});

ilceListesi.addEventListener("change", (e) => {
    ilanYazdir(e.target.value)
    mahalleListesi.innerHTML = '';
    mahalleListesi.innerHTML = '<option value="selected" selected>Mahalle Seçiniz</option>';
    mahalleListesi.removeAttribute("disabled");
    if (e.target.value == "selected") {
        mahalleListesi.setAttribute("disabled","true");
        ilanYazdir(ilListesiElem.value)
        return false;
    }else{
        sehirList.forEach((data,index) => {
            Object.keys(data.ilceler).forEach((ilce) => {
                if (ilce == e.target.value) {
                   (sehirList[index].ilceler[e.target.value]).forEach(mahalle => {
                        mahalleListesi.innerHTML += `<option value="${mahalle}">${mahalle}</option>`; 
                   }); 
                }
            });
        });
    }
})

mahalleListesi.addEventListener("change", (e) => {
    if (e.target.value == "selected") {
        ilanYazdir(ilceListesi.value);
    }else{
        ilanYazdir(e.target.value)
    }
})

/***********************************    İLANLAR    ***************************************/
let ilanKapsayici = document.querySelector('#ilanKapsayici');
let ilanList = [
    {
        "ilanID":1,
        "ilanSahibiID":1,
        "ilanBaslik":"1+0 eşyalı Ev",
        "aciklama":"Aliquam auctor ipsum et tincidunt molestie.",
        "ozellikler":["Full Eşyalı","Su + Elektrik Ücretsiz","Wireless internet","7/24 Sıcak su","Merkezi Isıtma"],
        "il":"Antalya",
        "ilce":"Alanya",
        "mahalle":"A Mahallesi",
        "fiyat":750
    },
    {
        "ilanID":2,
        "ilanSahibiID":1,
        "ilanBaslik":"1+1 Ev",
        "aciklama":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "ozellikler":["Kapalı Havuz","Güvenlik","Kapalı Otopark","7/24 Sıcak su","Merkezi Isıtma"],
        "il":"Antalya",
        "ilce":"Gazipaşa",
        "mahalle":"A-1 Mahallesi",
        "fiyat":350
    },
    {
        "ilanID":3,
        "ilanSahibiID":1,
        "ilanBaslik":"2+1 eşyalı Ev",
        "aciklama":"Vivamus congue malesuada volutpat.",
        "ozellikler":["Açık Otopark","Açık havuz","Kişisel Bahçe"],
        "il":"Antalya",
        "ilce":"Gazipaşa",
        "mahalle":"A-2 Mahallesi",
        "fiyat":550
    },
    {
        "ilanID":4,
        "ilanSahibiID":1,
        "ilanBaslik":"5+1 Dublex Ev",
        "aciklama":"Vivamus congue malesuada volutpat. ",
        "ozellikler":["Açık Otopark","Açık havuz","Kişisel Bahçe","Sauna","Güvenlik"],
        "il":"İstanbul",
        "ilce":"Ataşehir",
        "mahalle":"İ Mahallesi",
        "fiyat":1500
    }
]

icerik = (ilan,index) => {
    ilanKapsayici.innerHTML += `
    <div class="col-lg-4 col-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${ilan.ilanBaslik}</h5>
                <small><b> ${ilan.fiyat} TL </b> </small>
                <hr>
                <p class="card-text">${ilan.aciklama}</p>
            </div>
            <ul class="list-group list-group-flush ozelliklerUL">
                        
            </ul>
            <div class="card-body">
                <p class="text-muted">
                    ${ilan.il} / ${ilan.ilce} / ${ilan.mahalle}
                </p>
                <p class="pb-0">
                    İlan Sahibi: ${ilan.ilanSahibiID}
                 <p>
            </div>
         </div>
    </div>`;
    ilan.ozellikler.forEach(ozellik => {
        document.getElementsByClassName('ozelliklerUL')[index].innerHTML += `<li class="list-group-item">+ ${ozellik} </li>` 
    })
}

ilanYazdir = (opt) => {
    let index = -1;
    ilanKapsayici.innerHTML = '';
    if (opt != undefined) {
        ilanList.forEach((ilan) => {
            if (ilan.il == opt) {
                index += 1;
                icerik(ilan,index);
            }
            if (ilan.ilce == opt) {
                index += 1;
                icerik(ilan,index);
            }
            if (ilan.mahalle == opt) {
                index += 1;
                icerik(ilan,index);
            }
            if (Array.isArray(opt)) {
                if (ilan.fiyat >= opt[0] && ilan.fiyat <= opt[1]) {
                    index += 1;
                    icerik(ilan,index)
                }
            }
        });
    }else{
        ilanList.forEach(ilan => {
            index += 1;
            icerik(ilan,index)
        });
    }
    
    
}

ilanYazdir();


/***********************************    FİYAT FİLTRESİ    ***************************************/

let fiyatForm = document.forms['fiyatForm'];

fiyatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let minP = parseInt(fiyatForm.elements[0].value);
    let maxP = parseInt(fiyatForm.elements[1].value);
    if (isNaN(minP) || isNaN(maxP)) {
        ilanYazdir();
    }else{
        ilanYazdir([minP,maxP]);
    }
})
