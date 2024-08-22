// 1. 해당 게시글 정보 들고 오기 
// 2. DOM API - 데이터 출력 
// 3. 사용자 권한 확인 (로그인 유무, 작성자 여부)
// 4. 삭제,수정 버튼 활성화 여부 
// 5. 삭제 기능 구현 
// 6. 게시글 수정화면 이동 (권환 확인)

document.addEventListener("DOMContentLoaded", function() {
    // 1. 해당 게시글 정보 들고 오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id'); // URL에서 게시글 ID 가져오기
    const storedBoardList = JSON.parse(localStorage.getItem("boardList"));
    const user = JSON.parse(localStorage.getItem("user")); // 현재 로그인된 사용자 정보 가져오기

    let currentPost;

    // 게시글 정보 찾기
    if (storedBoardList && postId) {
        currentPost = storedBoardList.find(post => post.id === parseInt(postId));
        if (!currentPost) {
            alert("해당 게시글을 찾을 수 없습니다.");
            window.location.href = "board-list.html"; // 게시글이 없으면 목록으로 이동
        }
    }

    // 2. DOM API - 데이터 출력
    const titleElement = document.querySelector(".post-title");
    const contentElement = document.querySelector(".post-content");
    const usernameElement = document.querySelector(".post-username");
    const dateElement = document.querySelector(".post-date");
    const countElement = document.querySelector(".post-count");

    if (currentPost) {
        titleElement.textContent = currentPost.title;
        contentElement.textContent = currentPost.content;
        usernameElement.textContent = currentPost.username;
        dateElement.textContent = currentPost.today;
        countElement.textContent = currentPost.count;
    }

    // 3. 사용자 권한 확인 (로그인 유무, 작성자 여부)
    const deleteButton = document.querySelector(".delete-button");
    const editButton = document.querySelector(".edit-button");

    if (user && currentPost.username === user.username) {
        // 4. 삭제, 수정 버튼 활성화 여부
        deleteButton.style.display = "block";
        editButton.style.display = "block";
    } else {
        deleteButton.style.display = "none";
        editButton.style.display = "none";
    }

    // 5. 삭제 기능 구현
    deleteButton.addEventListener("click", function() {
        if (confirm("정말 삭제하시겠습니까?")) {
            const updatedBoardList = storedBoardList.filter(post => post.id !== parseInt(postId));
            localStorage.setItem("boardList", JSON.stringify(updatedBoardList));
            alert("게시글이 삭제되었습니다.");
            window.location.href = "board-list.html"; // 삭제 후 목록으로 이동
        }
    });

    // 6. 게시글 수정화면 이동 (권한 확인)
    editButton.addEventListener("click", function() {
        if (user && currentPost.username === user.username) {
            window.location.href = `board-edit.html?id=${postId}`;
        } else {
            alert("수정 권한이 없습니다.");
        }
    });
});
