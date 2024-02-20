const html = document.querySelector('html');
const focus_button = document.querySelector('.app__card-button--foco');
const short_rest = document.querySelector('.app__card-button--curto');
const long_rest = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');

let list_1 = [focus_button, short_rest, long_rest];
let list_2 = ['foco', 'descanso-curto', 'descanso-longo'];

function change_context(button, list, list_strng){
    if (list.includes(button)) {
        const index = list.indexOf(button);
        button.addEventListener('click', () => {
            html.setAttribute('data-contexto', list_strng[index]);
            banner.setAttribute('src', `/assets/${list_strng[index]}.png`);
        });
    };
};

change_context(short_rest, list_1, list_2)
change_context(focus_button, list_1, list_2)
change_context(long_rest, list_1, list_2)
