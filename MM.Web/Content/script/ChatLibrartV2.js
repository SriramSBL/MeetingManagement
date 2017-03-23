var MessageSend = {
    URL: '/api/chat/DoDocumentChat',
    type: 'post',
    data: {}
};
var InitialLoad = {
    URL: '/api/chat/loadRecentDocumentChat',
    type: 'post'
};
var PreviousLoad = {
    URL: '/api/chat/loadPreviousDocumentChat',
    type: 'post'
};
var senderImg = '';
var msgcontent;
var AppID = '';
var messgeId = '';
var viewState = '';
var a = '';


var userId = '';
PT_doAjax(PT_GetSession, 'get', '', 'application/json', "json", '', function (err, result) {
    if (err) {
    }
    else {
        if (result.length != 0) {
            userId = result.UserID;
            //LoadChat();

        }
    }

});




$.connection.hub.url = "/signalr/hubs";

var Hosting = "";
var temp = window.location.href;
var arr = temp.split("/");
var dom = arr[2].split(".");
var length = dom.length;
if (length == 1) {
    Hosting = "Localhost";
}
else {
    Hosting = dom[length - 2];
}

var CheckLocDom = 'Localhost';
var CheckSblDom = 'Sblsol';
var CheckConDom = 'Connate';

if (Hosting.toUpperCase() == CheckConDom.toUpperCase()) {
    console.log('Connate');
    $.connection.hub.url = "/signalr/hubs";
    var Url = window.location.href;
    var AppName = Url.split("/");
    AppID = AppName[4];
    InitialLoad.AppID = AppID;
    PreviousLoad.AppID = AppID;
}
else if (Hosting.toUpperCase() == CheckLocDom.toUpperCase() || Hosting.toUpperCase() == CheckSblDom.toUpperCase()) {

    if (Hosting.toUpperCase() == CheckSblDom.toUpperCase()) {
        console.log('Sblsol');
        $.connection.hub.url = "/signalr/hubs";
        var Url = window.location.href;
        var AppName = Url.split("/");
        AppID = AppName[5];
        AppID = 'A000001';
    }
    else {
        console.log('Localhost');
        $.connection.hub.url = "http://P0000001.sblsol.com/signalr/hubs";
        var Url = window.location.href;
        var AppName = Url.split("/");
        AppID = 'A000001';
    }

}

var chatHub = $.connection.chatManager;
registerClientMethods(chatHub);
$.connection.hub.start("Hello").done(function () {
    registerEvents(chatHub);
});


function registerEvents(chatHub) {
    console.log('server connected.');
    chatHub.server.connect({ UserID: userId });
}

function registerClientMethods(chatHub) {

    chatHub.client.receiveAppMessage = function (Messages) {
        $("#PT_chatwindow").bindReceivedChatMsg(Messages);
    }
    chatHub.client.unSceenMessages = function (Messages) {
        console.log(Messages);

        $("#PT_chatwindow").setUnsceen(Messages);
    }
    chatHub.client.onConnected = function (User) {
        console.log(User);
    }
}


