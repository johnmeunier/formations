if (sessionStorage.getItem("logged") == "true") {
  let grid = null;
  const renderGrid = (grid) => {
    document.querySelector("#grid").innerHTML = "";
    grid.forEach((line, iLine) => {
      const $line = document.createElement("div");
      $line.classList.add("grid__line");
      line.forEach((cell, iCell) => {
        const $cell = document.createElement("span");
        $cell.classList.add("grid__cell");
        $cell.innerText = cell ? document.querySelector(".emoji-alive").value : document.querySelector(".emoji-dead").value;
        $cell.addEventListener("click", () => {
          grid[iLine][iCell] = !grid[iLine][iCell];
          renderGrid(grid);
        });
        $line.appendChild($cell);
      });
      document.querySelector("#grid").appendChild($line);
    });
  };

  document.querySelector("#generate").addEventListener("click", () => {
    const size = document.querySelector("#gridSize").value;
    grid = generateInitialGrid(size);
    renderGrid(grid);
  });

  const displayNextGrid = () => {
    grid = step(grid);
    renderGrid(grid);
  };

  document.querySelector("#next").addEventListener("click", () => {
    displayNextGrid();
  });

  document.querySelector("#live").addEventListener("click", () => {
    let numberOfSteps = document.querySelector("#numberOfSteps").value;
    const myInt = setInterval(() => {
      displayNextGrid();
      numberOfSteps--;
      if (numberOfSteps === 0) {
        clearInterval(myInt);
      }
    }, 80);
  });
} else {
  document.location.href = document.location.href.replace("app", "login");
}
