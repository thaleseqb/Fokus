const html = document.querySelector('html');
const focus_button = document.querySelector('.app__card-button--foco');
const short_rest = document.querySelector('.app__card-button--curto');
const long_rest = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const music_focus_input = document.querySelector('#alternar-musica');
const music = new Audio('/sounds/luna-rise-part-one.mp3');
const start_focus = new Audio('/sounds/play.wav');
const pause_focus = new Audio('/sounds/pause.mp3');
const finish = new Audio('/sounds/beep.mp3');
const startPause_button = document.querySelector('#start-pause');
let intervaloId = null;
music.loop =true;
let aux = 0;

let elapsed_time = 5
let list_1 = [focus_button, short_rest, long_rest];
let list_2 = ['foco', 'descanso-curto', 'descanso-longo'];

music_focus_input.addEventListener('change', () => {
    if (music.paused){
        music.play();
    } else {
        music.pause();
    }
});

function change_context(button, list, list_strng, title){
    if (list.includes(button)) {
        const index = list.indexOf(button);
        const context = list_strng[index];
        button.addEventListener('click', () => {
            buttons.forEach(function (context) {
                context.classList.remove('active');
            });
            button.classList.add('active');
            html.setAttribute('data-contexto', context);
            banner.setAttribute('src', `/assets/${context}.png`);
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

const regressive_counting =  () => {
    if (elapsed_time <= 0) {
        stop();
        alert("negative time doesn't existis");
        finish.play();
        return;
    }
    elapsed_time -= 1;
    console.log(elapsed_time);
};

startPause_button.addEventListener('click', start_pause);
startPause_button.addEventListener('click', () => {
    if (aux%2 == 0) {
        start_focus.play();
    } else {
        pause_focus.play();
    }
    aux += 1;
});

function start_pause(){
    if (intervaloId) {
        stop();
        return;
    }
    intervaloId = setInterval(regressive_counting, 1000);
};

function stop() {
    clearInterval(intervaloId);
    intervaloId = null;
}

