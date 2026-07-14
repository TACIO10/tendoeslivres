document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

window.addEventListener("load", () => {
  const loadUtmify = () => {
    const script = document.createElement("script");
    script.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-utmify-prevent-xcod-sck", "");
    script.setAttribute("data-utmify-prevent-subids", "");
    document.body.appendChild(script);
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadUtmify, { timeout: 1800 });
  } else {
    window.setTimeout(loadUtmify, 900);
  }
});
