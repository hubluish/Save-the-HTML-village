document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const stageDisplay = document.querySelector(".current-stage");
  const stageMapOverlay = document.querySelector(".stage-map-overlay");
  const closeStageMapBtn = document.querySelector(".close-stage-map");
  
  let currentTab = "html";
  let currentStage = 1;
  let currentRoundData = null;
  const maxStage = 10;

  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("clearedStages");
    for (let i = 1; i <= 10; i++) {
      localStorage.removeItem(`answers-stage-${i}`);
    }
  });

  function updateStageDisplay() {
    stageDisplay.textContent = `${currentStage}/${maxStage}`;
  }

  function applyDragEvents() {
    document.querySelectorAll(".problem-button").forEach(button => {
      button.setAttribute("draggable", true);
      button.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", e.target.textContent);
      });          
    });
  }

  function switchTab(tab) {
      if (!currentRoundData) return;
    
      currentTab = tab;
    
      // 탭 스타일 갱신
      document.querySelectorAll(".code-tab-button").forEach(tabEl => {
        tabEl.classList.remove("code-tab", "code-tab-deactive");
      });
      document.getElementById("html-tab").classList.add(tab === "html" ? "code-tab" : "code-tab-deactive");
      document.getElementById("css-tab").classList.add(tab === "css" ? "code-tab" : "code-tab-deactive");
    
      // 코드 다시 렌더링
      const codeToRender = tab === "html" ? currentRoundData.defaultCode : currentRoundData.cssCode;
      renderCode(codeToRender);
  }

  function loadStageData(stageId) {
      fetch("roundData.json")
        .then(res => res.json())
        .then(data => {
          const round = data.find(r => r.id === stageId);
          if (!round) return;
    
          currentRoundData = round; // 현재 라운드 정보 저장
    
          document.querySelector(".problem-title").textContent = round.title;
          document.querySelector(".problem-text").innerHTML = round.problemText;
    
          const buttonContainer = document.querySelector(".problem-button-container");
          buttonContainer.innerHTML = "";
          round.problemButtons.forEach(text => {
            const btn = document.createElement("div");
            btn.className = "problem-button";
            btn.textContent = text;
            buttonContainer.appendChild(btn);
          });
    
          applyDragEvents();
          switchTab("html");
          
          document.querySelectorAll(".code-input-problem").forEach(zone => {
            zone.textContent = "";
            zone.className = "code-input-problem";
          });

          rebindEvents();
      });
  }

  function changeStage(delta) {
    const next = currentStage + delta;
    if (next < 1 || next > maxStage) {
      alert("스테이지가 없습니다! 🚫");
      return;
    }
    currentStage = next;
    updateStageDisplay();
    loadStageData(currentStage);
  }

  function checkAnswerCorrect() {
      const answerArray = currentRoundData.answers;
      const dropZones = document.querySelectorAll(".code-input-problem");
    
      let allCorrect = true;
    
      dropZones.forEach((zone, idx) => {
        const userInput = zone.textContent.trim();
        const correctAnswer = answerArray[idx];
    
        if (userInput !== correctAnswer) {
          allCorrect = false;
        }
      });
    
      return allCorrect;
  }      

  function renderCode(codeLines) {
      const display = document.getElementById("code-display");
      const lineNumberContainer = document.querySelector(".code-line");

      display.innerHTML = "";
      lineNumberContainer.innerHTML = "";
    
      codeLines.forEach((line, index) => {
          const htmlLine = line.replace(/\[\[(\d+)\]\]/g, (_, i) => {
              return `<span class="code-input-problem" data-index="${i}"></span>`;
          });

          // 줄 번호 추가
          const number = document.createElement("div");
          number.className = "code-line-number";
          number.textContent = index + 1;
          lineNumberContainer.appendChild(number);

          const container = document.createElement("div");
          container.classList.add("code-problem-container");
          container.innerHTML = htmlLine;
          display.appendChild(container);
      });

      bindDropEvents();
    
      // 드래그 드롭 이벤트 연결
      document.querySelectorAll(".code-input-problem").forEach(dropZone => {
        dropZone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZone.style.backgroundColor = "#A4D4AE";
        });
    
        dropZone.addEventListener("dragleave", () => {
          dropZone.style.backgroundColor = "";
        });
    
        dropZone.addEventListener("drop", (e) => {
          e.preventDefault();
          const text = e.dataTransfer.getData("text/plain");
          dropZone.textContent = text;
          dropZone.style.backgroundColor = "";
        });
      });

      // 저장된 정답 복원
      const savedAnswers = JSON.parse(localStorage.getItem(`answers-stage-${currentStage}`)) || [];
      if (savedAnswers.length > 0) {
        document.querySelectorAll(".code-input-problem").forEach((zone, idx) => {
          if (savedAnswers[idx]) {
            zone.textContent = savedAnswers[idx];
          }
        });
      }      
  }          

  // 초기 로딩
  updateStageDisplay();
  loadStageData(currentStage);

  // 좌우 화살표 클릭
  leftArrow.addEventListener("click", () => changeStage(-1));
  rightArrow.addEventListener("click", () => {
    const clearedStages = JSON.parse(localStorage.getItem("clearedStages")) || [];

    if (!clearedStages.includes(currentStage)) {
      if (!checkAnswerCorrect()) {
        alert("정답을 모두 맞혀야 다음 스테이지로 넘어갈 수 있어요! 🛑");
        return;
      }
    }
    changeStage(1);    
  });

  // 스테이지 맵 오픈 & 닫기
  stageDisplay.addEventListener("click", () => {
      fetch("levelStage.html")
        .then(res => res.text())
        .then(html => {
          // DOM 파싱용 가상 요소 만들기
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
    
          // stage-map-overlay 부분만 가져오기
          const stageMap = doc.querySelector(".stage-map-overlay");
          const container = document.getElementById("stage-map-container");
    
          container.innerHTML = ""; // 기존 모달 제거
          container.appendChild(stageMap);
    
          // 닫기 버튼 작동하게 설정
          const closeBtn = stageMap.querySelector(".stage-close-button");
          closeBtn.addEventListener("click", () => {
              container.innerHTML = "";
          });
    
          // 레벨맵 스크립트 동적 로딩
          const script = document.createElement("script");
          script.src = "levelStage.js";
          container.appendChild(script);
        });
  });      

  closeStageMapBtn.addEventListener("click", () => {
      stageMapOverlay.classList.add("hidden");
  });

  stageMapOverlay.addEventListener("click", (e) => {
      if (e.target === stageMapOverlay) {
          stageMapOverlay.classList.add("hidden");
      }
  });

  document.getElementById("html-tab").addEventListener("click", () => switchTab("html"));
  document.getElementById("css-tab").addEventListener("click", () => switchTab("css"));

  function bindDropEvents() {
    document.querySelectorAll(".code-input-problem").forEach(dropZone => {
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = "#A4D4AE";
      });
  
      dropZone.addEventListener("dragleave", () => {
        dropZone.style.backgroundColor = "";
      });
  
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData("text/plain");
        dropZone.textContent = text;
        dropZone.style.backgroundColor = "";
      });
    });
  }

  function rebindEvents() {
    // ✅ 기존 이벤트 제거
    const htmlTab = document.getElementById("html-tab");
    const cssTab = document.getElementById("css-tab");
    const clearButton = document.querySelector(".code-clear-button");

    const newHtmlTab = htmlTab.cloneNode(true);
    const newCssTab = cssTab.cloneNode(true);
    const newClearButton = clearButton.cloneNode(true);

    htmlTab.parentNode.replaceChild(newHtmlTab, htmlTab);
    cssTab.parentNode.replaceChild(newCssTab, cssTab);
    clearButton.parentNode.replaceChild(newClearButton, clearButton);

    // ✅ 새로운 이벤트 등록
    newHtmlTab.addEventListener("click", () => switchTab("html"));
    newCssTab.addEventListener("click", () => switchTab("css"));
    newClearButton.addEventListener("click", () => {
      const answerArray = currentRoundData.answers;
      const dropZones = document.querySelectorAll(".code-input-problem");
  
      let allCorrect = true;

      const userAnswers = [];
      dropZones.forEach(zone => {
        userAnswers.push(zone.textContent.trim());
      });
      localStorage.setItem(`answers-stage-${currentStage}`, JSON.stringify(userAnswers));
  
      dropZones.forEach((zone, idx) => {
        const userInput = zone.textContent.trim();
        const correctAnswer = answerArray[idx];
  
        zone.classList.remove("code-problem-wrong", "code-problem-correct");
  
        if (userInput === correctAnswer) {
          zone.classList.add("code-problem-correct");
        } else {
          zone.classList.add("code-problem-wrong");
          allCorrect = false;
        }
      });
  
      if (!allCorrect) {
        const lives = document.querySelectorAll(".life");
        if (lives.length > 0) lives[lives.length - 1].remove();
        if (lives.length - 1 === 0) {
          setTimeout(() => {
            window.location.href = "gameover.html";
          }, 500);
        }
        return;
      }

      const savedAnswersKey = `answers-stage-${currentStage}`;
      const answersToSave = Array.from(dropZones).map(zone => zone.textContent.trim());
      localStorage.setItem(savedAnswersKey, JSON.stringify(answersToSave));

      // 현재 스테이지 클리어 시 배경 이미지 변경
      const clearedLevel = document.querySelector(`.lvl-${currentStage} .level-background`);
      if (clearedLevel) {
        clearedLevel.src = "../../assets/icons/level-clear-bg.png";
      }

      markStageAsCleared(currentStage);
        
      setTimeout(() => {
        changeStage(1);
      }, 800);
    });
  }

  function markStageAsCleared(stage) {
    let clearedStages = JSON.parse(localStorage.getItem("clearedStages")) || [];
    if (!clearedStages.includes(stage)) {
      clearedStages.push(stage);
      localStorage.setItem("clearedStages", JSON.stringify(clearedStages));
    }
  }
  
  // 드롭 기능 (고정 영역 대상)
  document.querySelectorAll(".code-input-problem").forEach(dropZone => {
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault(); // drop 허용
        dropZone.style.backgroundColor = "#A4D4AE";
      });
    
      dropZone.addEventListener("dragleave", () => {
        dropZone.style.backgroundColor = "";
      });
    
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        dropZone.textContent = data;
        dropZone.style.backgroundColor = "";
      });
  });      
});