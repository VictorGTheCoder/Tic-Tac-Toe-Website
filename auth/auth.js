function registerUser(username, password) {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loginUser(username, password) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.getElementById('submitRegister').addEventListener('click', function() {
    const username = document.getElementById('regUsernameInput').value;
    const password = document.getElementById('regPasswordInput').value;
    registerUser(username, password);
});

document.getElementById('submitLogin').addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    loginUser(username, password);
});
