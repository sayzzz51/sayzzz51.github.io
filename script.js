// =====================================================
//  ПРОЕКТЫ. Первый файл в images — обложка карточки.
// =====================================================
const projects = [
  {
    category: "shop",
    label: "Интернет-магазин",
    title: "ФК «Союз» Батайск",
    url: "soyuz-store",
    color: "#1f6b3f",
    desc: "Магазин официального мерча футбольного клуба: каталог, корзина, оформление заказа с оплатой онлайн или при получении, «Мои заказы» и страница о клубе.",
    tags: ["HTML", "CSS", "JavaScript", "Корзина", "Адаптив"],
    link: "",
    images: [
      "soyuz-01-hero.png",
      "soyuz-02-cart.png",
      "soyuz-03-orders.png",
      "soyuz-04-about.png",
      "soyuz-05-team.png",
      "soyuz-06-footer.png"
    ]
  },
  {
    category: "coffee",
    label: "Кофейня",
    title: "Кофейня «Лаванда»",
    url: "lavanda.coffee",
    color: "#8a63d2",
    desc: "Сайт specialty-кофейни: меню с вкладками, бронирование столика, отзывы гостей, адрес и часы работы.",
    tags: ["HTML", "CSS", "JavaScript", "Бронирование"],
    link: "",
    images: [
      "lavanda-01-hero.png",
      "lavanda-02-about.png",
      "lavanda-03-menu.png",
      "lavanda-04-reviews.png",
      "lavanda-05-booking.png"
    ]
  },
  {
    category: "auto",
    label: "Автосервис",
    title: "Автосервис «АвтоМастер»",
    url: "avtomaster",
    color: "#e2461f",
    desc: "Сайт автосервиса: услуги и прозрачный прайс, акции, этапы работы, отзывы, частые вопросы и онлайн-запись.",
    tags: ["HTML", "CSS", "JavaScript", "Онлайн-запись"],
    link: "",
    images: [
      "automaster-00-hero.png",
      "automaster-01-stats.png",
      "automaster-02-services.png",
      "automaster-03-promo.png",
      "automaster-04-prices.png",
      "automaster-05-why-us.png",
      "automaster-06-steps.png",
      "automaster-07-reviews.png",
      "automaster-08-faq.png",
      "automaster-09-booking.png",
      "automaster-10-contacts.png"
    ]
  }
];

// ---------- Карточки ----------
const grid = document.getElementById("grid");

function render(filter = "all") {
  grid.innerHTML = "";
  projects
    .map((p, i) => ({ ...p, i }))
    .filter(p => filter === "all" || p.category === filter)
    .forEach((p, n) => {
      const card = document.createElement("article");
      card.className = "card";
      card.style.animationDelay = `${n * 90}ms`;
      card.innerHTML = `
        <div class="browser" data-open="${p.i}" role="button" tabindex="0" aria-label="Скриншоты: ${p.title}">
          <div class="browser__bar"><i></i><i></i><i></i><span>${p.url}</span></div>
          <div class="card__shot" style="--c:${p.color}">
            <img src="${p.images[0]}" alt="${p.title}" loading="lazy">
            <span class="card__count">${p.images.length} экранов</span>
          </div>
        </div>
        <div class="card__body">
          <span class="card__label">${p.label}</span>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
          <div class="card__actions">
            <button class="btn btn--blue btn--small" data-open="${p.i}">Смотреть экраны</button>
            ${p.link ? `<a class="btn btn--ghost btn--small" href="${p.link}" target="_blank" rel="noopener">Открыть сайт ↗</a>` : ""}
          </div>
        </div>`;
      grid.appendChild(card);
    });
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.is-active").classList.remove("is-active");
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });
});

// ---------- Просмотр ----------
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const thumbs = document.getElementById("modal-thumbs");
const count = document.getElementById("modal-count");
let current = { images: [], idx: 0 };

function show(idx) {
  const imgs = current.images;
  current.idx = (idx + imgs.length) % imgs.length;
  modalImg.src = imgs[current.idx];
  count.textContent = `${current.idx + 1} / ${imgs.length}`;
  thumbs.querySelectorAll("img").forEach((t, i) => {
    t.classList.toggle("is-active", i === current.idx);
    if (i === current.idx) t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  });
}

function openModal(i) {
  const p = projects[i];
  current = { images: p.images, idx: 0 };
  document.getElementById("modal-title").textContent = p.title;
  modalImg.alt = p.title;
  thumbs.innerHTML = p.images.map((src, n) => `<img src="${src}" data-idx="${n}" alt="">`).join("");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  show(0);
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

grid.addEventListener("click", e => {
  const el = e.target.closest("[data-open]");
  if (el) openModal(+el.dataset.open);
});
grid.addEventListener("keydown", e => {
  const el = e.target.closest(".browser[data-open]");
  if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openModal(+el.dataset.open); }
});
thumbs.addEventListener("click", e => { if (e.target.dataset.idx) show(+e.target.dataset.idx); });
modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
document.querySelector(".modal__arrow--prev").onclick = () => show(current.idx - 1);
document.querySelector(".modal__arrow--next").onclick = () => show(current.idx + 1);
document.addEventListener("keydown", e => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") show(current.idx - 1);
  if (e.key === "ArrowRight") show(current.idx + 1);
});

// свайп на телефоне
let x0 = null;
modalImg.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
modalImg.addEventListener("touchend", e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) show(current.idx + (dx < 0 ? 1 : -1));
  x0 = null;
});

document.getElementById("year").textContent = new Date().getFullYear();
render();
