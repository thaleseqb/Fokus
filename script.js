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
const startorpause = document.querySelector('#start-pause span');
const image = document.querySelector('.app__card-primary-butto-icon');
const screen_time = document.querySelector('#timer')

let elapsed_time = 1500
let list_buttons = [focus_button, short_rest, long_rest];
let list_string = ['foco', 'descanso-curto', 'descanso-longo'];
let list_tm = [1500, 300, 900]

music_focus_input.addEventListener('change', () => {
    if (music.paused){
        music.play();
    } else {
        music.pause();
    }
});

function change_context(button, list, list_strng, title, l_tm){
    if (list.includes(button)) {
        const index = list.indexOf(button);
        const context = list_strng[index];
        button.addEventListener('click', () => {
            buttons.forEach(function (context) {
                context.classList.remove('active');
            });
            button.classList.add('active');
            elapsed_time = l_tm[index]
            show_time()
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

change_context(short_rest, list_buttons, list_string, title, list_tm);
change_context(focus_button, list_buttons, list_string, title, list_tm);
change_context(long_rest, list_buttons, list_string, title, list_tm);

const regressive_counting =  () => {
    if (elapsed_time <= 0) {
        alert("negative time doesn't existis");
        stop();
        finish.play();
        return;
    }
    elapsed_time -= 1;
    show_time();
};

startPause_button.addEventListener('click', start_pause);

startPause_button.addEventListener('click', () => {
    if (aux%2 == 0) {
        start_focus.play();
        startorpause.innerHTML = `Pausar`;
        image.setAttribute('src', "/assets/pause.png");
    } else {
        pause_focus.play();
        startorpause.innerHTML = `Começar`;
        image.setAttribute('src', "/assets/play_arrow.png");
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

function show_time() {
    const time = new Date(elapsed_time * 1000)
    const formated_time = time.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    screen_time.innerHTML = `${formated_time}`
}

show_time()