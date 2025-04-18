const navButton = document.getElementById('replayButton');
const replayImg = document.getElementById('replayBtn');

navButton.addEventListener('mouseenter', () => {
  replayImg.src = '../../assets/icons/start/b_replay_hover.svg';
  localStorage.setItem('replayImg', replayImg.src); 
});

navButton.addEventListener('mouseleave', () => {
  replayImg.src = '../../assets/icons/start/b_replay.svg';
  localStorage.setItem('replayImg', replayImg.src);
});

window.addEventListener('DOMContentLoaded', () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
});