(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController($q, logger, weatherService) {
        var vm = this;
        vm.news = [
            {
                type: 'success',
                msg: 'Well done! You successfully read this important alert message.'
            }
        ];
        vm.closeAlert = closeAlert;

        activate();

        function activate() {
            var promises = [getWeather()];
            return $q.all(promises).then(promiseDone);

            function promiseDone (data) {
                logger.info('Activated Dashboard View');
            }
        }

        function closeAlert (index) {
            vm.news.splice(index, 1);
        }

        function getWeather () {
            return weatherService.getWeather().then(getWeatherDone);

            function getWeatherDone (data) {
                vm.weatherStat = data.query.results.channel;
                return vm.weatherStat;
            }
        }
    }
})();
