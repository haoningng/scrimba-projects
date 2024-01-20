let localStorageKey = "watchlist"; // Set a key for local storage

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let movieImdbID = [];
    let searchArray = [];
    let html = "";
    
    // get user search input of movie title
    searchResult = document.getElementById("search-input").value;
    
    fetch(`https://www.omdbapi.com/?apikey=d1e0f8f8&s=${searchResult}`)
        .then(res => res.json())
        .then(data => {
            // build an array of movie imdbID
            for (let i = 0; i < data.Search.length; i++){
                movieImdbID.push(data.Search[i].imdbID);
            }
            
            // iterate through imdbID to fetch for more information
            for (let j = 0; j < movieImdbID.length; j++){
                fetch(`https://www.omdbapi.com/?apikey=d1e0f8f8&i=${movieImdbID[j]}`)
                .then(res => res.json())
                .then(data => {
                    // build an array of movie object
                    let movieObject = {
                        imdbID: data.imdbID,
                        Poster: data.Poster,
                        Title: data.Title,
                        imdbRating: data.imdbRating,
                        Runtime: data.Runtime,
                        Genre: data.Genre,
                        Plot: data.Plot
                    };
                    searchArray.push(movieObject);
                    
                    // append the html into string and render it to DOM
                    html += `
                    <div>
                        <div class="movie-slot">
                            <img class="poster" src="${data.Poster}">
                            <div class="description">
                                <div class="description-texts">
                                    <span><h3>${data.Title}</h3></span>
                                    <span><img width=15px height=15px src="images/star.jpg">&#160 ${data.imdbRating}</span>
                                </div>
                                <div class="description-middle">
                                    <span>${data.Runtime}</span>
                                    <span>${data.Genre}</span>
                                    <button class="plus-watchlist" id="plus-watchlist" value="${data.imdbID}"><img width="16px" height="16px" src="images/plus.jpg"> &#160Watchlist</button>
                                </div>
                                <p class="plot-texts">${data.Plot}</p>
                            </div>
                    </div>
                    <div class="hr"></div>`;
                    document.getElementById("movie-list").innerHTML = html;
                    
                    // add event listener to each add-to-watchlist button
                    document.querySelectorAll(".plus-watchlist").forEach(button => {
                        button.addEventListener("click", function () {
                            addToLocalStorage(searchArray.filter(movie => movie.imdbID === this.value)[0]);
                        })
                    })
                })
            }
        })
        .catch(error => document.getElementById("movie-list").innerHTML = `<p id="watchlist-text1">Unable to find what you’re looking for. <br>Please try another search.</p>`);
})

document.addEventListener("DOMContentLoaded", function() {
    let htmlWatchlist = "";
    let watchlistArray = JSON.parse(localStorage.getItem(localStorageKey));

    // iterate through the watchlist array from localStorage
    for (let k = 0; k < watchlistArray.length; k++){
        if (watchlistArray[k] != null) {
            // append the html into string and render it to DOM
            htmlWatchlist += `
            <div>
                <div class="movie-slot">
                    <img class="poster" src="${watchlistArray[k].Poster}">
                    <div class="description">
                        <div class="description-texts">
                            <span><h3>${watchlistArray[k].Title}</h3></span>
                            <span><img width=15px height=15px src="images/star.jpg">&#160 ${watchlistArray[k].imdbRating}</span>
                        </div>
                        <div class="description-middle">
                            <span>${watchlistArray[k].Runtime}</span>
                            <span>${watchlistArray[k].Genre}</span>
                            <button class="minus-watchlist" id="plus-watchlist" value="${watchlistArray[k].imdbID}"><img width="16px" height="16px" src="images/minus.jpg"> &#160Watchlist</button>
                        </div>
                        <p class="plot-texts">${watchlistArray[k].Plot}</p>
                    </div>
            </div>
            <div class="hr"></div>`;
            try {
                document.getElementById("movie-watchlist").innerHTML = htmlWatchlist;
            } catch {
                console.log("This is homepage")
            }
            
        }

        // add event listener to each minus-from-watchlist button
        document.querySelectorAll(".minus-watchlist").forEach(button => {
            button.addEventListener("click", function () {
                deleteLocalStorage(watchlistArray.filter(movie => movie.imdbID === this.value)[0]);
            })
        })
    }
})

function addToLocalStorage(selectedMovie) {
    // Get existing watchlist from local storage or initialize an empty array
    let existingWatchlist = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    // Check if the movie is already in the watchlist
    if (!existingWatchlist.some(movie => movie.imdbID === selectedMovie.imdbID)) {

        // Add the movie to the watchlist
        existingWatchlist.push(selectedMovie);

        // Save the updated watchlist to local storage
        localStorage.setItem(localStorageKey, JSON.stringify(existingWatchlist));

        console.log("Movie added to Watchlist:", selectedMovie);
    } else {
        console.log("Movie is already in Watchlist");
    }
}

function deleteLocalStorage(selectedMovie) {
    // Get existing watchlist from local storage or initialize an empty array
    let existingWatchlist = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
    // Check if the movie is already in the watchlist
    if (existingWatchlist.some(movie => movie.imdbID === selectedMovie.imdbID)) {

        // Find the index of the movie in the array and delete it
        let index = existingWatchlist.findIndex(movie => movie.imdbID === selectedMovie.imdbID);
        existingWatchlist.splice(index, 1);

        // Save the updated watchlist to local storage
        localStorage.setItem(localStorageKey, JSON.stringify(existingWatchlist));
        // Force page reload
        location.reload();

    } else {
        console.log("Movie not in Watchlist");
    }
}