jQuery.fn.extend({
    reloadMsgs: function () {
        $("#PT_chatwindow").attr("data-id", "yes");
        var currentEl = this;
        this.PT_doAjax(InitialLoad.URL, InitialLoad.type, InitialLoad.data, 'application/json', "json", '', function (err, result) {

            if (err) {
                console.log(err);
            }
            else {

                $('#PT_chatwindow ul').remove();
                $(currentEl).find("#PT_chatwindow").html('<ul class="PT_chatList"></ul>');
                $(currentEl).find("#PT_chatwindow").attr('data-referenceid', InitialLoad.data.referenceid);
                $(currentEl).find("#PT_chatwindow").attr('data-AppID', AppID);


                if (result.length > 0) {
                    $.each(result, function (key, value) {
                        msgcontent = value.Message;
                        senderImg = value.Sender.UserName;
                        var LocalTime = new Date(value.Date);
                        // LocalTime.toString();

                        MessgeTime = LocalTime;
                        messgeId = value.MessageID;
                        viewState = 'YES';
                        if (userId == value.Sender.UserID) {
                            var MsgBind = currentEl.messageTemplate().PersonalChatUI;
                            $(currentEl).find("#PT_chatwindow").find('ul').prepend(MsgBind);

                        }
                        else {
                            var MsgBind = currentEl.messageTemplate().ChatUI;
                            $(currentEl).find("#PT_chatwindow").find('ul').prepend(MsgBind);

                        }

                    });
                    var scrollBottom = $(window).scrollTop() + $(window).height();
                    $(currentEl).find('#PT_chatwindow').animate({ scrollTop: scrollBottom });

                    function explode() {
                        $("#PT_chatwindow").attr("data-id", "No");

                    }
                    setTimeout(explode, 2000);
                    chatHub.server.sendUnsceenMessage({ AppID: $("#PT_chatwindow").attr('data-AppID'), ReferenceID: InitialLoad.data.referenceid });
                    $('#PT_chatwindow').visibleList($('.PT_chatul'));
                }
            }
        });
    },
    loadPreviousMsg: function () {

        if ($("#PT_chatwindow").attr("data-id") === 'No') {
            var currentEl = this;

            this.PT_doAjax(PreviousLoad.URL, PreviousLoad.type, { "referenceid": $("#PT_chatwindow").attr('data-referenceid'), "PreviousDocChatID": $("#PT_chatwindow ul li:first-child").attr('data-msgid'), AppID: AppID }, 'application/json', "json", '', function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.length > 0) {
                        if ($(currentEl).find("ul").length == 0) {
                            $(currentEl).html('<ul class="PT_chatList"></ul>');
                            $.each(result, function (key, value) {

                                msgcontent = value.Message;
                                senderImg = value.Sender.UserName;
                                var LocalTime = new Date(value.Date);
                                LocalTime.toString();
                                MessgeTime = LocalTime;
                                messgeId = value.MessageID;
                                viewState = 'YES';



                                if (userId == value.Sender.UserID) {
                                    var MsgBind = currentEl.messageTemplate().PersonalChatUI;
                                    $(currentEl).find('ul').prepend(MsgBind);
                                }
                                else {
                                    var MsgBind = currentEl.messageTemplate().ChatUI;
                                    $(currentEl).find('ul').prepend(MsgBind);
                                }
                            });
                            var PrevscrollHeight = result.length * 54;
                            console.log(PrevscrollHeight);
                            $('#PT_chatwindow').animate({ scrollTop: PrevscrollHeight });
                        }
                        else {
                            $.each(result, function (key, value) {
                                msgcontent = value.Message;
                                senderImg = value.Sender.UserName;
                                var LocalTime = new Date(value.Date);
                                LocalTime.toString();
                                MessgeTime = LocalTime;

                                messgeId = value.MessageID;
                                viewState = 'YES';

                                if (userId == value.Sender.UserID) {
                                    var MsgBind = currentEl.messageTemplate().PersonalChatUI;
                                    $(currentEl).find('ul').prepend(MsgBind);
                                }
                                else {
                                    var MsgBind = currentEl.messageTemplate().ChatUI;
                                    $(currentEl).find('ul').prepend(MsgBind);
                                }
                            });
                        }
                        var PrevscrollHeight = result.length * 54;
                        console.log(PrevscrollHeight);

                        $('#PT_chatwindow').animate({ scrollTop: PrevscrollHeight });

                    }
                    chatHub.server.sendUnsceenMessage({ AppID: $("#PT_chatwindow").attr('data-AppID'), ReferenceID: InitialLoad.data.referenceid });
                }
            });
        }
    },
    setUnsceen: function (ChatObject) {
        $.each(ChatObject.Messages, function (key, value) {
            messgeId = value.MessageID;
            var $ul = $("#PT_chatwindow ul");
            $ul.find('li').each(function (n) {
                if ($(this).attr('data-msgid') == messgeId)
                    $(this).attr('data-read', 'NO');

            });
        });
    },
    bindReceivedChatMsg: function (ChatObject) {
        var currentEl = this;


        if ($("#PT_chatwindow").attr('data-AppID') == ChatObject.AppID && $("#PT_chatwindow").attr('data-referenceid') == ChatObject.ReferenceID) {
            msgcontent = ChatObject.Messages[0].Message;
            senderImg = ChatObject.Messages[0].Sender.UserName;
            var LocalTime = new Date(ChatObject.Messages[0].Time);
            console.log(ChatObject.Messages[0].Time);
            console.log(LocalTime);
            LocalTime.toString();
            MessgeTime = LocalTime;
            messgeId = ChatObject.Messages[0].MessageID;
            viewState = 'NO';


            if (userId == ChatObject.Messages[0].Sender.UserID) {
                var MsgBind = currentEl.messageTemplate().PersonalChatUI;
                $(currentEl).find('ul').append(MsgBind);
            }
            else {
                var MsgBind = currentEl.messageTemplate().ChatUI;
                $(currentEl).find('ul').append(MsgBind);
            }

            $('#PT_chatwindow').animate({ scrollTop: $('#PT_chatwindow')[0].scrollHeight });
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
        $("#PT_Chat_Pannel").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 80, "max-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 80 });
        $(".PT_chatul").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 135, "max-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 135 ,"overflow-y":"auto"});

        $('#PT_chatwindow').on('scroll', function () {

            if ($('#PT_chatwindow').scrollTop() == 0)
                $(this).loadPreviousMsg();

            $('#PT_chatwindow').visibleList($('.PT_chatul'));
        });

    },
    bindMessageSend: function (UMessageSend) {
        //MessageSend = UMessageSend;
    },
    bindInitialLoad: function (UInitialLoad) {
        //InitialLoad = UInitialLoad;
        InitialLoad.data = UInitialLoad.data;
        this.reloadMsgs();
    },
    bindPreviousLoad: function (UPreviousLoad) {
        //PreviousLoad = UPreviousLoad;
    },
    sendMessage: function () {
        $("#PT_chatwindow").attr("data-id", "No");

        var currentEl = this;

        console.log();
        this.PT_doAjax(MessageSend.URL, MessageSend.type, { ReferenceID: $("#PT_chatwindow").attr('data-referenceid'), "Messages": [{ "Message": $("#PT_chattxt").val(), "Sender": { "userid": userId } }] }, 'application/json', "json", '', function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                chatHub.server.sendNewAppMessage({ Messages: [{ Message: result.Messages[0].Message, MessageID: result.Messages[0].MessageID, Time: result.Messages[0].Time }], ReferenceID: $("#PT_chatwindow").attr('data-referenceid'), AppID: $("#PT_chatwindow").attr('data-AppID')/*$('#chatwindow').getAppName()*/ });

                $("#PT_chattxt").val('');
            }
        });
    },
    sawTheMessage: function (Message) {
        console.log(Message);
        chatHub.server.sawTheMessage(Message);

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
    visibleList: function (element) {


        var $ul = $(element);
        $ul.find('li').each(function (n) {
            var $this = $(this);
            if ($this.position().top + $this.height() - $ul.position().top > 0 && $this.position().top - $ul.position().top < $ul.height()) {
                if ($this.attr("data-read") == "NO") {
                    $this.attr("data-read", "YES");
                    $("#PT_chatwindow").sawTheMessage({ Messages: [{ MessageID: $this.attr("data-msgid") }], ReferenceID: $("#PT_chatwindow").attr('data-referenceid'), AppID: $("#PT_chatwindow").attr('data-AppID') });
                }

            }
        });

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
    $("#PT_Chat_Pannel").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 80, "max-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 80 });
    $(".PT_chatul").css({ "min-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 135, "max-height": $(window).height() - $("#PT_SecondHeader").height() - $("#PT_TopHeader").height() - 135, "overflow-y": "auto" });
});