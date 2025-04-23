document.addEventListener('DOMContentLoaded', function () {
  const totalSteps = 1;
  const stepper = document.querySelector('.stepper');
  const firstTemplate = document.getElementById('main-section-first');
  const secondTemplate = document.getElementById('main-section-second');

  const titleElFirst = firstTemplate.querySelector('.title');
  const descElFirst = firstTemplate.querySelector('.description');
  const imgEl = firstTemplate.querySelector('img');

  const codeEl = document.querySelector('.code');
  const resultEl = document.querySelector('.code-result');
  const titleElSecond = secondTemplate.querySelector('.title');
  const descElSecond = secondTemplate.querySelector('.description');

  let currentStep = 0;
  let stepData = [];

  // ⭐ 문제로 넘어갈 경로
  const nextProblemPath = '../../Solve/solve.html?stage=2';

  fetch('./explanation2.json')
    .then(response => response.json())
    .then(data => {
      stepData = data;

      // 스텝 표시 생성
      for (let i = 0; i < totalSteps; i++) {
        const step = document.createElement('div');
        step.classList.add('step');
        if (i === currentStep) step.classList.add('active');
        step.addEventListener('click', function () {
          currentStep = i;
          updateSteps();
        });
        stepper.appendChild(step);
      }

      // 스텝 UI 및 내용 업데이트
      function updateSteps() {
        const data = stepData[currentStep];
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
          step.classList.toggle('active', index === currentStep);
        });

        if (data.type === 'first') {
          firstTemplate.style.display = 'flex';
          secondTemplate.style.display = 'none';
          titleElFirst.innerHTML = data.title;
          descElFirst.innerHTML = data.description.replace(/\n/g, '<br>');

          if (data.imgVisible) {
            imgEl.style.display = 'block';
            imgEl.style.width = data.imgSize.width + 'px';
            imgEl.style.height = data.imgSize.height + 'px';
          } else {
            imgEl.style.display = 'none';
          }
        } else {
          firstTemplate.style.display = 'none';
          secondTemplate.style.display = 'flex';
          codeEl.innerText = data.code;
          resultEl.innerHTML = data.result;
          titleElSecond.innerHTML = data.title;
          descElSecond.innerHTML = data.description.replace(/\n/g, '<br>');
        }
      }

      document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (currentStep < totalSteps - 1) {
            currentStep++;
            updateSteps();
          } else {
            window.location.href = nextProblemPath;
          }
        });
      });

      document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (currentStep > 0) {
            currentStep--;
            updateSteps();
          }
        });
      });

      updateSteps();
    })
    .catch(error => console.error('❌ JSON 로드 실패:', error));
});
