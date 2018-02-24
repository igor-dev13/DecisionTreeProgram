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
            nodeWrapper = '.node-wrapper';

        $(node).first().addClass('active');

        $(button).on("click", function () {
            nextNodeId = $(this).data('link');
        });

        $(buttonNext).on("click", function () {
            $(activeNode).removeClass('active');
            nextNodeId = $(nodeWrapper).find('#' + nextNodeId).find('.button__next').data('link');
            $(nodeWrapper).find('#' + nextNodeId).addClass('active');
        });

        $(buttonPrev).on("click", function () {
            if ($($(activeNode).find('.node__label-title')).length) {
                sendHistory();
            }

            $(activeNode).removeClass('active');
            nextNodeId = $(nodeWrapper).find('#' + nextNodeId).find('.button__back').data('link');
            $(nodeWrapper).find('#' + nextNodeId).addClass('active');
        });

        $(buttonStart).on("click", function () {
            sendHistory();
            $(activeNode).removeClass('active');
            $(node).first().addClass('active');
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
    })();
});