// 1. 해당 게시글 정보 들고 오기
// 2. DOM API - 데이터 출력
// 3. 사용자 권한 확인 (로그인 유무, 작성자 여부)
// 4. 삭제,수정 버튼 활성화 여부
// 5. 삭제 기능 구현
// 6. 게시글 수정화면 이동 (권환 확인)

document.addEventListener("DOMContentLoaded", function () {
  // 1. 해당 게시글 정보 들고 오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id"); // URL에서 게시글 ID 가져오기
  const storedBoardList = JSON.parse(localStorage.getItem("boardList"));
  const user = JSON.parse(localStorage.getItem("user")); // 현재 로그인된 사용자 정보 가져오기
  let currentPost;

  // 1단계 코드
  // 게시글 목록(storedBoardList)과 게시글 ID(postId)가 있는지 확인
  if (storedBoardList && postId) {
    // currentPost 변수를 null로 초기화 (게시글을 찾으면 값을 할당)
    currentPost = null;

    // 반복문을 사용하여 게시글 목록을 하나씩 확인
    for (let i = 0; i < storedBoardList.length; i++) {
      let post = storedBoardList[i];

      // postId를 숫자로 변환하여 비교
      if (post.id === parseInt(postId)) {
        currentPost = post; // 게시글을 찾으면 currentPost에 저장
        break; // 게시글을 찾았으므로 반복문을 종료
      }
    }

    // 게시글을 찾지 못한 경우
    if (!currentPost) {
      alert("해당 게시글을 찾을 수 없습니다."); // 사용자에게 알림

      // 게시글 목록 페이지로 이동
      window.location.href = "board-list.html";
    }
  }

  console.log("currentPost", currentPost.title);
  // 2. DOM API - 데이터 출력
  const titleElement = document.querySelector("#title");
  const usernameElement = document.querySelector("#username");
  const imgBoxElement = document.querySelector("#imgBox");
  const contentElement = document.querySelector("#content");

  if (currentPost != null) {
    titleElement.value = currentPost.title;
    usernameElement.value = currentPost.username;

    if (currentPost.imgData != null) {
      // img 태그 생성
      const imgElement = document.createElement("img");
      imgElement.src = currentPost.imgData; // Base64 값 할당

      // img 스타일 설정
      imgElement.style.width = "100%";
      imgElement.style.height = "auto"; // 자동으로 높이 설정

      // imgBox 태그에 자식 태그로 추가
      imgBoxElement.appendChild(imgElement);
    }

    contentElement.innerHTML = currentPost.content;
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
    deleteButton.addEventListener("click", function () {
      if (confirm("정말 삭제하시겠습니까?")) {
        const updatedBoardList = [];
        for (let i = 0; i < storedBoardList.length; i++) {
            // 게시글의 ID가 삭제하려는 postId와 같지 않은 경우에만 배열에 추가
            if (storedBoardList[i].id !== parseInt(postId)) {
                updatedBoardList.push(storedBoardList[i]);
            }
        }
        localStorage.setItem("boardList", JSON.stringify(updatedBoardList));
        alert("게시글이 삭제되었습니다.");
        window.location.href = "board-list.html"; // 삭제 후 목록으로 이동
      }
    });

    // 6. 게시글 수정화면 이동 (권한 확인)
    // 수정 기능은 실습 과제 입니다. !!! 
    editButton.addEventListener("click", function () {
      if (user && currentPost.username === user.username) {
        window.location.href = `board-edit.html?id=${postId}`;
      } else {
        alert("수정 권한이 없습니다.");
      }
    });
});
