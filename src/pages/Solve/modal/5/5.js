const bgm = document.getElementById("bgm");

  // 시작하자마자 음소거
  bgm.muted = true;

  // 5초 뒤에 소리 켜기
  setTimeout(() => {
    bgm.muted = false;
    console.log("🔊 소리 켜짐!");
  }, 5000); // 5000ms = 5초