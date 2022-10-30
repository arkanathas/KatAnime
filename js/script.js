const baseUrl = "https://katanime.vercel.app/api/";
const AnimeEndPoin = `${baseUrl}getlistanime`;
const KatanimeEndPoin = `${baseUrl}getbyanime`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getListAnime() {
    title.innerHTML = "List Anime";
    fetch(AnimeEndPoin)
      .then((response) => response.json())
      .then((resJson) => {
        console.log(resJson.result);
        let results = "";
        resJson.result.forEach((result) => {
          results += `
                <li class="collection-item light-blue lighten-5">
                    <h5 class="title">
                      <span class="badge">${result.totalKata}</span>
                      <a href="#" data-id="${result.anime}" class="a">${result.anime}</a>
                    </h5>
                </li>
              `;
        });
        contents.innerHTML = '<ul class="collection">' + results + "</ul>";
        const detail = document.querySelectorAll(".a");
        detail.forEach((btn) => {
        btn.onclick = (event) => {
            getByAnime(event.target.dataset.id);
        };
      })
  })
  .catch((err) => {
    console.error(err);
  });
}

function getByAnime(anime){
  let url = KatanimeEndPoin +"?anime="+ anime + "&page=1";
  fetch(url)
  .then ((response) => response.json())
  .then ((resJson) => {
    console.log(resJson.result);
    let results = ""; 
        resJson.result.forEach((result) => {
          results += `
          <div class="row">
            <div class="col s12">
              <div class="card light-blue lighten-2 hoverable">
                <div class="card-content white-text">
                  <span class="card-title">${result.anime}</span>
                  <p>"${result.indo}"</p><br>
                  <p class="right-align">- ${result.character}</p>
                </div>
              </div>
            </div>
          </div>
                  `;
        });

    contents.innerHTML = '<ul class="collection">' + results + "</ul>";
    title.innerHTML = "Kata-kata";
  })
  .catch((err) => {
    console.error(err);
  });
}

  getListAnime();