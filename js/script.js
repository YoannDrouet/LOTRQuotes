/*document.getElementsByClassName("character").forEach((element) => {
    element.addEventListener("click", function (){
        console.log(("click"));
    });
});*/
homePage();

function homePage() {
    const title = document.querySelector('h1');
    const content = document.getElementById("content");
    title.textContent = "Choisissez un personnage";
    content.classList.add("home")
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
            "<p>" + quotes[i].dialog + "</p>" +
            "<i class=\"fa-regular fa-heart\"></i>" +
            "</div>";
        if (i == 20){
            break;
        }
    }

    const backHome = document.getElementById("backHome");
    console.log(backHome);
    backHome.addEventListener("click", function () {
        homePage();
    });
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