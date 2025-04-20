window.addEventListener('DOMContentLoaded', () => {
  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const screen3 = document.getElementById('screen3');
  const checkBtn = document.querySelector('.check-button');
  const nextStageBtn = document.querySelector('.next-stage-button');

  // 5초 뒤 두 번째 화면 보여주기
  setTimeout(() => {
      screen1.classList.add('hidden');
      screen2.classList.remove('hidden');
  }, 5000);

  // Click! 버튼 클릭 시 세 번째 화면으로 이동
  checkBtn.addEventListener('click', () => {
      screen2.classList.add('hidden');
      screen3.classList.remove('hidden');
  });

  // 확인! 버튼 클릭 시 다음 페이지로 이동
  nextStageBtn.addEventListener('click', () => {
      // 모달 화면에서 전환
      document.querySelector('.stage-intro-img').classList.remove('show'); // intro 이미지 숨기기
      document.querySelector('.stage-result-img').classList.add('show'); // result 이미지 보이기
      // 새 페이지로 이동
      window.location.href = "../10/10.html";
  });
});
