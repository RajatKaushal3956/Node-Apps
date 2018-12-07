var socket = io();
            function scrollToBottom(){
                var messages = jQuery('#messages');
                var newMessage = messages.children('li:last-child');
                var clientHeight = messages.prop('clientHeight');
                var scrollTop = messages.prop('scrollTop');
                var scrollHeight = messages.prop('scrollHeight');
                var newMessageHeight = newMessage.innerHeight();
                var lastMessageHeight = newMessage.prev().innerHeight();

                if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
                    console.log('scroll down');
                }
            }
            socket.on('connect',function(){
               var params = jQuery.deparam(window.location.search);
               socket.emit('join',params,function(err){
                    if(err){
                        alert(err);
                        window.location.href = '/';
                    }
                    else{
                        console.log('No error');
                    }
               });


            });

            socket.on('disconnect',function(){
                console.log('disconnected from server');
            });

            socket.on('updateUserList',function(users){
                var ol = jQuery('<ol></ol>');

                users.forEach(function(user){
                    ol.append(jQuery('<li></li>').text(user));
                })

                jQuery('#users').html(ol);
            });
            
            socket.on('newMessage',function(message){
                var formattedTime = moment(message.createdAt).format('h:mm a');
                var template = jQuery('#message-template').html();
                var html = Mustache.render(template, {
                  text: message.text,
                  from: message.from,
                  createdAt: formattedTime
                });

                jQuery('#messages').append(html);
                scrollToBottom();
            });
            socket.on('newEmail',function(email){
                console.log('new Email',email);
            });

jQuery('#message-form').on('submit',function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    var message = jQuery.deparam(window.location.search);
    socket.emit('createMessage',{
        room:message.room,
        from:message.name,
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('')
    });
});
