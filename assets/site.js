const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
  revealObserver.observe(item);
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const heroArt = document.querySelector('.hero-art');
if (heroArt && window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  document.querySelector('.hero')?.addEventListener('pointermove', (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.transform = `translate(${x * 9}px, ${14 + y * 9}px)`;
  });
  document.querySelector('.hero')?.addEventListener('pointerleave', () => {
    heroArt.style.transform = 'translate(0, 14px)';
  });
}

const journeyStages = [...document.querySelectorAll('.journey-stage')];
const journeyStatus = document.querySelector('.journey-current');
const journeyProgress = document.querySelector('.console-progress i');
if (journeyStages.length && 'IntersectionObserver' in window) {
  const stageObserver = new IntersectionObserver((entries) => {
    const visibleStage = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visibleStage) return;
    const index = journeyStages.indexOf(visibleStage.target);
    journeyStages.forEach((stage, stageIndex) => stage.classList.toggle('is-active', stageIndex === index));
    if (journeyStatus) journeyStatus.textContent = visibleStage.target.dataset.stage;
    if (journeyProgress) journeyProgress.style.width = `${((index + 1) / journeyStages.length) * 100}%`;
  }, { threshold: [0.25, 0.5, 0.75], rootMargin: '-24% 0px -32% 0px' });
  journeyStages.forEach((stage) => stageObserver.observe(stage));
}
