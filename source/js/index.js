import menu from './utils/menu.js';
import MicroModal  from './components/MicroModal.js';
import anim        from './utils/anim.js';

function modalDefault() {
    MicroModal.init({
        openTrigger         : 'data-modal-open',
        closeTrigger        : 'data-modal-close',
        openClass           : 'is-open',
        disableScroll       : true,
        disableFocus        : false,
        awaitOpenAnimation  : true,
        awaitCloseAnimation : true,
        debugMode           : false,
    });
}


// Init
function init() {
    menu();
    modalDefault();
    anim();
}

(function () {
    init();
}());
