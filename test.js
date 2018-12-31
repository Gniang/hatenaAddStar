
const feedURL = 'http://b.hatena.ne.jp/entrylist.rss';

let Parser = require('rss-parser');
let parser = new Parser();
 
(async () => {
 
  let feed = await parser.parseURL(feedURL);
  
  console.log(feed.link);
 
  feed.items.forEach(item => {
    console.log(item.link)
  });
 
})();

// var request = require('request');  
// var req = request(feed);  
// const RssParser = require('rss-parser');
// const fs = require('fs');

// // ファイルを読み込んで文字列で取得する
// const rssFile = fs.readFileSync('./my-feed.rss', 'utf8');

// rssParser.parseString(rssFile)
//   .then((feed) => {
//     console.log('RSS 取得成功', feed);
//   })
//   .catch((error) => {
//     console.error('RSS 取得失敗', error);
//   });

// "entry-unit-entry-title"
// "hatena-star-add-button"


// var clickMe = document.getElementById("click_me");
// if( /*@cc_on ! @*/ false )
// {
//   // IEの場合
//   clickMe.fireEvent("onclick"); //これでclickイベントが発火する
// }
// else
// {
//   // それ以外の場合
//   var event = document.createEvent( "MouseEvents" ); // イベントオブジェクトを作成
//   event.initEvent("click", false, true); // イベントの内容を設定
//   clickMe.dispatchEvent(event); // イベントを発火させる
// }