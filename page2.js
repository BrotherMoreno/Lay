// page2.js
(() => {
  // Flip por click (para mobile/teclado)
  document.querySelectorAll(".flip-card .flip-inner").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.currentTarget.closest(".flip-card");
      card.classList.toggle("is-flipped");
    });
  });

  // ===== Calendario (mes actual) =====
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11
  const today = now.getDate();

  const monthsES = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  const calTitle = document.getElementById("cal-title");
  const monthLabel = document.getElementById("cal-month-label");
  if (calTitle) calTitle.textContent = `${monthsES[month]} ${year}`;
  if (monthLabel) monthLabel.textContent = `${monthsES[month]} ${year}`;

  // helpers
  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const firstDayIndexMonStart = (y, m) => {
    // JS: 0=Dom ... 6=Sáb
    // Lo queremos con Lunes=0 ... Domingo=6
    const js = new Date(y, m, 1).getDay();
    return (js + 6) % 7;
  };

  const totalDays = daysInMonth(year, month);
  const offset = firstDayIndexMonStart(year, month);

  // Render mini calendar (front)
  const miniGrid = document.getElementById("mini-grid");
  if (miniGrid) {
    miniGrid.innerHTML = "";
    // espacios
    for (let i = 0; i < offset; i++) {
      const s = document.createElement("span");
      s.textContent = "";
      s.style.background = "transparent";
      s.style.border = "0";
      miniGrid.appendChild(s);
    }
    for (let d = 1; d <= totalDays; d++) {
      const s = document.createElement("span");
      s.textContent = String(d);
      if (d === today) s.classList.add("today");
      miniGrid.appendChild(s);
    }
  }

  // Render calendar completo (back)
  const calDays = document.getElementById("cal-days");
  if (calDays) {
    calDays.innerHTML = "";

    // relleno anterior (días del mes pasado)
    const prevMonthDays = daysInMonth(year, month - 1);
    for (let i = 0; i < offset; i++) {
      const d = document.createElement("span");
      d.className = "muted";
      d.textContent = String(prevMonthDays - offset + i + 1);
      calDays.appendChild(d);
    }

    // días del mes
    for (let dnum = 1; dnum <= totalDays; dnum++) {
      const d = document.createElement("span");
      d.textContent = String(dnum);
      if (dnum === today) d.classList.add("today");
      calDays.appendChild(d);
    }

    // relleno siguiente (para completar la grilla bonita)
    const totalCells = offset + totalDays;
    const remainder = totalCells % 7;
    const fill = remainder === 0 ? 0 : (7 - remainder);

    for (let i = 1; i <= fill; i++) {
      const d = document.createElement("span");
      d.className = "muted";
      d.textContent = String(i);
      calDays.appendChild(d);
    }
  }
})();
