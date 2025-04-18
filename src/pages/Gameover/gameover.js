const navButton = document.getElementById('replayButton');
const replayImg = document.getElementById('replayBtn');
const navButton2 = document.getElementById('exitButton');
const exitImg = document.getElementById('exitBtn');

navButton.addEventListener('mouseenter', () => {
  replayImg.src = '../../assets/icons/start/b_replay_hover.svg';
  localStorage.setItem('replayImg', replayImg.src); 
});

navButton.addEventListener('mouseleave', () => {
  replayImg.src = '../../assets/icons/start/b_replay.svg';
  localStorage.setItem('replayImg', replayImg.src);
});

navButton2.addEventListener('mouseenter', () => {
  exitImg.src = '../../assets/icons/start/b_on_off_hover.png';
  localStorage.setItem('exitImg', exitImg.src); 
});

navButton2.addEventListener('mouseleave', () => {
  exitImg.src = '../../assets/icons/start/b_on_off.png';
  localStorage.setItem('exitImg', exitImg.src);
});


// 캔버스 및 2D context 초기화
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 비를 내릴 드롭 객체 생성
function Drop() {
  this.x = Math.random() * canvas.width; // 랜덤한 X 좌표
  this.y = Math.random() * canvas.height; // 랜덤한 Y 좌표
  this.length = Math.random() * 15 + 10; // 드롭 길이
  this.speed = Math.random() * 5 + 2; // 드롭 속도

  // 드롭 움직임
  this.update = function() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -this.length; // 화면 끝에 닿으면 다시 위로
      this.x = Math.random() * canvas.width;
    }
  };

  // 드롭 그리기
  this.draw = function() {
    ctx.strokeStyle = 'rgb(222, 237, 255)'; // 비의 색
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  };
}

// 드롭 배열 생성
let drops = [];
for (let i = 0; i < 100; i++) {
  drops.push(new Drop());
}

// 애니메이션 루프
function animateRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 지우기
  for (let i = 0; i < drops.length; i++) {
    drops[i].update();
    drops[i].draw();
  }
  requestAnimationFrame(animateRain); // 애니메이션 반복
}

// 애니메이션 시작
animateRain();
