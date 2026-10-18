(function () {
  const tip = document.createElement("div");
  tip.className = "motion-tip";
  tip.setAttribute("role", "tooltip");
  document.body.appendChild(tip);
  document.addEventListener("pointerover", function (e) {
    const node = e.target.closest && e.target.closest("svg circle");
    if (!node) return;
    const t = node.querySelector("title");
    if (!t) return;
    tip.textContent = t.textContent;
    tip.classList.add("visible");
  });
  document.addEventListener("pointermove", function (e) {
    if (!tip.classList.contains("visible")) return;
    tip.style.left = Math.min(e.clientX + 14, innerWidth - 225) + "px";
    tip.style.top = Math.max(8, e.clientY - 48) + "px";
  });
  document.addEventListener("pointerout", function (e) {
    if (e.target.closest && e.target.closest("svg circle"))
      tip.classList.remove("visible");
  });
  document.addEventListener("click", function (e) {
    const node = e.target.closest && e.target.closest("svg circle");
    if (!node) return;
    const t = node.querySelector("title");
    if (!t) return;
    tip.textContent = t.textContent;
    tip.style.left =
      Math.max(10, Math.min(e.clientX - 55, innerWidth - 225)) + "px";
    tip.style.top = Math.max(10, e.clientY - 55) + "px";
    tip.classList.add("visible");
    setTimeout(() => tip.classList.remove("visible"), 2400);
  });
})();
