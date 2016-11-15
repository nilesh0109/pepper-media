var json_data;
var tabController = document.getElementsByClassName('tabs-controller')[0];
document.addEventListener('click', handler, false);

function handler(event) {

    var target = event.target.parentNode;
    if (target.className.hasClass('tab-link') || target.className.hasClass('tab-link-mob')) {

        var tabContent = Array.prototype.slice.call(document.getElementsByClassName('tab-content'));
        var tablinks = Array.prototype.slice.call(document.getElementsByClassName('tab-link'));
        var ind = target.className.hasClass('tab-link') ? tablinks.getindexOf(target) : tabContent.getindexOf(target.parentNode);
        var curLink = tablinks[ind];
        var currentContent = tabContent[ind];
        if (currentContent.querySelectorAll('.content-wrapper').length <= 0) {
            currentContent.className = currentContent.className + ' loading';
            currentContent.appendChild(loadContent(json_data[ind]));
            currentContent.className = currentContent.className.replace(/\bloading\b/, "");
        }
        tablinks.forEach(function(tablink, i) {
            tablink.className = tablink.className.replace(/\bactive\b/g, '');
            tabContent[i].className = tabContent[i].className.replace(/\bactive\b/g, '');
        });

        curLink.className = curLink.className.trim() + ' active';
        currentContent.className = currentContent.className.trim() + ' active';
    }
};

Array.prototype.getindexOf = function(ele) {
    return this.indexOf(ele);
}

String.prototype.hasClass = function(className) {;
    return this.search(new RegExp('(?:^|\\s)' + className + '(?:\\s|$)', 'g')) >= 0;
}

tabController.className = tabController.className + ' loading';
document.addEventListener('DOMContentLoaded', loadData, false);

function loadData() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            if (http.status == 200) {
                json_data = JSON.parse(http.responseText);
                console.log(json_data);
                makeLinks(json_data);
            } else if (http.status == 400) {
                console.log('There was an error 400');
            } else {
                console.log('something else other than 200 was returned');
            }
            tabController.className = tabController.className.replace(/\bloading\b/, "");
        }
    };

    http.open("GET", "data.json", true);
    http.send();

}

function makeLinks(data) {
    if (data.length > 0) {

        tabController.innerHTML = "";
        var linksWrapper = createElementByClass('ul', 'tab-links-wrapper');
        tabController.appendChild(linksWrapper);
        var contentWrapper = createElementByClass('div', 'tab-content-wrapper');
        tabController.appendChild(contentWrapper);
        data.forEach(function(tab, index) {
            var li = createElementByClass('li', 'tab-link');
            li.className = index == 0 ? li.className + ' active' : li.className;
            var a = createElementByClass('a', '');
            a.href = "javascript:void(0)";
            a.innerHTML = tab.tabName;
            li.appendChild(a);
            linksWrapper.appendChild(li);

            var div = createElementByClass('div', 'tab-content');
            div.className = index == 0 ? div.className + ' active' : div.className;
            var innerLi = createElementByClass('div', 'tab-link-mob');

            innerLi.appendChild(a.cloneNode(true));
            div.appendChild(innerLi);
            contentWrapper.appendChild(div);
            if (index == 0) {
                div.appendChild(loadContent(tab));
            }
        });
    }
}


function createElementByClass(tag, classname) {
    var element = document.createElement(tag);
    element.className = classname;
    return element;
}

function loadContent(content) {

    var wrapper = createElementByClass('div', 'content-wrapper');
    var h4 = createElementByClass('h4', "heading");
    h4.innerHTML = content.tabHeading;
    wrapper.appendChild(h4);
    var p = document.createElement("p");
    p.innerHTML = content.tabContent;
    wrapper.appendChild(p);
    return wrapper;

}