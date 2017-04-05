getData() {
    const url = window.location.href;
    let composer = url.slice(url.indexOf('Composer') + 'Composer:'.length);
    let composition;
    composer = composer.replace(new RegExp('_', 'g'), ' ');
    if (url.indexOf('Composition') >= 0) {
        composition = url.slice(url.indexOf('Composition:') + 'Composition:'.length, url.indexOf(';Composer'));
        composition = composition.replace(new RegExp('_', 'g'), ' ');
    }
}