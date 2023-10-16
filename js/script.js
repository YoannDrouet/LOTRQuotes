if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./serviceworker.js");
}

let favList;

if (typeof localStorage != 'undefined'){
    favList = localStorage.getItem("favorites");
    if (favList != null) {
        favList = JSON.parse(favList);
    } else {
        favList = [];
    }
}

const favButton = document.getElementById("viewFavorite");
homePage();

favButton.addEventListener("click", viewFavorite);

function homePage() {
    const title = document.querySelector('h1');
    const content = document.getElementById("content");
    title.textContent = "Choisissez un personnage";
    content.classList.add("home")
    favButton.classList.remove("hidden");
    content.innerHTML =
        "<div class=\"character\" id=\"5cd99d4bde30eff6ebccfbe6\">\n" +
        "            <img src=\"images/Aragorn.jpg\">\n" +
        "            <p class=\"characterName\">Aragorn</p>\n" +
        "        </div>\n" +
        "        <div class=\"character\" id=\"5cd99d4bde30eff6ebccfea0\">\n" +
        "            <img src=\"images/Gandalf.jpg\">\n" +
        "            <p class=\"characterName\">Gandalf</p>\n" +
        "        </div>\n" +
        "        <div class=\"character\" id=\"5cd99d4bde30eff6ebccfd23\">\n" +
        "            <img src=\"images/Gimli.jpg\">\n" +
        "            <p class=\"characterName\">Gimli</p>\n" +
        "        </div>\n" +
        "        <div class=\"character\" id=\"5cd99d4bde30eff6ebccfd81\">\n" +
        "            <img src=\"images/Legolas.jpg\">\n" +
        "            <p class=\"characterName\">Legolas</p>\n" +
        "        </div>";

    const characters = document.getElementsByClassName("character");

    for (let i = 0; i < characters.length; i++) {
        characters[i].addEventListener("click", async function () {
            const quote = await callAPI(characters[i].id);
            viewQuotes(quote.docs);
        })
    }
}

function backButton() {
    const backHome = document.getElementById("backHome");
    favButton.classList.remove("hide");
    backHome.addEventListener("click", function () {
        homePage();
    });
}

function changeFav(favPage) {
    const favButtons = document.getElementsByClassName("favorite");
    for (let i = 0; i < favButtons.length; i++) {
        favButtons[i].addEventListener("click", function () {
            if (this.classList.contains("fa-regular")) {
                favList.push(this.previousSibling.innerText);
                this.classList.remove("fa-regular");
                this.classList.add("fa-solid");
            } else {
                let index = favList.indexOf(this.previousSibling.innerText);
                favList.splice(index, 1);
                this.classList.remove("fa-solid");
                this.classList.add("fa-regular");
                if (favPage){
                    displayFavorite();
                }
            }
            localStorage.setItem("favorites", JSON.stringify(favList));
        });
    }
}

function viewQuotes(quotes) {
    const title = document.querySelector('h1');
    const content = document.getElementById("content");
    content.classList.remove("home");
    title.textContent = "Voici les citations";
    content.innerHTML = "" +
        "<div id='arianne'>" +
        "<p id='backHome'>Revenir au choix des personnages</p>" +
        "</div>";
    for (let i = 0; i < quotes.length; i++) {
        content.innerHTML += "" +
            "<div class='quote'>" +
            "<p>" + quotes[i].dialog + "</p>" + (favList.includes(quotes[i].dialog) ? "<i class=\"fa-solid fa-heart favorite\"></i>" :"<i class=\"fa-regular fa-heart favorite\"></i>") +
                "</div>";

        if (i == 20) {
            break;
        }
    }

    backButton();

    changeFav(false);
}

function viewFavorite(){
    const title = document.querySelector('h1');
    title.textContent = "Vos citations favorites";
    favButton.classList.add("hidden");

    displayFavorite();
}

function displayFavorite() {
    const content = document.getElementById("content");
    content.classList.remove("home");
    content.classList.add("favorites");
    content.innerHTML = "" +
        "<div id='arianne'>" +
        "<p id='backHome'>Revenir au choix des personnages</p>" +
        "</div>";

    for (let i = 0; i < favList.length; i++) {
        content.innerHTML += "" +
            "<div class='quote'>" +
            "<p>" + favList[i] + "</p>" +
            "<i class=\"fa-solid fa-heart favorite\"></i>" +
            "</div>";
    }
    changeFav(true);
    backButton();
}

async function callAPI(id) {
    const url = "https://the-one-api.dev/v2/character/" + id + "/quote";
    const response = await fetch(url, {
        headers: {
            "Authorization": "Bearer nTBN-mds-rp6hE5nR3Rk"
        }
    });
    return response.json();
}