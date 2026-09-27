/* ============================================
   MY LOVE v3.0 — Scripts
   ============================================ */

const USER = "Rayan";
const PASS = "1512006";
const LOVE_START = new Date("2024-08-25T00:00:00").getTime();

const DAILY_MESSAGES = [
    "You are my today and all of my tomorrows 💕",
    "Every love story is beautiful, but ours is my favorite 💖",
    "I love you more than yesterday, less than tomorrow 💗",
    "You are my sunshine on a cloudy day ☀️",
    "My heart beats only for you 💓",
    "Together is my favorite place to be 🏠",
    "You are the best thing that ever happened to me ✨",
    "Forever isn't long enough with you 💞",
    "In your smile, I see something more beautiful than the stars 🌟",
    "I fall in love with you every single day 💘"
];

const KISS_MESSAGES = [
    "I love you to the moon and back 💋",
    "You're my favorite person in the whole world 💕",
    "Forever yours, forever mine 💖",
    "Kiss for the most beautiful soul 💋",
    "My heart belongs to you only 💗",
    "You make my world brighter ☀️"
];

// ===== LOADER =====
window.addEventListener("load", () => {
    setTimeout(() => {
        const l = document.getElementById("loader");
        if (l) l.classList.add("hidden");
    }, 2400);
    if (localStorage.getItem("nightMode") === "true") {
        document.body.classList.add("night");
        const btn = document.querySelector(".icon-btn");
        if (btn) btn.textContent = "☀️";
    }
});

// ===== LOGIN =====
function login() {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    const err = document.getElementById("error");

    if (u === USER && p === PASS) {
        const music = document.getElementById("bgMusic");
        if (music) {
            music.volume = 0.5;
            music.play().catch(e => console.log(e));
        }
        document.getElementById("loginContainer").classList.add("hidden");
        setTimeout(() => document.getElementById("site").classList.add("visible"), 400);
        setTimeout(() => {
            const btn = document.getElementById("musicToggle");
            if (btn) {
                btn.classList.add("visible");
                if (music && !music.paused) btn.classList.add("playing");
            }
            const tb = document.getElementById("topBar");
            if (tb) tb.classList.add("visible");
        }, 800);
        loadAllData();
        burstHearts();
        showToast("Welcome to our world 💕");
        sessionStorage.setItem("loggedIn", "true");
    } else {
        err.textContent = "❌ Wrong data, try again my love";
        document.getElementById("password").value = "";
    }
}

document.addEventListener("keypress", e => {
    const lc = document.getElementById("loginContainer");
    if (e.key === "Enter" && lc && !lc.classList.contains("hidden")) login();
});

// ===== PETALS =====
const heartSymbols = ["💖", "💕", "💗", "💓", "❤️", "💞", "🌸", "🌹", "💐", "✨"];
function createPetal() {
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.fontSize = (Math.random() * 20 + 14) + "px";
    p.style.animationDuration = (Math.random() * 8 + 8) + "s";
    p.style.animationDelay = Math.random() * 2 + "s";
    const wrap = document.getElementById("petals");
    if (wrap) wrap.appendChild(p);
    setTimeout(() => p.remove(), 18000);
}
setInterval(createPetal, 600);
for (let i = 0; i < 12; i++) setTimeout(createPetal, i * 250);

// ===== CURSOR HEART =====
let lastHeart = 0;
document.addEventListener("mousemove", e => {
    const now = Date.now();
    if (now - lastHeart < 120) return;
    lastHeart = now;
    const h = document.createElement("div");
    h.className = "cursor-heart";
    h.textContent = ["💕", "💖", "💗", "✨"][Math.floor(Math.random() * 4)];
    h.style.left = e.clientX + "px";
    h.style.top = e.clientY + "px";
    h.style.fontSize = (Math.random() * 12 + 14) + "px";
    document.body.appendChild(h);
    setTimeout(() => {
        h.style.transform = `translate(${Math.random() * 60 - 30}px, -80px) scale(1.4) rotate(${Math.random() * 60 - 30}deg)`;
        h.style.opacity = "0";
    }, 20);
    setTimeout(() => h.remove(), 800);
});

