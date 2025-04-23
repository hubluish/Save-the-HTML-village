// 5.js
document.addEventListener("DOMContentLoaded", () => {
    const playBirdBtn = document.getElementById("playBirdBtn");
    const clearAudio   = document.getElementById("clearAudio");
  
    playBirdBtn.addEventListener("click", () => {
      // 재생 시 항상 처음으로 되돌리기
      clearAudio.currentTime = 0;
      clearAudio.play()
        .then(() => {
          console.log("🔊 사운드 재생 성공");
        })
        .catch(err => {
          console.warn("❌ 사운드 재생 실패:", err);
        });
    });
  });
  