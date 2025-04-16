if (performance.getEntriesByType("navigation")[0].type === "reload") {
  localStorage.removeItem("clearedStages");
  for (let i = 1; i <= 10; i++) {
    localStorage.removeItem(`answers-stage-${i}-html`);
    localStorage.removeItem(`answers-stage-${i}-css`);
    localStorage.removeItem(`answers-stage-${i}-js`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const stageDisplay = document.querySelector(".current-stage");
  const stageMapOverlay = document.querySelector(".stage-map-overlay");
  const closeStageMapBtn = document.querySelector(".close-stage-map");
  
  let currentTab = "html";
  let currentStage = 0;
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

  function saveCurrentTabAnswers() {
    const zones = document.querySelectorAll(".code-input-problem");
    const saved = [];
  
    zones.forEach(zone => {
      const idx = parseInt(zone.dataset.index);
      saved[idx] = zone.textContent.trim();
    });
  
    localStorage.setItem(`answers-stage-${currentStage}-${currentTab}`, JSON.stringify(saved));
  }

  function switchTab(tab) {
    if (!currentRoundData) return;
    
    saveCurrentTabAnswers();

    currentTab = tab;
  
    const tabContainer = document.querySelector(".code-tab-container");
    tabContainer.innerHTML = ""; // 기존 탭 초기화
  
    const tabs = [];
  
    if (currentRoundData.defaultCode) {
      tabs.push("html");
    }
    if (currentRoundData.cssCode) {
      tabs.push("css");
    }
    if (currentRoundData.jsCode) {
      tabs.push("js");
    }
  
    tabs.forEach(type => {
      const tabEl = document.createElement("div");
      tabEl.id = `${type}-tab`;
      tabEl.className = type === tab ? "code-tab" : "code-tab-deactive";
  
      const textEl = document.createElement("div");
      textEl.className = "code-tab-text";
      textEl.textContent = type.toUpperCase();
  
      tabEl.appendChild(textEl);
      tabEl.addEventListener("click", () => switchTab(type));
  
      tabContainer.appendChild(tabEl);
    });
  
    let codeToRender = [];
    if (tab === "html") codeToRender = currentRoundData.defaultCode;
    if (tab === "css") codeToRender = currentRoundData.cssCode;
    if (tab === "js") codeToRender = currentRoundData.jsCode;
  
    renderCode(codeToRender);
    restoreTabAnswers();
  }  

  function loadStageData(stageId) {
      fetch("roundData.json")
        .then(res => res.json())
        .then(data => {
          const round = data.find(r => r.id === stageId);
          if (!round) return;
    
          currentRoundData = round; // 현재 라운드 정보 저장
          
          document.querySelector(".problem-title").textContent = round.title;
          document.querySelector(".problem-text").innerHTML = Array.isArray(round.problemText)
            ? round.problemText.join("<br>")
            : round.problemText;
                
          const buttonContainer = document.querySelector(".problem-button-container");
          buttonContainer.innerHTML = "";
          round.problemButtons.forEach(text => {
            const btn = document.createElement("div");
            btn.className = "problem-button";
            btn.textContent = text;
            buttonContainer.appendChild(btn);
          });
    
          applyDragEvents();

          // 처음에 보여줄 탭 결정
          if (round.defaultCode) {
            switchTab("html");
          } else if (round.cssCode) {
            switchTab("css");
          } else if (round.jsCode) {
            switchTab("js");
          }
          
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
    const allAnswers = Array(answerArray.length).fill("");
  
    const tabs = [
      { type: "html", code: currentRoundData.defaultCode },
      { type: "css", code: currentRoundData.cssCode },
      { type: "js", code: currentRoundData.jsCode },
    ];
  
    tabs.forEach(({ type, code }) => {
      if (!code) return;
  
      // 이 탭에 [[n]] 형태의 문제가 하나라도 있는지 확인
      const hasSlots = code.some(line => /\[\[\d+\]\]/.test(line));
      if (!hasSlots) return;
  
      const saved = JSON.parse(localStorage.getItem(`answers-stage-${currentStage}-${type}`));
      if (saved && Array.isArray(saved)) {
        saved.forEach((value, idx) => {
          if (value && !allAnswers[idx]) {
            allAnswers[idx] = value;
          }
        });
      }
    });
  
    return allAnswers.every((val, idx) => val === answerArray[idx]);
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

      // 슬롯 초기화 + 정확한 인덱스 기준으로 초기화
      const zones = document.querySelectorAll(".code-input-problem");
      zones.forEach(zone => {
        zone.textContent = "";
        zone.classList.remove("code-problem-correct", "code-problem-wrong");
      });

      // 2. 정답 복원
      restoreTabAnswers();
  }

  function restoreTabAnswers() {
    const saved = JSON.parse(localStorage.getItem(`answers-stage-${currentStage}-${currentTab}`)) || [];
    const zones = document.querySelectorAll(".code-input-problem");
  
    zones.forEach(zone => {
      const idx = parseInt(zone.dataset.index);
      if (saved[idx] !== undefined) {
        zone.textContent = saved[idx];
      }
    });
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

  function updateClearedPaths() {
    const clearedStages = JSON.parse(localStorage.getItem("clearedStages")) || [];
  
    clearedStages.forEach(stage => {
      const path = document.getElementById(`path-${stage}-${stage + 1}`);
      if (path) {
        path.setAttribute("stroke", "#F5D611");
      }
    });
  }

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

          updateClearedPaths();
    
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

        // 드래그해서 놓을 때마다 저장
        const answersToSave = Array.from(allZones).map(z => z.textContent.trim());
        localStorage.setItem(`answers-stage-${currentStage}`, JSON.stringify(answersToSave));
      });
    });
  }

  function rebindEvents() {
    const htmlTab = document.getElementById("html-tab");
    const cssTab = document.getElementById("css-tab");
    const clearButton = document.querySelector(".code-clear-button");
  
    const newHtmlTab = htmlTab.cloneNode(true);
    const newCssTab = cssTab.cloneNode(true);
    const newClearButton = clearButton.cloneNode(true);
  
    htmlTab.parentNode.replaceChild(newHtmlTab, htmlTab);
    cssTab.parentNode.replaceChild(newCssTab, cssTab);
    clearButton.parentNode.replaceChild(newClearButton, clearButton);
  
    newHtmlTab.addEventListener("click", () => switchTab("html"));
    newCssTab.addEventListener("click", () => switchTab("css"));
  
    newClearButton.addEventListener("click", () => {
      const answerArray = currentRoundData.answers;
      const dropZones = document.querySelectorAll(".code-input-problem");
  
      // 1. 현재 탭 정답 저장
      const userAnswers = [];
      dropZones.forEach(zone => {
        const idx = parseInt(zone.dataset.index);
        userAnswers[idx] = zone.textContent.trim();
      });
      localStorage.setItem(`answers-stage-${currentStage}-${currentTab}`, JSON.stringify(userAnswers));
  
      // 2. 전체 탭에서 정답 병합
      const allAnswers = Array(answerArray.length).fill("");
      ["html", "css", "js"].forEach(tab => {
        const saved = JSON.parse(localStorage.getItem(`answers-stage-${currentStage}-${tab}`));
        if (saved && Array.isArray(saved)) {
          saved.forEach((value, idx) => {
            if (value && !allAnswers[idx]) {
              allAnswers[idx] = value;
            }
          });
        }
      });
  
      // 3. 전체 정답 비교
      let allCorrect = true;
      for (let i = 0; i < answerArray.length; i++) {
        if (allAnswers[i] !== answerArray[i]) {
          allCorrect = false;
          break;
        }
      }
  
      // 4. 현재 탭만 정답 표시
      dropZones.forEach(zone => {
        const idx = parseInt(zone.dataset.index);
        const userInput = zone.textContent.trim();
        const correctAnswer = answerArray[idx];
  
        zone.classList.remove("code-problem-wrong", "code-problem-correct");
  
        if (userInput === correctAnswer) {
          zone.classList.add("code-problem-correct");
        } else {
          zone.classList.add("code-problem-wrong");
        }
      });
  
      // 5. 정답 여부에 따라 결과 처리
      if (!allCorrect) {
        const lives = document.querySelectorAll(".life");
        if (lives.length > 0) {
          const lastLife = lives[lives.length - 1];
          lastLife.classList.add("shake");
          document.body.classList.add("shake");
  
          setTimeout(() => {
            document.body.classList.remove("shake");
            lastLife.remove();
          }, 300);
        }
        return;
      }
  
      // 6. 정답이면 스테이지 완료 처리
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

    // 선 색상 변경 로직 추가
    const pathToNext = document.getElementById(`path-${stage}-${stage + 1}`);
    if (pathToNext) {
      pathToNext.setAttribute("stroke", "#F5D611");
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

        saveCurrentTabAnswers();
      });
  });      
});