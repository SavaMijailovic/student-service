const date = document.getElementById('date');
if (date != null) {
    const DATE = new Date();
    let d = DATE.getDate();
    let m = DATE.getMonth() + 1;
    const y = DATE.getFullYear();
    d = (d < 10 ? '0' : '') + d;
    m = (m < 10 ? '0' : '') + m;
    const dateString = y + '-' + m + '-' + d;
    console.log(dateString);
    date.value = dateString;
}

const addForm = document.getElementById('add');
if (addForm != null) {
    addForm.addEventListener('submit', checkInputs);
}

const deleteForm = document.getElementById('delete');
if (deleteForm != null) {
    deleteForm.addEventListener('submit', checkSubject);
}

function checkSubject(event) {
    const subject = document.querySelector(`#${this.id} div input[name="subject"]`);
    if (subject == null) return;

    if (subject.value.length < 2) {
        event.preventDefault();
        window.alert('Naziv predmeta ne sme biti kraci od 2 karaktera');
        subject.focus();
        return;
    }
}

function checkInputs(event) {
    const subject = document.querySelector(`#${this.id} div input[name="subject"]`);
    if (subject == null) return;

    if (subject.value.length < 2) {
        event.preventDefault();
        window.alert('Naziv predmeta ne sme biti kraci od 2 karaktera');
        subject.focus();
        return;
    }

    const grade = document.getElementById('grade');
    if (grade == null) return;

    const gr = Number.parseInt(grade.value);
    if (Number.isNaN(gr) || gr < 5 || gr > 10) {
        event.preventDefault();
        window.alert('Ocene mogu biti sledece: 5, 6, 7, 8, 9, 10');
        grade.value = '';
        grade.focus();
        return;
    }
}
