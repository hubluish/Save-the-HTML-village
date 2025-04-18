document.addEventListener('DOMContentLoaded', function () {
  const totalSteps = 9;
  let currentStep = 0; // 이건 위에서 이미 있음

  function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
    progressFill.style.width = `${progressPercentage}%`;
  }


  function updateSteps() {
    // 중간 섹션 업데이트
    const middleSection = document.getElementById('middle-section');
    middleSection.innerHTML = getMiddleContent(currentStep);
  
    // 하단 텍스트 업데이트
    const bottomSectionText = document.getElementById('bottom-text');
    bottomSectionText.innerHTML = getBottomText(currentStep);
  
    // 프로그래스 바 업데이트 ✨
    updateProgressBar();
  }

  // next-btn 클릭 시 clear.html로 이동
  document.querySelector('.next-btn').addEventListener('click', function () {
    if (currentStep === totalSteps - 1) {
      document.getElementById('modal-iframe').style.display = 'block';
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
          <img src="../../assets/icons/story_intro_4.png" class="bg-image" />
          <img src="../../assets/icons/story_intro_4-2.png" class="centered-img" />
        </div>
      `;
    case 4:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_4.png" class="bg-image" />
          <img src="../../assets/icons/story_intro_5.png" class="centered-img" />
        </div>
      `;
    case 5:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_4.png" class="bg-image" />
          <img src="../../assets/icons/story_intro_6.png" class="centered-img" />
        </div>
      `;
    case 6:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_7.png" class="bg-image" />
          <img src="../../assets/icons/story_intro_7_2.png" class="overlay-image" />
        </div>
      `;
    case 7:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_7.png" class="bg-image" />
          <img src="../../assets/icons/story_intro_8.png" class="overlay-image" />
        </div>
      `;
    case 8:
      return `
        <div class="image-container">
          <img src="../../assets/icons/story_intro_7.png" class="bg-image" />
          <img src="../../assets/icons/story_intro_9.png" class="overlay-image" />
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

window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  }, 5000); // ⏳ 2.5초 후에 로딩화면 제거
});

window.addEventListener("DOMContentLoaded", () => {
  const message = "전체 화면으로 바꿔달라뭉!";
  const typingTarget = document.getElementById("typing-text");
  let index = 0;

  function typeOneLetter() {
    if (index < message.length) {
      typingTarget.textContent += message.charAt(index);
      index++;
      setTimeout(typeOneLetter, 170); // 글자 출력 간격
    }
  }

  if (typingTarget) {
    typingTarget.textContent = ""; // 초기화
    typeOneLetter();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const mung1 = document.getElementById("bouncing-mung1");
  const mung2 = document.getElementById("bouncing-mung2");

  let x1 = 100, y1 = 100, dx1 = 6, dy1 = 6;
  let x2 = 1300, y2 = 600, dx2 = -4, dy2 = 5;

  function moveMungs() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const mung1Width = mung1.offsetWidth;
    const mung1Height = mung1.offsetHeight;

    const mung2Width = mung2.offsetWidth;
    const mung2Height = mung2.offsetHeight;

    // mung1 위치 갱신
    x1 += dx1;
    y1 += dy1;

    if (x1 + mung1Width >= screenWidth || x1 <= 0) dx1 *= -1;
    if (y1 + mung1Height >= screenHeight || y1 <= 0) dy1 *= -1;

    mung1.style.left = x1 + "px";
    mung1.style.top = y1 + "px";

    // mung2 위치 갱신
    x2 += dx2;
    y2 += dy2;

    if (x2 + mung2Width >= screenWidth || x2 <= 0) dx2 *= -1;
    if (y2 + mung2Height >= screenHeight || y2 <= 0) dy2 *= -1;

    mung2.style.left = x2 + "px";
    mung2.style.top = y2 + "px";

    requestAnimationFrame(moveMungs);
  }

  if (mung1 && mung2) {
    mung1.style.position = "absolute";
    mung2.style.position = "absolute";
    moveMungs();
  }
});