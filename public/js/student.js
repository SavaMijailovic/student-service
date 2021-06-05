const form = document.querySelector('#izmena-podataka');
if (form != null) {
    form.addEventListener('submit', check_input);
}

function check_input(event) {
    const inputs = document.querySelectorAll('#name, #surname, #password');
    for (const input of inputs) {
        input.value = input.value.trim();
    }

    const password = document.getElementById('password');
    if (password == null || password.value.length < 4) {
        event.preventDefault();
        window.alert(`${password.parentElement.firstElementChild.textContent} mora sadrzati barem 6 karaktera`);
        password.focus();
        return false;
    }
}
