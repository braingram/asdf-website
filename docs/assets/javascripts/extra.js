function hideAds() {
  const adIds = ["readthedocs-ea", "readthedocs-ea-text-footer"];
  adIds.forEach((element) => {
    const rtdAd = document.getElementById(element);
    if (rtdAd !== null && !rtdAd.hasAttribute("hidden")) {
      rtdAd.setAttribute("hidden", "true");
    }
  });
}

function waitForVariable(variableName, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      if (typeof window[variableName] !== "undefined") {
        clearInterval(intervalId);
        resolve(window[variableName]);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(intervalId);
        reject(new Error(`Timeout waiting for ${variableName}`));
      }
    }, 100);
  });
}

function nextTheme(current) {
  if (current === "auto") return "light";
  if (current === "light") return "dark";
  return "auto";
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function initializeThemeToggle() {
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(nextTheme(document.body.dataset.theme || "auto"));
    });
  });
}

function initializeBackToTop() {
  const toggle = () => {
    if (window.scrollY > 200) {
      document.body.classList.add("show-back-to-top");
    } else {
      document.body.classList.remove("show-back-to-top");
    }
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

function buildPageToc() {
  const tocContainer = document.getElementById("asdf-generated-toc");
  const tocDrawer = document.querySelector(".toc-drawer");
  const tocIcons = document.querySelectorAll(".toc-header-icon, .toc-content-icon");
  const article = document.getElementById("furo-main-content");
  if (!tocContainer || !tocDrawer || !article) {
    return;
  }

  const headings = Array.from(article.querySelectorAll("h1[id], h2[id], h3[id]"));
  if (headings.length === 0) {
    tocDrawer.classList.add("no-toc");
    tocIcons.forEach((el) => el.classList.add("no-toc"));
    return;
  }

  tocDrawer.classList.remove("no-toc");
  tocIcons.forEach((el) => el.classList.remove("no-toc"));

  const root = document.createElement("ul");
  let currentTopLi = null;
  let currentSubUl = null;

  headings.forEach((heading, index) => {
    const href = index === 0 ? "#" : `#${heading.id}`;
    const a = document.createElement("a");
    a.className = "reference internal";
    a.href = href;
    a.textContent = heading.textContent.trim();

    const li = document.createElement("li");
    li.appendChild(a);

    if (heading.tagName === "H1") {
      currentTopLi = li;
      currentSubUl = document.createElement("ul");
      currentTopLi.appendChild(currentSubUl);
      root.appendChild(currentTopLi);
      return;
    }

    if (!currentTopLi) {
      currentTopLi = document.createElement("li");
      const topA = document.createElement("a");
      topA.className = "reference internal";
      topA.href = "#";
      topA.textContent = document.title.replace(/\s+-\s+.*$/, "");
      currentTopLi.appendChild(topA);
      currentSubUl = document.createElement("ul");
      currentTopLi.appendChild(currentSubUl);
      root.appendChild(currentTopLi);
    }

    currentSubUl.appendChild(li);
  });

  tocContainer.replaceChildren(root);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeThemeToggle();
  initializeBackToTop();
  buildPageToc();
});

waitForVariable("ethicalads")
  .then(() => hideAds())
  .catch(() => {});
