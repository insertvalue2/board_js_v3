// DOMContentLoaded 이벤트는 페이지 로드 후 실행됩니다.
document.addEventListener("DOMContentLoaded", function () {
  // 사용할 요소 접근 및 로컬스토리지 사용
  const boardContainer = document.querySelector(".board-content-box"); // 게시글이 들어갈 컨테이너 요소
  const writeButton = document.querySelector(".btn"); // 글쓰기 버튼 요소
  const paginationContainer = document.querySelector(".num-box"); // 페이지 번호가 표시될 컨테이너 요소

  // 로컬스토리지에서 게시글 목록을 가져오기
  const storedBoardList = JSON.parse(localStorage.getItem("boardList"));
  
  // 게시글 목록을 내림차순으로 정렬
  if (storedBoardList) {
    storedBoardList.reverse();
  }
  
  // 현재 페이지
  let currentPage = 0;
  const limit = 2; // 한 페이지당 게시글 수 (limit)

  // 초기 로드: 첫 번째 페이지 게시글을 로드합니다.
  loadPosts(currentPage);

  // 게시글을 로드하는 함수
  function loadPosts(page) {
    // 현재 페이지에 해당하는 게시글의 시작 인덱스(offset)과 가져올 개수(limit)를 계산
    const offset = page * limit;
    const end = offset + limit;

    let postElements = ""; // 게시글 HTML 요소를 저장할 변수

    // 저장된 게시글 목록이 존재하는지 확인
    if (storedBoardList != null && storedBoardList.length > 0) {
      // 현재 페이지에 해당하는 게시글을 HTML 요소로 변환
      for (let i = offset; i < end && i < storedBoardList.length; i++) {
        postElements += `
                <div class="board" data-id="${storedBoardList[i].id}">
                    <div class="board-1">${i + 1}</div>
                    <div class="board-2">${storedBoardList[i].title}</div>
                    <div class="board-3">${storedBoardList[i].username}</div>
                    <div class="board-4">${storedBoardList[i].today}</div>
                    <div class="board-5">${storedBoardList[i].count}</div>
                </div>
            `;
      }
      boardContainer.innerHTML = postElements; // 게시글 컨테이너에 HTML 추가

      // 생성된 게시글 요소들에 클릭 이벤트 리스너를 추가
      const postElementsCollection = document.querySelectorAll(".board");
      addPostClickListeners(postElementsCollection);

      // 페이지네이션 생성
      createPagination(storedBoardList, page);
    } else {
      // 게시글이 없는 경우 메시지를 표시
      boardContainer.innerHTML =
        "<div class='no-list' style='text-align:center; margin-top:20px;'>조회된 게시글이 없습니다</div>";
    }
  }

  // 페이지네이션을 생성하는 함수
  function createPagination(postList, currentPage) {
    const totalPosts = postList.length; // 전체 게시글 수
    const totalPages = Math.ceil(totalPosts / limit); // 전체 페이지 수 계산

    // 페이지 번호 HTML을 저장할 변수
    let paginationHTML = "";

    // 페이지 번호 생성
    for (let i = 0; i < totalPages; i++) {
      paginationHTML += `
            <span class="num" data-page="${i}">${i + 1}</span>
        `;
    }
    paginationContainer.innerHTML = paginationHTML; // 페이지 번호 컨테이너에 HTML 추가

    // 생성된 페이지 번호의 요소에 접근
    const pageNumbers = document.querySelectorAll(".num");

    // 현재 페이지 번호에 스타일 적용
    pageNumbers[currentPage].style.backgroundColor = "grey";
    pageNumbers[currentPage].style.fontWeight = 600;

    // 페이지 번호 클릭 이벤트 리스너 추가
    pageNumbers.forEach((pageNumber) => {
      pageNumber.addEventListener("click", (event) => {
        const page = parseInt(event.target.dataset.page); // 클릭된 페이지 번호를 가져옴
        loadPosts(page); // 해당 페이지의 게시글을 로드
      });
    });
  }



   // 게시글 클릭 시 페이지 이동 함수
   function addPostClickListeners(postElements) {
    for (let i = 0; i < postElements.length; i++) {
      postElements[i].onclick = function () {
        const postId = postElements[i].getAttribute("data-id"); // 게시글의 ID 값을 가져옴
        // 게시글을 클릭하면 해당 게시글의 ID를 URL에 전달하여 상세 페이지로 이동
        location.href = `board-detail.html?id=${postId}`;
      };
    }
  }

  // 글쓰기 버튼 클릭 시 처리
  writeButton.onclick = function () {
    location.href = "board-write.html"; // 글쓰기 페이지로 이동
  };
});


// 샘플 데이터
const sampleBoardList = [
    {
      id: 1,
      title: "첫 번째 게시글",
      content: "첫 번째 게시글의 내용입니다.",
      username: "홍길동",
      today: "2024.06.25",
      count: 5,
    },
    {
      id: 2,
      title: "두 번째 게시글",
      content: "두 번째 게시글의 내용입니다.",
      username: "이몽룡",
      today: "2024.06.26",
      count: 8,
    },
    {
      id: 3,
      title: "세 번째 게시글",
      content: "세 번째 게시글의 내용입니다.",
      username: "성춘향",
      today: "2024.06.27",
      count: 10,
    },
    {
      id: 4,
      title: "네 번째 게시글",
      content: "네 번째 게시글의 내용입니다.",
      username: "변학도",
      today: "2024.06.28",
      count: 3,
    },
    {
      id: 5,
      title: "다섯 번째 게시글",
      content: "다섯 번째 게시글의 내용입니다.",
      username: "심청",
      today: "2024.06.29",
      count: 7,
    },
  ];
  
  // 로컬 스토리지에 샘플 데이터 저장 (한번 동작 후 수정 처리)
  // localStorage.setItem("boardList", JSON.stringify(sampleBoardList));
  

