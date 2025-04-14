document.addEventListener('DOMContentLoaded', function() {
  const totalSteps = 5; // 총 스텝 수
  const stepper = document.querySelector('.stepper');
  const firstTemplate = document.getElementById('main-section-first');
  const secondTemplate = document.getElementById('main-section-second');
  let currentStep = 0;

  // 각 스텝에 어떤 템플릿을 쓸지 정의
  const stageTemplates = [
    'first', // 스텝 0
    'first', // 스텝 1
    'second', // 스텝 2
    'second', // 스텝 3
    'first'  // 스텝 4
  ];

  // 스텝 표시 요소 생성
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

  // 스텝 표시 업데이트 + 템플릿 표시 업데이트
  function updateSteps() {
    const steps = document.querySelectorAll('.step');

    steps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // 템플릿 전환
    if (stageTemplates[currentStep] === 'first') {
      firstTemplate.style.display = 'flex';
      secondTemplate.style.display = 'none';
    } else {
      firstTemplate.style.display = 'none';
      secondTemplate.style.display = 'flex';
    }
  }

  // 다음 버튼
  const nextButtons = document.querySelectorAll('.next-btn');
  nextButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentStep < totalSteps - 1) {
        currentStep++;
        updateSteps();
      }
    });
  });

  // 이전 버튼
  const prevButtons = document.querySelectorAll('.prev-btn');
  prevButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentStep > 0) {
        currentStep--;
        updateSteps();
      }
    });
  });

  // 첫 로딩 시 초기화
  updateSteps();
});
