//자주 쓰일 요소들 전역 변수에 담아둠
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const resetBtn = document.getElementById('resetBtn');
const calcBtn = document.getElementById('calcBtn');
const modeBtn = document.getElementById('modeBtn');
const unit1 = document.getElementById('unit1');
const unit2 = document.getElementById('unit2');

//모드 
let mode = localStorage.getItem('mode') || 'cm-to-px';

// 단위 라벨 업데이트 
function updateLabels() {
  const unit = mode === 'cm-to-px' ? 'cm' : 'px';
  unit1.textContent = unit;
  unit2.textContent = unit;
}

//단위결정(모드에 따라)
function getConvertedUnit() {
  return mode === 'cm-to-px' ? 'px' : 'cm';
}

//calculate
function convert(value) {
  return mode === 'cm-to-px'
  ? Math.round(value * 37.795)
  : Math.round(value * 0.026458); //정수로 변환
}

//로컬스토리지
//save
function saveInputs() {
  localStorage.setItem('width', widthInput.value);
  localStorage.setItem('height', heightInput.value);
}
//clear
function clearInputs() {
  widthInput.value = '';
  heightInput.value = '';
  localStorage.removeItem('width');
  localStorage.removeItem('height');
}
//load
function loadInputs() {
  widthInput.value = localStorage.getItem('width') || '';
  heightInput.value = localStorage.getItem('height') || '';
}
//modal
function toggleModal(show) {
  modal.style.display = show ? 'flex' : 'none';
}

function handleCalc() {
  const widthVal = parseFloat(widthInput.value);
  const heightVal = parseFloat(heightInput.value);

  if (!isNaN(widthVal)) widthInput.value = convert(widthVal);// px to cm or cm to px
  if (!isNaN(heightVal)) heightInput.value = convert(heightVal);

  const newUnit = getConvertedUnit(); //단위 
  unit1.textContent = newUnit;
  unit2.textContent = newUnit;

  saveInputs(); //로컬스토리지에 저장
}

function handleReset() {
  clearInputs();
  updateLabels();
}

function handleModeToggle() {
  mode = mode === 'cm-to-px' ? 'px-to-cm' : 'cm-to-px';
  localStorage.setItem('mode', mode);
  updateLabels();
}

function init() {
  updateLabels();
  loadInputs();

  calcBtn.addEventListener('click', handleCalc);
  resetBtn.addEventListener('click', handleReset);
  modeBtn.addEventListener('click', handleModeToggle);

  openModalBtn.addEventListener('click', () => toggleModal(true));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal(false);
  });
}

init();