// localStorage에 저장된 데이터 가져오기
const data = JSON.parse(localStorage.getItem("selectedData"));

// 1. 날짜 포맷 변경 (YYYYMMDD → YY/MM/DD)
const created = data.galCreatedtime;
const formattedDate = `${created.slice(2, 4)}/${created.slice(4, 6)}/${created.slice(6, 8)}`;

// detail 요소 선택
const detailBox = document.getElementById("detail");

// innerHTML로 상세 정보 출력
detailBox.innerHTML = `
  <img src="${data.galWebImageUrl}" alt="${data.galTitle}" style="width: 60%; border-radius: 10px;"><br><br>
  <p><strong> 제목:</strong> ${data.galTitle}</p>
  <p><strong> 장소:</strong> ${data.galPhotographyLocation}</p>
  <p><strong> 날짜:</strong> ${formattedDate}</p>
  <p><strong> 촬영자:</strong> ${data.galPhotographer}</p>
  <p><strong> 키워드:</strong> ${data.galSearchKeyword}</p>
`;
