var fs = require('fs');
var client = require('cheerio-httpcli');

const getRandom = (min, max) => {
    var random = Math.floor(Math.random() * (max + 1 - min)) + min;

    return random;
}

const sleepSec = (waitSeconds) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("")
        }, waitSeconds * 1000)
    })
}

const getGoogleSearchUrls = async function (keyword, entryNum) {

    // Googleで「はてなブログ」について検索する。
    const hatenaSites = [
        "site:hatenablog.com/entry",
        "site:hatenablog.jp/entry",
        "site:hateblo.jp/entry",
        // "site:hatenadiary.com/entry",
        // "site:hatenadiary.jp/entry",
    ];
    let word = hatenaSites.join(" OR ");
    if (keyword) {
        word = keyword + " " + word
    }
    const query = {
        q: word,
        lr: "lang_ja",//検索結果の言語
        //tbs:"qdr:h,sbd:1", //1時間分
        tbs: "qdr:d,sbd:1", //1日分
        num: entryNum          // 検索件数
    };
    const response = await client.fetch('http://www.google.com/search', query)
    const { $ } = response;
    const results = [];
    $('a').each(function (idx) {
        const $url = $(this).attr('href');
        const cite = $(this).find("cite");

        if (cite.length) {
            let title = ""
            try {
                title = $(this).find("h3")[0].firstChild.nodeValue;
            } catch (err) {
            }

            results.push({
                url: $url,
                title: title,
            })
        }
    });
    return results;
}

// 星をつける
const addstar = async (entry_url) => {
    // // 念のためエントリブログにアクセスし少し待つ
    // const response = await client.fetch(entry_url,{});
    // await sleepSec(2);

    const rks = await getRks(entry_url);
    const addStarURL = "http://s.hatena.ne.jp/star.add.json?rks=" + rks + "&uri=" + encodeURI(entry_url) + "&quote=&location=" + encodeURI(entry_url);
    const addStarRes = await client.fetch(addStarURL, {});
    return addStarRes;
};


// ログインする
const login = async (user, pass) => {
    const loginURL = "https://www.hatena.ne.jp/login"
    const response = await client.fetch(loginURL, {});
    const { $ } = response;
    const res2 = await $('form').submit({
        name: user,
        password: pass
    });

    const err = res2.$("div.error-message");
    if(err.length){
        let errMsg = err.find("p")[0].firstChild.nodeValue;
        return  "ログインエラー：" + errMsg;
    }

    return null;
}

// Rksを取得
const getRks = async (entryUrl) => {
    const rksURL = "http://s.hatena.ne.jp/entries.json?uri=" + encodeURI(entryUrl);
    const response = await client.fetch(rksURL, {});
    const obj = JSON.parse(response.body);
    return obj.rks;
}

// メイン処理
async function main() {
    // はてなのユーザー名とパスワードを設定する
    var USER_NAME = "";
    var PASSWORD = ""

    // Google検索で絞込したい単語があれば入力
    var KEYWORD = "";
    var ENTRY_NUM = 10;

    // 起動引数を取得
    if (process.argv[2]) {
        USER_NAME = process.argv[2];
    }
    if (process.argv[3]) {
        PASSWORD = process.argv[3];
    }
    if (process.argv[4]) {
        ENTRY_NUM = process.argv[4] * 1;
    }
    if (process.argv[5]) {
        KEYWORD = process.argv[5];
    }

    // debug
    if(false){
        // はてなのユーザー名とパスワードを設定する
        USER_NAME = "gng21";
        PASSWORD = "Ky3xM4z94Fwe8Dc"

        // Google検索で絞込したい単語があれば入力
        KEYWORD = "";
        ENTRY_NUM = 10;
    }



    // const testURL = "https://program-shoshinsya.hatenablog.com/entry/2018/12/30/223923"
    // await addStar(testURL);

    var logErrCall = (err) => { };
    let logPath = "./" + new Date().toISOString() + ".log";
    console.log("log:" + logPath);

    let errMsg = await login(USER_NAME, PASSWORD);
    if(errMsg){
        console.log(errMsg);
        fs.appendFile(logPath, errMsg, logErrCall);
        return
    }
    fs.appendFile(logPath, "[" + USER_NAME + "]ログインしました", logErrCall);
    
    const hatenaUrls = await getGoogleSearchUrls(KEYWORD, ENTRY_NUM);



    // 検索結果のURLを巡回して星をつける
    for (let item of hatenaUrls) {
        let msg = "■" + item.title + "     [" + item.url + "] "

        try {
            const response = await addstar(item.url);
            msg += " res:" + response.body
        } catch (err) {
            console.log(err);
            fs.appendFile(logPath, err, logErrCall);
        }

        console.log(msg);
        fs.appendFile(logPath, msg, logErrCall);

        await sleepSec(getRandom(3, 5));
    }


}

main();

