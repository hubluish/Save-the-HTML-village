document.addEventListener('DOMContentLoaded', function() {
  const totalSteps = 5; // 총 스텝 수
  const stepper = document.querySelector('.stepper');
  const firstTemplate = document.getElementById('main-section-first');
  const secondTemplate = document.getElementById('main-section-second');
  let currentStep = 0;

  const stageTemplates = ['first', 'first', 'second', 'second', 'first'];

  // ⭐ 문제로 넘어갈 경로 추가 (여기 수정!)
  const nextProblemPath = '../../Solve/solve.html?stage=3';  // ← 여기 경로 수정해서 사용해! (예: 1.html)

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
      step.classList.toggle('active', index === currentStep);
    });

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
      } else {
        // ⭐ 마지막 스텝이면 다음 문제 페이지로 이동!
        window.location.href = nextProblemPath;
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