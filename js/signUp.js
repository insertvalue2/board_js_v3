// 1. 변수 선언과 초기화
const inputs = document.querySelectorAll(".inputs"); // 모든 입력 필드를 선택하여 변수에 저장
const checkIdBtn = document.getElementById("checkIdBtn"); // 아이디 중복 확인 버튼
const signUpBtn = document.getElementById("signUpBtn"); // 회원가입 버튼
const toDay = new Date(); // 현재 날짜와 시간을 가져와 변수에 저장

// 2. 유틸리티 함수 정의
// 로컬 스토리지에서 사용자 정보를 가져오는 함수
function getUserInfo() {
    let userListString = localStorage.getItem("userList");
    if(userListString === null) {
        return []; // 저장된 정보가 없으면 빈 배열을 반환
    } else {
        return JSON.parse(userListString); // JSON 문자열을 JavaScript 객체로 변환하여 반환
    }
}

// 로컬 스토리지에서 가져온 사용자 정보를 변수에 저장
const userInfo = getUserInfo(); 

// 3. 핵심 로직 함수 정의
// 아이디 중복 확인 함수
function checkDuplicateId() {
    const inputUsername = inputs[0].value.trim(); // 첫 번째 입력 필드(아이디)의 값을 가져옴

    if(inputUsername === "") { // 아이디가 입력되지 않은 경우 경고
        alert("아이디를 입력하세요");
        inputs[0].focus();
        return;
    }

    let isDuplicatedId = false; 
    // userInfo 배열을 순회하면서 입력된 아이디와 동일한 아이디가 있는지 확인
    for(let i = 0; i < userInfo.length; i++) {
        if(userInfo[i].username === inputUsername) {
            isDuplicatedId = true;
            break; 
        } 
    }

    // 중복된 아이디가 있으면 경고, 없으면 아이디를 사용 가능하다고 알림
    if(isDuplicatedId) {
        alert("이미 존재하는 아이디입니다");
        inputs[0].focus();
    } else {
        alert('사용 가능한 아이디입니다');
        inputs[0].readOnly = true; // 아이디 필드를 읽기 전용으로 설정
        inputs[0].style.backgroundColor = "darkGray"; // 배경색 변경
    }
}

// 회원가입 처리 함수
function registerUser() {
    const username = inputs[0];
    const nickname = inputs[1];
    const password = inputs[2];
    const confirmPassword = inputs[3];

    // 각 입력 필드에 대한 유효성 검사
    if(!username.readOnly) {
        alert("아이디 중복 확인을 해주세요");
        username.focus();
        return;    
    }

    if(nickname.value.trim() === "") {
        alert("닉네임을 입력하세요!");
        nickname.focus();
        return;
    }

    if(password.value.trim() === "") {
        alert("비밀번호를 입력하세요");
        password.focus();
        return; 
    }

    if(password.value !== confirmPassword.value) {
        alert("비밀번호가 일치하지 않습니다.");
        password.focus();
        return;
    }

    // 새로운 사용자 정보를 객체로 생성
    const newUser = {
        username: username.value,
        nickname: nickname.value,
        password: password.value,
        today: toDay.getFullYear() + "." + ( toDay.getMonth() + 1 ) + "." + toDay.getDate() 
    };

    // 새로운 사용자 정보를 userInfo 배열에 추가하고 로컬 스토리지에 저장
    userInfo.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userInfo));
    alert("회원가입 완료");
    
    // TODO - sign-in.html 생성후 주석 해제 
    // 회원가입 완료 후 로그인 페이지로 이동
    //window.location.href = "sign-In.html"; 
}

// 4. 이벤트 리스너 등록
function addEventListener() {
    checkIdBtn.addEventListener('click', checkDuplicateId); // 아이디 중복 확인 버튼 클릭 시 함수 실행
    signUpBtn.addEventListener('click', registerUser); // 회원가입 버튼 클릭 시 함수 실행
}

// 디버깅용으로 콘솔에 사용자 정보 출력
console.log("signup.js : user json - \n " + getUserInfo());
console.log("signup.js : Object", userInfo); 
console.log("JSON String type : ",  JSON.stringify(userInfo));

// 이벤트 리스너 등록 호출
addEventListener();
