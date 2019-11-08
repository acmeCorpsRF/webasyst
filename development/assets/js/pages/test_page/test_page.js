import '../index.js';

$(function () {
    console.log('Hello Webasyst!');

    let output = $('#output'),
        twist = '<div class="beautiful-addresses__generation-loading"></div>',
        generate = $('#generate'),

        search = (count) => {
            $.ajax({
                url: ('./btcaddr.php'),
                dataType: 'json',
                success: function (data) {
                    let collection = output.find('div');
                    collection.each(function (index) {
                        if (index == count) {
                            $(this).removeClass('beautiful-addresses__generation-loading')
                                .addClass('beautiful-addresses__generation-loaded');
                            if ((data.addr == undefined) || (data.pkey == undefined)) {
                                console.error('Error: ' + data.error);
                                $(this).append('<p style="color:#ff0000;"><b>Что-то пошло не так</b></p>');
                            } else {
                                $(this).append('<p><b>addr:</b> ' + data.addr + '</p>')
                                    .append('<p><b>pkey:</b> ' + data.pkey + '</p>');
                            }
                        }
                    });
                },
                error: function (data) {
                    if (data.status != 200) {
                        console.error('Error: ' + data.status + ' ' + ' ' + data.statusText)
                    } else {
                        if (typeof (data) === 'object') {
                            console.error('Error: ' + data.responseText);
                        }
                    }
                    let collection = output.find('div');
                    collection.each(function (index) {
                        if (index == count) {
                            $(this).removeClass('beautiful-addresses__generation-loading')
                                .addClass('beautiful-addresses__generation-loaded');
                            $(this).append('<p style="color:#ff0000;"><b>Что-то пошло не так</b></p>');
                        }
                    });
                }
            })
        };

    $(output).on('DOMSubtreeModified', function () {
        if (output.children('.beautiful-addresses__generation-loading').length >= 3) {
            generate.attr('disabled', true);
            generate.children().attr('disabled', true);
        } else {
            generate.removeAttr('disabled');
            generate.children().removeAttr('disabled');
        }
    });

    generate.click(function () {
        output.append(twist);
        let count = output.children().last().index();
        search(count);
    });

});
