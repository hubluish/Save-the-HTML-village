document.addEventListener('DOMContentLoaded', function () {
  const totalSteps = 9;
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
      window.location.href = '../start.html';
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
    case 0: return '우르르 쾅쾅.. 주르륵..';
    case 1: return "마을 주민들: 으아아!! <br>우리 마을 어떡해ㅠㅠㅠ";
    case 2: return "으악 저기 좀 봐!<br>시장이 사라졌어..."  ;
    case 3: return "으앗!!<br>마을이 모두 사라지고 있잖아?!?"; 
    case 4: return "마을이 흔적도 없이 사라졌어..<br>어떡하지.."; 
    case 5: return "우리 마을은 HTML이랑 CSS로만<br>복구할 수 있는데 .. 어휴"; 
    case 6: return "어랏??<br>키보드 타이핑 소리가 들려";
    case 7: return "우리 마을을 구해줄 사람이 있는 거 같아! <br>저쪽으로 가보자 ";
    case 8: return "앗 눈부셔!.. 당신이군요!<br>우리 마을을 구해줄사람이 !!!";
    default: return "";
  }
}

// 중간 섹션 이미지 내용 반환 함수
function getMiddleContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_1.png" class="bg-image" />
        </div>
      `;
    case 1:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_2.png" class="bg-image" />
        </div>
      `;
    case 2:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_2.png" class="bg-image" />
          <img src="../../assets/icons/story_intro_3.png" class="overlay-image" />
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
