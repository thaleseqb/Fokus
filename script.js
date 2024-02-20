const html = document.querySelector('html');
const focus_button = document.querySelector('.app__card-button--foco');
const short_rest = document.querySelector('.app__card-button--curto');
const long_rest = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');

let list_1 = [focus_button, short_rest, long_rest];
let list_2 = ['foco', 'descanso-curto', 'descanso-longo'];

function change_context(button, list, list_strng, title){
    if (list.includes(button)) {
        const index = list.indexOf(button);
        button.addEventListener('click', () => {
            html.setAttribute('data-contexto', list_strng[index]);
            banner.setAttribute('src', `/assets/${list_strng[index]}.png`);
            switch (list_strng[index]) {

                case "foco":
                    title.innerHTML = `
                    Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>
                    `
                    break;

                case "descanso-curto":
                    title.innerHTML = `
                    Que tal dar uma respirada?<br>
                    <strong class="app__title-strong">Faça uma pausa curta!</strong>
                    `
                    break;

                case "descanso-longo":
                    title.innerHTML = `
                    Hora de voltar à superfície.<br>
                    <strong class="app__title-strong">Faça uma pausa longa</strong>
                    `
                    break;
            
                default:
                    break;
            };
        });
    };
};

change_context(short_rest, list_1, list_2, title);
change_context(focus_button, list_1, list_2, title);
change_context(long_rest, list_1, list_2, title);

