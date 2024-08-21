// DOMContentLoaded 이벤트는 페이지 로드 후 실행됩니다.
document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소를 안전하게 선택
    const boardMenu = document.getElementById('board');
    const signInMenu = document.getElementById('signIn');
    const signUpMenu = document.getElementById('signUp');
    const authLinks = document.getElementById('authLinks');

    // 로컬 스토리지에서 'user' 값을 가져옵니다.
    const user = localStorage.getItem('user');

    // 'user' 값이 null이 아니면 (로그인 상태라면)
    if (user !== null) {
        if (authLinks) {
            // 로그인, 회원가입 링크를 로그아웃 링크로 변경
            authLinks.innerHTML = '<span class="menu-link" id="logoutLink">로그아웃</span>';

            // 로그아웃 클릭 시 처리
            document.getElementById('logoutLink').addEventListener('click', function() {
                // 로컬 스토리지에서 'user' 값을 제거
                localStorage.removeItem('user');
                // 로그아웃 후 페이지를 새로고침하거나 다른 페이지로 이동
                location.reload(); // 페이지 새로고침
            });
        }
    }

    // 각 메뉴에 클릭 이벤트를 추가합니다.
    if (boardMenu) {
        boardMenu.addEventListener('click', function () {
            window.location.href = 'board-list.html'; // 게시판 페이지로 이동
        });
    }

    if (signInMenu) {
        signInMenu.addEventListener('click', function () {
            window.location.href = 'sign-In.html'; // 로그인 페이지로 이동
        });
    }

    if (signUpMenu) {
        signUpMenu.addEventListener('click', function () {
            window.location.href = 'sign-up.html'; // 회원가입 페이지로 이동
        });
    }


});


// 로그인 상태가 아니면 지정된 페이지로 리디렉션
function redirectToPageIfNotLoggedIn(page) {
    // 로컬 스토리지에서 로그인 상태 확인
    const loggedInUser = localStorage.getItem("user");
    // 만약 로그인된 사용자가 없으면 지정된 페이지로 이동
    if (loggedInUser === null) {
        window.location.href = `${page}.html`;
    }
}

