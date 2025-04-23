(function () {
  
    const container = document.getElementById("level-container");
    if (!container) {
      console.error("⚠️ level-container를 찾을 수 없음");
      return;
    }
  
    const clearedStages = JSON.parse(localStorage.getItem("clearedStages")) || [];
  
    for (let i = 1; i <= 10; i++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("level-wrapper", `lvl-${i}`);
  
      const img = document.createElement("img");
      img.src = clearedStages.includes(i)
        ? "../../assets/icons/level-clear-bg.png"
        : "../../assets/icons/level-bg.png";
      img.alt = `level-${i}`;
      img.classList.add("level-background");
  
      const number = document.createElement("span");
      number.textContent = i;
      number.classList.add("level-number");
  
      wrapper.appendChild(img);
      wrapper.appendChild(number);
      container.appendChild(wrapper);
    }
})();