// ===== BURST =====
function burstHearts() {
    const symbols = ["💖", "💕", "💗", "💓", "💞", "✨"];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const h = document.createElement("div");
            h.className = "petal";
            h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            h.style.left = Math.random() * 100 + "vw";
            h.style.bottom = "0";
            h.style.top = "auto";
            h.style.fontSize = (Math.random() * 25 + 20) + "px";
            h.style.animationDuration = "3s";
            h.style.animationName = "fallUp";
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 3200);
        }, i * 40);
    }
}

if (!document.getElementById("burstStyle")) {
    const s = document.createElement("style");
    s.id = "burstStyle";
    s.textContent = `@keyframes fallUp {
    0% { transform: translateY(0) rotate(0) scale(0.5); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateY(-110vh) rotate(360deg) scale(1.2); opacity: 0; }
  }`;
    document.head.appendChild(s);
}

// ===== DB =====
const DB = {
    get(key) {
        try { return JSON.parse(localStorage.getItem(key) || "[]"); }
        catch (e) { return []; }
    },
    set(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); }
        catch (e) { showToast("Storage full!"); }
    }
};

// ===== PHOTOS =====
const photoInputEl = document.getElementById("photoInput");
if (photoInputEl) {
    photoInputEl.addEventListener("change", e => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        let loaded = 0;
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => {
                const photos = DB.get("photos");
                photos.push({ id: Date.now() + Math.random(), src: ev.target.result });
                DB.set("photos", photos);
                loaded++;
                if (loaded === files.length) {
                    renderPhotos();
                    updateStats();
                    renderPhotoOfDay();
                    showToast(`✨ Added ${files.length} photo(s)`);
                }
            };
            reader.readAsDataURL(file);
        });
        e.target.value = "";
    });
}

function renderPhotos() {
    const gallery = document.getElementById("photoGallery");
    const emptyMsg = document.getElementById("photoEmpty");
    if (!gallery) return;
    const photos = DB.get("photos");
    if (photos.length === 0) {
        gallery.innerHTML = "";
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    }
    if (emptyMsg) emptyMsg.style.display = "none";
    gallery.innerHTML = photos.map((p, i) => `
    <div class="gallery-item" style="animation-delay:${i * 0.05}s">
      <img src="${p.src}" onclick="openModal('${p.src}')" alt="photo">
      <button class="delete-btn" onclick="deletePhoto('${p.id}')">×</button>
    </div>`).join("");
}

function deletePhoto(id) {
    if (!confirm("Delete this photo? 💔")) return;
    DB.set("photos", DB.get("photos").filter(p => String(p.id) !== String(id)));
    renderPhotos();
    updateStats();
    renderPhotoOfDay();
    showToast("🗑️ Photo deleted");
}

// ===== VIDEOS =====
const videoInputEl = document.getElementById("videoInput");
if (videoInputEl) {
    videoInputEl.addEventListener("change", e => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        let loaded = 0;
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => {
                const videos = DB.get("videos");
                videos.push({ id: Date.now() + Math.random(), src: ev.target.result });
                DB.set("videos", videos);
                loaded++;
                if (loaded === files.length) {
                    renderVideos();
                    updateStats();
                    showToast(`🎬 Added ${files.length} video(s)`);
                }
            };
            reader.readAsDataURL(file);
        });
        e.target.value = "";
    });
}

function renderVideos() {
    const gallery = document.getElementById("videoGallery");
    const emptyMsg = document.getElementById("videoEmpty");
    if (!gallery) return;
    const videos = DB.get("videos");
    if (videos.length === 0) {
        gallery.innerHTML = "";
        if (emptyMsg) emptyMsg.style.display = "block";
        return;
    }
    if (emptyMsg) emptyMsg.style.display = "none";
    gallery.innerHTML = videos.map((v, i) => `
    <div class="gallery-item" style="animation-delay:${i * 0.05}s">
      <video src="${v.src}" controls preload="metadata"></video>
      <button class="delete-btn" onclick="deleteVideo('${v.id}')">×</button>
    </div>`).join("");
}

function deleteVideo(id) {
    if (!confirm("Delete this video? 💔")) return;
    DB.set("videos", DB.get("videos").filter(v => String(v.id) !== String(id)));
    renderVideos();
    updateStats();
    showToast("🗑️ Video deleted");
}

