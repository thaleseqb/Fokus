const button_add_task = document.querySelector('.app__button--add-task');
const add_form_task = document.querySelector('.app__form-add-task');
const text_area = document.querySelector('.app__form-textarea');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const ul_task = document.querySelector('.app__section-task-list')

function update_task() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function create_element_task(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const par = document.createElement('p');
    par.textContent = task.description
    par.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button');
    button.classList.add('app_button-edit')

    button.onclick = () => {
        const new_task = prompt('Edite sua tarefa')
        console.log('new description task: ', new_task)
        if (new_task) {
            par.textContent = new_task;
            task.description = new_task;
            update_task();
        };
    };

    const image_button = document.createElement('img');
    image_button.setAttribute('src',"/assets/edit.png");
    button.append(image_button);
    
    li.append(svg);
    li.append(par);
    li.append(button);

    return li
};

button_add_task.addEventListener('click', () => {
    add_form_task.classList.toggle('hidden');
});

add_form_task.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        description: text_area.value
    };
    tasks.push(task);
    const element_task = create_element_task(task);
    ul_task.append(element_task);
    update_task()
    text_area.value = '';
    add_form_task.classList.add('hidden');
});

tasks.forEach(task => {
    const element_task = create_element_task(task)
    ul_task.append(element_task);
});