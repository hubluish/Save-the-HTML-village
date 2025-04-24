// 페이지가 새로고침될 때 정답 및 진행 정보 초기화
if (performance.getEntriesByType("navigation")[0].type === "reload") {
  localStorage.removeItem("clearedStages");
  for (let i = 1; i <= 10; i++) {
    localStorage.removeItem(`answers-stage-${i}-html`);
    localStorage.removeItem(`answers-stage-${i}-css`);
    localStorage.removeItem(`answers-stage-${i}-js`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 주요 UI 요소 선택
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const stageDisplay = document.querySelector(".current-stage");
  const stageMapOverlay = document.querySelector(".stage-map-overlay");
  const closeStageMapBtn = document.querySelector(".close-stage-map");
  
  const urlParams = new URLSearchParams(window.location.search);
  const stageFromUrl = parseInt(urlParams.get("stage"), 10);
  let currentStage = isNaN(stageFromUrl) ? 0 : stageFromUrl;
  // let currentStage = 8;

  let currentTab = "html";
  let currentRoundData = null;
  const maxStage = 10;

  // 현재 스테이지 표시 업데이트
  function updateStageDisplay() {
    stageDisplay.textContent = `${currentStage}/${maxStage}`;
  }

  // 문제 버튼(드래그 가능) 이벤트 바인딩
  function applyDragEvents() {
    document.querySelectorAll(".problem-button").forEach(button => {
      button.setAttribute("draggable", true);
      button.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", e.target.textContent);
      });          
    });
  }

  // 현재 탭의 답변 저장
  function saveCurrentTabAnswers() {
    const zones = document.querySelectorAll(".code-input-problem");
    const saved = [];
    
    zones.forEach(zone => {
      const idx = parseInt(zone.dataset.index);
      saved[idx] = zone.textContent.trim();
    });
  
    localStorage.setItem(`answers-stage-${currentStage}-${currentTab}`, JSON.stringify(saved));
  }

  // 탭 전환 (탭 버튼 및 코드 내용 재렌더)
  function switchTab(tab) {
    // 1. 이전 탭 기준으로 저장
    const previousTab = currentTab;
    const zones = document.querySelectorAll(".code-input-problem");
    const saved = [];
  
    zones.forEach(zone => {
      const idx = parseInt(zone.dataset.index);
      saved[idx] = zone.textContent.trim();
    });
  
    const key = `answers-stage-${currentStage}-${previousTab}`;
    localStorage.setItem(key, JSON.stringify(saved));
      
    // 2. 탭 변경
    currentTab = tab;
    saveCurrentTabAnswers();

    // 3. 나머지 탭 관련 UI 로직
    const tabContainer = document.querySelector(".code-tab-container");
    tabContainer.innerHTML = "";
  
    const tabs = [];
    if (currentRoundData.defaultCode) tabs.push("html");
    if (currentRoundData.cssCode) tabs.push("css");
    if (currentRoundData.jsCode) tabs.push("js");
  
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

    requestAnimationFrame(() => {
      rebindEvents();
    });
  }  

  // 스테이지 데이터 로드
  function loadStageData(stageId) {
    // 이전 모달 제거
    const modalContainer = document.getElementById("stage-result-container");
    if (modalContainer) modalContainer.innerHTML = "";

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
          saveCurrentTabAnswers(); // 문제 시작하자마자 답 저장!
          // 문제 시작하자마자 모달 띄우기
          const container = document.getElementById("stage-result-container");
          
          // 문제 시작 시 (기존 위치에서)
          fetch(`modal/${stageId}/${stageId}.html`)
            .then(res => res.text())
            .then(html => {
              // DOMParser로 HTML 전체를 파싱!
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
          
              // body 태그 안쪽만 추출!
              container.innerHTML = doc.body.innerHTML;

              // intro만 보여주기
              const introImg = container.querySelector(".stage-intro-img");
              if (introImg) introImg.classList.add("show");

              const style = document.createElement("link");
              style.rel = "stylesheet";
              style.href = `modal/${stageId}/${stageId}.css`;
              document.head.appendChild(style);

              const script = document.createElement("script");
              script.src = `modal/${stageId}/${stageId}.js`;
              document.body.appendChild(script);
            });
      });
  }

  // 스테이지 이동 (이전/다음)
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

  // 모든 탭의 정답을 통합해 정답 여부 확인
  function checkAnswerCorrect() {
    const answerArray = currentRoundData.answers;
    const allAnswers = Array(answerArray.length).fill("");
  
    const tabTypes = ["html", "css", "js"];  // ❗ currentTab 무시! 전부 확인!
  
    tabTypes.forEach((type) => {
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

  // 코드(문제) 영역 렌더링 + 드롭 이벤트 바인딩
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

      bindDropEvents(() => {
        saveCurrentTabAnswers(); // 이 안에서 currentStage와 currentTab을 기반으로 저장되므로 문제 없어야 정상
      });

      restoreTabAnswers();  // 정답 복원

      const codeLine = document.querySelector(".code-line");
      const codeInput = document.querySelector(".code-input");

      codeInput.addEventListener("scroll", () => {
        codeLine.scrollTop = codeInput.scrollTop;
      });
  }

  // 현재 탭의 정답(입력값) 복원
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

  // 좌우 화살표 클릭 이벤트
  leftArrow.addEventListener("click", () => changeStage(-1));
  rightArrow.addEventListener("click", () => {
    const clearedStages = JSON.parse(localStorage.getItem("clearedStages")) || [];

    if (!clearedStages.includes(currentStage)) {
      
      // if (!checkAnswerCorrect()) {
      //   alert("정답을 모두 맞혀야 다음 스테이지로 넘어갈 수 있어요! 🛑");
      //   return;
      // }
    }
    changeStage(1);
  });

  // 클리어한 경로 선 색상 표시
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
    
          // 닫기 버튼 이벤트
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

  // 탭 클릭(직접 바인딩)
  // document.getElementById("html-tab").addEventListener("click", () => switchTab("html"));
  document.getElementById("css-tab").addEventListener("click", () => switchTab("css"));

  // 드롭 이벤트 바인딩
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
        const zones = document.querySelectorAll(".code-input-problem");
        const answersToSave = Array.from(zones).map(z => z.textContent.trim());
        localStorage.setItem(`answers-stage-${currentStage}-${currentTab}`, JSON.stringify(answersToSave));
      });
    });
  }

  // 탭, 클리어 버튼 등 재바인딩 (이벤트 중복 대비)
  function rebindEvents() {
    const htmlTab = document.getElementById("html-tab");
    const cssTab = document.getElementById("css-tab");
    const jsTab = document.getElementById("js-tab"); // ⭐ js 탭도 추가
    const clearButton = document.querySelector(".code-clear-button");
  
    if (!clearButton) {
      console.warn("❗클리어 버튼이 없음, rebindEvents 스킵");
      return;
    }
  
    // 🟡 탭이 없을 수도 있으니까 각각 따로 체크!
    if (htmlTab) {
      const newHtmlTab = htmlTab.cloneNode(true);
      htmlTab.parentNode.replaceChild(newHtmlTab, htmlTab);
      newHtmlTab.addEventListener("click", () => switchTab("html"));
    }
    if (cssTab) {
      const newCssTab = cssTab.cloneNode(true);
      cssTab.parentNode.replaceChild(newCssTab, cssTab);
      newCssTab.addEventListener("click", () => switchTab("css"));
    }
    if (jsTab) {
      const newJsTab = jsTab.cloneNode(true);
      jsTab.parentNode.replaceChild(newJsTab, jsTab);
      newJsTab.addEventListener("click", () => switchTab("js"));
    }
  
    const newClearButton = clearButton.cloneNode(true);
    clearButton.parentNode.replaceChild(newClearButton, clearButton);
  
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
  
      // 3. 채점 로직 (이건 네 원래 코드 그대로)
      let allCorrect = true;
      for (let i = 0; i < answerArray.length; i++) {
        if (allAnswers[i] !== answerArray[i]) {
          allCorrect = false;
          break;
        }
      }
  
      const dropZonesAfter = document.querySelectorAll(".code-input-problem");
      dropZonesAfter.forEach(zone => {
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
  
      // 4. 목숨 처리 및 스테이지 완료
      if (!allCorrect) {
        const lives = document.querySelectorAll(".life");
        if (lives.length > 0) {
          const lastLife = lives[lives.length - 1];
          lastLife.classList.add("shake");
          document.body.classList.add("shake");
  
          setTimeout(() => {
            document.body.classList.remove("shake");
            lastLife.remove();
          
            // 남은 목숨이 없으면 gameover.html로 이동
            if (document.querySelectorAll(".life").length === 0) {
              setTimeout(() => {
                window.location.href = "../Gameover/gameover.html";
              }, 500); // 애니메이션 여유시간
            }
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
  
      // 정답 모달 띄우기
      setTimeout(() => {
        const container = document.getElementById("stage-result-container");

        fetch(`modal/${currentStage}/${currentStage}.html`)
          .then(res => res.text())
          .then(html => {
            container.innerHTML = html;

            // ✅ 정답 시 intro 숨기고 result 보이기
            const introImg = container.querySelector(".stage-intro-img");
            const resultImg = container.querySelector(".stage-result-img");

            if (introImg) introImg.remove(); // 또는 classList.remove("show");
            if (resultImg) resultImg.classList.add("show");

            // 스타일도 동적으로 로드
            const style = document.createElement("link");
            style.rel = "stylesheet";
            style.href = `modal/${currentStage}/${currentStage}.css`;
            document.head.appendChild(style);
          });
      }, 800); // 애니메이션 여유시간
    
        // 7. 다음 스테이지로 이동 또는 엔딩 페이지로 이동
        setTimeout(() => {
          if (currentStage === maxStage) {
            window.location.href = "../endStory/endStory.html"; // 엔딩 페이지로 이동
          } else {
            window.location.href = `../explanation/${currentStage + 1}/explanation${currentStage + 1}.html`; // 설명 페이지로 이동
          }
        }, 4000); // 애니메이션 여유시간 - 임의로 보려고 설정해둠요
    });
  }  

  // 스테이지 완료시 클리어 표시 및 경로 업데이트
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
});