// ===== NOTES =====
function saveNote(id) {
    const el = document.getElementById(id);
    if (!el) return;
    localStorage.setItem(id, el.value);
    const msg = document.getElementById(id.replace("Note", "Saved"));
    if (msg) {
        msg.textContent = "✅ Saved!";
        setTimeout(() => msg.textContent = "", 2500);
    }
    burstHearts();
    showToast("💌 Note saved");
    updateStats();
}

// ===== STATS =====
function updateStats() {
    const photos = DB.get("photos").length;
    const videos = DB.get("videos").length;
    const notes = (localStorage.getItem("rayanNote") ? 1 : 0) + (localStorage.getItem("ahmedNote") ? 1 : 0);
    const days = Math.floor((Date.now() - LOVE_START) / (1000 * 60 * 60 * 24));
    const a = document.getElementById("statPhotos"); if (a) a.textContent = photos;
    const b = document.getElementById("statVideos"); if (b) b.textContent = videos;
    const c = document.getElementById("statNotes"); if (c) c.textContent = notes;
    const d = document.getElementById("statDays"); if (d) d.textContent = days;
}

// ===== COUNTER =====
function updateCounter() {
    const diff = Date.now() - LOVE_START;
    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val.toLocaleString(); };
    set("cDays", days);
    set("cHours", hours);
    set("cMins", mins);
    set("cSecs", secs);
}

// ===== DAILY MESSAGE =====
function setDailyMessage() {
    const el = document.getElementById("dailyMsg");
    if (!el) return;
    const dayIndex = Math.floor(Date.now() / 86400000);
    el.textContent = DAILY_MESSAGES[dayIndex % DAILY_MESSAGES.length];
}

// ===== PHOTO OF THE DAY =====
function renderPhotoOfDay() {
    const wrap = document.getElementById("potdWrap");
    if (!wrap) return;
    const photos = DB.get("photos");
    if (photos.length === 0) {
        wrap.innerHTML = '<p class="potd-empty">Add more photos to unlock the daily photo 💗</p>';
        return;
    }
    const dayIndex = Math.floor(Date.now() / 86400000);
    const photo = photos[dayIndex % photos.length];
    wrap.innerHTML = `<img src="${photo.src}" onclick="openModal('${photo.src}')" alt="potd">`;
}

// ===== WISHES =====
function addWish() {
    const input = document.getElementById("wishInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    const wishes = DB.get("wishes");
    wishes.push({ id: Date.now() + Math.random(), text });
    DB.set("wishes", wishes);
    input.value = "";
    renderWishes();
    showToast("✨ Wish added");
}

function renderWishes() {
    const container = document.getElementById("wishesContainer");
    if (!container) return;
    const wishes = DB.get("wishes");
    container.innerHTML = wishes.map((w, i) => `
    <div class="wish-card" style="animation-delay:${i * 0.05}s">
      <div class="wish-star">⭐</div>
      <p class="wish-text">${escapeHtml(w.text)}</p>
      <button class="wish-del" onclick="deleteWish('${w.id}')">×</button>
    </div>`).join("");
}

function deleteWish(id) {
    if (!confirm("Delete this wish?")) return;
    DB.set("wishes", DB.get("wishes").filter(w => String(w.id) !== String(id)));
    renderWishes();
    showToast("🗑️ Wish removed");
}

function escapeHtml(t) {
    const d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
}

// ===== COUNTDOWN =====
function updateCountdown() {
    const saved = JSON.parse(localStorage.getItem("specialDate") || "null");
    const nameEl = document.getElementById("cdName");
    if (!saved) {
        if (nameEl) nameEl.textContent = "Click 'Edit Dates' to set";
        return;
    }
    if (nameEl) nameEl.textContent = saved.name;

    const target = new Date(saved.date + "T00:00:00").getTime();
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) {
        const d = new Date(saved.date);
        d.setFullYear(d.getFullYear() + 1);
        diff = d.getTime() - now;
    }
    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("cdDays", days);
    set("cdHours", hours % 24);
    set("cdMins", mins % 60);
    set("cdSecs", secs % 60);
}

