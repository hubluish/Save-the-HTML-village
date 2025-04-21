if (!window.location.href.includes("solve")) {
  console.warn("페이지가 solve가 아니지만 계속 진행합니다.");
} else {
  
function initStage8Modal() {
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
  
    if (!screen1 || !screen2) {
      setTimeout(initStage8Modal, 200); // 다시 시도
      return;
    }
  
    // 디버깅 로그
    console.log("✅ Stage 8 시작됨");

    // 5초 뒤 전환
    setTimeout(() => {
      console.log("⏱ 5초 후 screen2로 전환");
      screen1.classList.add('hidden');
      screen2.classList.remove('hidden');
    }, 5000);
}
  
initStage8Modal();  
}