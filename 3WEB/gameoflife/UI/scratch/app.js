if (sessionStorage.getItem("logged") == "true") {
  let grid = null;
  const renderGrid = grid => {
    let $grid = document.querySelector(".grid");
    $grid.innerHTML = "";
    grid.forEach((line, i) => {
      let $line = document.createElement("div");
      $line.classList.add("grid__line");
      line.forEach((cell, j) => {
        let $cell = document.createElement("span");
        $cell.classList.add("grid__cell");
        $cell.addEventListener("click", () => {
          grid[i][j] = !grid[i][j];
          renderGrid(grid);
        });
        $cell.innerHTML = cell
          ? document.querySelector(".emoji-alive").value
          : document.querySelector(".emoji-dead").value;
        $cell.classList.add(`grid__cell--${cell ? "alive" : "dead"}`);
        $line.appendChild($cell);
      });
      $grid.appendChild($line);
    });
  };

  document.querySelector("#generate").addEventListener("click", () => {
    const size = document.querySelector("#gridSize").value;
    grid = generateInitialGridFalse(size);
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
    }, 40);
  });
} else {
  document.location.href = document.location.href.replace("app", "login");
}
