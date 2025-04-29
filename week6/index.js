const baseURL = "http://apis.data.go.kr/B551011/PhotoGalleryService1";
const option = {
    serviceKey:
      "U87ROc0VesA8cFUzhlkJKOqDiv5Gsru29X5IRSGdbEB1d7pn%2BZdCkRb79ibFNRFT1ZiFp7D4MQLB9Y1mDwvNiQ%3D%3D",
    numofRows: 6,
    MobileApp: "test",
    MobileOS: "ETC",
    arrange: "A",
    _type: "json",
  };

  const container = document.getElementById('container');
  // 과제1) option에 있는 pageNo이라는 key값의 역할을 대신 하게 하기 위해서 아래 url에 count를 넣었음
let count = 15;

  // 동기 통신
async function getData() {
    // '불러오기' 버튼을 누를 때마다 새로운 사진을 위한 container 초기화
    container.innerHTML = "";
    const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${count}&serviceKey=${option.serviceKey}`

    const fetchData = await fetch(url);
    console.log(fetchData);

    const toJson = await fetchData.json();
    console.log(toJson);

    const datas = await toJson.response.body.items.item;
    console.log(datas);

    datas.map( (data, i) => {
        const list = document.createElement('div');
        list.id = 'list';

        const image = document.createElement('img');
        image.src = data.galWebImageUrl;

        const info = document.createElement('span');

        // (₩)백틱은 json과 문자열을 홤께 쓰기 위해서 사용하는 양식 구조
        info.innerText=`
        ${i+1}번째 사진
        제목 : ${data.galTitle}
        장소 : ${data.galPhotographyLocation}`;

        list.appendChild(image);
        list.appendChild(info);

        container.appendChild(list);

        const button = document.createElement('button');
        button.innerText = "더보기";
        list.appendChild(button);

        // 과제 2
        button.addEventListener("click", () => {
          localStorage.setItem("selectedData", JSON.stringify(data));
          window.location.href = "detail.html";
        });
        list.appendChild(image);
        list.appendChild(info);
        list.appendChild(button);
        container.appendChild(list);
    });

    // 과제1) 다음 불러오기 버튼에서 새로운 count가 부여된 곳의 사진들을 불러오기 위한 count 랜덤 설정
    count = Math.floor(Math.random() * 100) + 1;
}