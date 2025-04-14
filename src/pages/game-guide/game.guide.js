document.addEventListener('DOMContentLoaded', function() {
  const totalSteps = 7;
  const stepper = document.querySelector('.stepper');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const textContent = document.querySelector('.text-content'); // 여기 추가
  let currentStep = 0;

  for (let i = 0; i < totalSteps; i++) {
    const step = document.createElement('div');
    step.classList.add('step');
    if (i === currentStep) {
      step.classList.add('active');
    }
    step.addEventListener('click', function() {
      currentStep = i;
      updateSteps();
      updateButtons();
      updateContent();
    });
    stepper.appendChild(step);
  }

  const steps = document.querySelectorAll('.step');

  function updateSteps() {
    steps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  function updateButtons() {
    if (currentStep === 0) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }

    if (currentStep === totalSteps - 1) {
      nextBtn.style.visibility = 'hidden';
    } else {
      nextBtn.style.visibility = 'visible';
    }
  }

  function updateContent() {
    if (currentStep === 0) {
      textContent.innerHTML = "이게임은 꼭 전체화면으로 즐겨야해!<br>전체화면으로 바꿔줘 뭉~~";
    } else if (currentStep === 1) {
      textContent.innerHTML = "안녕 나는 뭉뭉이야뭉!<br>내가 게임하는 방법을 아르켜줄게";
    } else if (currentStep === 2) {
      textContent.innerHTML = "먼저 개념 설명 화면이야!<br>화살표를 누르면 다음 화면으로 넘어가고,<br>문제를 풀던 중에 다시 왼쪽 위에 나를 클릭하면<br>개념 설명으로 돌아올 수 있어";
    } else if (currentStep === 3) {
      textContent.innerHTML = "네 번째";
    } else if (currentStep === 4) {
      textContent.innerHTML = "다섯 번째";
    } else if (currentStep === 5) {
      textContent.innerHTML = "여섯 번째";
    } else if (currentStep === 6) {
      textContent.innerHTML = "마지막 단계";
    }
  }

  nextBtn.addEventListener('click', function() {
    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateSteps();
      updateButtons();
      updateContent();
    }
  });

  prevBtn.addEventListener('click', function() {
    if (currentStep > 0) {
      currentStep--;
      updateSteps();
      updateButtons();
      updateContent();
    }
  });

  // 초기 세팅
  updateButtons();
  updateContent();
});
