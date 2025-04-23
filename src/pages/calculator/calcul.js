// 주요 DOM 요소들을 변수에 할당
const elements = {
  widthInput: document.getElementById('widthInput'),
  heightInput: document.getElementById('heightInput'),
  resetBtn: document.getElementById('resetBtn'),
  calcBtn: document.getElementById('calcBtn'),
  modeBtn: document.getElementById('modeBtn'),
  unit1: document.getElementById('unit1'),
  unit2: document.getElementById('unit2'),
  modal: document.getElementById('modal')
};

// 모드 초기화: 로컬스토리지에서 불러오거나 기본값 설정
let mode = localStorage.getItem('mode') || 'cm-to-px';

// 단위 텍스트 업데이트 함수
function updateLabels() {
  const unit = mode === 'cm-to-px' ? 'cm' : 'px';
  elements.unit1.textContent = unit;
  elements.unit2.textContent = unit;
}

// 현재 모드에 따라 변환 후 표시할 단위 반환
function getConvertedUnit() {
  return mode === 'cm-to-px' ? 'px' : 'cm';
}

// cm ↔ px 변환 함수
function convert(value) {
  return mode === 'cm-to-px'
    ? Math.round(value * 37.795)      // cm -> px
    : Math.round(value * 0.026458);   // px -> cm
}

// 입력값을 로컬스토리지에 저장
function saveInputs() {
  localStorage.setItem('width', elements.widthInput.value);
  localStorage.setItem('height', elements.heightInput.value);
}

// 입력값과 로컬스토리지 초기화
function clearInputs() {
  elements.widthInput.value = '';
  elements.heightInput.value = '';
  localStorage.removeItem('width');
  localStorage.removeItem('height');
}

// 페이지 로드시 로컬스토리지 값 불러오기
function loadInputs() {
  elements.widthInput.value = localStorage.getItem('width') || '';
  elements.heightInput.value = localStorage.getItem('height') || '';
}

// 계산 버튼 클릭 시 실행
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

// 모드 전환 버튼 클릭 시 실행
function handleModeToggle() {
  mode = mode === 'cm-to-px' ? 'px-to-cm' : 'cm-to-px';
  localStorage.setItem('mode', mode);
  updateLabels();
}

// 입력값 초기화 처리
function handleReset() {
  clearInputs();
  updateLabels();
}

// 초기화 함수
function init() {
  updateLabels();
  loadInputs();

  elements.calcBtn.addEventListener('click', handleCalc);
  elements.resetBtn.addEventListener('click', () => {
    handleReset();
    saveInputs(); // 초기화 후에도 로컬스토리지 상태 반영
  });
  elements.modeBtn.addEventListener('click', handleModeToggle);
}

// 초기 실행
init();
