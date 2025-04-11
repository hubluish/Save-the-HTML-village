document.addEventListener("DOMContentLoaded", function () {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const stageDisplay = document.querySelector(".current-stage");
    const stageMapOverlay = document.querySelector(".stage-map-overlay");
    const closeStageMapBtn = document.querySelector(".close-stage-map");

    // 스테이지 클릭 → 모달 열기
    stageDisplay.addEventListener("click", function () {
        stageMapOverlay.classList.remove("hidden");
    });

    // 닫기 버튼 클릭 → 모달 닫기
    closeStageMapBtn.addEventListener("click", function () {
        stageMapOverlay.classList.add("hidden");
    });

    // 오버레이 클릭 시 모달 닫기
    stageMapOverlay.addEventListener("click", function (e) {
        if (e.target === stageMapOverlay) {
            stageMapOverlay.classList.add("hidden");
        }
    });

    let currentStage = 1; // 초기 스테이지
    const maxStage = 10; // 최대 스테이지

    function updateStage() {
        stageDisplay.textContent = `${currentStage}/${maxStage}`;
    }

    leftArrow.addEventListener("click", function () {
        if (currentStage > 1) {
            currentStage--;
            updateStage();
        } else {
            alert("이전 스테이지가 없습니다! 🚫");
        }
    });

    rightArrow.addEventListener("click", function () {
        if (currentStage < maxStage) {
            currentStage++;
            updateStage();
        } else {
            alert("이후 스테이지가 없습니다! 🚫");
        }
    });

    // 초기화
    updateStage();
});