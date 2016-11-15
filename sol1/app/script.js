document.addEventListener('click', handler, true);

function handler(event) {

    var target = event.target.parentNode;
    if (target.className.hasClass('tab-link') || target.className.hasClass('tab-link-mob')) {
        var tabContent = Array.prototype.slice.call(document.getElementsByClassName('tab-content'));
        var tablinks = Array.prototype.slice.call(document.getElementsByClassName('tab-link'));
        var ind = target.className.hasClass('tab-link') ? tablinks.getindexOf(target) : tabContent.getindexOf(target.parentNode);
        var curLink = tablinks[ind];
        var currentContent = tabContent[ind];

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