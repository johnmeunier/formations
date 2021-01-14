const planning = [
  {
    name: "Matin",
    elements: [
      "Equipe Johnathan Meunier + Thomas Kuyppers",
      "Equipe de Vincent Grière - GOMEZ Samuel + DANNELLS Sophie + Hoang Danny",
      "Equipe Stéphane Thueux",
    ],
  },
  {
    name: "Après-midi",
    elements: [
      "Equipe Nicolas Regnier - 3ième étage",
      "Equipe de Jérôme BOURBIAUX (Mobile) - 2ième étage",
      "Equipe Johnathan + Tony Ghilain - sécurité à partir de 15h00",
    ],
  },
];

planning.forEach((part) => {
  const $tr = document.createElement("tr");
  const $th = document.createElement("th");
  $th.innerHTML = part.name;
  $tr.appendChild($th);
  part.elements.forEach((slot) => {
    const $td = document.createElement("td");
    $td.innerHTML = slot;
    $tr.appendChild($td);
  });
  document.querySelector("tbody").appendChild($tr);
});

document.querySelectorAll("td").forEach(($slot) => {
  $slot.addEventListener("click", () => {
    document.querySelectorAll("td").forEach(($innerSlot) => {
      $innerSlot.classList.remove("selected");
    });
    $slot.classList.add("selected");
  });
});
