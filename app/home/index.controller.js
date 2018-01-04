(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService,$scope) {
        var vm = this;

        vm.user = null;
        vm.isChatOpened = false;
        vm.isChatClosed = true;
        vm.openChat = openChat;
        vm.closeChat = closeChat;
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function openChat(){
            vm.isChatOpened = true;
            vm.isChatClosed = false;
        };
        function closeChat(){
            vm.isChatOpened = false;
            vm.isChatClosed = true;
        };
    }

})();