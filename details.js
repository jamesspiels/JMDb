const detailListEl = document.querySelector(".detail__container")
const ratingsListEl = document.querySelector(".ratings__para")
const id = localStorage.getItem("id")

async function renderDetails(id){
    if(id){
    const detail = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=f06dc987&s`)
    const detailData = await detail.json()
    const ratingData = detailData.Ratings
    JSON.stringify(detailData)
    detailListEl.innerHTML = detailHTML(detailData)
    ratingsListEl.innerHTML = ratingData.map(ratings => ratingsHTML(ratings)).join("")
    return
    }
    return alert("There is no such movie")
}

renderDetails(id)

function detailHTML(detail){
    return  `<div class="detail">
                <figure class ="detail__img--wrapper">
                    <img src="${detail.Poster}" class = "detail__img" alt="">
                </figure>
                <div class="detail__title">
                    <span class = text--color>${detail.Title} (${detail.Rated}) - ${detail.Runtime}</span>
                </div>
                <div class = "detail__body--wrapper">
                    <p class="detail__body">
                        <span class = "text--color detail__subtitle">Released:</span> ${detail.Released}
                    <br />
                        <span class = "text--color detail__subtitle">Genre:</span> ${detail.Genre}
                    <br />
                        <span class = "text--color detail__subtitle">Director:</span> ${detail.Director}
                    <br />
                        <span class = "text--color detail__subtitle">Actors:</span> ${detail.Actors}
                    </p>
                    <p class="detail__body plot__para">
                        <span class = "text--color detail__subtitle">Plot:</span> ${detail.Plot}
                    </p>
                </div>
            </div>`
}

function ratingsHTML(ratings){
    let colorValue;
    const redLimit = 50;
    const yellowLimit = 75;
    if(splitFrac(ratings.Value) <= redLimit){
        colorValue = "red"
    }
    else if(splitFrac(ratings.Value) > redLimit && splitFrac(ratings.Value) <= yellowLimit){
        colorValue = "yellow"
    }
    else{
        colorValue = "green"
    }
    return `${ratings.Source}: <span class = "text--${colorValue}">${ratings.Value} </span><br />`
}

function splitFrac(fraction){
    if(fraction.includes("/")){
        ratio = fraction.split("/")
        return parseFloat(ratio[0]) / parseFloat(ratio[1]) * 100
    }
    else if(fraction.includes("%")){
        fraction = fraction.substring(0, fraction.length-1)
        return fraction
    }
    return parseFloat(fraction)
}

console.log(splitFrac("60"))
