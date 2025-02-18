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

  {
    let abaCalculo = document.querySelector("#aba-calculo");
    let spanResultado = abaCalculo.querySelector("span#resultado");

    let calculos = [
      {id: "modal-cilindro", callback: (content) => {
        let r = content.querySelector("input#raio-base").value;
        let h = content.querySelector("input#altura").value;
        return Math.PI * r * r * h;
      }},

      {id: "modal-cone", callback: (content) => {
        let r = content.querySelector("input#raio-base").value;
        let h = content.querySelector("input#altura").value;
        return 1/3 * Math.PI * r * r * h;
      }},

      {id: "modal-triangulo", callback: (content) => {
        let b = content.querySelector("input#base").value;
        let h = content.querySelector("input#altura").value;
        return b * h / 2;
      }},
    ];

    for (let c of calculos) {
      let modal = abaCalculo.querySelector("#" + c.id);
      let content = modal.querySelector(".modal-content");
      let btn = modal.querySelector("#calcular");

      btn.addEventListener("click", () => {
        spanResultado.innerText = c.callback(content);
        modal.style.display = "none";
      });
    }
  }

  let abas = [
    document.querySelector("#aba-principal"),
    document.querySelector("#aba-calculo"),
    document.querySelector("#aba-formulas"),
    document.querySelector("#aba-criadores"),
  ];

  window.goiaba = (id) => {
    let sidebar = document.querySelector(".sidebar");
    if (id == "aba-principal")
      sidebar.setAttribute("hidden", true);
    else
      sidebar.removeAttribute("hidden");

    abas.forEach(a => { a.classList.add("aba-escondida") });
    document.getElementById(id).classList.remove("aba-escondida");
  };

  {
    let sidebar = document.querySelector(".sidebar");
    let main = document.querySelector("main");
    let sidebarBtn = document.querySelector("#sidebar-toggle");

    const sidebarAtivada = () => sidebar.classList.contains("sidebar-ativada")
    const ativarSidebar = () => sidebar.classList.add("sidebar-ativada");
    const desativarSidebar = () => sidebar.classList.remove("sidebar-ativada");

    window.addEventListener("click", (ev) => {
      if (ev.target == sidebarBtn) {
        if (sidebarAtivada())
          desativarSidebar();
        else
          ativarSidebar();
        main.style.pointerEvents = sidebarAtivada() ? "none" : null;
      } else if (sidebar != ev.target && !sidebar.contains(ev.target)) {
        desativarSidebar();
        main.style.pointerEvents = sidebarAtivada() ? "none" : null;
      }
    });
  }
});