const navButton = document.getElementById('startButton');
const startImg = document.getElementById('startBtn');
const navButton2 = document.getElementById('exButton');
const exImg = document.getElementById('exBtn');

navButton.addEventListener('mouseenter', () => {
  startImg.src = '../../assets/icons/start/b_gamestart_hover.png';
  localStorage.setItem('startImg', startImg.src); 
});

navButton.addEventListener('mouseleave', () => {
  startImg.src = '../../assets/icons/start/b_gamestart.png';
  localStorage.setItem('startImg', startImg.src);
});

navButton2.addEventListener('mouseenter', () => {
  exImg.src = '../../assets/icons/start/b_ex_hover.png';
  localStorage.setItem('exImg', exImg.src); 
});

navButton2.addEventListener('mouseleave', () => {
  exImg.src = '../../assets/icons/start/b_ex.png';
  localStorage.setItem('exImg', exImg.src);
});

