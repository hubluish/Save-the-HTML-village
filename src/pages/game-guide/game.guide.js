document.addEventListener('DOMContentLoaded', function() {
  const totalSteps = 7;
  const stepper = document.querySelector('.stepper');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentStep = 0;

  // 스텝 요소를 동적으로 생성
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
    // 첫 번째 스텝이면 왼쪽 버튼 숨기기
    if (currentStep === 0) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }

    // 마지막 스텝이면 오른쪽 버튼 숨기기
    if (currentStep === totalSteps - 1) {
      nextBtn.style.visibility = 'hidden';
    } else {
      nextBtn.style.visibility = 'visible';
    }
  }

  nextBtn.addEventListener('click', function() {
    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateSteps();
      updateButtons();
    }
  });

  prevBtn.addEventListener('click', function() {
    if (currentStep > 0) {
      currentStep--;
      updateSteps();
      updateButtons();
    }
  });

  // 초기 버튼 상태 세팅
  updateButtons();
});
