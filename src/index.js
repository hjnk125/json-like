const Example = `{
  ""Example"": ""이곳에 객체를 입력해주세요.📢"",
  ""id"": ""12a4-2b4c-34d6-45ef"",
  ""name"": ""정독왕"",
  ""age"": 24,
  ""contacts"": {
    ""email"": ""readking@ttt.co.kr"",
    ""phone"": ""010-2121-2121""
  },
  ""isMember"": false,
  ""experiencedSeasons"": [
    2001, 
    2005, 
    2010
  ],
  ""createdAt"": ""2020-11-16T06:33:41+00:00"",
  ""bookReviews"": [
    {
      ""bookTitle"": ""여행의 이유"",
      ""title"": ""나는 왜 여행을 할까"",
      ""content"": ""이 도시는 너무 바쁘고 시끄러워서, 매일 집으로 돌아가 이불을 머리까지 덮어도 가빠진 숨이 가라앉질 않는다.""
    }, 
    {
      ""bookTitle"": ""참을 수 없는 존재의 가벼움"",
      ""title"": ""사랑이란 무엇일까"",
      ""content"": ""참을 수 없는 존재의 가벼움은 니체의 영원 회귀 사상을 바탕으로 한 번인 동시에 아무것도 아닌 삶의 무의미함을 말한다.""
    }
  ]
}`;

window.addEventListener("error", handleError, true);
function handleError(event) {
  alert("JSON-like 입력값이 올바른지 확인해주세요!");
}

let leftSide = document.querySelector('#leftSide');
function onchangeLeft(val) {
  if (leftSide.value !== '') {
    leftSide.value = val;
  } else {
    leftSide.value = Example;
  }
}
// initial call
onchangeLeft(leftSide.value);

function radioHandler(val) {
  if (val === 'json') {
    const json = leftSide.value.replace(/""/g, '"');
    leftSide.value = json;
  } else if (val === 'json-like') {
    const jsonLike = leftSide.value.replace(/"/g, '""');
    leftSide.value = jsonLike;
  }
}

let rightSide = document.querySelector('#rightSide');

function makeUl() {
  let string = leftSide.value.replace(/""/g, '"');
  let parse = JSON.parse(string);
  // console.log(parse);

  let ul = document.createElement('ul');
  function makeLi(parse) {
    for (let key in parse) {
      let li = document.createElement('li');
      li.setAttribute("contentEditable", true);

      if (typeof parse[key] === 'object') {
        li.innerHTML = `<strong>${key}</strong>`;
        let innerUl = document.createElement('ul');

        // 하위 단계 체크 함수
        innerFn(parse[key], innerUl);
        function innerFn(obj, ul) {
          for (let k in obj) {
            let innerLi = document.createElement('li');

            if (typeof obj[k] === 'object') {
              innerLi.innerHTML = `<strong>${k}</strong>`
              let innerUl2 = document.createElement('ul');

              innerFn(obj[k], innerUl2);
              innerLi.appendChild(innerUl2);

            } else {
              innerLi.innerHTML = `<strong>${k}</strong> <span>${obj[k]}<span>`
            }
            ul.appendChild(innerLi);
          }
          li.appendChild(ul);
        }

      } else {
        li.innerHTML = `<strong>${key}</strong> <span>${parse[key]}<span>`;
      }

      ul.appendChild(li);
    }
  }
  makeLi(parse);

  rightSide.innerHTML = '';
  rightSide.appendChild(ul);
}

function editJson(ul, item, key) {
  if (!ul) ul = document.querySelector('ul');
  if (!item) item = {};

  let ulArr = [...ul.children];

  var obj = {};
  ulArr.map((current, i) => {
    if (current.innerHTML.includes('<ul>')) {
      var newItem = {};
      let key = current.children[0].innerText;
      editJson(current.children[1], newItem, key);
      obj[key] = newItem[key];
      // value 값이 배열일 경우
      if (Object.keys(newItem[key])[0] === '0') {
        obj[key] = Object.values(newItem[key]);
      };
    } else {
      // child 없을 때 오류 방지
      if (current.childElementCount > 1) {
        let key = current.children[0].innerText;
        let value = current.children[1].innerText;
        // value 값이 Boolean, Number 타입인 경우
        if (value === 'true') { value = true };
        if (value === 'false') { value = false };
        if (Number(value)) { value = Number(value) };
        obj[key] = value;
      }
    }
  })

  item[key] = obj;

  // json-like 형식으로 변환
  let string = JSON.stringify(obj, null, '  ');
  let radio = document.querySelector('#json-like');
  if (radio.checked) {
    const jsonLike = string.replace(/"/g, '""');
    leftSide.value = jsonLike;
  } else {
    leftSide.value = string;
  }
}