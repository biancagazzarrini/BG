
/* ==========================================
   NAVIGAZIONE E VIDEO
   ========================================== */

   function redirectToHome() {
    window.location.href = "home.html";
}

function playVideo() {
    const video = document.getElementById("myVideo");
    if (video) video.play();

    const button = document.getElementById("playButton");
    if (button) button.style.display = "none";
}


/* ==========================================
   WORK — PROGETTI E GALLERIE
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    // Esegui il codice solo nella pagina Work.
    if (!body.classList.contains("work-page")) return;

    const leftBox = body.querySelector(".left-box");
    const rightBox = body.querySelector(".right-box");

    if (!leftBox || !rightBox) return;

    const originalColumns = Array.from(leftBox.children)
        .filter(element => element.classList.contains("column"));

    if (originalColumns.length !== 5) {
        console.warn("Work: non sono state trovate le cinque colonne.");
        return;
    }

    const projectNames = [
        "BIGA. studio Branding",
        "Academic project",
        "The geometricity of my fluid body",
        "Redesigning Roberto Capucci",
        "SOULS",
        "FW2024 - Seven Gauge"
    ];

    const groupSizes = [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [2, 3, 13, 8, 17, 16],
        [2, 3, 13, 8, 17, 16]
    ];

    function getEntries(column) {
        const list = column.querySelector("ul");
        if (!list) return [];

        return Array.from(list.children).filter(item =>
            item.tagName === "LI" &&
            item.textContent.trim() !== ""
        );
    }

    const entriesByColumn = originalColumns.map(getEntries);

    // Controlla che le voci corrispondano ai gruppi attesi.
    const valid = entriesByColumn.every((entries, index) => {
        const expected = groupSizes[index].reduce(
            (total, number) => total + number, 0
        );
        return entries.length === expected;
    });

    if (!valid) {
        console.error(
            "Work: il numero di voci non corrisponde ai gruppi previsti."
        );
        return;
    }

    const headings = originalColumns.map(column =>
        column.querySelector("h2")?.textContent.trim() || ""
    );

    function createEntry(original) {
        const entry = document.createElement("div");

        entry.className = "work-entry";

        // Conserva le classi e gli attributi originali.
        original.classList.forEach(name => entry.classList.add(name));

        Array.from(original.attributes).forEach(attribute => {
            if (attribute.name !== "class") {
                entry.setAttribute(attribute.name, attribute.value);
            }
        });

        entry.innerHTML = original.innerHTML;
        return entry;
    }

    // Intestazioni mostrate una sola volta.
    const header = document.createElement("div");
    header.className = "work-headings";

    headings.forEach(name => {
        const heading = document.createElement("h2");
        heading.textContent = name;
        header.appendChild(heading);
    });

    // Raggruppa le voci in sei progetti.
    const projects = [];
    const cursors = [0, 0, 0, 0, 0];

    for (let projectIndex = 0; projectIndex < 6; projectIndex++) {
        const project = document.createElement("section");
        project.className = "work-project";
        project.dataset.project = String(projectIndex + 1);
        project.setAttribute("aria-label", projectNames[projectIndex]);

        for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
            const column = document.createElement("div");
            column.className = "work-column";

            const count = groupSizes[columnIndex][projectIndex];

            for (let i = 0; i < count; i++) {
                const original =
                    entriesByColumn[columnIndex][cursors[columnIndex]++];

                column.appendChild(createEntry(original));
            }

            project.appendChild(column);
        }

        projects.push(project);
    }

    leftBox.replaceChildren(header, ...projects);


    /* ==========================================
       PULSANTE DI RITORNO
       ========================================== */

    function removeBackButton() {
        rightBox.querySelector(".project-back-button")?.remove();
        body.classList.remove("project-view");
    }

    function addBackButton() {
        removeBackButton();

        body.classList.add("project-view");

        const button = document.createElement("button");
        button.type = "button";
        button.className = "project-back-button";
        button.textContent = "←";
        button.setAttribute("aria-label", "Torna a tutti i lavori");
        button.title = "Torna a tutti i lavori";

        button.addEventListener("click", function () {
            removeBackButton();

            // Ripristina la schermata iniziale di Work.
            body.classList.remove("mobile-gallery");
            leftBox.style.display = "";
            rightBox.style.display = "";
            rightBox.classList.remove("project-gallery");

            // Ripristina l'immagine iniziale originale.
            rightBox.replaceChildren();

            const initialImage = document.createElement("img");
            initialImage.src = "DSCF5232.jpg";
            initialImage.alt = "Portfolio";
            rightBox.appendChild(initialImage);

            // Ripristina la griglia vuota prevista dalla pagina.
            const emptyGrid = document.createElement("div");
            emptyGrid.id = "imageGrid";
            emptyGrid.className = "grid-container";
            rightBox.appendChild(emptyGrid);

            leftBox.scrollTop = 0;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        rightBox.appendChild(button);
    }


    /* ==========================================
       VISUALIZZAZIONE DELLE IMMAGINI
       ========================================== */

    function showImages(paths) {
        rightBox.replaceChildren();

        const grid = document.createElement("div");
        grid.id = "imageGrid";
        grid.className = "grid-container";

        paths.forEach(path => {
            const cleanPath = path.trim();
            if (!cleanPath) return;

            const image = document.createElement("img");
            image.src = cleanPath;
            image.alt = "Portfolio image";
            image.loading = "lazy";

            grid.appendChild(image);
        });

        rightBox.appendChild(grid);

        // La freccia compare soltanto nella schermata del progetto.
        addBackButton();

        if (window.innerWidth <= 780) {
            body.classList.add("mobile-gallery");
            rightBox.style.display = "block";
            rightBox.style.width = "100%";
            leftBox.style.display = "none";
            rightBox.scrollTop = 0;
        }
    }


    function showProjectGallery(type) {
        const ranges = {
            griglia1: { start: 1, end: 38, folder: "imggg" },
            griglia2: { start: 39, end: 62, folder: "imggg" },
            griglia3: { start: 63, end: 86, folder: "imggg" },
            griglia4: { start: 87, end: 116, folder: "imgggg" }
        };

        const range = ranges[type];
        if (!range) return;

        const paths = [];

        for (let i = range.start; i <= range.end; i++) {
            paths.push(`${range.folder}/${i}.jpg`);
        }

        showImages(paths);
    }


    /* ==========================================
       UN SOLO GESTORE PER I CLIC
       ========================================== */

    leftBox.addEventListener("click", function (event) {
        const entry = event.target.closest(".work-entry.clickable");

        if (!entry || !leftBox.contains(entry)) return;

        event.preventDefault();

        leftBox.querySelectorAll(".clicked, .active, .underline")
            .forEach(element => {
                element.classList.remove("clicked", "active", "underline");
            });

        entry.classList.add("clicked", "underline");

        const type = entry.dataset.type;
        const imageData = entry.dataset.image;

        if (type) {
            entry.classList.add("active");
            showProjectGallery(type);
        } else if (imageData) {
            showImages(imageData.split(","));
        }
    });


    /* ==========================================
       NAVBAR
       ========================================== */

    const navbar = document.querySelector("nav");

    if (navbar) {
        window.addEventListener("scroll", function () {
            const leftTop = leftBox.getBoundingClientRect().top;
            const rightTop = rightBox.getBoundingClientRect().top;
            const navbarHeight = navbar.offsetHeight;

            if (leftTop < navbarHeight || rightTop < navbarHeight) {
                navbar.style.mixBlendMode = "difference";
            } else {
                navbar.style.mixBlendMode = "normal";
            }
        });
    }
});


/* ==========================================
   VIDEO ABOUT — AUTOPLAY SU MOBILE
   ========================================== */

window.addEventListener("load", function () {
    const video = document.getElementById("myVideo");

    if (video && window.innerWidth <= 600) {
        video.play().catch(() => {});
    }
});


/* ==========================================
   TESTI RESPONSIVE
   ========================================== */

function updateParagraphText() {
    const paragraph = document.getElementById("cambio");

    if (paragraph && window.innerWidth <= 1200) {
        paragraph.textContent = "The geometricity of my fluid body";
    }

    const secondParagraph = document.getElementById("cambiare");

    if (secondParagraph && window.innerWidth <= 1200) {
        secondParagraph.textContent = "Redesigning Roberto Capucci";
    }
}

window.addEventListener("resize", updateParagraphText);
window.addEventListener("load", updateParagraphText);
