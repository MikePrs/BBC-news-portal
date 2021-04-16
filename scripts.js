
var data;
var url = 'http://newsapi.org/v2/everything?sources=bbc-news&apiKey=eba6c90754054afc888a64cfd38609c6';
var req = new Request(url);
fetch(req)
    .then(response => response.json())
    .then((news) => {
        var container = document.getElementById("container")
        container.style["display"] = "block";

        var loader = document.getElementById("loader")
        loader.style["display"] = "none";

        data = news;
        console.log(data);
        var newsCount = 0;
        for (let i = 0; i <= 9; i++) {
            var CardTitle = document.getElementById("title-" + i);
            var CardDescription = document.getElementById("description-" + i);
            var CardImg = document.getElementById("img-" + i);
            var CardLink = document.getElementById("linkToBBC-" + i);
            var NavLength = document.getElementById("length");
            newsCount = i + 1;
            results = newsCount;

            NavLength.innerHTML = "Results: " + results;
            CardTitle.innerHTML = news.articles[i].title;
            CardDescription.innerHTML = news.articles[i].description;
            CardImg.setAttribute("src", news.articles[i].urlToImage);
            CardLink.setAttribute("href", news.articles[i].url);
        }

        ///addd news
        $("#btn , #btn2").click(function () {
            console.log('add news count ' + newsCount)
            $(`<div class="card" id="card-` + newsCount + `">
            <img id="img-` + newsCount + `" class="card-img-top" src="` + data.articles[newsCount].urlToImage + `" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title" id="title-` + newsCount + `">` + data.articles[newsCount].title + `</h5>
            <p class="card-text"">` + data.articles[newsCount].description + `</p>
            <a href="` + data.articles[newsCount].url + `" id="linkToBBC-` + newsCount + `" class="card-link">Link to original</a>
            <a href="#" id="-` + newsCount + `" onclick="remove(this.id)"style="margin-top: 10px ;margin: 30px; color: #bc1212;" class="card-link">Remove</a>
            <a href="#" id="` + newsCount + `" data-toggle="modal" data-target="#myModal" onclick="edit(this.id)">Edit</a>
            </div></div>`
            ).insertBefore(".cardAdd");;



            newsCount = newsCount + 1;
            results = results + 1;
            results = results;
            NavLength.innerHTML = "Results: " + results;
        });



    })


var id;
// edit 
function edit(clicked_id) {
    console.log('edit card with id  ' + clicked_id);
    const div = document.createElement('div');
    div.innerHTML = ` <div><button id="save-` + clicked_id + `" type="button" class="btn btn-primary" >Save changes</button></div>`;
    document.getElementById('close').appendChild(div);


    id = clicked_id;

    var modalCard = document.getElementById("modal-card")
    modalCard.style["display"] = "block";

    var loader = document.getElementById("loader2")
    loader.style["display"] = "none";

    var CardDescriptionOriginal = document.getElementById("description-" + clicked_id);
    var CardDescription = document.getElementById("modal-description");
    CardDescription.value = data.articles[clicked_id].description;


    var CardTitle = document.getElementById("modal-title");
    var CardImg = document.getElementById("modal-img");
    CardTitle.innerHTML = data.articles[clicked_id].title;
    CardImg.setAttribute("src", data.articles[clicked_id].urlToImage);

    // upadate save 
    $("#save-" + clicked_id).click(function () {

        console.log("updating card with id "+id)
        console.log(data.articles[id].description)

        CardDescriptionOriginal.innerHTML = CardDescription.value;;
        data.articles[id].description = CardDescription.value;;

        var finalCard = document.getElementById("description-" + id);
        finalCard.innerHTML = data.articles[clicked_id].description;

    });



}

// close popup action
function closeBtn() {
    $('#save-' + id).remove();
};

// remove card
function remove(clicked_id) {
    results = results - 1;
    console.log("removed card with id "+clicked_id)
    var NavLength = document.getElementById("length");
    NavLength.innerHTML = "Results: " + results;
    $('#card' + clicked_id).css('display', 'none')
};

