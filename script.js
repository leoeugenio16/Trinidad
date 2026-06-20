console.log("SCRIPT CARGADO");
const EVENT_DATE = new Date("2026-08-01T21:00:00-03:00");

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;
  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      '<p class="hero-text">¡Llegó el gran día!</p>';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}
setInterval(updateCountdown, 1000);
updateCountdown();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let playing = false;
musicBtn.addEventListener("click", async () => {
  try {
    if (!playing) {
      await music.play();
      musicBtn.textContent = "❚❚ Pausar";
    } else {
      music.pause();
      musicBtn.textContent = "♫ Música";
    }
    playing = !playing;
  } catch (e) {
    alert(
      "Agregá un archivo musica.mp3 en la carpeta assets para activar la música.",
    );
  }
});

const copyLinkBtn = document.getElementById("copyLink");

if (copyLinkBtn) {
  copyLinkBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copiado");
  });
}
const form = document.getElementById("trinidadForm");
const formMessage = document.getElementById("formMessage");

console.log("FORM:", form);
console.log("FORM MESSAGE:", formMessage);

if (form && formMessage) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim();
    const apellido = document.getElementById("apellido")?.value.trim();
    const dni = document.getElementById("dni")?.value.trim();
    const cancion = document.getElementById("cancion")?.value.trim();

    if (!nombre || !apellido || !dni || !cancion) {
      formMessage.textContent = "Completá todos los campos.";
      formMessage.className = "form-message error";
      return;
    }

    const formData = new FormData();
    formData.append("entry.1952230304", nombre);
    formData.append("entry.1242795232", apellido);
    formData.append("entry.1437053416", dni);
    formData.append("entry.44476825", cancion);

    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSe2g0pUL063q8txLlqtQuNk2AcXuuTCozk4RfgYyh0_PMo3hA/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: formData,
      },
    );

    form.reset();

    formMessage.innerHTML = `
  <div class="success-card">
    <div class="success-icon">♥</div>
    <h3>¡Respuesta enviada con éxito!</h3>
    <p>
      Gracias por confirmar tu asistencia y compartir tu canción.
      Nos vemos en una noche inolvidable.
    </p>
  </div>
`;

    formMessage.className = "form-message ok";
  });
}
