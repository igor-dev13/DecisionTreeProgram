$(document).ready(function () {
    (function () {
        // переход по нодам
        var node = '.node',
            activeNode = '.node.active',
            nextNodeId = "",
            button = '.button',
            buttonNext = '.button.button__next',
            buttonPrev = '.button.button__back',
            buttonStart = '.button.button__start',
            nodeWrapper = '.node-wrapper',
            historyWrapper = '.history',
            historyNodes = [];

        $(node).first().addClass('active');

        $(button).on("click", function () {
            nextNodeId = $(this).data('link');
        });

        $(buttonNext).on("click", function () {
            var historyQuestion = $(activeNode).find('.node__title').text(),
                historyChoise = $(this).text();
            addHistoryItem(historyQuestion, historyChoise);

            $(activeNode).removeClass('active');
            nextNodeId = $(nodeWrapper).find('#' + nextNodeId).find('.button__next').data('link');
            $(nodeWrapper).find('#' + nextNodeId).addClass('active');
            printHistory();
        });

        $(buttonPrev).on("click", function () {
            if ($($(activeNode).find('.node__label-title')).length) 
                sendHistory();
            
            removeHistoryItem();
            $(activeNode).removeClass('active');
            nextNodeId = $(nodeWrapper).find('#' + nextNodeId).find('.button__back').data('link');
            $(nodeWrapper).find('#' + nextNodeId).addClass('active');
        });

        $(buttonStart).on("click", function () {
            sendHistory();
            $(activeNode).removeClass('active');
            $(node).first().addClass('active');
            clearHistory();
        });

        var sendHistory = function () {
            var guid = $(activeNode).attr('id'),
                label = $(activeNode).find('.node__label-title') ? $(activeNode).find('.node__label-title').text() : "";

            $.ajax({
                type: "POST",
                async: false,
                url: "/history",
                data: JSON.stringify({ guid: guid, label: label }),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {},
            });
        }

        // отправка статистики
        $(window).on("unload", function (e) {
            sendHistory();
        });

        // start отображение истории
        var addHistoryItem = function (historyQuestion, historyChoise) {
            var historyItem = { historyQuestion, historyChoise }
            historyNodes.push(historyItem);
        };

        var removeHistoryItem = function () {
            historyNodes.length > 0 ? historyNodes.pop() : '';
            printHistory();
        };

        var printHistory = function () {
            $(historyWrapper).empty();

            historyNodes.forEach(function (item, index) {
                var historyQuestion = "<div class='history__question'>" + item.historyQuestion + "</div>",
                    historyChoise = "<div class='history__choise'> — " + item.historyChoise + "</div>",
                    historyItem = "<div class='history__item'>" + historyQuestion + historyChoise  + "</div>";
                $(historyWrapper).append(historyItem);
            });
        };

        var clearHistory = function() {
            historyNodes = [];
            printHistory();
        };

        var historyItem = "<div class='history__item'></div>";
        $(historyWrapper).append(historyItem);
        // end отображение истории

    })();
});