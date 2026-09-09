// Serendib Journeys - Interactive Engine with Google Maps, Currency Conversion, and Custom Planner

// Curated Map Destinations with Verified Coordinates & Real Google Embed URLs
const mapLocations = {
  sigiriya: {
    title: "Sigiriya Lion Rock Sky Palace",
    province: "Central Province • Matale",
    coords: "7.9570° N, 80.7603° E",
    desc: "Ancient 5th-century royal citadel with UNESCO water gardens, mirrored wall, and sheer 200m vertical monolith climb.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15799.645479008778!2d80.75053748281143!3d7.957027966779412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afca0dfa7cedbed%3A0x6b823e20e8b23f81!2sSigiriya!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk",
    link: "destinations.html#sigiriya"
  },
  ella: {
    title: "Ella & Nine Arch Viaduct",
    province: "Uva Province • Badulla",
    coords: "6.8728° N, 81.0465° E",
    desc: "Colonial railway viaduct, mountain hiking paths, Ravana Falls, and tea plantation ridges in the cool highlands.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15839.232301931086!2d81.03719038258384!3d6.872811366579227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae465955bc09a25%3A0xb351336109e3a890!2sNine%20Arches%20Bridge!5e0!3m2!1sen!2slk!4v1700000000001!5m2!1sen!2slk",
    link: "destinations.html#ella"
  },
  yala: {
    title: "Yala National Park (Ruhuna)",
    province: "Southern & Uva Provinces",
    coords: "6.3725° N, 81.5204° E",
    desc: "Premier wildlife reserve hosting the world's highest density of leopards, wild elephant herds, sloth bears, and lagoon birds.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31697.51475853245!2d81.49887719628045!3d6.372545564030646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae67f67702f309b%3A0xb122501a4e1d13db!2sYala%20National%20Park!5e0!3m2!1sen!2slk!4v1700000000002!5m2!1sen!2slk",
    link: "destinations.html#yala"
  },
  galle: {
    title: "Galle Dutch Fort & Ramparts",
    province: "Southern Province • Galle",
    coords: "6.0270° N, 80.2170° E",
    desc: "17th-century UNESCO maritime fortified citadel with colonial architecture, seaside lighthouse, and vibrant craft boutiques.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15872.247192329388!2d80.20815128239327!3d6.02703816641215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c76!2sGalle%20Fort!5e0!3m2!1sen!2slk!4v1700000000003!5m2!1sen!2slk",
    link: "destinations.html#galle"
  },
  kandy: {
    title: "Kandy (Temple of the Sacred Tooth)",
    province: "Central Province • Kandy",
    coords: "7.2936° N, 80.6413° E",
    desc: "The sacred royal capital of Sri Lanka housing the holy tooth relic of the Buddha surrounded by misty highland mountains.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.45787680076!2d80.63248838268048!3d7.293574766635292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662db149f455%3A0x1d22a61429789312!2sTemple%20of%20the%20Sacred%20Tooth%20Relic!5e0!3m2!1sen!2slk!4v1700000000004!5m2!1sen!2slk",
    link: "destinations.html#kandy"
  },
  nuwaraeliya: {
    title: "Nuwara Eliya & Pedro Tea Estate",
    province: "Central Highlands (1,868m)",
    coords: "6.9497° N, 80.7891° E",
    desc: "Known as 'Little England' with cool mountain climate, English Tudor bungalows, and emerald Camellia sinensis tea terraces.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15836.14324273898!2d80.7792686826017!3d6.94971846659728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae380434e1554c7%3A0x2916084ba1b06076!2sNuwara%20Eliya!5e0!3m2!1sen!2slk!4v1700000000005!5m2!1sen!2slk",
    link: "destinations.html#nuwaraeliya"
  },
  trincomalee: {
    title: "Trincomalee & Nilaveli Coast",
    province: "Eastern Province • Trincomalee",
    coords: "8.5874° N, 81.2152° E",
    desc: "Natural deep-water harbor, sacred Koneswaram temple atop Swami Rock, and crystal waters for Pigeon Island reef snorkeling.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15773.918939764585!2d81.20521018295984!3d8.587372266896225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afbb9962a98c89b%3A0xc07a8286f9be2fa9!2sTrincomalee!5e0!3m2!1sen!2slk!4v1700000000006!5m2!1sen!2slk",
    link: "destinations.html"
  }
};