function openDateModal() {
    const modal = document.getElementById("dateModal");
    if (!modal) return;
    const saved = JSON.parse(localStorage.getItem("specialDate") || "null");
    if (saved) {
        document.getElementById("dateName").value = saved.name;
        document.getElementById("dateValue").value = saved.date;
    }
    modal.classList.add("active");
}

function closeDateModal() {
    const modal = document.getElementById("dateModal");
    if (modal) modal.classList.remove("active");
}

function saveSpecialDate() {
    const name = document.getElementById("dateName").value.trim();
    const date = document.getElementById("dateValue").value;
    if (!name || !date) { showToast("Fill both fields"); return; }
    localStorage.setItem("specialDate", JSON.stringify({ name, date }));
    closeDateModal();
    updateCountdown();
    showToast("💾 Date saved");
}

function clearSpecialDate() {
    if (!confirm("Clear special date?")) return;
    localStorage.removeItem("specialDate");
    closeDateModal();
    updateCountdown();
    showToast("🗑️ Cleared");
}

// ===== KISS =====
function kissMe() {
    const popup = document.getElementById("kissPopup");
    const msg = document.getElementById("kissMsg");
    if (!popup || !msg) return;
    msg.textContent = KISS_MESSAGES[Math.floor(Math.random() * KISS_MESSAGES.length)];
    popup.classList.add("active");
    burstHearts();
    setTimeout(() => popup.classList.remove("active"), 2000);
}

// ===== MUSIC =====
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggle");
    if (!music || !btn) return;
    if (music.paused) {
        music.play();
        btn.classList.add("playing");
        showToast("🎵 Music on");
    } else {
        music.pause();
        btn.classList.remove("playing");
        showToast("🔇 Music off");
    }
}

// ===== THEME =====
function toggleTheme() {
    document.body.classList.toggle("night");
    const isNight = document.body.classList.contains("night");
    localStorage.setItem("nightMode", isNight);
    const btn = document.querySelector(".icon-btn");
    if (btn) btn.textContent = isNight ? "☀️" : "🌙";
    showToast(isNight ? "🌙 Night mode" : "☀️ Day mode");
}

// ===== SHARE =====
function shareSite() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: "My Love 💕", text: "Check our love story!", url });
    } else {
        navigator.clipboard.writeText(url);
        showToast("🔗 Link copied!");
    }
}

// ===== MODAL =====
function openModal(src) {
    const m = document.getElementById("modal");
    const img = document.getElementById("modalImg");
    if (!m || !img) return;
    img.src = src;
    m.classList.add("active");
}
function closeModal() {
    const m = document.getElementById("modal");
    if (m) m.classList.remove("active");
}
document.addEventListener("click", e => {
    const m = document.getElementById("modal");
    if (m && e.target === m) closeModal();
    const dm = document.getElementById("dateModal");
    if (dm && e.target === dm) closeDateModal();
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeModal(); closeDateModal(); }
});

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2500);
}

// ===== REVEAL & NAV =====
function setupReveal() {
    const sections = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15 });
    sections.forEach(s => obs.observe(s));
}

function setupNav() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

// ===== LOAD =====
function loadAllData() {
    renderPhotos();
    renderVideos();
    renderWishes();
    updateStats();
    setDailyMessage();
    renderPhotoOfDay();
    updateCounter();
    setInterval(updateCounter, 1000);
    updateCountdown();
    setInterval(updateCountdown, 1000);

    const rn = document.getElementById("rayanNote");
    const an = document.getElementById("ahmedNote");
    if (rn) rn.value = localStorage.getItem("rayanNote") || "";
    if (an) an.value = localStorage.getItem("ahmedNote") || "";

    setupReveal();
    setupNav();
}

// ===== SESSION =====
window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("loggedIn") === "true") {
        const music = document.getElementById("bgMusic");
        if (music) music.play().catch(() => { });
        const lc = document.getElementById("loginContainer");
        const site = document.getElementById("site");
        const mt = document.getElementById("musicToggle");
        const tb = document.getElementById("topBar");
        if (lc) lc.classList.add("hidden");
        if (site) site.classList.add("visible");
        if (mt) mt.classList.add("visible");
        if (tb) tb.classList.add("visible");
        loadAllData();
    }
});