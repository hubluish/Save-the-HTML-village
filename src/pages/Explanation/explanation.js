document.addEventListener('DOMContentLoaded', function() {
    // 스텝 개수를 설정 (변경 가능)
    const totalSteps = 5;
    const stepper = document.querySelector('.stepper');
    let currentStep = 0;
  
    // 스텝 요소를 동적으로 생성
    for (let i = 0; i < totalSteps; i++) {
      const step = document.createElement('div');
      step.classList.add('step');
      if (i === currentStep) {
        step.classList.add('active');
      }
      // 클릭 시 해당 스텝으로 이동
      step.addEventListener('click', function() {
        currentStep = i;
        updateSteps();
      });
      stepper.appendChild(step);
    }
  
    const steps = document.querySelectorAll('.step');
  
    // 현재 스텝에 active 클래스 토글하여 UI 업데이트
    function updateSteps() {
      steps.forEach((step, index) => {
        if (index === currentStep) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }
  
    // Next 버튼 클릭 시 다음 스텝으로 이동
    document.querySelector('.next-btn').addEventListener('click', function() {
      if (currentStep < totalSteps - 1) {
        currentStep++;
        updateSteps();
      }
    });
  
    // Previous 버튼 클릭 시 이전 스텝으로 이동
    document.querySelector('.prev-btn').addEventListener('click', function() {
      if (currentStep > 0) {
        currentStep--;
        updateSteps();
      }
    });
  });
  