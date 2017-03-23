var MessageSend = {
    URL: 'SendNewAppMessage',
    type: 'post',
    data: {}
};
var InitialLoad = {
    URL: 'LoadPreviousMessages',
    type: 'post'
};
var PreviousLoad = {
    URL: 'LoadPreviousMessages',
    type: 'post'
};
var senderImg = '';
var msgcontent;
var AppID = '';
var messgeId = '';
var viewState = '';
var a = '';
var chatHub = '';
var userId = 1;
$(function () {
    // Reference the auto-generated proxy for the hub.
    chatHub = $.connection.chatHub;
    // Create a function that the hub can call back to display messages.
    registerClientMethods();
    $.connection.hub.start().done(function () {
        registerEvents();
    });



    function registerEvents() {
        console.log('server connected.');
        chatHub.server.connect('dgsg');
    }

    function registerClientMethods() {
        chatHub.client.newMessage = function (Messages) {
          //  console.log(Messages);
            $("#PT_chatwindow").bindReceivedChatMsg(Messages);
        }

        chatHub.client.onConnected = function (User) {
          //  console.log(User);
        }

        chatHub.client.loadPreviousMsg = function (Notes) {
            $.each(Notes, function (key, note) {
            //    console.log(note);
                $("#PT_chatwindow").bindReceivedChatMsg(note);
            });

            $('#PT_chatwindow').animate({ scrollTop: $('#PT_chatwindow')[0].scrollHeight });
        }
    }

});

