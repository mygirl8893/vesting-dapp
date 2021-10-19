setTimeout(() => {
  var sizes = [ 4, 5, 7, 8, 12, 16, 20, 24, 32, 36, 40, 48, 56, 60, 64, 72, 80, 96 ];
  var mediaSize = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight); // for both orientations
  var style = document.createElement('style');
  var css = [];

  style.id = 'css variables'
  style.type = 'text/css';

  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i];

    css.push('--size-' + size + ': ' + Math.round(mediaSize * size / 414) + 'px;');
  }

  css = ':root {' + css.join('') + '}';

  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);

}, 0);
