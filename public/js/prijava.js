const warning = document.getElementById('user-exists');
const form = document.querySelector('form');

if (form != null) {
    form.addEventListener('submit', check_input);
}

function check_input(event) {
    warning.style.display = 'none';
    const inputs = document.querySelectorAll('#username, #password');
    for (const input of inputs) {
        input.value = input.value.trim();
        if (input.value.length < 4) {
            event.preventDefault();
            window.alert(`${input.parentElement.firstElementChild.textContent} mora sadržati barem 4 karaktera`);
            input.focus();
            return false;
        }
    }
    return true;
}

const signup = document.getElementById('signup');
if (signup != null && form != null) {
    signup.addEventListener('click', function (event) {
        let inputOk = check_input(event);
        if (inputOk) {
            check_password(event);
        }
    });
}


function check_password(event) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/prijava/create');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                processResponse(xhr.response);
            }
            else {
                document.documentElement.innerHTML = xhr.response;
            }
        }
    });

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    if (username != null && password != null) {
        const student = { username: username.value, password: password.value };
        xhr.send(JSON.stringify(student));
    }
}

function processResponse(response) {
    const res = JSON.parse(response);
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    if (res.exists) {
        username.value = '';
        password.value = '';
        warning.style.display = 'block';
        username.focus();
        const wrongPassword = document.getElementById('wrong-password');
        if (wrongPassword != null) {
            wrongPassword.style.display = 'none';
        }
        return;
    }
    //logs in
    form.submit();

    // submit();
}

function submit() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/student');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            history.replaceState(null, '', '/student');
            document.documentElement.innerHTML = xhr.response;
        }
    });
    xhr.send(JSON.stringify({ username: username.value, password: password.value }));

}

