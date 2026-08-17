const welcome = document.getElementById("welcome");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openInvitation");
const bgVideo = document.getElementById("bgVideo");
const bgMusic = document.getElementById("bgMusic");
const muteToggle = document.getElementById("muteToggle");

let musicMuted = false;

openButton.addEventListener("click", () => {
  welcome.style.display = "none";
  invitation.classList.add("is-open");
  invitation.setAttribute("aria-hidden", "false");

  bgVideo.play().catch(() => {});

  bgMusic.volume = 0.55;
  bgMusic.play().catch(() => {});
  muteToggle.classList.add("is-visible");

  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal").forEach((element, index) => {
      element.dataset.index = index;
    });
    observer.observe(document.querySelector(".content"));
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const reveal = entry.target.querySelectorAll
          ? entry.target.querySelectorAll(".reveal")
          : [];

        if (entry.target.classList?.contains("reveal")) {
          entry.target.classList.add("visible");
        }

        reveal.forEach((item, index) => {
          setTimeout(() => item.classList.add("visible"), index * 130);
        });
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

muteToggle.addEventListener("click", () => {
  musicMuted = !musicMuted;
  bgMusic.muted = musicMuted;
  muteToggle.classList.toggle("is-muted", musicMuted);
  muteToggle.setAttribute("aria-pressed", String(musicMuted));
  muteToggle.setAttribute(
    "aria-label",
    musicMuted ? "Включить музыку" : "Выключить музыку"
  );
});

const targetDate = new Date("2026-09-26T15:00:00+05:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const statusEl = document.getElementById("countdownStatus");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const difference = targetDate - now;

  if (difference <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    statusEl.textContent = "Этот день уже стал частью нашей истории.";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);
  const name = String(formData.get("name") || "").trim();
  const attendance = formData.get("attendance");

  if (attendance === "yes") {
    formMessage.textContent = `${name}, будем очень рады видеть вас.`;
  } else {
    formMessage.textContent = `${name}, спасибо, что сообщили нам.`;
  }

  rsvpForm.reset();
});
