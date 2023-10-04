const menu = document.getElementById('menu');
const playAsGuestButton = document.getElementById('playAsGuest');
const loginButton = document.getElementById('login');
const gameOverlay = document.getElementById('game-container');
const guestInputForm = document.getElementById('guestInputForm');
const pseudoInput = document.getElementById('pseudoInput');
const submitPseudoButton = document.getElementById('submitPseudo');


// Push an initial state for the menu when the page loads
history.pushState({ menu: true }, "Menu", "#menu");

playAsGuestButton.addEventListener('click', function() {
    // Hide the buttons and show the input form
    playAsGuestButton.style.display = 'none';
    loginButton.style.display = 'none';
    guestInputForm.style.display = 'block';
});



submitPseudoButton.addEventListener('click', function() {
    const pseudo = pseudoInput.value.trim();
    if (pseudo) {
        // Store the pseudonym and use it in the game
        localStorage.setItem('playerPseudo', pseudo);
        // Hide the menu
        menu.style.display = 'none';
        // Show the game container
        document.getElementById('game-container').style.display = 'block';
        // After starting the game
        history.pushState({ gameStarted: true }, "Game", "#game");
    } else {
        alert("Please enter a valid pseudonym to continue.");
    }
});


loginButton.addEventListener('click', function() {
    window.location.href = "auth/login.html";
    // Implement your login logic here
    // For now, after logging in:
    // menu.style.display = 'none';
    // document.getElementById('game-container').style.display = 'block';  // Display the game container
});


window.addEventListener('popstate', function(event) {
    if (event.state && event.state.gameStarted) {
        // If the game has started, show the game and hide the menu
        menu.style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
    } else if (event.state && event.state.menu) {
        // If it's the menu state, show the menu and hide the game
        menu.style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
    }
});




