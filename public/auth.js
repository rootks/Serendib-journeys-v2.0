// auth.js — Serendib Journeys frontend account layer (Firebase Auth + Firestore)
// Requires firebase-app-compat.js, firebase-auth-compat.js, firebase-firestore-compat.js,
// and firebase-config.js (which defines the global `auth` and `db` objects) to be
// loaded on the page BEFORE this script.

let currentUser = null; // { uid, email, fullName, phone, role, accommodationPref, createdAt }

document.addEventListener("DOMContentLoaded", () => {
  waitForAuthReady().then(() => {
    renderAuthNav();
    initPageSpecificLogic();
  });
});

// ---------- Session ----------
function waitForAuthReady() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      unsubscribe();
      if (fbUser) {
        currentUser = await loadUserProfile(fbUser);
      } else {
        currentUser = null;
      }
      resolve(currentUser);
    });
  });
}

async function loadUserProfile(fbUser) {
  try {
    const snap = await db.collection("users").doc(fbUser.uid).get();
    if (!snap.exists) {
      return { uid: fbUser.uid, email: fbUser.email, fullName: fbUser.email, phone: "", role: "user", accommodationPref: "4-Star Boutique" };
    }
    const data = snap.data();
    return {
      uid: fbUser.uid,
      email: fbUser.email,
      fullName: data.fullName || fbUser.email,
      phone: data.phone || "",
      role: data.role || "user",
      accommodationPref: data.accommodationPref || "4-Star Boutique",
      createdAt: data.createdAt
    };
  } catch (err) {
    console.error("Could not load profile:", err);
    return { uid: fbUser.uid, email: fbUser.email, fullName: fbUser.email, phone: "", role: "user", accommodationPref: "4-Star Boutique" };
  }
}

// ---------- Nav rendering (every page) ----------
function renderAuthNav() {
  const slot = document.getElementById("authNavSlot");
  if (!slot) return;

  if (currentUser) {
    const adminLink = currentUser.role === "admin"
      ? `<a href="admin.html" class="nav-link">Admin</a>`
      : "";
    slot.innerHTML = `
      ${adminLink}
      <a href="account.html" class="nav-link">Hi, ${escapeHtml((currentUser.fullName || "").split(" ")[0] || "Traveler")}</a>
      <a href="#" class="nav-link" onclick="handleLogout(event)">Log Out</a>
    `;
  } else {
    slot.innerHTML = `
      <a href="login.html" class="nav-link">Log In</a>
      <a href="register.html" class="nav-link">Sign Up</a>
    `;
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function friendlyAuthError(err) {
  const map = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "Invalid email or password.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again."
  };
  return map[err.code] || err.message || "Something went wrong. Please try again.";
}

// ---------- Logout ----------
async function handleLogout(e) {
  if (e && e.preventDefault) e.preventDefault();
  try {
    await auth.signOut();
  } catch (err) { /* ignore */ }
  currentUser = null;
  window.location.href = "login.html";
}

// ---------- Page router ----------
function initPageSpecificLogic() {
  const path = window.location.pathname.split("/").pop();

  if (path === "login.html") setupLoginPage();
  if (path === "register.html") setupRegisterPage();
  if (path === "account.html") setupAccountPage();
  if (path === "admin.html") setupAdminPage();
  if (path === "itinerary-planner.html") setupPlannerSaveButton();
  if (path === "tours.html") setupTourBookingHook();
}

// ---------- Login Page ----------
function setupLoginPage() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  if (currentUser) {
    window.location.href = currentUser.role === "admin" ? "admin.html" : "account.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusBox = document.getElementById("loginStatus");
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    statusBox.className = "form-feedback-box";
    statusBox.textContent = "";

    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      currentUser = await loadUserProfile(cred.user);
      statusBox.className = "form-feedback-box success";
      statusBox.textContent = `Welcome back, ${currentUser.fullName}! Redirecting...`;
      setTimeout(() => {
        window.location.href = currentUser.role === "admin" ? "admin.html" : "account.html";
      }, 500);
    } catch (err) {
      statusBox.className = "form-feedback-box error";
      statusBox.textContent = friendlyAuthError(err);
    }
  });
}

