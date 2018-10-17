let boardState = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

// 아래 함수는 상태의 변화에따라 **화면을 그리는** 역할과 책임만 갖는다.
function drawBoard() {
  document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
      if(boardState[rowIndex][colIndex] === 1) {  // 만약 빙고판의 숫자가 1이라면
        colEl.classList.add('checked')  // 해당 칸에 'checked' 클래스를 붙인다.
      } else {   // 빙고판의 숫자가 1이 아니면
        colEl.classList.remove('checked') // 해당 칸의 'checked' 클래스를 뗀다.
      }
    })
  })
  // nodeList 바깥에서
  if(bingo(boardState)) { // 만약 빙고판이 빙고라면
    console.log('빙고!!!')
    document.querySelector('.result-text').textContent = '빙고!!!'  // 빙고 글씨를 보여주고
    document.querySelector('.replay').classList.add('show') // 다시하기 버튼에 'show' 클래스를 추가한다.
  } else {  // 빙고가 아니라면
    document.querySelector('.result-text').textContent = '' // 글씨 떼고
    document.querySelector('.replay').classList.remove('show')  // 다시하기 버튼의 'show' 클래스를 뗀다.
  }
}

// 빙고 로직
function bingo(arr) {
  // 가로줄 확인 (루프)
  for (let i = 0; i < 5; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    let checked = true
    for (let j = 0; j < 5; j++) {
      if (arr[i][j] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  // 세로줄 확인 (루프)
  for (let i = 0; i < 5; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    let checked = true
    for (let j = 0; j < 5; j++) {
      if (arr[j][i] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  {
    // 대각선 확인 (루프)
    let checked = true
    for (let j = 0; j < 5; j++) {
      if (arr[j][j] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  {
    // 반대쪽 대각선 확인 (루프)
    let checked = true
    for (let j = 0; j < 5; j++) {
      if (arr[j][4-j] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  return false
}

// 상태가 변경되었을 때 화면을 다시 그린다.
document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
    colEl.addEventListener('click', e => {
      if(!bingo(boardState)) {  // 빙고가 아니라면 클릭했을때 1로 바꾸고 보드그리기를 수행한다.
        boardState[rowIndex][colIndex] = 1
        drawBoard()
      }
    })
  })
})

// replay 버튼을 눌렀을 경우의 이벤트 리스너
document.querySelector('.replay').addEventListener('click', e => {
  boardState = [  // 빙고판을 초기화 한다.
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]
  drawBoard() // 보드 그리기를 수행한다.
})

// 초기값으로 보드를 그리는 작업을 수행한다.
drawBoard()
