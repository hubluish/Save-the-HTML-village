document.addEventListener('DOMContentLoaded', function() {
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
      step.addEventListener('click', function() {
        currentStep = i;
        updateSteps();
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
  
    document.querySelector('.next-btn').addEventListener('click', function() {
      if (currentStep < totalSteps - 1) {
        currentStep++;
        updateSteps();
      }
    });
  
    document.querySelector('.prev-btn').addEventListener('click', function() {
      if (currentStep > 0) {
        currentStep--;
        updateSteps();
      }
    });
  });
  