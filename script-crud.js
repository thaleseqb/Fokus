const button_add_task = document.querySelector('.app__button--add-task');
const add_form_task = document.querySelector('.app__form-add-task');
const text_area = document.querySelector('.app__form-textarea');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const ul_task = document.querySelector('.app__section-task-list');
const cancel_taskbt = document.querySelector('.app__form-footer__button--cancel');
const act_task_descp = document.querySelector('.app__section-active-task-description');
const concluded_task = document.getElementById('btn-remover-concluidas')
const remove_all = document.getElementById('btn-remover-todas')

let selected_task = null;
let li_selected_task = null;

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
    par.textContent = task.description;
    par.classList.add('app__section-task-list-item-description');

    const button = document.createElement('button');
    button.classList.add('app_button-edit');

    button.onclick = () => {
        const new_task = prompt('Edite sua tarefa');
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

    if (task.complete) {
        li.classList.add('app__section-task-list-item-complete');
        button.setAttribute('disabled', 'disabled');        
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(element => {
                    element.classList.remove('app__section-task-list-item-active');
                });
                
            if (selected_task == task) {
                act_task_descp.textContent = '';
                selected_task = null;
                li_selected_task = null;
                return;
            };
    
            selected_task = task;
            li_selected_task = li;
            act_task_descp.textContent = `${task.description} em andamento`;
    
            li.classList.add('app__section-task-list-item-active');
        };
    };


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
    update_task();
    text_area.value = '';
    add_form_task.classList.add('hidden');
});

cancel_taskbt.addEventListener('click', () => {
    text_area.value = '';
    add_form_task.classList.toggle('hidden');
});

tasks.forEach(task => {
    const element_task = create_element_task(task);
    ul_task.append(element_task);
});

document.addEventListener('endedfocus', () => {
    if (selected_task && li_selected_task) {
        li_selected_task.classList.remove('app__section-task-list-item-active');
        li_selected_task.classList.add('app__section-task-list-item-complete');
        li_selected_task.querySelector('button').setAttribute('disabled', 'disabled');
        selected_task.complete = true;
        update_task();
    };
});

const remove_tasks = (only_complete) => {
    const selector = only_complete ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(selector)
        .forEach(element => {
            element.remove();
        });

    tasks = only_complete ? tasks.filter(task => !task.complete) : [];
    update_task();
};

concluded_task.onclick = () => remove_tasks(true);
remove_all.onclick = () => remove_tasks(false);