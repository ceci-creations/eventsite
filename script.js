console.log("script");
// Interaktiv SVG-side
const svgPlaceholder = document.querySelector(".svg-placeholder");

// Opsamlingsside
const eventPass = document.querySelector(".event-pass");

if (eventPass) {
  // Eksempel: params.get("navn") henter værdien fra et formularfelt med name="navn".
  const params = new URLSearchParams(window.location.search);
  const fuldeNavnInput = document.querySelector("#op-fulde-navn");
  const fuldeNavn = params.get("fulde-navn");
  fuldeNavnInput.textContent = fuldeNavn;

  const firstChar = fuldeNavn.charAt(0);

  //det første bogstav i fornavnet definere farven på baggrund i opsamling
  if (firstChar <= "O") {
    eventPass.style.backgroundColor = "#7FB8D3";
  } else if (firstChar > "O") {
    eventPass.style.backgroundColor = "#99D1AA";
  }

  //Note til videreudvikling:
  // Hvis der er 1 eller flere børn (uden voksen), så skal der være et billede med et barn.
  // Hvis der kun er 1 eller flere voksne skal der være et billede med en voksen.
  // Hvis der er både børn og voksne skal der være et billede med begge.

  const emailInput = document.querySelector("#op-email");
  const email = params.get("email");
  emailInput.textContent = email;

  const phoneInput = document.querySelector("#op-phone");
  const phone = params.get("phone");
  phoneInput.textContent = phone;

  const antalVoksneSelect = document.querySelector("#op-antal-voksne");
  const antalVoksne = params.get("antal-voksne");
  antalVoksneSelect.textContent = antalVoksne;

  const antalBørnSelect = document.querySelector("#op-antal-børn");
  const antalBørn = params.get("antal-børn");
  antalBørnSelect.textContent = antalBørn;

  const valgtMosemission = document.querySelector("#op-mosemission");
  const mosemission = params.get("mosemission");
  valgtMosemission.textContent = mosemission;

  const valgtDato = document.querySelector("#op-dato");
  const dato = params.get("dato");
  valgtDato.textContent = dato;

  // Konfetti-effekt på opsamlingssiden
  const smaltFormat = window.innerWidth < 600
  
  confetti({
    particleCount: 210,
    spread: 80,
    origin: { y: 0.7 },
  });
}

const html = document.querySelector("html");
const toggleSwitch = document.querySelector("#theme-toggle");
console.log(toggleSwitch);

function handleThemeChange(event) {
  console.log("handleThemeChange");
  // 1. læs checkboxens state
  const isDark = toggleSwitch.checked;
  console.log(isDark);
  // 2. toggle dark-klassen på html
  html.classList.toggle("dark", isDark);
  // 3. gem dark mode-valget i localStorage
  localStorage.setItem("isDarkMode", isDark);
}
function getSavedTheme() {
  // 4. hent det gemte theme
  const isDark = localStorage.getItem("isDarkMode") === "true";
  // 5. sync dark-klassen på html

  // 6. sync checkboxens checked-state
}

getSavedTheme();

toggleSwitch?.addEventListener("change", handleThemeChange);

// karrusel: //

const sponsorer = document.querySelector("#sponsorer");
// ^^ finder id'et 'sponsorer' i index.html

//~~~~

let igang = false;
// ^^ et flag.. husker om en animation kører lige nu..
// her bruges 'let' i stedet for 'const', for at værdien kan ændres senere (false/true)

//~~~~

// Funktionen 'naeste' herunder definerer selve skiftet, hvori rækken rykkes ét logo ad gangen til venstre og det første logo lægges bagerst, så karrusellen kører uendeligt
function naeste() {
  if (igang) return;
  igang = true;
  // ^^ gør ikke umiddelbart noget, fordi der kun er den her ene function/animation

  const bredde = sponsorer.children[0].offsetWidth;
  sponsorer.style.transition = "transform 1.2s ease";
  sponsorer.style.transform = `translateX(-${bredde}px)`;
  // ^^ const bredde: en identifier kaldet 'bredde'. Finder den totale bredde på første logo
  // children[0] = det første logo (første child i rækken). Dog ikke det samme som first-child..
  // ^^ sponsorer, CSS: laver en transition-effekt og rykker rækken til venstre med den definerede bredde (identifieren)

  sponsorer.addEventListener(
    "transitionend",
    // ^^ holder øje med sponsorer-elementet. Lytter og venter på, at animationen (transition) slutter
    () => {
      sponsorer.style.transition = "none";
      // ^^ stopper animationen
      sponsorer.appendChild(sponsorer.children[0]);
      // ^^ appendChild flytter første logo bagerst i rækken
      sponsorer.style.transform = "translateX(0)";
      // nulstiller forskydelsen/rykket, dvs. rækken er tilbage i orginal position
      igang = false;
      // ^^ flaget frigives..
    },
    { once: true },
    // ^^ lytteren fjerner sig selv, for hvert skift..
  );
}

// Når animationen er sket, kommer der en "oprydning" og setInterval herunder er "motoren", som står for at genstarte
// basically: eventListener = nulstilling + muliggørelse af genstart/gentagelse. setInterval = selve genstarten/gentagelsen

//~~~~

setInterval(naeste, 5000);
// ^^ gør at funktionen 'naeste' kaldes hvert 5. sekund
// dvs. skiftet mellem sponsorer sker med 5 sekunders mellemrum


const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    const target = item.dataset.target;
    const illustration = document.querySelector(`.${target}`);

    if (!illustration) return;

    illustration.classList.remove("jump");

    // Genstart animationen
    void illustration.offsetWidth;

    illustration.classList.add("jump");
  });
});
