document.addEventListener("DOMContentLoaded", () => {
    const resultImg = document.querySelector(".stage-result-img");
  
    if (!resultImg) return;
  
    const observer = new MutationObserver(() => {
      if (resultImg.classList.contains("show")) {
        console.log("🎯 show 감지됨 → 효과음 재생");
  
        // 효과음처럼 단 한 번만 재생
        const sound = new Audio("../../assets/sounds/3-clear-sound.mp3");
        sound.play().then(() => {
          console.log("✅ 사운드 재생 성공");
  
          // 5초 후 다음 페이지 이동
          setTimeout(() => {
            const nextURL = window.location.pathname.replace(
              /\/(\d+)\//,
              (_, stageNum) => `/${parseInt(stageNum) + 1}/`
            );
            window.location.href = nextURL;
          }, 5000);
        }).catch(err => {
          console.warn("❌ 사운드 재생 실패", err);
  
          // 그래도 넘어가기
          setTimeout(() => {
            const nextURL = window.location.pathname.replace(
              /\/(\d+)\//,
              (_, stageNum) => `/${parseInt(stageNum) + 1}/`
            );
            window.location.href = nextURL;
          }, 5000);
        });
  
        observer.disconnect();
      }
    });
  
    observer.observe(resultImg, { attributes: true });
  });
  