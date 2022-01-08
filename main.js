'use strict';

{
  class Panel {
    constructor() {
      
      const section = document.createElement('section');  //sectionをconstで定義したのは、sectionはconstructorの中でしか使わないから。=>　メソッドの中で使わないから。
      section.classList.add('panel');


      //this. をつけたものは、クラス内のメソッドから呼び出すもの。
      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();  //最初の画像もランダムにする。

      this.timeoutId = undefined;  //クラスにのメソッドで使うのでletは使えない。this.timeoutIdの値がなくても動作するが、letで初期化せずに変数を宣言したらundefinedが入るので今回も同様に
      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop');
      this.stop.addEventListener('click', () => {
        if(this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        panelsLeft--;
        if(panelsLeft === 0) {
          checkResult();   
          spin.classList.remove('inactive');
          panelsLeft = 3;
        }

      });

      section.appendChild(this.img);
      section.appendChild(this.stop);
      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage() {  //画像をセットし、ランダムで取り出す
      const images = [
        'img/bell.png',
        'img/cherry.png',
        'img/seven.png',
      ];

      return images[Math.floor(Math.random() * images.length)];  //別のメソッドで呼び出すので、returnしておく　定数で取得しないのは面倒くさいから　配列[Math.floor(Math.random() * 配列length)]
    }

    //getRandomImageで取得したランダムで一つ取り出した画像をセットする
    spin() {
      this.img.src = this.getRandomImage();  //this.imgのsrcを変える
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 10);
    }

    isUnmatched (p1, p2) {
      // if(this.img.src !== p1.img.src && this.img.src !== p2.img.src) { //指定したインスタンスのimgのsrcが他のインスタンスのものと一致しなかったときはtrue、そうでなければfalseを返す
      //   return true;
      // } else {
      //   return false;
      // }

      return this.img.src !== p1.img.src && this.img.src !== p2.img.src //上の条件を返してもいいが、指定したインスタンスの画像が、他のものと異なっている時、という条件をそのまま返すとよい
    }

    unmatch() {
      this.img.classList.add('unmatch');
    }

    activate() {
      this.stop.classList.remove('inactive');
      this.img.classList.remove('unmatch');
    }
  }

  //Panelクラスで作った、一つ一つのpanelを呼び出す。
  const panels = [   //new Panel();を3つ書くことで、3つのpanelを作ることができる。インスタンスでの呼び出しは一つにつき一つ
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let panelsLeft = 3;  //全てのインスタンス共通で使う変数なので、個々の要素を設定したPanelクラスではなく、ここで変数を宣言した。

  function checkResult () { //Panelクラスは、panel1つずつの情報。正誤判定は3つのpanel同士の比較なので、Panelクラスの外に正誤判定のための関数をかく
    if(panels[0].isUnmatched(panels[1], panels[2])) { //もしpanels[0]のisUnmatched()メソッドにpanels[1] と panels[2]を引数として渡す。もしisUnmatchedクラスに該当したら
      panels[0].unmatch();                            //panels[0]のunmatch()メソッドを呼び出す
    }
    if(panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if(panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
    
  }

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if(spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => { //panelsの一つ一つの要素であるnew Panel();をpanelで受け取る
      panel.spin();           //panel = new Panel();なので、panel.spin();と書けば、Panelクラスのspin()メソッドを呼び出すのと同じ。
      panel.activate();
    }); 
  });
}

// {
//   class Panel {
//     constructor() {
//       const section = document.createElement('section');
//       section.classList.add('panel');

//       this.img = document.createElement('img');
//       this.img.src = 'img/seven.png';

//       this.stop = document.createElement('div');
//       this.stop.textContent = 'STOP'
//       this.stop.classList('stop');

//       section.appendChild(this.img);
//       section.appendChild(this.stop);

//       const main = document.querySelector('main');
//       main.appendChild(section);
//     }

//     getRandomImage() {
//       const images = [
//         'img/seven.png',
//         'img/bell.png',
//         'img/cherry.png',
//       ];

//       return images[Math.floor(Math.random() * images.length)];
//     }

//     spin() {
//       this.img.src = this.getRandomImage();
//     }
//   }

//   const panels = [
//     new Panel(),
//     new Panel(),
//     new Panel(),
//   ];

//   const spin = document.getElementById('spin');
//   spin.addEventListener('click', () => {
//     panels.forEach(panel => {
//       panel.spin();
//     });
//   });
// }