// ---------- Register Page ----------
function setupRegisterPage() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  if (currentUser) {
    window.location.href = "account.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusBox = document.getElementById("registerStatus");
    const fullName = document.getElementById("regFullName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regPasswordConfirm").value;

    statusBox.className = "form-feedback-box";
    statusBox.textContent = "";

    if (password !== confirm) {
      statusBox.className = "form-feedback-box error";
      statusBox.textContent = "Passwords do not match.";
      return;
    }

    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: fullName });

      await db.collection("users").doc(cred.user.uid).set({
        fullName,
        email,
        phone: phone || "",
        role: "user",
        accommodationPref: "4-Star Boutique",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      currentUser = { uid: cred.user.uid, email, fullName, phone, role: "user", accommodationPref: "4-Star Boutique" };
      statusBox.className = "form-feedback-box success";
      statusBox.textContent = `Account created! Welcome, ${fullName}. Redirecting...`;
      setTimeout(() => { window.location.href = "account.html"; }, 500);
    } catch (err) {
      statusBox.className = "form-feedback-box error";
      statusBox.textContent = friendlyAuthError(err);
    }
  });
}

// ---------- Account Page ----------
function setupAccountPage() {
  const greeting = document.getElementById("accountGreeting");
  if (!greeting) return;

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  greeting.textContent = `Welcome, ${(currentUser.fullName || "").split(" ")[0]}`;

  document.querySelectorAll(".account-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".account-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".account-tab-panel").forEach(p => p.style.display = "none");
      document.getElementById(`tab-${btn.dataset.tab}`).style.display = "block";
    });
  });

  document.getElementById("pFullName").value = currentUser.fullName || "";
  document.getElementById("pEmail").value = currentUser.email || "";
  document.getElementById("pPhone").value = currentUser.phone || "";
  document.getElementById("pAccommodation").value = currentUser.accommodationPref || "4-Star Boutique";

  document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusBox = document.getElementById("profileStatus");
    const fullName = document.getElementById("pFullName").value.trim();
    const phone = document.getElementById("pPhone").value.trim();
    const accommodationPref = document.getElementById("pAccommodation").value;

    if (!fullName) {
      statusBox.className = "form-feedback-box error";
      statusBox.textContent = "Full name cannot be empty.";
      return;
    }

    try {
      await db.collection("users").doc(currentUser.uid).update({ fullName, phone, accommodationPref });
      currentUser.fullName = fullName;
      currentUser.phone = phone;
      currentUser.accommodationPref = accommodationPref;
      statusBox.className = "form-feedback-box success";
      statusBox.textContent = "Profile updated successfully.";
      renderAuthNav();
    } catch (err) {
      statusBox.className = "form-feedback-box error";
      statusBox.textContent = err.message || "Update failed.";
    }
  });

  loadSavedTrips();
  loadMyBookings();
}

