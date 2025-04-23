const modal = document.getElementById('calculatorModal');
    const openBtn = document.getElementById('openCalculator');

    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    // 바깥 클릭하면 닫기
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });