// 1. 로컬 스토리지에서 사용자 전체 목록 가져 오기 
const userList = JSON.parse(localStorage.getItem('userList'));
console.log('userList', userList);

// 2. DOM 접근 Node 가져 오기 
const inputs = document.querySelectorAll('.inputs');
console.log('inputs', inputs);
const button = document.querySelector('button');
console.log('button', button);

// 페이지가 전부 로드된 이후에 실행
document.addEventListener('DOMContentLoaded', function () {
    // 로컬 스토리지에서 로그인 상태 확인
    const loggedInUser = localStorage.getItem('user');
    
    // 만약 로그인된 사용자가 있으면 바로 board-list.html로 이동
    if (loggedInUser) {
        window.location.href = "board-list.html";
    }
});

// 3. 이벤트 리스너 등록(함수로 만들어보기) 
function addEventListener() {
    button.addEventListener('click', login);
}

// 4. 로그인 처리 함수 만들어 보기 
function login() {
    const username = inputs[0];
    const password = inputs[1];
    console.log('username', username.value, 'password', password.value);

    if (username.value.trim() === "") {
        alert("아이디를 입력하세요");
        username.focus();
        return;
    }

    if (password.value.trim() === "") {
        alert("비밀번호를 입력하세요");
        password.focus();
        return;
    }

    // 사용자 목록에서 username 확인 password 확인 
    if (userList === null || userList.length === 0) {
        alert("등록된 사용자가 없습니다");
        return;
    }

    let userFound = false;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].username === username.value) {
            userFound = true;
            if (userList[i].password !== password.value) {
                alert("잘못된 비밀번호 입니다");
                password.focus();
                return;
            } else {
                localStorage.setItem('user', JSON.stringify(userList[i]));
                alert("로그인 완료");
                window.location.href = "board-list.html";
                return;
            }
        }
    }

    if (!userFound) {
        alert("해당 아이디가 존재하지 않습니다.");
        username.focus();
    }
}

// 5. 이벤트 리스너 함수 반드시 호출 
addEventListener();