jQuery.fn.extend({
    reloadMsgs: function () {
        $("#PT_chatwindow").attr("data-id", "yes");
        var currentEl = this;
        $(currentEl).find("#PT_chatwindow").attr('data-referenceid', InitialLoad.data.referenceid);
      
        $(currentEl).find('ul').empty();

        chatHub.server.loadPreviousMessages(
            {
                riskNoteId: 0,
                riskRegisterId: InitialLoad.data.referenceid
            }
        );
        var scrollBottom = $(window).scrollTop() + $(window).height();
 
        $(currentEl).find('#PT_chatwindow').animate({ scrollTop: scrollBottom });

    },
    bindReceivedChatMsg: function (ChatObject) {
        var currentEl = this;


        if ($("#PT_chatwindow").attr('data-referenceid') == ChatObject.Register.Id) {
            msgcontent = ChatObject.Comments;
            senderImg = ChatObject.CreatedUser.Name;
            var LocalTime = new Date(ChatObject.CreatedDate);
            LocalTime.toString();
            MessgeTime = LocalTime;
            messgeId = ChatObject.Id;
            viewState = 'NO';


            if (userId == ChatObject.CreatedUser.Id) {
                var MsgBind = currentEl.messageTemplate().PersonalChatUI;
                $(currentEl).find('ul').append(MsgBind);
            }
            else {
                var MsgBind = currentEl.messageTemplate().ChatUI;
                $(currentEl).find('ul').append(MsgBind);
            }

        }
    },
    bindChatUI: function () {
        var ChatDesign = '';
        ChatDesign += '<div class="panel panel-primary chats" id="PT_Chat_Pannel"><div class="panel-body PT_chatul" style="overflow:auto;" id="PT_chatwindow">';
        ChatDesign += '<ul class="PT_chatList" id="PT_chatList"></ul></div><div class="panel-footer"><div class="input-group">';
        ChatDesign += '<input id="PT_chattxt" type="text" class="form-control input-sm" placeholder="Type your message here..." name="butAssignProd" />';
        ChatDesign += '<span class="input-group-btn"><button class="btn btn-warning btn-sm" id="PT_SendMsg" > Send</button>';
        ChatDesign += ' </span></div></div></div>';
        // $(selector).append(ChatDesign);
        $(this).html(ChatDesign);
        //$('#chatwindow').animate({ scrollTop: $('#chatwindow')[0].scrollHeight });
        //  $("#PT_layoutSctionB").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 80, "overflow-y": "auto", "max-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 80 })
        $("#PT_Chat_Pannel").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 80, "max-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 80 });
        $(".PT_chatul").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 135, "max-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 135, "overflow-y": "scroll" });
        $("#PT_layoutSctionB").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() -135, "max-height": $(window).height() - $("#PT_SecondHeader").height() - 135, "overflow-y": "scroll" });

        //$('#PT_chatwindow').on('scroll', function () {

        //    if ($('#PT_chatwindow').scrollTop() == 0)
        //        $(this).loadPreviousMsg();

           
        //});

    },
    bindInitialLoad: function (UInitialLoad) {
        InitialLoad.data = UInitialLoad.data;
        this.reloadMsgs();
    },
    sendMessage: function () {
        chatHub.server.sendNewAppMessage(
            {
                Register: {
                    Id: InitialLoad.data.referenceid
                },
                Comments: $("#PT_chattxt").val(),
                CreatedUser: {
                    Id: 1
                }
            }
        );

        $("#PT_chattxt").val('');

    },
    messageTemplate: function () {
        var firstBind = '';
        firstBind += '<li class="left clearfix PT_List_items" id="PT_chatboxItemsLeft"  data-msgId="' + messgeId + '" data-read="' + viewState + '"><span class="chat-img pull-left">';
        firstBind += '<span class="personImg img-circle">' + senderImg[0] + '</span></span>';
        firstBind += '<div class="PT_chat_body clearfix"><div class="PT_chat_header">';
        firstBind += '<span class="primary-font sendername">' + senderImg + '</span>';
        firstBind += '<small class="pull-right text-muted"><span class=" "  data-livestamp="' + MessgeTime + '"></span>' + '</small></div>';
        firstBind += '<p>' + msgcontent + '</p></div></li>';
        var secondbind = '';
        secondbind += '<li class="right clearfix PT_List_items" id="PT_chatboxItemsRight"  data-msgId="' + messgeId + '"   data-read="' + viewState + '"><span class="chat-img pull-right">';
        secondbind += '<span class="personImg1 img-circle">' + senderImg[0] + '</span></span>';
        secondbind += '<div class="PT_chat_body clearfix"><div class="PT_chat_header">';
        secondbind += '<small class=" text-muted"><span class=" "  data-livestamp="' + MessgeTime + '"></span>' + '</small>';
        secondbind += ' <span class=" primary-font pull-right sendername">' + senderImg + '</span>  </div>';
        secondbind += '<p>' + msgcontent + '</p></div></li>';
        // $('#chatwindow').animate({ scrollTop: $('#chatwindow')[0].scrollHeight });
        return {
            ChatUI: firstBind,
            PersonalChatUI: secondbind
        }
    },
    PT_doAjax: function (Url, Type, Data, ContentType, DataType, preLoader, getBack) {
        $.ajax({
            url: Url,
            type: Type,
            data: JSON.stringify(Data),
            contentType: ContentType,
            dataType: DataType,
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + $(".PT_Token").attr("data-token")); if (preLoader) $('.' + preLoader).css("display", 'block'); },
            complete: function () { if (preLoader) $('.' + preLoader).css("display", 'none') },
            success: function (Response) {
                getBack(null, Response);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                getBack({ Status: 0, InfoOpts: 501, Data: {} });
            }
        });
    }
});

$(document).on("click", "#PT_SendMsg", function () {
    $("#PT_chatwindow").sendMessage();
});
$(document).on("keypress", '#PT_chattxt', function (e) {
    var key = e.which;
    if (key == 13) {
        $("#PT_SendMsg").click();
    }
});
$(window).resize(function () {
    $("#PT_Chat_Pannel").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 80, "max-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 80 });
    $(".PT_chatul").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 135, "max-height": $(window).height() - $("#PT_SecondHeader").height() - 60 - 135, "overflow-y": "scroll" });
    $("#PT_layoutSctionB").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - 135, "max-height": $(window).height() - $("#PT_SecondHeader").height() - 135, "overflow-y": "scroll" });
});