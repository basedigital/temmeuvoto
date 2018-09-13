//https://reactjs.org/docs/javascript-environment-requirements.html
//Warning: React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills

import 'whatwg-fetch'

import 'core-js/fn/object/assign'; //IE 11
import 'core-js/fn/promise'; //IE 11
import 'core-js/fn/set'; //IE 10 (react-dom)
import 'core-js/fn/array/includes'; //IE 10
import 'core-js/fn/map'; //IE 10
import 'core-js/fn/array'; //IE 11
import 'core-js/es6/string'; //IE 10
import 'core-js/fn/object/define-property'; //IE 9
import 'core-js/fn/weak-map'; //IE 10

if (!global['requestAnimationFrame']) { //IE 9
    global['requestAnimationFrame'] = function (callback) {
        setTimeout(callback, 30);
    };
}

if (!global['WebSocket']) { //IE 9
    global['WebSocket'] = function() {

    }
}