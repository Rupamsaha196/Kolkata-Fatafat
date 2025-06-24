const sheetID = "145IDf49cSt3E8BrZdTOqu8GgCasYkoZGkbLpS4bKHIk";
const sheetName = "1";
const url = `https://docs.google.com/spreadsheets/d/17FC1HWK8lAQhPhnHv8jSgJWavmVtNwcULJ7HCZ4w6G4/gviz/tq?tqx=out:json&sheet=1`;

fetch(url)  // ✅ This returns a Promise, so we can use .then()
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substr(47).slice(0, -2));
    const rows = json.table.rows;
    const container = document.getElementById("results");

    rows.forEach((row, index) => {
      const cells = row.c;
      if (!cells[0]) return;

      const dateDiv = document.createElement("div");
      dateDiv.className = "date-section";

      if (index === 0) {
        dateDiv.classList.add("latest");
      }

      const dateTitle = document.createElement("div");
      dateTitle.className = "date-title";

      const dateObj = new Date(cells[0].f || cells[0].v);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).slice(-2);
      const formattedDate = `${day}/${month}/${year}`;
      dateTitle.textContent = formattedDate;

      const numberRow = document.createElement("div");
      numberRow.className = "result-grid";

      const resultRow = document.createElement("div");
      resultRow.className = "result-grid";

      for (let i = 1; i <= 17; i += 2) {
        const num = document.createElement("div");
        num.className = "number";
        num.textContent = cells[i]?.v || "-";
        numberRow.appendChild(num);

        const res = document.createElement("div");
        res.className = "result";
        res.textContent = cells[i + 1]?.v || "-";
        resultRow.appendChild(res);
      }

      dateDiv.appendChild(dateTitle);
      dateDiv.appendChild(numberRow);
      dateDiv.appendChild(resultRow);
      container.appendChild(dateDiv);
    });
  })
  .catch(err => console.error("Error fetching data:", err));
