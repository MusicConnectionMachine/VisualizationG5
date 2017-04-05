function startUpWidget() {
    //Transform URL to Information
    var url = window.location.href;
    var indexToCutOut = url.indexOf("wiki") + 5;
    var urlAppendix;
    //If Category => Composer
    if (url.indexOf("Category") >= 0) {
        indexToCutOut = indexToCutOut + 9;
        url = url.slice(indexToCutOut);
        var lastname = url.slice(0,url.indexOf(","));
        var firstname = url.slice(url.indexOf(",")+2)
        urlAppendix =  "Composer:" + firstname + "_" + lastname;
    }
    else {
        url = url.slice(indexToCutOut);
        var composition = url.slice(0,url.indexOf("(")-1);
        var composerPart = url.slice(url.indexOf("(")+1);
        var lastname = composerPart.slice(0,composerPart.indexOf(","));
        var firstname = composerPart.slice(composerPart.indexOf(",")+2,composerPart.length-1);
        var composer = firstname + "_" + lastname;
        urlAppendix = "Composition:" + composition + ";Composer:" + composer;
    }
    //CHANGE URL to domain
    document.getElementById("WIDGET-ID").src = "WIDGET-URL" + "?" + urlAppendix;
}
startUpWidget();