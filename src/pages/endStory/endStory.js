document.addEventListener('DOMContentLoaded', function () {
  const totalSteps = 4;
  const stepper = document.querySelector('.stepper');
  let currentStep = 0;

  for (let i = 0; i < totalSteps; i++) {
    const step = document.createElement('div');
    step.classList.add('step');
    if (i === currentStep) {
      step.classList.add('active');
    }
    step.addEventListener('click', function () {
      currentStep = i;
      updateSteps();
    });
    stepper.appendChild(step);
  }

  const steps = document.querySelectorAll('.step');

  function updateSteps() {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
    });

    const middleSection = document.getElementById('middle-section');
    middleSection.innerHTML = getMiddleContent(currentStep);

    // Bottom section의 텍스트 업데이트
    const bottomSectionText = document.getElementById('bottom-text');
    bottomSectionText.innerHTML = getBottomText(currentStep);
  }

  // next-btn 클릭 시 clear.html로 이동
  document.querySelector('.next-btn').addEventListener('click', function () {
    if (currentStep === totalSteps - 1) {
      window.location.href = '../clear.html';
    } else {
      currentStep++;
      updateSteps();
    }
  });

  // 초기 중간 섹션 설정
  updateSteps();
});

// 텍스트 내용 반환 함수
function getBottomText(stepIndex) {
  switch (stepIndex) {
    case 0: return '(평화로운 마을소리)';
    case 1: return "덕분에 평화로운 우리 마을을 되찾았어!";
    case 2: return "넌 분명 좋은 개발자가 될거야!<br>응원할게 >~<";
    case 3: return "다음에는 행복한 얼굴로 만나뭉 안뇨~~";
    default: return "";
  }
}

// 중간 섹션 이미지 내용 반환 함수
function getMiddleContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_end_1.png" class="bg-image" />
        </div>
      `;
    case 1:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_end_2.png" class="bg-image" />
          <img src="../../assets/icons/story_end_2-2.png" class="overlay-image" />
        </div>
      `;
    case 2:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_end_2.png" class="bg-image" />
          <img src="../../assets/icons/story_end_3.png" class="overlay-image" />
        </div>
      `;
    case 3:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_end_2.png" class="bg-image" />
          <img src="../../assets/icons/story_end_4.png" class="centered-img" />
        </div>
      `;
    default:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_end_1.png" class="bg-image" />
        </div>
      `;
  }
}
