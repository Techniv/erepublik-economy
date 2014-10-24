/**
 * Created by Vincent Peybernes on 23/10/2014.
 */

console.log("test");

chrome.tabs.onUpdated.addListener(navigate)

function navigate(){
    var details = arguments[arguments.length-1];

    if(/www\.erepublik\.com\/[a-z]{2}/.test(details.url)){
        chrome.pageAction.show(details.id);
    }
}

console.log(options);

chrome.alarms.create("erk-eco-timer",{
    when: Date.now().valueOf(),
    periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(timer);

function timer(alarm){
    if(alarm.name != "erk-eco-timer") return;
}

function getPage(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onload = function(){
        var dom = document.implementation.createHTMLDocument();
        var parse = CONST.regexp.body.exec(this.responseText);
        if(parse){
            dom.body.innerHTML = parse[1];
            callback(err,dom);
            return;
        }
        callback(new Error("Parsing error"));
    }
    xhr.onerror = callback;
    xhr.send(null);
}

var xhr = new XMLHttpRequest();
xhr.open('GET', options.url.market.money, false);
xhr.onload = function(e){
    var doc = document.implementation.createHTMLDocument();
    doc.body.innerHTML = /<body.*?>((.|[\n\r])*)<\/body>/.exec(this.responseText)[1];
    console.dir(doc.querySelector('.exchange_offers'));
};
xhr.send(null);
