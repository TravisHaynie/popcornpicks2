
// Wait for the DOM content to load before executing these functions


document.addEventListener('DOMContentLoaded', function () {
    // Display the user's watchlist and top five movies
    displayWatchlist();
    displayTopFive();
});


// Function to display movies in the watchlist

function displayWatchlist() {
    const genreSections = document.getElementById('genre-sections');
    const modal = document.querySelector('#modal');

    // Check if genreSections element exists
    if (!genreSections) {
        console.error('Element with id "genre-sections" not found.');
        return;
    }
    // Retrieve the watchlist from local storage or initialize an empty array if not found
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    console.log('Loaded watchlist:', watchlist); // Debugging line

    genreSections.innerHTML = ''; // Clear existing content in genre sections

    // Display message if watchlist is empty
    if (watchlist.length === 0) {
        genreSections.innerHTML = '<p>No movies in your watchlist.</p>';
        return;
    }

    // Iterate over the watchlist and create elements for each movie
    watchlist.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box'); // Add CSS class for styling

        // Create elements for movie title and overview
        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;

        const movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;


        movieBox.appendChild(movieTitle); // Append title to movie box
        movieBox.appendChild(movieOverview); // Append overview to movie box

        // Fetch and display poster image if available

        movieBox.appendChild(movieTitle);
        movieBox.appendChild(movieOverview);
        // If the movie has a poster path, create an image element for it

        if (movie.poster_path) {
            const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = 'Movie Poster';
            imgElement.classList.add('poster'); // Add CSS class for styling
            movieBox.appendChild(imgElement); // Append image element to movie box
        }




        // Add a button to add the movie to the Top 5 list

        const addToTopFiveButton = document.createElement('button');
        addToTopFiveButton.classList.add('button', 'add-to-top-five');
        addToTopFiveButton.textContent = 'Add to Top 5';
        addToTopFiveButton.addEventListener('click', () => {
            addToTopFive(movie); // Add movie to top five list
            showModal('Added to Top 5'); // Show modal confirmation
        });



        // Add a button to mark the movie as watched and remove it from the watchlist

        const watchedButton = document.createElement('button');
        watchedButton.classList.add('button', 'watched');
        watchedButton.textContent = 'Watched';
        watchedButton.addEventListener('click', () => {
            removeFromWatchlist(movie); // Remove movie from watchlist
        });

        // Add event listener to hide modal when clicked outside
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                hideModal();
            }
        });

        movieBox.appendChild(addToTopFiveButton); // Append add to top five button to movie box
        movieBox.appendChild(watchedButton); // Append watched button to movie box
        genreSections.appendChild(movieBox); // Append movie box to genre sections
    });
}



// Function to show a modal with a message

function showModal(message) {
    const modal = document.querySelector('#modal');
    const modalContent = document.querySelector('.modal-content');
    modalContent.textContent = message; // Set modal content to the given message
    modal.classList.add('is-active'); // Add CSS class to show modal

    // Automatically hide modal after 1 second
    setTimeout(() => {
        hideModal();
    }, 1000);
}



// Function to hide the modal

function hideModal() {
    const modal = document.querySelector('#modal');
    modal.classList.remove('is-active'); // Remove CSS class to hide modal
}


// Function to display top five movies

function displayTopFive() {
    const topFiveSection = document.getElementById('top-5-section');

    // Check if topFiveSection element exists
    if (!topFiveSection) {
        console.error('Element with id "top-5-section" not found.');
        return;
    }

    let topFive = JSON.parse(localStorage.getItem('topFive')) || [];

    console.log('Loaded topFive:', topFive); // Debugging line

    topFiveSection.innerHTML = '<h2 class="subtitle"></h2>'; // Set title for top five section

    // Display message if top five list is empty
    if (topFive.length === 0) {
        return;
    }


    // Iterate over the top 5 list and create elements for each movie

    topFive.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box'); // Add CSS class for styling

        // Create elements for movie title and overview
        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;

        const movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;

        movieBox.appendChild(movieTitle); // Append title to movie box
        movieBox.appendChild(movieOverview); // Append overview to movie box

        // Fetch and display poster image if available

        movieBox.appendChild(movieTitle);
        movieBox.appendChild(movieOverview);
        // If the movie has a poster path, create an image element for it

        if (movie.poster_path) {
            const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = 'Movie Poster';
            imgElement.classList.add('poster'); // Add CSS class for styling
            movieBox.appendChild(imgElement); // Append image element to movie box
        }




        // Add a button to remove the movie from the Top 5 list

        const removeFromTopFiveButton = document.createElement('button');
        removeFromTopFiveButton.classList.add('button', 'remove-from-top-five');
        removeFromTopFiveButton.textContent = 'Remove';
        removeFromTopFiveButton.addEventListener('click', () => {
            removeFromTopFive(movie); // Remove movie from top five list
            showModal('Removed from Top 5'); // Show modal confirmation
        });

        movieBox.appendChild(removeFromTopFiveButton); // Append remove button to movie box
        topFiveSection.appendChild(movieBox); // Append movie box to top five section
    });
}




// function to add a movie to the watchlist

function addToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Store updated watchlist in local storage
    displayWatchlist(); // Update displayed watchlist
}




// Function to remove a movie from the watchlist
function removeFromWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(m => m.title !== movie.title); // Filter out movie to be removed
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Store updated watchlist in local storage
    displayWatchlist(); // Update displayed watchlist
}


// Function to add a movie to the top five list


function addToTopFive(movie) {
    let topFive = JSON.parse(localStorage.getItem('topFive')) || [];
    if (topFive.length < 5) {
        topFive.push(movie); // Add movie to top five list if less than 5 movies
        localStorage.setItem('topFive', JSON.stringify(topFive)); // Store updated top five list in local storage
        displayTopFive(); // Update displayed top five list
    } else {
        alert('Top 5 list is full. Please remove a movie before adding another.');
    }
}



// Function to remove a movie from the Top 5 list

function removeFromTopFive(movie) {
    let topFive = JSON.parse(localStorage.getItem('topFive')) || [];
    topFive = topFive.filter(m => m.title !== movie.title); // Filter out movie to be removed
    localStorage.setItem('topFive', JSON.stringify(topFive)); // Store updated top five list in local storage
    displayTopFive(); // Update displayed top five list
}