async function loadSavedTrips() {
  const list = document.getElementById("tripsList");
  try {
    const snap = await db.collection("savedTrips")
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt", "desc")
      .get();

    if (snap.empty) {
      list.innerHTML = `<p class="account-empty-msg">No saved trips yet. Build one on the <a href="itinerary-planner.html">Trip Planner</a>.</p>`;
      return;
    }

    list.innerHTML = snap.docs.map(doc => {
      const t = doc.data();
      return `
        <div class="account-card">
          <div class="account-card-main">
            <strong>${escapeHtml(t.tripName)}</strong>
            <p class="account-card-route">${escapeHtml(t.routeText)}</p>
            <span class="account-card-meta">${escapeHtml(t.daysLabel || "")} • ${t.stopsCount || 0} stops • ${t.travelers || 1} traveler(s)</span>
          </div>
          <div class="account-card-side">
            <div class="account-card-price">${t.currency} ${Number(t.totalPrice).toLocaleString()}</div>
            <button class="btn btn-outline btn-sm" onclick="deleteTrip('${doc.id}')">Remove</button>
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p class="account-empty-msg">Could not load saved trips. ${err.code === "failed-precondition" ? "(Firestore may need an index — check the browser console for a link to create it.)" : ""}</p>`;
  }
}

async function deleteTrip(id) {
  if (!confirm("Remove this saved trip?")) return;
  await db.collection("savedTrips").doc(id).delete();
  loadSavedTrips();
}

async function loadMyBookings() {
  const list = document.getElementById("bookingsList");
  try {
    const snap = await db.collection("bookings")
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt", "desc")
      .get();

    if (snap.empty) {
      list.innerHTML = `<p class="account-empty-msg">No bookings yet. Browse our <a href="tours.html">Curated Tours</a>.</p>`;
      return;
    }

    list.innerHTML = snap.docs.map(doc => {
      const b = doc.data();
      return `
        <div class="account-card">
          <div class="account-card-main">
            <strong>${escapeHtml(b.packageName)}</strong>
            <span class="account-card-meta">${b.guests} guest(s) • Travel date: ${b.travelDate || "TBC"}</span>
          </div>
          <div class="account-card-side">
            <div class="account-card-price">${b.currency} ${Number(b.totalPrice).toLocaleString()}</div>
            <span class="status-badge status-${b.status}">${b.status}</span>
            ${b.status === "pending" ? `<button class="btn btn-outline btn-sm" onclick="cancelBooking('${doc.id}')">Cancel</button>` : ""}
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p class="account-empty-msg">Could not load bookings. ${err.code === "failed-precondition" ? "(Firestore may need an index — check the browser console for a link to create it.)" : ""}</p>`;
  }
}

async function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;
  try {
    await db.collection("bookings").doc(id).update({ status: "cancelled" });
  } catch (err) {
    alert(err.message || "Could not cancel booking.");
  }
  loadMyBookings();
}

// ---------- Admin Page ----------
async function setupAdminPage() {
  const guardMsg = document.getElementById("adminGuardMsg");
  const content = document.getElementById("adminContent");
  if (!content) return;

  if (!currentUser || currentUser.role !== "admin") {
    guardMsg.style.display = "block";
    guardMsg.textContent = "Admin access only. Redirecting...";
    setTimeout(() => { window.location.href = currentUser ? "account.html" : "login.html"; }, 800);
    return;
  }

  content.style.display = "block";

  try {
    const [usersSnap, bookingsSnap, tripsSnap] = await Promise.all([
      db.collection("users").get(),
      db.collection("bookings").orderBy("createdAt", "desc").get(),
      db.collection("savedTrips").get()
    ]);

    const users = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const bookings = bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const trips = tripsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    renderAdminStats(users, bookings, trips);
    renderAdminBookings(bookings);
    renderAdminUsers(users, bookings, trips);
  } catch (err) {
    console.error(err);
    content.innerHTML = `<p class="account-empty-msg">Could not load admin data: ${escapeHtml(err.message)}</p>`;
  }
}

function renderAdminStats(users, bookings, trips) {
  const totalUsers = users.filter(u => u.role === "user").length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
  const totalSavedTrips = trips.length;
  const revenueUsdEstimate = bookings
    .filter(b => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + (Number(b.baseUsd) || 0) * (Number(b.guests) || 1), 0);

  document.getElementById("statUsers").textContent = totalUsers;
  document.getElementById("statBookings").textContent = totalBookings;
  document.getElementById("statPending").textContent = pendingBookings;
  document.getElementById("statConfirmed").textContent = confirmedBookings;
  document.getElementById("statTrips").textContent = totalSavedTrips;
  document.getElementById("statRevenue").textContent = `$${revenueUsdEstimate.toLocaleString()}`;
}

function renderAdminBookings(bookings) {
  const body = document.getElementById("adminBookingsBody");
  body.innerHTML = bookings.map(b => `
    <tr>
      <td>${escapeHtml(b.guestName)}<br><small>${escapeHtml(b.guestEmail)}</small></td>
      <td>${escapeHtml(b.packageName)}</td>
      <td>${b.guests}</td>
      <td>${b.travelDate || "TBC"}</td>
      <td>${b.currency} ${Number(b.totalPrice).toLocaleString()}</td>
      <td><span class="status-badge status-${b.status}">${b.status}</span></td>
      <td>
        <select onchange="updateBookingStatus('${b.id}', this.value)">
          <option value="pending" ${b.status === "pending" ? "selected" : ""}>Pending</option>
          <option value="confirmed" ${b.status === "confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="completed" ${b.status === "completed" ? "selected" : ""}>Completed</option>
          <option value="cancelled" ${b.status === "cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
    </tr>
  `).join("");
}

async function updateBookingStatus(id, status) {
  try {
    await db.collection("bookings").doc(id).update({ status });
  } catch (err) {
    alert(err.message || "Could not update booking.");
  }
  setupAdminPage();
}

function renderAdminUsers(users, bookings, trips) {
  const body = document.getElementById("adminUsersBody");
  body.innerHTML = users.map(u => {
    const tripCount = trips.filter(t => t.userId === u.id).length;
    const bookingCount = bookings.filter(b => b.userId === u.id).length;
    const joined = u.createdAt && u.createdAt.toDate ? u.createdAt.toDate().toLocaleDateString() : "—";
    return `
      <tr>
        <td>${escapeHtml(u.fullName)}</td>
        <td>${escapeHtml(u.email)}</td>
        <td><span class="status-badge status-${u.role === "admin" ? "confirmed" : "pending"}">${u.role}</span></td>
        <td>${tripCount}</td>
        <td>${bookingCount}</td>
        <td>${joined}</td>
      </tr>
    `;
  }).join("");
}

// ---------- Itinerary Planner: "Save This Trip" ----------
function setupPlannerSaveButton() {
  const outputCard = document.querySelector(".planner-output-card");
  if (!outputCard) return;

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-outline full-width";
  saveBtn.style.marginTop = "12px";
  saveBtn.textContent = currentUser ? "💾 Save This Trip to My Account" : "🔒 Log In to Save This Trip";
  saveBtn.addEventListener("click", async () => {
    if (!currentUser) {
      window.location.href = "login.html";
      return;
    }
    const routeText = document.getElementById("calcRouteOut").textContent;
    const daysLabel = document.getElementById("calcDaysOut").textContent;
    const stopsText = document.getElementById("calcStopsOut").textContent;
    const stopsCount = parseInt(stopsText, 10) || 0;
    const travelers = parseInt(document.getElementById("calcTravelers").value, 10) || 1;
    const hotelTierSelect = document.getElementById("calcHotelTier");
    const hotelTier = hotelTierSelect.options[hotelTierSelect.selectedIndex].text;
    const totalText = document.getElementById("calcTotalOut").textContent.replace(/[^0-9.]/g, "");
    const totalPrice = parseFloat(totalText) || 0;
    const currency = (document.getElementById("currencySelect") && document.getElementById("currencySelect").value) || "USD";

    if (!totalPrice) {
      alert("Select at least one destination before saving.");
      return;
    }

    try {
      await db.collection("savedTrips").add({
        userId: currentUser.uid,
        tripName: `Sri Lanka Trip (${daysLabel})`,
        routeText, daysLabel, stopsCount, travelers, hotelTier, totalPrice, currency,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      saveBtn.textContent = "✔ Trip Saved — View in My Account";
      saveBtn.onclick = () => { window.location.href = "account.html"; };
    } catch (err) {
      alert(err.message || "Could not save trip.");
    }
  });

  outputCard.appendChild(saveBtn);
}

// ---------- Tours page: attach account to booking submissions ----------
function setupTourBookingHook() {
  // Wrap the existing submitTourBooking (defined in app.js) so bookings persist to Firestore.
  window.submitTourBooking = async function (e) {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in or create a free account to complete your reservation.");
      window.location.href = "login.html";
      return;
    }

    const guestName = document.getElementById("tModalGuestName").value;
    const guestEmail = document.getElementById("tModalGuestEmail").value;
    const packageName = document.getElementById("tModalPkgName").value;
    const guests = parseInt(document.getElementById("tModalGuests").value, 10) || 1;
    const travelDate = document.getElementById("tModalDate").value;
    const baseUsd = (typeof activeModalUSD !== "undefined" ? activeModalUSD : 0);
    const totalText = document.getElementById("tModalPriceCalculated").textContent.replace(/[^0-9.]/g, "");
    const totalPrice = parseFloat(totalText) || baseUsd * guests;
    const currency = (document.getElementById("currencySelect") && document.getElementById("currencySelect").value) || "USD";

    try {
      await db.collection("bookings").add({
        userId: currentUser.uid,
        packageName, guestName, guestEmail, guests, travelDate,
        baseUsd, totalPrice, currency, status: "pending",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert(`Ayubowan, ${guestName}! Your reservation request for '${packageName}' has been saved to your account. Our Colombo travel desk will follow up shortly.`);
      closeTourBookingModal();
    } catch (err) {
      alert(err.message || "Booking failed.");
    }
  };
}
