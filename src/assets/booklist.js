/* ========== Book List (shared across pages) ========== */
(function () {
    const STORAGE_KEY = "booklist_v1";

    const state = {
        items: load(),
        form: {
            // Use the LONG docs.google.com URL (not forms.gle)
            base: "https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url",
            // Map your Google Form entry IDs (use “Get prefilled link” once and copy IDs)
            fields: {
                // single field that will hold all selected packages
                packages: "entry.1234567890"
                // If you want separate fields (pkg1, pkg2, pkg3) add them here as well
                // pkg1: "entry.111", pkg2: "entry.222", pkg3: "entry.333"
            }
        }
    };

    /* ---------- Storage ---------- */
    function load() {
        try {
            return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function save() {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        renderIcon();
    }

    /* ---------- Public API ---------- */
    function add(item) {
        // item = { id, title, meta? }
        if (!state.items.some(x => x.id === item.id)) {
            state.items.push(item);
            save();
            toast(`${item.title} added to Book List`);
        } else {
            toast(`Already added`);
        }
    }

    function remove(id) {
        state.items = state.items.filter(x => x.id !== id);
        save();
        renderList();
    }

    function clear() {
        state.items = [];
        save();
        renderList();
    }

    function proceed() {
        if (state.items.length === 0) return toast("Your Book List is empty");

        // Option A: single field with all titles
        const titles = state.items.map(x => x.title).join(" | ");
        const url =
            `${state.form.base}&${state.form.fields.packages}=${encodeURIComponent(titles)}`;

        // Option B (uncomment): first 3 items into 3 separate fields
        // const ids = Object.values(state.form.fields); // [pkg1, pkg2, pkg3]
        // let q = "";
        // state.items.slice(0, 3).forEach((x, i) => q += `&${ids[i]}=${encodeURIComponent(x.title)}`);
        // const url = `${state.form.base}${q}`;

        window.open(url, "_blank");
    }

    /* ---------- UI Injection (icon + modal + toast) ---------- */
    function ensureUI() {
        if (document.getElementById("bookListIcon")) return;

        // Floating icon
        const icon = document.createElement("div");
        icon.id = "bookListIcon";
        icon.className = "booklist-floating";
        icon.innerHTML = `
      <span class="booklist-badge" id="bookListCount">0</span>
      <i class="fa-solid fa-list"></i>
    `;
        icon.onclick = open;
        document.body.appendChild(icon);

        // Modal
        const modalHtml = `
<div class="modal fade" id="bookListModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Your Book List</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <ul id="bookListItems" class="list-group list-group-flush"></ul>
      </div>
      <div class="modal-footer d-flex justify-content-between">
        <button class="btn btn-outline-secondary" id="bookListClear">Clear All</button>
        <button class="btn btn-primary" id="bookListProceed">Submit Inquiry</button>
      </div>
    </div>
  </div>
</div>`;
        document.body.insertAdjacentHTML("beforeend", modalHtml);

        // Toast
        const toastHtml = `
<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:1080">
  <div id="booklistToast" class="toast align-items-center text-bg-dark border-0" role="alert">
    <div class="d-flex">
      <div class="toast-body" id="booklistToastMsg">Added</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
</div>`;
        document.body.insertAdjacentHTML("beforeend", toastHtml);

        // Bind buttons
        document.getElementById("bookListClear").onclick = clear;
        document.getElementById("bookListProceed").onclick = proceed;

        renderIcon();
    }

    function renderIcon() {
        const icon = document.getElementById("bookListIcon");
        if (!icon) return;
        const count = document.getElementById("bookListCount");
        const n = state.items.length;
        count.textContent = n;
        icon.style.display = n > 0 ? "flex" : "none";
    }

    function renderList() {
        const ul = document.getElementById("bookListItems");
        if (!ul) return;
        ul.innerHTML = state.items.map(x => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${x.title}</span>
        <button class="btn btn-sm btn-outline-danger" data-remove="${x.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </li>`).join("");

        // bind removes
        ul.querySelectorAll("[data-remove]").forEach(btn => {
            btn.addEventListener("click", () => remove(btn.getAttribute("data-remove")));
        });
    }

    function open() {
        renderList();
        const modal = new bootstrap.Modal(document.getElementById("bookListModal"));
        modal.show();
    }

    function toast(msg) {
        const el = document.getElementById("booklistToast");
        const body = document.getElementById("booklistToastMsg");
        if (!el || !body) return;
        body.textContent = msg;
        new bootstrap.Toast(el, {delay: 1800}).show();
    }

    /* ---------- Helpers for buttons on any page ---------- */
    function wireButtons() {
        // Any element with .js-add-book and data-book-id + data-book-title
        document.querySelectorAll(".js-add-book").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-book-id") ||
                    btn.closest(".pkg-card")?.querySelector(".pkg-title")?.textContent?.trim();
                const title = btn.getAttribute("data-book-title") ||
                    btn.closest(".pkg-card")?.querySelector(".pkg-title")?.textContent?.trim();
                if (!id || !title) return toast("Missing title");
                add({id, title});
            });
        });
    }

    /* ---------- Public init ---------- */
    function init(options = {}) {
        if (options?.formBase) state.form.base = options.formBase;
        if (options?.fields) state.form.fields = options.fields;
        ensureUI();
        wireButtons();
    }

    // expose a tiny API
    window.BookListUI = {init, add, open, proceed, remove, clear};
})();

