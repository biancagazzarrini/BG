// video about
function playVideo() {
    var video = document.getElementById("myVideo");
    video.play();

    // Nascondi il pulsante di play dopo aver avviato la riproduzione
    var playButton = document.getElementById("playButton");
    playButton.style.display = "none";
}

// landing page
function redirectToHome() {
    window.location.href = "home.html";
}


document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('nav');
    const leftBox = document.getElementById('leftBox');
    const rightBox = document.getElementById('rightBox');

    window.addEventListener('scroll', function () {
        const navbarHeight = navbar.offsetHeight;
        const leftBoxTop = leftBox.getBoundingClientRect().top;
        const rightBoxTop = rightBox.getBoundingClientRect().top;

        // Verifica se il box di sinistra è sotto la navbar
        if (leftBoxTop < navbarHeight) {
            navbar.style.color = 'transparent'; // Rendi il testo trasparente
            navbar.style.webkitTextFillColor = 'red'; // Cambia il colore del testo usando una proprietà specifica di WebKit
            navbar.style.mixBlendMode = 'difference'; // Applica l'effetto di esclusione
        } else if (rightBoxTop < navbarHeight) {
            navbar.style.color = 'blue'; // Cambia il colore della navbar per il box di destra
            navbar.style.mixBlendMode = 'difference'; // Applica l'effetto di esclusione
        } else {
            navbar.style.color = 'black'; // Ripristina il colore predefinito del testo
            navbar.style.mixBlendMode = 'normal'; // Ripristina la modalità di miscelazione predefinita
        }
    });
});





document.addEventListener("DOMContentLoaded", function() {
    const clickableColumns = document.querySelectorAll('.clickable');
    const rightBox = document.querySelector('.right-box img');

    clickableColumns.forEach(column => {
        column.addEventListener('click', function() {
            const imagePath = column.dataset.image;
            rightBox.src = imagePath;
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Trova tutte le voci cliccabili delle colonne REFERENCE e DESCRIPTION
    var clickableItems = document.querySelectorAll(".clickable");

    // Itera su ogni voce cliccabile
    clickableItems.forEach(function(item) {
        // Aggiungi un gestore di eventi per il clic
        item.addEventListener("click", function() {
            // Rimuovi la classe sottolineata da tutti gli elementi cliccabili
            clickableItems.forEach(function(item) {
                item.classList.remove("underline");
            });

            // Aggiungi la classe sottolineata all'elemento cliccato
            item.classList.add("underline");

            // Ottieni l'elenco di immagini associate dalla data attributo
            var imageUrls = item.getAttribute("data-image").split(',');

            // Trova il box destro
            var rightBox = document.querySelector('.right-box');

            // Svuota il contenuto del box destro
            rightBox.innerHTML = '';

            // Itera su ogni URL dell'immagine e crea un elemento immagine per ciascuno
            imageUrls.forEach(function(url) {
                var imageElement = document.createElement("img");
                imageElement.src = url.trim(); // Rimuovi spazi bianchi intorno all'URL
                imageElement.alt = "Image";

                // Aggiungi un salto di riga prima di ogni immagine
                rightBox.appendChild(document.createElement("br"));
                
                // Aggiungi l'immagine al box destro
                rightBox.appendChild(imageElement);
            });
        });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const clickableItems = document.querySelectorAll('.clickable');
    const rightBoxImg = document.querySelector('.right-box img');

    clickableItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Previeni il comportamento predefinito del link

            // Rimuovi la classe 'clicked' da tutti gli elementi cliccabili
            clickableItems.forEach(element => {
                element.classList.remove('clicked');
            });

            // Aggiungi la classe 'clicked' all'elemento cliccato
            item.classList.add('clicked');

            // Cambia l'immagine nel right-box
            const imagePath = item.dataset.image;
            rightBoxImg.src = imagePath;
        });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const nameItems = document.querySelectorAll('.column:nth-child(3) .clickable');
    const rightBox = document.querySelector('.right-box');

    nameItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Previeni il comportamento predefinito del link

            // Rimuovi la classe 'active' da tutti gli elementi 'clickable' nella colonna 'NAME'
            nameItems.forEach(item => {
                item.classList.remove('active');
            });

            // Aggiungi la classe 'active' all'elemento cliccato
            item.classList.add('active');

            // Cancella il contenuto del right box
            rightBox.innerHTML = '';

            // Crea la griglia di immagini nel right box
            const imageGrid = document.createElement('div');
            imageGrid.classList.add('grid-container');

            // Ottieni l'attributo 'data-type' dell'elemento cliccato
            const dataType = item.getAttribute('data-type');

            // Aggiungi immagini alla griglia in base al tipo di dati
            if (dataType === 'griglia1') {
                // Aggiungi immagini per la prima griglia
                for (let i = 1; i <= 38; i++) {
                    const image = document.createElement('img');
                    image.src = `imggg/${i}.jpg`;
                    image.alt = `Image ${i}`;
                    imageGrid.appendChild(image);
                }
            } else if (dataType === 'griglia2') {
                // Aggiungi immagini per la seconda griglia
                for (let i = 39; i <= 62; i++) {
                    const image = document.createElement('img');
                    image.src = `imggg/${i}.jpg`;
                    image.alt = `Image ${i}`;
                    imageGrid.appendChild(image);
                }
            } else if (dataType === 'griglia3') {
                // Aggiungi immagini per la terza griglia
                for (let i = 63; i <= 86; i++) {
                    const image = document.createElement('img');
                    image.src = `imggg/${i}.jpg`;
                    image.alt = `Image ${i}`;
                    imageGrid.appendChild(image);
                }
            } else if (dataType === 'griglia4') {
                // Aggiungi immagini per la terza griglia
                for (let i = 87; i <= 116; i++) {
                    const image = document.createElement('img');
                    image.src = `imgggg/${i}.jpg`;
                    image.alt = `Image ${i}`;
                    imageGrid.appendChild(image);
                }
            }  
            // Aggiungi la griglia di immagini al right box
            rightBox.appendChild(imageGrid);
        });
    });
});




window.onload = function() {
    var video = document.getElementById('myVideo');
    if (window.innerWidth <= 600) {
        video.play();
    }
};



document.addEventListener("DOMContentLoaded", function() {
    const clickableItems = document.querySelectorAll('.clickable');
    const rightBox = document.querySelector('.right-box');
    const leftBox = document.querySelector('.left-box');

    clickableItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Previeni il comportamento predefinito del link
            event.preventDefault(); 
            
            // Verifica se la larghezza dello schermo è inferiore a 780px
            if (window.innerWidth <= 780) {
                // Nascondi il left-box
                leftBox.style.display = 'none';
                
                // Mostra il right-box
                rightBox.style.display = 'block';
                // Imposta la larghezza del right-box al 100% dello schermo
                rightBox.style.width = '100%';
            }
        });
    });
});


function updateParagraphText() {
    const paragraph = document.getElementById('cambio');
    const width = window.innerWidth;

    if (width <= 1200) {
        paragraph.textContent = 'The geometricity of my fluid body';
    } 
}

window.addEventListener('resize', updateParagraphText);
window.addEventListener('load', updateParagraphText);


function updateParagraphText2() {
    const paragraph = document.getElementById('cambiare');
    const width = window.innerWidth;

    if (width <= 1200) {
        paragraph.textContent = 'Redesigning Roberto Capucci';
    } 
}

window.addEventListener('resize', updateParagraphText2);
window.addEventListener('load', updateParagraphText2);


