const html = document.querySelector('html')
const focus_button = document.querySelector('.app__card-button--foco')
const short_rest = document.querySelector('.app__card-button--curto')
const long_rest = document.querySelector('.app__card-button--longo')

focus_button.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
})

short_rest.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
})

long_rest.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
})