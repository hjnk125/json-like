const Example = `{
  ""id"": ""12a4-2b4c-34d6-45ef"",
  ""name"": ""정독왕"",
  ""age"": 24,
  ""contacts"": {
    ""email"": ""readking@ttt.co.kr"",
    ""phone"": ""01021212121""
  },
  ""isMember"": false,
  ""experiencedSeasons"": [2001, 2005, 2010],
  ""createdAt"": ""2020-11-16T06:33:41+00:00"",
  ""bookReviews"": [{
      ""bookTitle"": ""여행의 이유"",
      ""title"": ""나는 왜 여행을 할까"",
      ""content"": ""이 도시는 너무 바쁘고 시끄러워서, 매일 집으로 돌아가 이불을 머리까지 덮어도 가빠진 숨이 가라앉질 않는다.""
    }, {
      ""bookTitle"": ""참을 수 없는 존재의 가벼움"",
      ""title"": ""사랑이란 무엇일까"",
      ""content"": ""참을 수 없는 존재의 가벼움은 니체의 영원 회귀 사상을 바탕으로 한 번인 동시에 아무것도 아닌 삶의 무의미함을 말한다.""
  }]
}`;

let leftSide = document.querySelector('#leftSide');
leftSide.innerHTML = Example;

function radioHandler(val) {
  if (val === 'json') {
    const json = leftSide.innerHTML.replace(/""/g, '"');
    leftSide.innerHTML = json;
  } else if (val === 'json-like') {
    const jsonLike = leftSide.innerHTML.replace(/"/g, '""');
    leftSide.innerHTML = jsonLike;
  }
}

let rightSide = document.querySelector('#rightSide');

function makeUl() {
  let string = leftSide.innerHTML.replace(/""/g, '"');
  let parse = JSON.parse(string);

  console.log(parse);


  let ul = document.createElement('ul');
  function innerFn(parse) {
    if (typeof parse === 'object') {
      for (let key in parse) {
        let li = document.createElement('li');
        li.setAttribute("contentEditable", true);

        if (typeof parse[key] === 'object') {
          li.innerHTML = `<strong>${key}</strong> ${Object.keys(parse[key]).length}`;
          let innerUl = document.createElement('ul');

          // 반복되는 부분 함수로 리팩토링 필요!
          for (let k in parse[key]) {
            let innerLi = document.createElement('li');

            if (typeof parse[key][k] === 'object') {
              innerLi.innerHTML = `<strong>${k}</strong> ${Object.keys(parse[key][k]).length}`
              let innerUl2 = document.createElement('ul');

              for (let k2 in parse[key][k]) {
                let innerLi2 = document.createElement('li');
                innerLi2.innerHTML = `<strong>${k2}</strong> <span>${parse[key][k][k2]}<span>`
                innerUl2.appendChild(innerLi2);
              }
              innerLi.appendChild(innerUl2);

            } else {
              innerLi.innerHTML = `<strong>${k}</strong> <span>${parse[key][k]}<span>`
            }
            innerUl.appendChild(innerLi);
          }
          li.appendChild(innerUl);
        }

        else {
          li.innerHTML = `<strong>${key}</strong> <span>${parse[key]}<span>`;
        }


        ul.appendChild(li);
      }
    }
  }
  innerFn(parse);

  rightSide.innerHTML = '';
  rightSide.appendChild(ul);
}