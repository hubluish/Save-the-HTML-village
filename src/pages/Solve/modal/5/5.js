// 5.js
(function bindBirdSound() {
  // 요소들 가져오기
  const playBirdBtn = document.getElementById("playBirdBtn");
  const clearAudio = document.getElementById("clearAudio");

  // 요소가 있을 경우에만 이벤트 바인딩
  if (playBirdBtn && clearAudio) {
    playBirdBtn.addEventListener("click", () => {
      clearAudio.currentTime = 0; // 항상 처음부터 재생
      clearAudio.play()
        .then(() => {
          console.log("🔊 새소리 재생 성공!");
        })
        .catch(err => {
          console.warn("❌ 새소리 재생 실패:", err);
        });
    });
  } else {
    // 요소가 없으면 (다른 문제에서는) 무시
    console.log("🟡 playBirdBtn 또는 clearAudio 요소 없음");
  }
})();