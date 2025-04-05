document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    const maxStep = 10;
    const minStep = 1;
  
    const stepText = document.querySelector('.step-text');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
  
    leftButton.addEventListener('click', function() {
      if (currentStep > minStep) {
        currentStep--;
        updateStepText();
      }
    });
  
    rightButton.addEventListener('click', function() {
      if (currentStep < maxStep) {
        currentStep++;
        updateStepText();
      }
    });
  
    function updateStepText() {
      stepText.textContent = currentStep + '/10';
    }
  });
  