document.addEventListener('DOMContentLoaded', function () {
  const totalSteps = 14;
  const progressBar = document.getElementById('progress-bar');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const textContent = document.querySelector('.text-content');
  let currentStep = 0;

  const messages = [
    "이게임은 꼭 전체화면으로 즐겨야해!<br>전체화면으로 바꿔줘 뭉~~",
    "안녕 나는 뭉뭉이야뭉!<br>내가 게임하는 방법을 아르켜줄게",
    "먼저 개념 설명 화면이야!<br>화살표를 누르면<br>이전, 또는 다음 화면으로 넘어가고,",
    "문제를 풀던 중에 다시 왼쪽 위에 나를 클릭하면<br>개념 설명으로 돌아올 수 있어 뭉.",
    "다음은 문제 화면이야<br>왼쪽 위에 있는 화면에서 태그를 선택해서~",
    "왼쪽 아래 HTML과 CSS 창에 집어넣을 수 있어 뭉!",
    "오른쪽 큰 화면은 현재 표시되는 화면이고,<br>오른쪽 위 작은 화면처럼 되도록<br>만들어야 정답이야 뭉.",
    "코드를 다 입력했으면<br>코드창 오른쪽 아래 버튼을 눌러<br>정답을 확인해볼 수 있어 뭉.",
    "오른쪽 위에서는 남은 스테이지와<br>현재 스테이지를 확인할 수 있어 뭉.",
    "이전 스테이지로 가고 싶거나,<br>다음 스테이지로 가고 싶으면<br>화살표를 누르거나",
    "스테이지를 눌러서<br>원하는 스테이지로 이동할 수도 있어 뭉! ",
    "그럼 이번에는 계산기 쓰는 방법을 알려줄게 뭉!<br>입력 필드에 숫자를 입력한 후, =을 누르면<br>cm는 px로, px은 cm로 변환돼 뭉.",
    "AC를 누르면 입력한 숫자가 모두 사라지고,<br>⇄ 버튼을 누르면 각각<br>cm, px 모드로 변경할 수 있어 뭉!",
    "목숨을 모두 잃으면, 게임 오버야.<br>그럼 우리 마을을 부탁해 뭉~!"
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
