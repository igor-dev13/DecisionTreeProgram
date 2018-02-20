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
            $(activeNode).removeClass('active');
            nextNodeId = $(nodeWrapper).find('#' + nextNodeId).find('.button__back').data('link');
            $(nodeWrapper).find('#' + nextNodeId).addClass('active');
        });

        $(buttonStart).on("click", function () {
            sendHistiry();
            $(activeNode).removeClass('active');
            $(node).first().addClass('active');
        });

        var sendHistiry = function () {

            var id = $(activeNode).attr('id'),
                title = $(activeNode).find('.node__title').text();

            $.ajax({
                type: "POST",
                async: false,
                url: "/history",
                data: JSON.stringify({ id: id, title: title }),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {},
            });
        }

        // отправка статистики
        $(window).on("unload", function (e) {
            sendHistiry();
        });
    })();
});