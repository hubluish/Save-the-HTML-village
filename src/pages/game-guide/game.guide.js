document.addEventListener('DOMContentLoaded', function () {
  const totalSteps = 13;
  const progressBar = document.getElementById('progress-bar');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const textContent = document.querySelector('.text-content');
  let currentStep = 0;

  const messages = [
    "이게임은 꼭 전체화면으로 즐겨야해!<br>전체화면으로 바꿔줘 뭉~~",
    "안녕 나는 뭉뭉이야뭉!<br>내가 게임하는 방법을 아르켜줄게",
    "먼저 개념 설명 화면이야!<br>화살표를 누르면 다음 화면으로 넘어가고,<br>문제를 풀던 중에 다시 왼쪽 위에 나를 클릭하면<br>개념 설명으로 돌아올 수 있어",
    "네 번째",
    "다섯 번째",
    "여섯 번째",
    "일곱 번째",
    "여덟 번째",
    "아홉 번째",
    "열 번째",
    "열한 번째",
    "열두 번째",
    "마지막 단계"
  ];

  function updateProgressBar() {
    const percentage = (currentStep / (totalSteps - 1)) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  function updateContent() {
    textContent.innerHTML = messages[currentStep];
  }

  function updateButtons() {
    prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentStep === totalSteps - 1 ? 'hidden' : 'visible';
  }

  nextBtn.addEventListener('click', function () {
    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateProgressBar();
      updateButtons();
      updateContent();
    }
  });

  prevBtn.addEventListener('click', function () {
    if (currentStep > 0) {
      currentStep--;
      updateProgressBar();
      updateButtons();
      updateContent();
    }
  });

  // 초기 상태
  updateProgressBar();
  updateButtons();
  updateContent();
});
