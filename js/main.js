// Trindade Advocacia: menu do celular, cabeçalho ao rolar e botão flutuante
(function () {
  var topo = document.getElementById("topo");
  var botao = document.getElementById("menu-botao");
  var menu = document.getElementById("menu");
  var flutuante = document.querySelector(".flutuante");

  function fecharMenu() {
    topo.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  }

  botao.addEventListener("click", function () {
    var aberto = topo.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) fecharMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fecharMenu();
  });

  var limiteFlutuante = 520;
  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    topo.classList.toggle("rolou", y > 10);
    flutuante.classList.toggle("visivel", y > limiteFlutuante);
    if (y <= limiteFlutuante) flutuante.classList.remove("verde");
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  // Botão flutuante: depois de um tempinho visível ele fica verde e mostra "Me chame agora."
  // por alguns segundos; volta ao dourado e repete o ciclo.
  // ESPERA: tempo até ficar verde; VERDE: quanto tempo fica verde; PAUSA: dourado até recomeçar
  var ESPERA = 1500, VERDE = 5000, PAUSA = 5000;
  function cicloFlutuante() {
    if (!flutuante.classList.contains("visivel")) { setTimeout(cicloFlutuante, 400); return; }
    setTimeout(function () {
      if (!flutuante.classList.contains("visivel")) { cicloFlutuante(); return; }
      flutuante.classList.add("verde");
      setTimeout(function () {
        flutuante.classList.remove("verde");
        setTimeout(cicloFlutuante, PAUSA);
      }, VERDE);
    }, ESPERA);
  }
  cicloFlutuante();
})();
