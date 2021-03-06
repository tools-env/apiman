/// <reference path="../apimanPlugin.ts"/>
/// <reference path="../rpc.ts"/>
module Apiman {
    
    export var UserProfileController = _module.controller("Apiman.UserProfileController",
        ['$q', '$rootScope', '$scope', '$location', 'UserSvcs','CurrentUserSvcs', 'CurrentUser', 'PageLifecycle',
        ($q, $rootScope, $scope, $location, UserSvcs, CurrentUserSvcs, CurrentUser, PageLifecycle) => {
            var pageData = {
                user: $q(function(resolve, reject) {
                    CurrentUserSvcs.get({ what: 'info' }, resolve, reject);
                })
            };

            $scope.updatedUser = {
                fullName: undefined,
                email: undefined
            };
            

            $scope.cancel = function() {
                $location.path($rootScope.pluginName);
            };
            
            $scope.save = function() {
                $scope.updateButton.state = 'in-progress';
                CurrentUser.getCurrentUser().then(function (currentUser) {
                    UserSvcs.update({ user: currentUser.username }, $scope.updatedUser, function() {
                        $scope.updateButton.state = 'complete';
                        $scope.user.fullName = $scope.updatedUser.fullName;
                        $scope.user.email = $scope.updatedUser.email;
                        $scope.userForm.$setPristine();
                    }, PageLifecycle.handleError);
                });
            };
            
            PageLifecycle.loadPage('UserProfile', undefined, pageData, $scope, function() {
                $scope.updatedUser.fullName = $scope.user.fullName;
                $scope.updatedUser.email = $scope.user.email;
                PageLifecycle.setPageTitle('user-profile');
            });
        }]);

}
