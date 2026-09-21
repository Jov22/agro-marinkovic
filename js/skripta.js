const dugmeMeni = document.getElementById("dugmeMeni");
const meni = document.getElementById("meni");
const promenaTeme = document.getElementById("promenaTeme");
const manjiFont = document.getElementById("manjiFont");
const veciFont = document.getElementById("veciFont");

function ucitajPodesavanja() {
    const sacuvanaTema = localStorage.getItem("tema");
    const sacuvanaVelicina = localStorage.getItem("velicina");

    if (sacuvanaTema === "tamna") {
        document.body.classList.add("tamna-tema");
    }

    if (sacuvanaVelicina) {
        document.documentElement.style.setProperty("--velicina", sacuvanaVelicina + "px");
    }
}

if (dugmeMeni && meni) {
    dugmeMeni.addEventListener("click", function () {
        meni.classList.toggle("otvoren");
    });
}

if (promenaTeme) {
    promenaTeme.addEventListener("click", function () {
        document.body.classList.toggle("tamna-tema");

        if (document.body.classList.contains("tamna-tema")) {
            localStorage.setItem("tema", "tamna");
        } else {
            localStorage.setItem("tema", "svetla");
        }
    });
}

function promeniVelicinuFonta(promena) {
    const trenutnaVelicina = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--velicina"));
    const novaVelicina = Math.min(22, Math.max(14, trenutnaVelicina + promena));
    document.documentElement.style.setProperty("--velicina", novaVelicina + "px");
    localStorage.setItem("velicina", novaVelicina);
}

if (manjiFont) {
    manjiFont.addEventListener("click", function () {
        promeniVelicinuFonta(-1);
    });
}

if (veciFont) {
    veciFont.addEventListener("click", function () {
        promeniVelicinuFonta(1);
    });
}

const slajdovi = document.querySelectorAll(".slajd");
const prethodnaSlika = document.getElementById("prethodnaSlika");
const sledecaSlika = document.getElementById("sledecaSlika");
let trenutniSlajd = 0;

function prikaziSlajd(noviSlajd) {
    if (slajdovi.length === 0) {
        return;
    }

    slajdovi[trenutniSlajd].classList.remove("aktivan");
    trenutniSlajd = (noviSlajd + slajdovi.length) % slajdovi.length;
    slajdovi[trenutniSlajd].classList.add("aktivan");
}

if (prethodnaSlika) {
    prethodnaSlika.addEventListener("click", function () {
        prikaziSlajd(trenutniSlajd - 1);
    });
}

if (sledecaSlika) {
    sledecaSlika.addEventListener("click", function () {
        prikaziSlajd(trenutniSlajd + 1);
    });
}

if (slajdovi.length > 0) {
    setInterval(function () {
        prikaziSlajd(trenutniSlajd + 1);
    }, 4500);
}


const kontaktForma = document.getElementById("kontaktForma");

if (kontaktForma) {
    kontaktForma.addEventListener("submit", function (dogadjaj) {
        dogadjaj.preventDefault();

        const ime = document.getElementById("ime");
        const email = document.getElementById("email");
        const telefon = document.getElementById("telefon");
        const tip = document.getElementById("tip");
        const poruka = document.getElementById("poruka");
        const uspeh = document.getElementById("uspeh");

        const greskaIme = document.getElementById("greskaIme");
        const greskaEmail = document.getElementById("greskaEmail");
        const greskaTelefon = document.getElementById("greskaTelefon");
        const greskaTip = document.getElementById("greskaTip");
        const greskaPoruka = document.getElementById("greskaPoruka");

        let ispravno = true;

        greskaIme.textContent = "";
        greskaEmail.textContent = "";
        greskaTelefon.textContent = "";
        greskaTip.textContent = "";
        greskaPoruka.textContent = "";

        if (ime.value.trim().length < 2) {
            greskaIme.textContent = "Unesite ime od najmanje 2 karaktera.";
            ispravno = false;
        }

        const emailObrazac = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailObrazac.test(email.value.trim())) {
            greskaEmail.textContent = "Unesite ispravnu email adresu.";
            ispravno = false;
        }

        const telefonObrazac = /^[0-9+\-\s]{6,18}$/;

        if (!telefonObrazac.test(telefon.value.trim())) {
            greskaTelefon.textContent = "Unesite ispravan broj telefona.";
            ispravno = false;
        }

        if (tip.value === "") {
            greskaTip.textContent = "Izaberite tip upita.";
            ispravno = false;
        }

        if (poruka.value.trim().length < 10) {
            greskaPoruka.textContent = "Poruka mora imati najmanje 10 karaktera.";
            ispravno = false;
        }

        if (ispravno) {
            const sacuvaniUpiti = JSON.parse(localStorage.getItem("upiti") || "[]");

            sacuvaniUpiti.push({
                ime: ime.value.trim(),
                email: email.value.trim(),
                telefon: telefon.value.trim(),
                tip: tip.value,
                poruka: poruka.value.trim(),
                vreme: new Date().toLocaleString("sr-RS")
            });

            localStorage.setItem("upiti", JSON.stringify(sacuvaniUpiti));

            kontaktForma.reset();
            uspeh.classList.add("prikazan");

            setTimeout(function () {
                uspeh.classList.remove("prikazan");
            }, 4000);
        }
    });
}

ucitajPodesavanja();const sviPadajuciMeniji = document.querySelectorAll(".padajuci-meni");

sviPadajuciMeniji.forEach(function (padajuciMeni) {
    const dugme = padajuciMeni.querySelector(".padajuci-dugme");

    if (dugme) {
        dugme.addEventListener("click", function () {
            padajuciMeni.classList.toggle("otvoren");
        });
    }
});
const youtubePrikaz = document.getElementById("youtubePrikaz");

if (youtubePrikaz) {
    const dugmePustiVideo = youtubePrikaz.querySelector(".dugme-pusti-video");

    if (dugmePustiVideo) {
        dugmePustiVideo.addEventListener("click", function () {
            const videoId = youtubePrikaz.getAttribute("data-video");

            youtubePrikaz.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        });
    }
}
if (typeof $ === "function") {
    $(".pitanje").click(function () {
        const odgovor = this.nextElementSibling;

        if (odgovor) {
            if (odgovor.style.display === "block") {
                odgovor.style.display = "none";
            } else {
                odgovor.style.display = "block";
            }
        }
    });
}