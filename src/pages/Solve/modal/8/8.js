
window.addEventListener('DOMContentLoaded', () => {
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const checkBtn = document.querySelector('.check-button');
    const nextStageBtn = document.querySelector('.next-stage-button');
  
    // 5초 뒤 두 번째 화면 보여주기
    setTimeout(() => {
        screen1.classList.add('hidden');
        screen2.classList.remove('hidden');
    }, 5000);
  
    // Click! 버튼 클릭 시 세 번째 화면으로 이동
    checkBtn.addEventListener('click', () => {
        screen2.classList.add('hidden');
        screen3.classList.remove('hidden');
    });
  
    document.querySelector(".next-stage-button").addEventListener("click", () => {
        window.location.href = "../9/9.html"; // 다음 스테이지로 이동
    });
  });
  