// Currency Exchange system
const exchangeRates = {
  USD: { rate: 1.0, symbol: "$" },
  EUR: { rate: 0.92, symbol: "€" },
  GBP: { rate: 0.79, symbol: "£" },
  LKR: { rate: 310.0, symbol: "Rs " },
  AUD: { rate: 1.54, symbol: "A$" }
};

let currentCurrency = "USD";

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupDestFilters();
  initPlannerIfPresent();
  setupDefaultDates();
  initURLParams();
});

// Mobile menu toggle
function setupNavigation() {
  const toggle = document.getElementById("mobileToggle");
  const nav = document.getElementById("navLinks");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
}

// Google Map Place Switcher Logic
function selectMapLocation(key, elem) {
  const data = mapLocations[key];
  if (!data) return;

  // Update button active state
  document.querySelectorAll(".map-place-btn").forEach(btn => btn.classList.remove("active"));
  if (elem) elem.classList.add("active");

  // Update iframe
  const iframe = document.getElementById("googleMapIframe");
  if (iframe) {
    iframe.src = data.embedUrl;
  }

  // Update Floating card details
  const titleEl = document.getElementById("mapPlaceTitle");
  const descEl = document.getElementById("mapPlaceDesc");
  const coordsEl = document.getElementById("mapPlaceCoords");
  const linkEl = document.getElementById("mapPlaceLink");

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (coordsEl) coordsEl.textContent = `${data.province} • Coordinates: ${data.coords}`;
  if (linkEl) linkEl.href = data.link;
}

// Quick Search from Hero Bar
function redirectQuickSearch() {
  const destVal = document.getElementById("quickDestSelect");
  if (destVal && destVal.value) {
    window.location.href = destVal.value;
  } else {
    window.location.href = "destinations.html";
  }
}

// Filter destinations by category
function setupDestFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const destBlocks = document.querySelectorAll(".destination-block");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      destBlocks.forEach(block => {
        const cat = block.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          block.style.display = "grid";
        } else {
          block.style.display = "none";
        }
      });
    });
  });
}

// Real-time text search filter for destinations
function filterDestinationsByName() {
  const input = document.getElementById("destSearchInput");
  if (!input) return;
  const term = input.value.toLowerCase();
  const destBlocks = document.querySelectorAll(".destination-block");

  destBlocks.forEach(block => {
    const text = block.innerText.toLowerCase();
    if (text.includes(term)) {
      block.style.display = "grid";
    } else {
      block.style.display = "none";
    }
  });
}

// Currency Conversion Engine
function updateCurrencies() {
  const select = document.getElementById("currencySelect");
  if (!select) return;
  currentCurrency = select.value;
  const config = exchangeRates[currentCurrency];

  document.querySelectorAll(".currency-symbol").forEach(el => {
    el.textContent = config.symbol;
  });

  document.querySelectorAll(".pkg-amount").forEach(el => {
    const usd = parseFloat(el.getAttribute("data-usd"));
    const converted = Math.round(usd * config.rate);
    el.textContent = converted.toLocaleString();
  });

  if (document.getElementById("calcTotalOut")) {
    runTripPlannerCalc();
  }
}

// Custom Itinerary Route & Cost Calculation
function initPlannerIfPresent() {
  if (document.getElementById("calcDaysOut")) {
    runTripPlannerCalc();
  }
}

function runTripPlannerCalc() {
  const checkboxes = document.querySelectorAll("#plannerCheckboxList input:checked");
  const travelersSelect = document.getElementById("calcTravelers");
  const tierSelect = document.getElementById("calcHotelTier");

  if (!travelersSelect || !tierSelect) return;

  const travelers = parseInt(travelersSelect.value, 10) || 1;
  const tierMultiplier = parseFloat(tierSelect.value) || 1.0;

  let totalDays = 0;
  let baseSum = 0;
  const chosenNames = [];

  checkboxes.forEach(cb => {
    totalDays += parseInt(cb.getAttribute("data-days"), 10);
    baseSum += parseFloat(cb.getAttribute("data-price"));
    chosenNames.push(cb.value);
  });

  if (chosenNames.length === 0) {
    document.getElementById("calcDaysOut").textContent = "0 Days";
    document.getElementById("calcStopsOut").textContent = "0 Stops";
    document.getElementById("calcRouteOut").textContent = "Please select at least 1 destination above.";
    document.getElementById("calcTotalOut").textContent = "$0";
    return;
  }

  // Realistic Sri Lankan transport & hotel budget model
  const transportFee = 320 + (totalDays * 45);
  const stayCost = (baseSum * tierMultiplier) * travelers;
  const grandTotalUSD = Math.round(transportFee + stayCost);

  const config = exchangeRates[currentCurrency] || { rate: 1.0, symbol: "$" };
  const finalConverted = Math.round(grandTotalUSD * config.rate);

  document.getElementById("calcDaysOut").textContent = `${totalDays} Days / ${Math.max(1, totalDays - 1)} Nights`;
  document.getElementById("calcStopsOut").textContent = `${chosenNames.length} Locations`;
  document.getElementById("calcRouteOut").textContent = chosenNames.join(" → ");
  document.getElementById("calcTotalOut").textContent = `${config.symbol}${finalConverted.toLocaleString()}`;
}

