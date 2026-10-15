(function () {
  const yearsEl = document.getElementById("years");
  const detailEl = document.getElementById("detail");

  const byYearDesc = [...EVENTS].sort((a, b) => b.year - a.year);
  const years = [...new Set(byYearDesc.map((e) => e.year))];

  function renderYears() {
    yearsEl.innerHTML = "";

    years.forEach((year) => {
      const group = document.createElement("div");
      group.className = "year-group";

      const heading = document.createElement("h2");
      heading.className = "year-heading";
      heading.textContent = year;
      group.appendChild(heading);

      const row = document.createElement("div");
      row.className = "year-events";

      EVENTS.filter((e) => e.year === year).forEach((event) => {
        const series = SERIES[event.series];
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = "pill";
        pill.dataset.id = event.id;
        pill.style.setProperty("--series-color", series.color);
        pill.textContent = series.name;
        pill.addEventListener("click", () => selectEvent(event.id));
        row.appendChild(pill);
      });

      group.appendChild(row);
      yearsEl.appendChild(group);
    });
  }

  function renderDetail(event) {
    if (!event) {
      detailEl.innerHTML = '<p class="detail__empty">Select an unconference on the left to see more about it.</p>';
      return;
    }

    const series = SERIES[event.series];
    detailEl.innerHTML = `
      <span class="detail__tag" style="--series-color: ${series.color}">${series.name}</span>
      <h2 class="detail__title">${series.name} ${event.year}</h2>
      <p class="detail__meta">
        <span>${event.date}</span>
        <span>${event.location}</span>
      </p>
      <p class="detail__blurb">${event.blurb}</p>
      <a class="detail__link" href="${series.url}" target="_blank" rel="noopener">Visit ${series.name} ↗</a>
    `;
  }

  function selectEvent(id) {
    document.querySelectorAll(".pill").forEach((pill) => {
      pill.classList.toggle("is-active", pill.dataset.id === id);
    });
    renderDetail(EVENTS.find((e) => e.id === id));
  }

  renderYears();
  selectEvent(byYearDesc[0].id);
})();
