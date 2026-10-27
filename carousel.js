const track = document.querySelector('#app-screens');
const slides = [...track.children];
const previous = document.querySelector('#previous-screen');
const next = document.querySelector('#next-screen');
const position = document.querySelector('#screen-position');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
function update() {
  const left = track.getBoundingClientRect().left;
  current = slides.reduce((best, slide, index) => Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[best].getBoundingClientRect().left - left) ? index : best, 0);
  position.textContent = `${current + 1} of ${slides.length}`;
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}
function move(delta) {
  const index = Math.max(0, Math.min(slides.length - 1, current + delta));
  track.scrollTo({left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
previous.addEventListener('click', () => move(-1));
next.addEventListener('click', () => move(1));
track.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
  }
});
track.addEventListener('scroll', update, {passive:true});
window.addEventListener('resize', update);
update();
