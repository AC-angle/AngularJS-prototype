/**
 * @author yelloxing
 * 2020-07-06
 * 数字或金额格式化
 *
 * 12345.12  ->  12,345.12
 * ￥12345.1 ->  ￥12345.1
 * 
 */
(function (window, angular, undefined) {
    "use strict";

    angular.module('ui.libraries').filter('numberFtr', ["$filter", function ($filter) {
        return function (input, dot) {
            input = input == undefined ? "" : (input + "");

            var pre = "";
            // 提取开头
            if (!/^\d/.test(input) && input.length > 0) {
                pre = input[0];
                input = input.substr(1);
            }

            var inputs = input.split('.');

            // 为了方便，追加一个辅助
            inputs.push('');

            // 格式化整数部分

            var preZeroNum = 3 - inputs.length % 3;
            if (preZeroNum == 1) inputs[0] = "0" + inputs[0];
            if (preZeroNum == 2) inputs[0] = "00" + inputs[0];

            inputs[0] = inputs[0].split(/(\d{3})/).join('=').replace(/==/g, ',').replace(/=/g, '');

            // 格式化小数部分

            if (arguments.length > 1) {
                var zeroStr = "", i;
                for (i = 0; i < dot; i++) zeroStr += "00";
                inputs[1] = inputs[1] + zeroStr;
                inputs[1] = inputs[1].substr(0, dot);
            }

            return pre + inputs[0].substr(preZeroNum) + (inputs[1] == "" ? "" : ("." + inputs[1]));
        };
    }]);
})(window, window.angular);
