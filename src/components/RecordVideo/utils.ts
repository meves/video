export function download(filename: string, data: string | number | boolean) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:application/json;charset=utf8,' + encodeURIComponent(data));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}