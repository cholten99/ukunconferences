(function () {
  const yearsEl = document.getElementById("years");
  const detailEl = document.getElementById("detail");

  const byYearDesc = [...EVENTS].sort((a, b) => b.year - a.year);
  const years = [...new Set(byYearDesc.map((e) => e.year))];

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function shortMonth(dateStr) {
    const match = MONTHS.find((m) => dateStr.includes(m));
    return match || "";
  }

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

      const yearEvents = EVENTS.filter((e) => e.year === year);

      yearEvents.forEach((event) => {
        const series = SERIES[event.series];
        const sameSeriesThisYear = yearEvents.filter((e) => e.series === event.series);
        const label = sameSeriesThisYear.length > 1
          ? `${series.name} (${shortMonth(event.date) || sameSeriesThisYear.indexOf(event) + 1})`
          : series.name;

        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = "pill";
        pill.dataset.id = event.id;
        pill.style.setProperty("--series-color", series.color);
        pill.textContent = label;
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
        ${event.attendees ? `<span>${event.attendees}</span>` : ""}
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
