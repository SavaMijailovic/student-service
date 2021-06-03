const form = document.querySelector('#izmena-podataka');
if (form != null) {
    form.addEventListener('submit', check_input);
}

function check_input(event) {
    const inputs = document.querySelectorAll('#username, #password');
    for (const input of inputs) {
        if (input.value.length < 4) {
            event.preventDefault();
            window.alert(`${input.parentElement.firstElementChild.textContent}mora sadrzati barem 6 karaktera`);
            input.focus();
            return false;
        }
    }
}
