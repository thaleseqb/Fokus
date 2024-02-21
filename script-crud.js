const button_add_task = document.querySelector('.app__button--add-task');
const add_form_task = document.querySelector('.app__form-add-task');
const text_area = document.querySelector('.app__form-textarea');
const tasks = [];

button_add_task.addEventListener('click', () => {
    add_form_task.classList.toggle('hidden');
});

add_form_task.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        description: text_area.value
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
});