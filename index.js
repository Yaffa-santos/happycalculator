window.addEventListener("load", () => {
  for (let btn of document.querySelectorAll(".modal-button")) {
    let modalId = btn.getAttribute("data-modal-id");
    let modal = document.getElementById(modalId);
    let closeBtn = modal.querySelector(".close");

    btn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (ev) => {
      if (ev.target == modal)
        modal.style.display = "none";
    });
  }

  let abas = [
    document.querySelector("#aba-principal"),
    document.querySelector("#aba-calculo"),
    document.querySelector("#aba-formulas"),
    document.querySelector("#aba-criadores"),
  ];

  window.goiaba = (id) => {
    abas.forEach(a => { a.classList.add("aba-escondida") });
    document.getElementById(id).classList.remove("aba-escondida");
  };
});