
require('./bootstrap');

import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

let onlineUserLength =0

window.Echo.join(`online`)
    .here((users) => {

        onlineUserLength = users.length;

        if(users.length >1){
            $('#no-online-user').css('display','none');
        }

        let userId = $('meta[name=user-id]').attr('content')

        users.forEach(function(user){

            if(user.id == userId){
                return;
            }

            $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span class="icon icon-circle text-success" ></span> ${user.name}</li>`)
        });
    })
    .joining((user) => {
        onlineUserLength++;
        $('#no-online-user').css('display','none');
        $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span class="icon icon-circle text-success" ></span> ${user.name}</li>`)
    })
    .leaving((user) =>{
        onlineUserLength--;
        if(onlineUserLength == 1){
            $('#no-online-user').css('display','none');
        }
        $('#user-'+ user.id).remove();

    });


    $('#chat-text').keypress(function(e){

        if(e.which == 13){
            e.preventDefault();
            let body = $(this).val();
            let url =$(this).data('url');
            let userName = $('meta[name=user-name]').attr('content');
            console.log(userName)
            $(this).val('');

            $('#chat').append(`
                <div class="mt-4 w-50 text-white p-3 rounded  float-right bg-primary">
                        <p>${userName}</p>
                        <p>${body}</p>
                </div>
                <div class="clearfix"></div>
            `)

            let data={
                '_token':$('meta[name=csrf-token]').attr('content'),
                body
            }

            $.ajax({
                method:'post',
                url:url,
                data:data
            })
        }

    });//End Key press


    window.Echo.channel('chat-group')
    .listen('MessageDelivered', (e) => {
        $('#chat').append(`
            <div class="mt-4 w-50 text-white p-3 rounded  float-left bg-warning">
                    <p>${e.message.user.name}</p>
                    <p>${e.message.body}</p>
            </div>
            <div class="clearfix"></div>
        `)
    });
