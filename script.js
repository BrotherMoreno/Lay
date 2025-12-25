document.addEventListener("DOMContentLoaded", () => {
  const presentacion = document.getElementById("presentacion");
  const imagen = document.getElementById("miImagen");
  const musica = document.getElementById("musica");
  const pantalla = document.getElementById("pantalla");
  const todoWord = document.getElementById("todo-word");

  // LOADER
  const loader = document.getElementById("loading-screen");
  const loadingText = document.getElementById("loading-text");
  const progressBar = document.getElementById("progress-bar");
  const btnContinuar = document.getElementById("btn-continuar");

  if (pantalla) pantalla.style.pointerEvents = "none";

  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    loadingText.textContent = progress + "%";
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      btnContinuar.style.display = "block";
    }
  }, 30);

  btnContinuar.addEventListener("click", () => {
    loader.classList.add("hide");
    setTimeout(() => {
      loader.style.display = "none";
      pantalla.style.pointerEvents = "auto";

      // mostrar TODO con animación
      todoWord.classList.remove("todo-hidden");
      todoWord.classList.add("todo-show");
    }, 650);
  });

  // MÚSICA
  if (musica) {
    musica.loop = true;
    musica.volume = 0.5;
    musica.muted = true;
    musica.play().catch(() => {});
    const activar = () => {
      musica.muted = false;
      musica.play().catch(() => {});
    };
    document.addEventListener("click", activar, { once: true });
    document.addEventListener("touchstart", activar, { once: true });
  }

  // CLICK IMAGEN
  if (imagen) {
    imagen.addEventListener("click", () => {
      presentacion.classList.add("oculto");
      setTimeout(() => window.location.href = "page.html", 800);
    });

    // ZOOM CON MOUSE
    document.addEventListener("mousemove", (e) => {
      const r = imagen.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.sqrt(dx*dx + dy*dy);
      const maxD = 300, minS = 1, maxS = 1.3;
      if (d < maxD) {
        const s = maxS - (d / maxD) * (maxS - minS);
        imagen.style.transform = `scale(${s}) translate(${dx/20}px, ${dy/20}px)`;
      } else {
        imagen.style.transform = `scale(${minS})`;
      }
    });
  }
});
