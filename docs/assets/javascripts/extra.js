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
  let currentH1Li = null;
  let currentH1Ul = null;
  let currentH2Li = null;
  let currentH2Ul = null;

  const makeItem = (href, text) => {
    const a = document.createElement("a");
    a.className = "reference internal";
    a.href = href;
    a.textContent = text;

    const li = document.createElement("li");
    li.appendChild(a);
    return li;
  };

  headings.forEach((heading, index) => {
    const level = Number(heading.tagName.substring(1));
    const href = index === 0 ? "#" : `#${heading.id}`;
    const li = makeItem(href, heading.textContent.trim());

    if (level === 1) {
      currentH1Li = li;
      currentH1Ul = document.createElement("ul");
      currentH1Li.appendChild(currentH1Ul);
      root.appendChild(currentH1Li);
      currentH2Li = null;
      currentH2Ul = null;
      return;
    }

    if (!currentH1Li) {
      currentH1Li = makeItem("#", document.title.replace(/\s+-\s+.*$/, ""));
      currentH1Ul = document.createElement("ul");
      currentH1Li.appendChild(currentH1Ul);
      root.appendChild(currentH1Li);
    }

    if (level === 2) {
      currentH2Li = li;
      currentH2Ul = document.createElement("ul");
      currentH2Li.appendChild(currentH2Ul);
      currentH1Ul.appendChild(currentH2Li);
      return;
    }

    if (level === 3) {
      if (!currentH2Li) {
        currentH2Li = makeItem("#", currentH1Li.querySelector("a").textContent);
        currentH2Ul = document.createElement("ul");
        currentH2Li.appendChild(currentH2Ul);
        currentH1Ul.appendChild(currentH2Li);
      }
      currentH2Ul.appendChild(li);
      return;
    }

    currentH1Ul.appendChild(li);
  });

  const pruneEmptyLists = (node) => {
    Array.from(node.querySelectorAll("ul")).forEach((ul) => {
      if (ul.children.length === 0) {
        ul.remove();
      }
    });
  };

  pruneEmptyLists(root);
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
