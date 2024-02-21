const button_add_task = document.querySelector('.app__button--add-task');
const button_form = document.querySelector('.app__form-add-task');

button_add_task.addEventListener('click', () => {
    button_form.classList.toggle('hidden');
})