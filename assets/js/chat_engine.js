class chatengine{
    constructor(chatboxid,useremail){
        this.chatbox=$(`#${chatboxid}`)
        this.useremail=useremail
        this.socket=io.connect('http://44.202.235.69:5000')
        if (this.useremail){
            this.coonectionHandler()
        }
    }
    coonectionHandler(){
        let self=this
        this.socket.on('connect',function(){
            console.log('connection established using sockets')
            self.socket.emit('join_room',{
                user_email:this.useremail,
                chatroom:'codeial'
            })
            self.socket.on('user_joined',function(data){
                console.log('A user joined',data)
            })
        })
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val()
            if (msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.useremail,
                    chatroom:'codeial'
                })
            }
        })
        self.socket.on('recieve_message',function(data){
            console.log('message recieved',data.message)
            let newmessage=$('<li>')
            let messagetype='other-message'
            if (data.user_email==self.useremail){
                messagetype='self-message'
            }
            newmessage.append($('<span>',{
                'html':data.message
            }))
            newmessage.append($('<sub>',{
                'html':data.user_email
            }))
            newmessage.addClass(messagetype)
            $('#chat-messages-list').append(newmessage)
        })
    }
}
