document.addEventListener("DOMContentLoaded", function () {
    // 비 로그인시 페이지 이동 처리 
    redirectToPageIfNotLoggedIn('sign-in');


    // 사용할 요소 접근 및 로컬스토리지 사용
    const title = document.querySelector('.title'); // 제목 입력 필드
    const username = document.querySelector('.username'); // 사용자명 입력 필드
    const fileInput = document.querySelector('.file'); // 파일 입력 필드
    const imgViewBox = document.querySelector('.img-box'); // 이미지 미리보기 영역
    const content = document.querySelector('.content'); // 내용 입력 필드
    const button = document.querySelector('button'); // 글쓰기 버튼 요소

    let imageData = null; // 업로드된 이미지 데이터를 저장할 변수
    const day = new Date(); // 현재 날짜 객체 생성

    // 로컬 스토리지에서 사용자 정보 가져오기
    const getUser = JSON.parse(localStorage.getItem('user'));
    username.value = getUser.username; // 로그인한 사용자의 이름을 필드에 표시
    

    // 파일 업로드 함수
    function fileUpload(event) {
        const file = event.target.files[0]; // 선택된 파일 객체

        // 파일 크기 유효성 검사 (5MB 이하만 허용)
        if (file.size >= 5242880) { // 5MB = 5 * 1024 * 1024 바이트
            alert("첨부 파일은 5MB 이하만 가능합니다");
            event.target.value = ''; // 파일 입력 필드 초기화
            return;
        }

        // 파일 타입 유효성 검사 (jpeg, png, gif만 허용)
        const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validFileTypes.includes(file.type)) {
            alert('유효한 파일 타입이 아닙니다. (jpeg, png, gif만 허용)');
            return;
        }

        // 파일 미리보기 기능
        const reader = new FileReader();
        reader.onload = function (e) {
            imgViewBox.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`;
            imageData = reader.result; // 이미지 데이터를 저장
        }
        reader.readAsDataURL(file); // 파일을 Base64 형식으로 읽기
    }

    // 글 저장 함수
    function saveBoard() {
        // 필수 입력값 체크
        if (title.value === "") {
            alert('제목을 입력하시오');
            title.focus();
            return;
        }

        if (content.value === "") {
            alert('내용을 입력해주세요');
            content.focus();
            return;
        }

        // 게시글 객체 생성
        const board = {
            title: title.value,
            content: content.value,
            username: username.value,
            today: `${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`,
            count: 0,
            imgData: imageData // 이미지 데이터 저장
        };

        // 로컬 스토리지에 저장
        let boardList = JSON.parse(localStorage.getItem('boardList')) || [];
        boardList.push(board); // 새 게시글 추가
        localStorage.setItem("boardList", JSON.stringify(boardList)); // JSON 형식으로 저장

        // 게시판 페이지로 이동
        location.href = 'board-list.html';
    }

    // 이벤트 리스너 추가
    fileInput.addEventListener('change', fileUpload);
    button.addEventListener('click', saveBoard);
   
});
