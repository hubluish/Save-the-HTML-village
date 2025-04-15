// 자주 쓰일 요소들 전역 변수에 담아둠
const elements = {
  widthInput: document.getElementById('widthInput'),
  heightInput: document.getElementById('heightInput'),
  resetBtn: document.getElementById('resetBtn'),
  calcBtn: document.getElementById('calcBtn'),
  modeBtn: document.getElementById('modeBtn'),
  unit1: document.getElementById('unit1'),
  unit2: document.getElementById('unit2'),
  openModalBtn: document.getElementById('openModalBtn'),
  modal: document.getElementById('modal')
};

// 모드
let mode = localStorage.getItem('mode') || 'cm-to-px';

// 단위 라벨 업데이트
function updateLabels() {
  const unit = mode === 'cm-to-px' ? 'cm' : 'px';
  elements.unit1.textContent = unit;
  elements.unit2.textContent = unit;
}

// 단위결정(모드에 따라)
function getConvertedUnit() {
  return mode === 'cm-to-px' ? 'px' : 'cm';
}

// 계산
function convert(value) {
  return mode === 'cm-to-px'
    ? Math.round(value * 37.795)
    : Math.round(value * 0.026458); // 정수로 변환
}

// 로컬스토리지
function saveInputs() {
  localStorage.setItem('width', elements.widthInput.value);
  localStorage.setItem('height', elements.heightInput.value);
}

function clearInputs() {
  elements.widthInput.value = '';
  elements.heightInput.value = '';
  localStorage.removeItem('width');
  localStorage.removeItem('height');
}

function loadInputs() {
  elements.widthInput.value = localStorage.getItem('width') || '';
  elements.heightInput.value = localStorage.getItem('height') || '';
}

// 모달 토글
function toggleModal(show) {
  elements.modal.style.display = show ? 'flex' : 'none';
}

// 계산 처리
function handleCalc() {
  const widthVal = parseFloat(elements.widthInput.value);
  const heightVal = parseFloat(elements.heightInput.value);

  if (!isNaN(widthVal)) elements.widthInput.value = convert(widthVal);
  if (!isNaN(heightVal)) elements.heightInput.value = convert(heightVal);

  const newUnit = getConvertedUnit();
  elements.unit1.textContent = newUnit;
  elements.unit2.textContent = newUnit;

  saveInputs();
}

// 초기화 처리
function handleReset() {
  clearInputs();
  updateLabels();
}

// 모드 토글 처리
function handleModeToggle() {
  mode = mode === 'cm-to-px' ? 'px-to-cm' : 'cm-to-px';
  localStorage.setItem('mode', mode);
  updateLabels();
}

// 초기 설정
function init() {
  updateLabels();
  loadInputs();

  elements.calcBtn.addEventListener('click', handleCalc);
  elements.resetBtn.addEventListener('click', handleReset);
  elements.modeBtn.addEventListener('click', handleModeToggle);

  elements.openModalBtn.addEventListener('click', () => toggleModal(true));
  elements.modal.addEventListener('click', (e) => {
    if (e.target === elements.modal) toggleModal(false);
  });
}

init();
