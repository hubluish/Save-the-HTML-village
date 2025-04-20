function initStage9Modal() {
  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const screen3 = document.getElementById('screen3');
  const checkBtn = document.querySelector('.check-button');
  const nextStageBtn = document.querySelector('.next-stage-button');

  if (!screen1 || !screen2 || !screen3 || !checkBtn || !nextStageBtn) {
    setTimeout(initStage9Modal, 200); // 200ms 뒤 다시 시도
    return;
  }

  // screen1 → screen2 (5초 후)
  setTimeout(() => {
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
  }, 5000);

  // > Click! 버튼 누르면 screen2 → screen3
  checkBtn.addEventListener('click', () => {
    screen2.classList.add('hidden');
    screen3.classList.remove('hidden');
  });
}

// JS 로드되면 실행
initStage9Modal();