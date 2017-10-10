(function () {
    angular.module("FormList")
        .service("ValService", ValService);
    function ValService() {
        var svc = this;

        svc.stack = [];
        // ---- inputs ---- //
        //svc.inputfName = _inputfName;
        //svc.inputlName = _inputlName;
        //svc.passOne = _passOne;
        //svc.passTwo = _passTwo;
        //svc.clicky = _clicky;
        // ---
    }
})();