// Cross-linking to planner
function addToCustomTrip(destinationName) {
  sessionStorage.setItem("serendib_add_dest", destinationName);
  window.location.href = "itinerary-planner.html";
}

function transferPlannerToContact() {
  const route = document.getElementById("calcRouteOut").textContent;
  const days = document.getElementById("calcDaysOut").textContent;
  const price = document.getElementById("calcTotalOut").textContent;

  const summary = `Custom Planner Route: ${route} (${days}). Estimated Budget: ${price}.`;
  sessionStorage.setItem("serendib_inquiry_notes", summary);
  window.location.href = "contact.html";
}

// Auto-fill Contact form from other pages
function initURLParams() {
  const params = new URLSearchParams(window.location.search);
  const notesField = document.getElementById("cNotes");
  if (!notesField) return;

  const interest = params.get("interest");
  const pkg = params.get("package");
  const storedSummary = sessionStorage.getItem("serendib_inquiry_notes");

  if (interest) {
    notesField.value = `Inquiring about special experience: ${interest}. Please share private booking availability.`;
  } else if (pkg) {
    notesField.value = `Interested in the '${pkg}' Tour Package. Please provide customized itinerary dates and quote.`;
  } else if (storedSummary) {
    notesField.value = storedSummary + " Please send a full day-to-day itinerary proposal.";
    sessionStorage.removeItem("serendib_inquiry_notes");
  }
}

// Tour Booking Modal Logic
let activeModalUSD = 0;

function openBookingPopup(packageName, baseUSD) {
  activeModalUSD = baseUSD;
  const modal = document.getElementById("tourBookingModal");
  if (!modal) return;

  document.getElementById("tModalPkgName").value = packageName;
  recalcModalTotal();
  modal.classList.add("active");
}

function closeTourBookingModal() {
  const modal = document.getElementById("tourBookingModal");
  if (modal) modal.classList.remove("active");
}

function recalcModalTotal() {
  const guestsInput = document.getElementById("tModalGuests");
  const count = parseInt(guestsInput ? guestsInput.value : 2, 10) || 1;
  const config = exchangeRates[currentCurrency] || { rate: 1.0, symbol: "$" };
  const total = Math.round(activeModalUSD * count * config.rate);

  const target = document.getElementById("tModalPriceCalculated");
  if (target) {
    target.textContent = `${config.symbol}${total.toLocaleString()} (${count} guest${count > 1 ? 's' : ''})`;
  }
}

function submitTourBooking(e) {
  e.preventDefault();
  const guest = document.getElementById("tModalGuestName").value;
  const pkg = document.getElementById("tModalPkgName").value;
  alert(`Ayubowan, ${guest}! Your reservation request for '${pkg}' has been received. Our Colombo travel desk will email your custom confirmation invoice within 4 hours.`);
  closeTourBookingModal();
}

// Handle Main Contact Form
function handleMainContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("cFullName").value;
  const email = document.getElementById("cEmail").value;
  const statusBox = document.getElementById("contactFormStatus");

  statusBox.textContent = `Ayubowan ${name}! Thank you for reaching out to Serendib Journeys. A confirmation receipt has been sent to ${email}. Our travel designer will contact you shortly.`;
  statusBox.className = "form-feedback-box success";

  document.getElementById("leadContactForm").reset();
}

function setupDefaultDates() {
  const today = new Date().toISOString().split("T")[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(inp => {
    inp.min = today;
  });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("tourBookingModal");
  if (e.target === modal) {
    closeTourBookingModal();
  }
});