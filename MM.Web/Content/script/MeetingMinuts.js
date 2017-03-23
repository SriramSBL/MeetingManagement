var currentMeetingSchedule = {
    Subject: "",
    Id: 0,
    Members: [{MemberAs:{Name:''}}],
    StartDate: "",
    Location: { Id: 1 },
    StatusType: "Created",
    CreatedUser: { Id: 1,Name:'' },
    Titles: []
};
var mydate;
var tempMeetingSchedule = {
    Subject: "",
    Id: 0,
    Members: [],
    StartDate: "",
    Location: { Id: 1 },
    StatusType: "Created",
    CreatedUser: { Id: 1 },
    Titles: []
};

var runningMeeting = {};

var headingCount = 0;
var topicCount = 0;

var singleAgendaTopic = {
    Title: '',
    headingCount: 0,
    SerialId: 0,
    SubTitles: []
};

var headingList = [];
var topicList = [];

var orderId = 0;

var selectedDataItems = [];

var originalText = [];

var MemberAs = null;

var isaPhone = function () {
    check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

$(document).on("click", "#meetingId", function () {
    $(".modal-dialog").css("width", "98%");
    $(".thirdBlock").css("width", "24%");
    $(".formcontainer").css("margin-top", "0px");
    $(".formcontainer").css("margin-top", "10px");
    $(".meetinActions").css({ "min-height": "0px" });
});
$(document).on("click", ".close", function () {

    $(".thirdBlock").css("width", "50% ");
    $(".formcontainer").css("margin-top", "70px");
    if (isaPhone) {
        $(".modal-dialog").css("width", "900px");
    }
});
$(document).on("click", "#Meetingdatepicker", function () {
    var datetimepicker = $("#Meetingdatepicker").data("kendoDateTimePicker");
    datetimepicker.open("date");
});

$(document).on("keyup", "#Meetingdatepicker", function (e) {
    $('#Meetingdatepicker').val('');
});

$(document).on("focus", "#Meetingdatepicker", function (e) {
    $("#Meetingdatepicker").removeClass('error-class');
});

$(document).on("focus", "#txtLocation", function (e) {
    $("#txtLocation").removeClass('error-class');
});

$(document).on("focus", "#txtsubject", function (e) {
    $("#txtsubject").removeClass('error-class');
});

//$(document).on("focus", ".k-edit-cell", function () {
//    console.log("originalText");
//    console.log(selectedDataItems);
//    originalText = selectedDataItems;
//});

var newMeeting = false;

$(document).on("blur", ".k-edit-cell", function () {
    console.log(newMeeting);
    if (!newMeeting) {
        updateSingleAgenda(selectedDataItems);
    } else {
        tempMeetingSchedule.Titles[selectedDataItems.OrderId - 1].Title = selectedDataItems.Title;
    }
});

$(document).on("click", ".addInvities", function () {
    MemberAs = 0;
    console.log(MemberAs);
});

$(document).on("click", ".addCcs", function () {
    MemberAs = 2;
    console.log(MemberAs);
});

//Dom Actions      ---------------------------------------------------------

//New Meeting create form.
//Clears the form and loads the PopUp.

function emptyData() {
    currentMeetingSchedule = {
        Subject: "",
        Id: 0,
        Members: [],
        StartDate: "",
        Location: { Id: 1 },
        StatusType: "Created",
        CreatedUser: { Id: 1 },
        Titles: []
    };
    tempMeetingSchedule = {
        Subject: "",
        Id: 0,
        Members: [],
        StartDate: "",
        Location: { Id: 1 },
        StatusType: "Created",
        CreatedUser: { Id: 1 },
        Titles: []
    };
    headingCount = 0;
    topicCount = 0;
    orderId = 0;

}

$(document).on("click", ".PT_SecondRightMenu", function (e) {

    newMeeting = true;

    manageMeetingFormView();


    e.preventDefault();
    $(".fieldsform .form-control").val('');
    $(".UpdateMeeting,.StartUpcomingMeetingNow").hide();
    $(".ScheduleMeeting,.StartMeetingNow").show();
    $(".MeetingSchedules").hide();
    $(".ScheduleNextMeeting").hide();


    //ScheduleMeeting StartMeetingNow
    //Meeting Date
    var datetimepicker = $("#Meetingdatepicker").data("kendoDateTimePicker");
    //datetimepicker.refresh();

    datetimepicker.setOptions({
        min: new Date()
    });


    //Location
    var locationSelector = $("#txtLocation").data("kendoAutoComplete");
    locationSelector.refresh();

    //Attendies
    var attendiesSelector = $("#txtAttendees").data("kendoMultiSelect");
    attendiesSelector.value("");
    attendiesSelector.trigger("change");
    //var apologiesSelector = $("#txtApologies").data("kendoMultiSelect");
    //apologiesSelector.value("");
    //apologiesSelector.trigger("change");
    var ccSelector = $("#txtcc").data("kendoMultiSelect");
    ccSelector.value("");
    ccSelector.trigger("change");

    //Clear the kendo grid of the agenda.
    bindAgendaTable([]);



    $('#MeetingView').modal('hide');
    $('#MeetingForm').modal('show');


    selectedAgendaItem = null;

    emptyData();

    console.log(currentMeetingSchedule);

});


//Creates the new Meeting.
//Meeting status is "Created"
$(document).on("click", ".ScheduleMeeting ", function () {

    validateMeetingForm(function (isTrue) {
        if (isTrue) {
            console.log(currentMeetingSchedule);
            currentMeetingSchedule.StatusType = "Created";
            bindMeetingData();
            createMeeting(currentMeetingSchedule);
            emptyData();
        }
    });

});

//Creates the new Meeting.
//Meeting status is "Started"
$(document).on("click", ".StartMeetingNow ", function () {
    
    validateMeetingForm(function (isTrue) {
        if (isTrue) {


            currentMeetingSchedule.StatusType = "Started";
            bindMeetingData();
            createMeeting(currentMeetingSchedule);
        }
    });
});


//Updates the existing Meeting.
//Meeting status is "Created"
$(document).on("click", ".UpdateMeeting", function () {

    validateMeetingForm(function (isTrue) {
        if (isTrue) {
            bindMeetingData();
            updateMeeting(currentMeetingSchedule);
        }
    });
});


//Updates the existing Meeting.
//Meeting status is "Started"
$(document).on("click", ".StartMeetingNow", function () {

    validateMeetingForm(function (isTrue) {
        if (isTrue) {
            currentMeetingSchedule.StatusType = "Started";
            bindMeetingData();
            updateMeeting(currentMeetingSchedule);
            console.log(currentMeetingSchedule);
        }
    });

});


//Opens the PopUp Meeting form.
$(document).on("click", ".StartUpcomingMeetingNow", function () {
    Proloader(true);
    console.clear();
    
   
    console.log("StartUpcomingMeetingNow");
    currentMeetingSchedule.StatusType = "Started";
    bindMeetingData();
    Safety_doAjax(meetingURL, 'PUT', currentMeetingSchedule, 'application/json', 'json', '', function (err, result) {
        if (err) {
        }
        else {

            if (currentMeetingSchedule.StatusType == "Started") {
                hideMeetingBtn(true);
                runningMeeting = currentMeetingSchedule;

                manageMeetingFormView(true);
                $('.StopMeeting').trigger("click");
            }
            else {
                runningMeeting = {};
                hideMeetingBtn(false);
                $('#MeetingForm').modal('hide');
            }

            bindAgenda("Agenda-Grid", layoutType);

            BindStartMeetingDate();
        }

    });

    manageMeetingFormView(true);

    $('#MeetingView').modal('hide');
    $('#MeetingForm').modal('show');
    $(".MeetingSchedules").show();
    $(".ScheduleMeeting,.StartMeetingNow").hide();
    $(".ScheduleNextMeeting").show();
    $(".StartUpcomingMeetingNow,.UpdateMeeting ").hide();
    console.log("-------------------------");
    console.log(currentMeetingSchedule);
    console.log(runningMeeting);

    $(".subject .txtSubjectfields").val(currentMeetingSchedule.Subject);
    $(".loc .txtSubjectfields").val(currentMeetingSchedule.Location.Name);
    $("#MeetingForm").animate({ scrollTop: 0 }, 500);
});

function BindStartMeetingDate() {

    console.log("BindStartMeetingDate");
    //Proloader(true);
    Safety_doAjax(runningMeetingURL, 'POST', { MeetingStatusType: 'Started' }, 'application/json', 'json', '', function (err, runningMeetingList) {
        if (err) {
        }
        else {
            if (runningMeetingList.length > 0) {
                //runningMeeting = runningMeetingList[0];
                //hideMeetingBtn(true);
                for (i = 0; i < runningMeetingList.length; i++) {
                    if (runningMeetingList[i].Id == currentMeetingSchedule.Id) {
                        console.clear();
                        runningMeeting = runningMeetingList[i];
                        currentMeetingSchedule = runningMeeting;
                        console.log("-------------------------");
                        console.log(currentMeetingSchedule);
                        console.log(runningMeeting);
                        bindMeetingFormData();
                        $("#InvitiesGrid").kendoGrid({
                            dataSource: runningMeeting.Members,
                            filter: { MemberAs: 0 },
                            scrollable: true,
                            selectable: "row",
                            rowTemplate: kendo.template($("#membersInviteGridTemplate").html()),
                            columns: [
                                {
                                    field: "Member.Name",
                                    title: "Member"
                                },
                                {
                                    field: "MemberAs",
                                    title: "MemberAs",
                                    width: "40px",
                                },
                                {
                                    field: "MemberAs",
                                    title: "MemberAs",
                                    width: "50px",
                                }
                            ]
                        });


                        $("#CcsGrid").kendoGrid({
                            dataSource: runningMeeting.Members,
                            filter: { MemberAs: 2 },
                            scrollable: true,
                            selectable: "row",
                            rowTemplate: kendo.template($("#membersCCGridTemplate").html()),
                            columns: [
                                {
                                    field: "Member.Name",
                                    title: "Member"
                                },
                                {
                                    field: "MemberAs",
                                    title: "MemberAs",
                                    width: "40px",
                                },
                                {
                                    field: "MemberAs",
                                    title: "MemberAs",
                                    width: "50px",
                                }
                            ]
                        });

                        $("#conductMeetingGrid").kendoGrid({
                            dataSource: runningMeeting.Titles,
                            filter: { MemberAs: 2 },
                            scrollable: true,
                            //selectable: "row",
                            rowTemplate: kendo.template($("#conductMeetingGridTemplate").html()),
                            columns: [

                            ]
                        });
                    }
                }
            }
            Proloader(false);
        }
    });

}

//Updates the existing Meeting.
//Meeting status is "Ended"
$(document).on("click", ".CloseBtn", function () {
    console.clear();
    for (var i = 0; i < runningMeeting.Members.length; i++) {
        if (runningMeeting.Members[i].IsAttend == false)
            runningMeeting.Members[i].MemberAs = 3;
    }



    //console.log(runningMeeting);
    runningMeeting.StatusType = "Ended";
    updateMeeting(runningMeeting);

});

//Updates the existing Meeting and creates new meeting.
//Meeting status is "Ended"
$(document).on("click", ".ScheduleNextMeeting", function () {
    console.clear();
    console.log(runningMeeting);
    var rMeeting = [];
    var newMetting = {};
    rMeeting = runningMeeting;
    rMeeting.StatusType = "Ended";

    //New Meeting
    newMetting.ParentMeeting = { Id: runningMeeting.Id };
    newMetting.StatusType = "Created";
    newMetting.Subject = $("#txtsubject").val();
    newMetting.StartDate = $("#Meetingdatepicker").val();
    newMetting.Location = { Name: $("#txtLocation").val() };
    newMetting.Members = [];

    var attendiesSelector = $("#txtAttendees").data("kendoMultiSelect");
    var ccSelector = $("#txtcc").data("kendoMultiSelect");

    var attendies = attendiesSelector.dataItems();
    $.each(attendies, function (index, value) {
        newMetting.Members.push({ Email: value.Email, Id: value.Id, MemberAs: "Invited" });
    });

    var ccs = ccSelector.dataItems();
    $.each(ccs, function (index, value) {
        newMetting.Members.push({ Email: value.Email, Id: value.Id, MemberAs: "Cc" });
    });
    //debugger;
    newMetting.Titles = [];
    for (var i = 0; i < runningMeeting.Titles.length; i++) {
        var tempTitleList = runningMeeting.Titles[i];
        if (tempTitleList.Heading == null) {
            //console.log(tempTitleList);
            for (var j = 0; j < tempTitleList.SubTitles.length; j++) {
                if (tempTitleList.SubTitles[j].IsCompleted == false || tempTitleList.SubTitles[j].IsCompleted == null) {
                    if (j == 0) {
                        var templist = { OrderId: tempTitleList.OrderId, SerialId: tempTitleList.SerialId, Title: tempTitleList.Title, SubTitles: [] };
                        newMetting.Titles.push(templist);
                    }
                    //console.log(tempTitleList.SubTitles[j]);
                    var templist1 = { OrderId: tempTitleList.SubTitles[j].OrderId, SerialId: tempTitleList.SubTitles[j].SerialId, Title: tempTitleList.SubTitles[j].Title };
                    //var newMetingCount = newMetting.Titles.length-1;
                    //console.log((newMetting.Titles.length)-1);
                    newMetting.Titles[(newMetting.Titles.length) - 1].SubTitles.push(templist1);
                }
            }
        }
    }

    newMetting.CreatedUser = { Email: runningMeeting.CreatedUser.Email, Id: runningMeeting.CreatedUser.Id, Name: runningMeeting.CreatedUser.Name };
    console.log(newMetting);

    validateMeetingForm(function (isTrue) {
        if (isTrue) {
            //currentMeetingSchedule.StatusType = "Created";
            bindMeetingData();
            createMeeting(newMetting);

            updateMeeting(runningMeeting);

        }
    });
});


//Updates the existing Meeting and creates new meeting.
//Meeting status is "Ended"
$(document).on("click", ".addheading", function () {
    //singleAgendaTopic.
    //debugger;
    if (currentMeetingSchedule.Id == 0) {
        var Item = { Title: 'Heading', SerialId: ++headingCount, OrderId: ++orderId, SubTitles: [] }
        currentMeetingSchedule.Titles.push(Item);
        tempMeetingSchedule.Titles.push(Item);
        //console.log(currentMeetingSchedule.Titles);
        topicCount = 0;
        addAgenda(Item);
    } else {
        //console.log(currentMeetingSchedule);

        var existingAgendaCount = currentMeetingSchedule.Titles.length - 1;
        //console.log(existingAgendaCount);
        var intPart = 0;
        if (existingAgendaCount != -1)
            intPart = parseInt(currentMeetingSchedule.Titles[existingAgendaCount].SerialId);
        var agendaItem = { Title: 'Heading', Meeting: { Id: currentMeetingSchedule.Id }, SerialId: ++intPart, OrderId: existingAgendaCount + 2 };
        console.log(agendaItem);
        addAgenda(agendaItem);
    }
});
$(document).on("click", ".topicadding", function () {

    if (currentMeetingSchedule.Id == 0) {

        console.log(selectedDataItems);
        if (selectedDataItems.Title == "Heading") {
            var Item = { Title: 'Topic', SerialId: (selectedDataItems.SerialId + "." + (selectedDataItems.SubTitles.length + 1)), OrderId: ++orderId };
            currentMeetingSchedule.Titles[selectedDataItems.SerialId - 1].SubTitles.push(Item);
            tempMeetingSchedule.Titles.push(Item);
            addAgenda(Item);
            selectedDataItems = [];
        } else if (selectedDataItems.Title == "Topic") {
            var headingC = parseInt(selectedDataItems.SerialId);
            //console.log(headingC);
            var headingST = currentMeetingSchedule.Titles[parseInt(selectedDataItems.SerialId) - 1].SubTitles.length;
            //console.log(headingST);
            var Item = { Title: 'Topic', SerialId: headingC + "." + (headingST + 1), OrderId: ++orderId };
            currentMeetingSchedule.Titles[headingC - 1].SubTitles.push(Item);
            tempMeetingSchedule.Titles.push(Item);
            addAgenda(Item);
            selectedDataItems = [];
        } else {
            var Item = { Title: 'Topic', SerialId: (headingCount + "." + ++topicCount), OrderId: ++orderId };
            currentMeetingSchedule.Titles[headingCount - 1].SubTitles.push(Item);
            tempMeetingSchedule.Titles.push(Item);
            console.log(currentMeetingSchedule.Titles);
            addAgenda(Item);
        }
    } else {
        //console.log(currentMeetingSchedule);
        var existingAgendaCount = currentMeetingSchedule.Titles.length - 1;

        var intPart = parseInt(currentMeetingSchedule.Titles[existingAgendaCount].SerialId);
        var fractionPart = parseFloat(currentMeetingSchedule.Titles[existingAgendaCount].SerialId);
        var decimals = fractionPart - Math.floor(fractionPart);
        var parentId = 0;
        //console.log(decimals.toFixed(1));
        fractionPart = decimals.toFixed(1);
        fractionPart = fractionPart.replace("0.", "");
        var parentId = 0;
        if (fractionPart > 0)
            parentId = parseInt(currentMeetingSchedule.Titles[existingAgendaCount].Heading.Id);
        else
            parentId = parseInt(currentMeetingSchedule.Titles[existingAgendaCount].Id);
        //console.log(currentMeetingSchedule.Titles);
        //console.log(parentId);
        var agendaItem = { Title: 'Topic', Meeting: { Id: currentMeetingSchedule.Id }, SerialId: (intPart + "." + ++fractionPart), OrderId: existingAgendaCount + 2, Heading: { Id: parentId } };
        //console.log(agendaItem);
        addAgenda(agendaItem);
    }

});


//Updates the existing Meeting and creates new meeting.
//Meeting status is "Ended"
$(document).on("click", ".topicadding", function () {
    /*if (selectedAgendaItem!=undefined && selectedAgendaItem!=null && selectedAgendaItem.Id!=null){
        var agendaItem = { Title: 'Topic', Meeting: {Id:currentMeetingSchedule.Id}, Heading: { Id: selectedAgendaItem.Id } };
        addAgenda(agendaItem);
    }*/
});


//Dom Actions      ---------------------------------------------------------






//Ajax Actions      ---------------------------------------------------------

//Create Meeting Ajax call
//Shows the preloader.
//Send ajax.
//Hides the Preloader and form.
function createMeeting(meeting) {
    console.log(meeting);
    Proloader(true);
    Safety_doAjax(meetingURL, 'POST', meeting, 'application/json', 'json', '', function (err, result) {
        if (err) {
        }
        else {
            if (meeting.StatusType == "Started") {
                hideMeetingBtn(true);
                runningMeeting = meeting;
                manageMeetingFormView(true);
                $('.StopMeeting').trigger("click");

            }
            else {
                runningMeeting = {};
                hideMeetingBtn(false);
                $('#MeetingForm').modal('hide');
            }

            bindAgenda("Agenda-Grid", layoutType);
            //bindMinuts("Minuts-Grid",1);

        }

        Proloader(false);
    });
}

//Update Meeting Ajax call
//Shows the preloader.
//Send ajax.
//Hides the Preloader and form.
function updateMeeting(meeting) {

    Proloader(true);
    Safety_doAjax(meetingURL, 'PUT', meeting, 'application/json', 'json', '', function (err, result) {
        if (err) {
        }
        else {

            if (meeting.StatusType == "Started") {
                hideMeetingBtn(true);
                runningMeeting = meeting;

                manageMeetingFormView(true);
                $('.StopMeeting').trigger("click");
            }
            else {
                runningMeeting = {};
                hideMeetingBtn(false);
                $('#MeetingForm').modal('hide');
            }

            bindAgenda("Agenda-Grid", layoutType);
            //bindMinuts("Minuts-Grid");
        }

        Proloader(false);
    });
}

//Get the running Meetings Ajax call
function getRunningMeeting() {
    Safety_doAjax(runningMeetingURL, 'POST', { MeetingStatusType: 'Started' }, 'application/json', 'json', '', function (err, runningMeetingList) {
        if (err) {
        }
        else {
            //console.log(runningMeetingList);
            if (runningMeetingList.length > 0) {
                runningMeeting = runningMeetingList[0];
                hideMeetingBtn(true);
                //console.log(runningMeeting);
            }
            else {
                hideMeetingBtn(false);
            }
        }
    });
}

//Get the running Meetings Ajax call
function addAgenda(data) {
    //console.log(data);
    Proloader(true);
    if (currentMeetingSchedule.Id != undefined && currentMeetingSchedule.Id != null && currentMeetingSchedule.Id != 0) {
        Safety_doAjax(agendaTableURL, 'POST', data, 'application/json', 'json', '', function (err, resultData) {
            if (err) {
            }
            else {
                currentMeetingSchedule.Titles.push(resultData);
                bindAgendaTable(currentMeetingSchedule.Titles);
            }
        });
    }
    else {
        //currentMeetingSchedule.Titles.push(data);
        bindAgendaTable(tempMeetingSchedule.Titles);
    }
}


//Update Meeting agenda item
function updateSingleAgenda(meeting) {
    //console.log("Updating Item");
    //console.log(meeting);
    Proloader(true);
    Safety_doAjax(agendaTableURL, 'PUT', meeting, 'application/json', 'json', '', function (err, result) {
        if (err) {
        }
        else {
            console.log("result");
            console.log(result);
            //bindAgendaTable(tempMeetingSchedule.Titles);
            //bindMinuts("Minuts-Grid");
        }

        Proloader(false);
    });
}

//Ajax Actions      ---------------------------------------------------------





//Function Definitions  ---------------------------------------------------------

//While ajax actions validate the meeting form.
function validateMeetingForm(getBack) {
    var isValid = true;

    //Meeting Date
    if ($("#Meetingdatepicker").val() == "") {
        $("#Meetingdatepicker").addClass('error-class');
        isValid = false;
    }
    else {
        $("#Meetingdatepicker").removeClass('error-class');
    }

    //Location
    if ($("#txtLocation").val() == "") {
        $("#txtLocation").addClass('error-class');
        isValid = false;
    }
    else {
        $("#txtLocation").removeClass('error-class');
    }

    //Description
    if ($("#txtsubject").val() == "") {
        $("#txtsubject").addClass('error-class');
        isValid = false;
    }
    else {
        $("#txtsubject").removeClass('error-class');
    }

    getBack(isValid);
}

//Bindst the Meeting Object.
function bindMeetingData() {
    
    currentMeetingSchedule.Subject = $("#txtsubject").val();
    currentMeetingSchedule.StartDate = $("#Meetingdatepicker").val();
    $("#textButton").text(DueDate($("#Meetingdatepicker").val()));
    currentMeetingSchedule.Location.Name = $("#txtLocation").val();

    var attendiesSelector = $("#txtAttendees").data("kendoMultiSelect");
    var apologiesSelector = $("#txtApologies").data("kendoMultiSelect");
    var ccSelector = $("#txtcc").data("kendoMultiSelect");

    currentMeetingSchedule.Members = [];

    var attendies = attendiesSelector.dataItems();
    //var apologies = apologiesSelector.dataItems();
    var ccs = ccSelector.dataItems();
    
    //var datetimepicker = $("#Meetingdatepicker").data("kendoDateTimePicker");
    //alert(datetimepicker)
    //var d = datetimepicker.value();
    //var today = convert(d, 0, 0);

    $.each(attendies, function (index, value) {
        currentMeetingSchedule.Members.push({ Email: value.Email, Id: value.Id, MemberAs: "Invited" });
        //currentMeetingSchedule.Members.push({ MemberAs: { Attendy: '', Invited: '', Cc: value.Email } });
    });


    //$.each(apologies, function (index, value) {
    //    currentMeetingSchedule.Members.push({ Email: value.Email, Id: value.Id, MemberAs: "Apology" });
    //});
    debugger
    currentMeetingSchedule.CreatedUser.Name = ScriptUsername;
   
    $.each(ccs, function (index, value) {
        currentMeetingSchedule.Members.push({ Email: value.Email, Id: value.Id, MemberAs: "Cc" });
    });
   
}
  //function convert(startindiandate, adjustday, adjustmonth) {
  //    var date = new Date(startindiandate);
      
  //    var weekday = new Array(7);
  //    weekday[0] = "Sunday";
  //    weekday[1] = "Monday";
  //    weekday[2] = "Tuesday";
  //    weekday[3] = "Wednesday";
  //    weekday[4] = "Thursday";
  //    weekday[5] = "Friday";
  //    weekday[6] = "Saturday";

  //    var n = weekday[date.getDay()];
      
      
  //    var month = new Array();
  //    month[0] = "January";
  //    month[1] = "February";
  //    month[2] = "March";
  //    month[3] = "April";
  //    month[4] = "May";
  //    month[5] = "June";
  //    month[6] = "July";
  //    month[7] = "August";
  //    month[8] = "September";
  //    month[9] = "October";
  //    month[10] = "November";
  //    month[11] = "December";
  //    var m = month[date.getMonth()];
  //    var date = date.getDate();

  //    var datastring = n + "/" + m + "/" + date;
  //    console.log(datastring);
  //    return datastring
  //  }
//Binds the Meeting Form.
function bindMeetingFormData() {
    //console.log(currentMeetingSchedule);
    //Subject
    $("#txtsubject").val(currentMeetingSchedule.Subject);

    //Meeting Date

 
    var datetimepicker = $("#Meetingdatepicker").data("kendoDateTimePicker");
    //alert(datetimepicker)
    datetimepicker.setOptions({
        min: new Date(2011, 0, 1, 8, 0, 0)
    });
    datetimepicker.value(currentMeetingSchedule.StartDate);
    datetimepicker.trigger("change");

    datetimepicker.setOptions({
        min: new Date()
    });


    //Location
    var locationSelector = $("#txtLocation").data("kendoAutoComplete");
    locationSelector.value(currentMeetingSchedule.Location.Name);
    locationSelector.trigger("change");

    //Attendies
    var attendiesSelector = $("#txtAttendees").data("kendoMultiSelect");
    //var apologiesSelector = $("#txtApologies").data("kendoMultiSelect");
    var ccSelector = $("#txtcc").data("kendoMultiSelect");

    var attendiesArray = [];
    var apologiesArray = [];
    var ccsArray = [];

    $.each(currentMeetingSchedule.Members, function (index, value) {

        if (value.MemberAs == 0) {
            attendiesArray.push(value.Member.Id);
        }
        else if (value.MemberAs == 1) {
            apologiesArray.push(value.Member.Id);
        }
        else if (value.MemberAs == 2) {
            ccsArray.push(value.Member.Id);
        }
    });

    attendiesSelector.value(attendiesArray);
    attendiesSelector.trigger("change");
    //apologiesSelector.value(apologiesArray);
    //apologiesSelector.trigger("change");
    ccSelector.value(ccsArray);
    ccSelector.trigger("change");





    //Need to bind the Agenda grid.
    bindAgendaTable(currentMeetingSchedule.Titles);

}

//Bind Meeting Object on Meeting select at Grid.
//Show the Meeting update form PopUp.
//Binds the selected Meeting to form.
function bindMeetingObject(e) {
    
    manageMeetingFormView();
    //console.log(e);
    var dataItem = e.sender.dataItem(e.sender.select());
    //console.log(dataItem);
    currentMeetingSchedule = dataItem;
    CurrentMeetingId = dataItem.Id;
    //console.log(currentMeetingSchedule);
    $(".MeetingSchedules").hide();
    $(".StartUpcomingMeetingNow,.UpdateMeeting ").show();
    $(".ScheduleMeeting,.StartMeetingNow").hide();
    $(".ScheduleNextMeeting").hide();
    $('#MeetingForm').modal({
        show: 'true'
    });


    bindMeetingFormData();
    selectedAgendaItem = null;
}

//Bind Minuts Object on Minute select at Grid.
//Show the Minuts PopUp.
//Binds the selected Minuts to table.
function bindMinutsObject(e) {

    manageMeetingFormView();
    var dataItem = e.sender.dataItem(e.sender.select());

    $('#MeetingView').modal('show');
    $('#MeetingForm').modal('hide');
    $(".meetingHeader,.ViewSubject").text(dataItem.Subject);
    $(".ViewLocation").text(dataItem.Location.Name);
    $(".ViewStartDate").text(dataItem.StartDate);
    $(".ViewEndDate").text(dataItem.EndDate);
    $(".ViewCreatedUser").text(dataItem.CreatedUser.Name);


    console.clear();
    console.log(dataItem);
    $(".ViewAttendees").text("");
    $(".ViewApologies").text("");
    $.each(dataItem.Members, function (index, value) {
        console.log(value);
        //if (value.MemberAs == 0) {
        //    if ($(".ViewCreatedUser").text() == "")
        //        $(".ViewCreatedUser").text(value.Member.Name);
        //    else
        //        $(".ViewCreatedUser").text($(".ViewCreatedUser").text() + ', ' + value.Member.Name);
        //}
        //else if (value.MemberAs == 1) {
        //    if ($(".ViewAttendees").text() == "")
        //        $(".ViewAttendees").text(value.Member.Name);
        //    else
        //        $(".ViewAttendees").text($(".ViewAttendees").text() + ', ' + value.Member.Name);
        //}
        //else if (value.MemberAs == 2) {
        //    if ($(".ViewApologies").text() == "")
        //        $(".ViewAttendees").text(value.Member.Name);
        //    else
        //    $(".ViewApologies").text($(".ViewApologies").text() + ', ' + value.Member.Name);
        //} else {

        //}
        $(".ViewCreatedUser").text(dataItem.CreatedUser.Name);
        if (value.MemberAs == 1 || value.MemberAs == 2) {
            if ($(".ViewAttendees").text() == "")
                $(".ViewAttendees").text(value.Member.Name);
            else
                $(".ViewAttendees").text($(".ViewAttendees").text() + ', ' + value.Member.Name);
        } else if (value.MemberAs == 3) {
            if ($(".ViewApologies").text() == "")
                $(".ViewApologies").text(value.Member.Name);
            else
                $(".ViewApologies").text($(".ViewApologies").text() + ', ' + value.Member.Name);
        }
    });
}

function bindSelectedAgenda(e) {

    //var dataItem = e.sender.dataItem(e.sender.select());
    //selectedAgendaItem = dataItem;
    //console.log(selectedAgendaItem);

    var selectedRows = this.select();
    selectedDataItems = [];
    console.log(selectedRows.length);
    /*for (var i = 0; i < selectedRows.length; i++) {
        var dataItem = this.dataItem(selectedRows[i]);
        selectedDataItems.push(dataItem);
        console.log(dataItem);
    }*/
}



//Preloader handling while form ajax actions.
function Proloader(yes) {

    if (yes) {

        $(".preloaderDiv").css({
            "height": $("#MeetingForm").height(),
            "width": $("#MeetingForm").width()
        });
        $(".meetingForm").css({
            "opacity": "0.4"
        });
        $(".preloaderDiv").show();
    }
    else {
        $(".meetingForm").removeAttr("style");
        $(".preloaderDiv").hide();

    }

}

function TakeUserAttended(MeetingMemberId, Status, MemberAs) {
    console.log(MeetingMemberId + ":" + Status);
    console.log(BaseUrl + "/MeetingMember");
    Proloader(true);

   

    //alert(MemberAs);
    Safety_doAjax(BaseUrl + "/MeetingMember", 'PUT', { Id: MeetingMemberId, IsAttend: Status, MemberAs: MemberAs }, 'application/json', 'json', '', function (err, result) {
        if (err) {
        }
        else {
            BindStartMeetingDate();
        }

        Proloader(false);
    });
}


//Function Definitions  ---------------------------------------------------------




//Binding form controls  ---------------------------------------------------------



//Binds the Meeting Members Multi select box.
var selectableMeetingMembers = new kendo.data.DataSource({
    transport: {
        read: {
            type: "GET",
            url: usersURL,
            dataType: 'json',
        }
    }
});

//Binds the Meeting Location Multi select box.
var selectableMeetingLocations = new kendo.data.DataSource({
    transport: {
        read: {
            type: "GET",
            url: locationURL,
            dataType: 'json',
        }
    }
});

//Initializes meeting form the controls.
function bindFormControls() {

    getRunningMeeting();
    //Add Attendees

    $("#txtAttendees").kendoMultiSelect({
        dataSource: selectableMeetingMembers,
        filter: "startswith",
        placeholder: "Invities, X, Y,Z...",
        dataTextField: "Name",
        dataValueField: "Id",
        separator: ", ",
        select: function (e) {
            alert("hello");
            var item = e.item;
            var text = item.text();
            console.log(e)
            //// Use the selected item or its text
        }
    });

    //Add Apologies
    $("#txtApologies").kendoMultiSelect({
        dataSource: selectableMeetingMembers,
        filter: "startswith",
        placeholder: "Apologies, X, Y,Z...",
        dataTextField: "Name",
        dataValueField: "Id",
        separator: ", ",
        select: function (e) {
          
        },
        deselect: function (e) {
        }
    });

    //Add CC
    $("#txtcc").kendoMultiSelect({
        dataSource: selectableMeetingMembers,
        filter: "startswith",
        placeholder: "CC, X, Y,Z...",
        dataTextField: "Name",
        dataValueField: "Id",
        separator: ", ",
        select: function (e) {
           
        }
    });

    //Location selection
    $("#txtLocation").kendoAutoComplete({
        dataSource: selectableMeetingLocations,
        filter: "startswith",
        placeholder: "Location",
        dataTextField: "Name",
        dataValueField: "Id",
    });

    //Add Meeting Date
    mydate= $("#Meetingdatepicker").kendoDateTimePicker({
        value: new Date()
    });
}




//Binding form controls  ---------------------------------------------------------











//Meeting Grids.        ---------------------------------------------------------

//Bind the Agendas
function bindAgenda(Grid, layoutType) {
    if (true) {

        isMeetingReadInProgress = true;
        if (layoutType == 0 || layoutType == undefined) {
            $("#" + Grid).kendoGrid({
                dataSource: {
                    transport: {
                        read: {
                            type: "get",
                            url: meetingURL,
                            datatype: "json"
                        },
                    },
                    pageSize: 500
                },
                dataBound: function () { isMeetingReadInProgress = false; },
                rowTemplate: kendo.template($("#rowTemplate").html()),
                selectable: "row",
                change: bindMeetingObject,
                scrollable: true,
                columns: [
                    {
                        field: "MeetingSubject",
                        title: "Upcoming Meetings"
                    }
                ],
                sort: { field: "StartDate", dir: "asc" }
            });

            $("#" + Grid).data("kendoGrid").dataSource.filter(
                {
                    logic: "or",
                    filters: [{ field: "StatusType", operator: "eq", value: 0 }, { field: "StatusType", operator: "eq", value: 1 }]
                }
            );

        }
        else {
            $("#" + Grid).kendoGrid({
                dataSource: {
                    transport: {
                        read: {
                            type: "get",
                            url: meetingURL,
                            datatype: "json"
                        },
                    }
                },
                selectable: "row",
                change: bindMeetingObject,
                dataBound: function () { isMeetingReadInProgress = false; },
                scrollable: true,
                columns: [
                    {
                        field: "Subject",
                        title: "Subject",
                    },
                    {
                        field: "CreatedUser.Name",
                        title: "Owner",
                    },
                    {
                        field: "StartDate",
                        title: "Date",
                    },
                    {
                        field: "Location.Name",
                        title: "Location",
                    }
                ]

            });

        }

        $("#" + Grid).data("kendoGrid").dataSource.filter(
            {
                logic: "or",
                filters: [{ field: "StatusType", operator: "eq", value: 0 }, { field: "StatusType", operator: "eq", value: 1 }]
            }
        );

        loadGridInnerHeight();
        getRunningMeeting();

    }
    $("#Agenda-Grid").css({ "min-height": $(window).height() - $("#PT_TopHeaders").height() - $("#PT_SecondHeaders").height(), });

    $("#Minuts-Grid").css({ "min-height": $(window).height() - $("#PT_TopHeaders").height() - $("#PT_SecondHeaders").height(), "max-height": $(window).height() - $("#PT_TopHeaders").height() - $("#PT_SecondHeaders").height() });
}

//Bind the Minuts
function bindMinuts(Grid, layoutType) {

    if (layoutType == 0 || layoutType == undefined) {
        $("#" + Grid).kendoGrid({
            dataSource: {
                transport: {
                    read: {
                        type: "get",
                        url: meetingURL,
                        datatype: "json"
                    },
                },
                pageSize: 500
            },
            rowTemplate: kendo.template($("#rowTemplate").html()),
            selectable: "row",
            change: bindMinutsObject,
            scrollable: true,
            columns: [
                {
                    field: "MeetingSubject",
                    title: "Recently Published Minutes"
                }
            ],
            sort: { field: "StartDate", dir: "asc" }

        });
        $("#" + Grid).data("kendoGrid").dataSource.filter(
            { field: "StatusType", operator: "eq", value: 2 }
        );
    }
    else {
        $("#" + Grid).kendoGrid({
            dataSource: {
                transport: {
                    read: {
                        type: "get",
                        url: meetingURL,
                        datatype: "json"
                    },
                }
            },
            selectable: "row",
            change: bindMinutsObject,
            scrollable: true,
            columns: [
               {
                   field: "Subject",
                   title: "Subject",
               },
                {
                    field: "CreatedUser.Name",
                    title: "Owner",
                },
                {
                    field: "StartDate",
                    title: "Date",
                },
                {
                    field: "Location.Name",
                    title: "Location",
                }
            ]

        });
    }

    $("#" + Grid).data("kendoGrid").dataSource.filter(
        { field: "StatusType", operator: "eq", value: 2 }
    );
    loadGridInnerHeight();
}




//Binding Agenda Grid
function bindAgendaTable(data) {
    //console.log(data);
    var dataSource = new kendo.data.DataSource({
        data: data,
        update: {
            url: "/Products/Update",
            dataType: "jsonp"
        }
    });
    var agendaG = $("#AgendaListGrid").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        selectable: "row",
        sortable: {
            mode: "single",
            allowUnsort: false
        },
        schema: {
            model: {
                Id: "Id",
                fields: {
                    SerialId: { editable: false, nullable: false },
                    Title: { editable: true, nullable: false },
                    OrderId: { editable: false, nullable: false },
                    SerialId: { editable: false, nullable: false },

                }
            }
        },
        editable: true,
        columns: [
            {
                field: "SerialId",
                title: "S.No",
                width: "70px",
                border: "1px solid red",
                editable: false
            },
            {
                field: "Title",
                title: "Title",
                editable: true
            },
        ],
        change: function (arg) {
            var selectedRows = this.select();
            for (var i = 0; i < selectedRows.length; i++) {
                var dataItem = this.dataItem(selectedRows[i]);
                selectedDataItems = dataItem;
            }
            console.log(selectedDataItems);
        },
        //sort: { field: "SerialId", dir: "asc" }
    });
    dataSource.sort({ field: "OrderId", dir: "asc" });
    $('.k-grid-content').scrollTop($('.k-grid-content')[0].scrollHeight);
    Proloader(false);

}

//Adjusts the Meeting grids Height.
function loadGridInnerHeight() {
    if (window.innerWidth < 992) {
        $("#MM-Overview .k-grid-content").removeAttr("style");
        $("#MM-Overview .k-grid-content").css("height", "100%;");
    }
    else {

        $("#MM-Overview .k-grid-content").css({ "min-height": $(".PT_Right_Content").height() - 40, "max-height": $(".PT_Right_Content").height() - 40, "overflow-y": "auto" });
    }
}


//Meeting Grids.        ---------------------------------------------------------






//Function callings     ---------------------------------------------------------

//Calling the running meeting at initial time.
getRunningMeeting();


//Function callings     ---------------------------------------------------------


function AddNewUser() {
 
    Proloader(true);
    console.log("AddNewUser");
    var newInvitedMembers = $("#user-list").data("kendoMultiSelect");
    var InvitedMembers = newInvitedMembers.dataItems();
    console.log(InvitedMembers);
    var tempUser = [];
    for (i = 0; i < InvitedMembers.length; i++) {
        tempUser.push({ Email: InvitedMembers.Email, Id: InvitedMembers.Id, Name: InvitedMembers.Name });
        console.log({ Member: { Email: InvitedMembers[i].Email, Id: InvitedMembers[i].Id, Name: InvitedMembers[i].Name, IsAttend: 0 }, Meeting: { Id: runningMeeting.Id }, MemberAs: MemberAs });
        
        Safety_doAjax("api/MeetingMember", 'POST', { Member: { Email: InvitedMembers[i].Email, Id: InvitedMembers[i].Id, Name: InvitedMembers[i].Name, IsAttend: 0 }, Meeting: { Id: runningMeeting.Id }, MemberAs: MemberAs }, 'application/json', 'json', '', function (err, result) {
            if (err) {
            }
            else {
                BindStartMeetingDate();
            }
        });
    }
    
    Proloader(true);
}

//var TopicId = 0;
//var minuteId = 0;
//function minutesbinddata(id) {
//    $(".camerassection").show();
//    $(".k-overlay").show();
//    $(".camerassection").css("visibility", "visible");
//    //console.log(id);
//    //TopicId = id;
//    //Safety_doAjax(BaseUrl + "/Minute?agendaId=" + id, 'GET', '', '', 'json', '', function (err, result) {
//    //    if (err) {
//    //    }
//    //    else {
//    //        console.log(result);
//    //        if (result != null) {
//    //            minuteId = result.Id;
//    //            $('#minutes').val(result.Title);
//    //        } else {
//    //            minuteId = 0;
//    //            $('#minutes').val("");
//    //        }
//    //        BindStartMeetingDate();
//    //    }
//    //});
//}


var minuteId = 0;
function minutesbinddata(id) {
    console.log(id);
    TopicId = id;
    Safety_doAjax(BaseUrl + "/Minute?agendaId=" + id, 'GET', '', '', 'json', '', function (err, result) {
        if (err) {
        }
        else {
            console.log(result);
            if (result != null) {
                minuteId = result.Id;
                $('#devtext').val(result.Title);
            } else {
                minuteId = 0;
                $('#devtext').val("");
            }
            BindStartMeetingDate();
        }
    });
}
$(document).on("click", "#iconsforconduct", function () {
    var b = $(this).attr("data-id");

    alert(b);
    minutesbinddata(b);

});

$(document).on("click", "#addMinute", function () {
    AddMinute();
    $("#editminutespopup").hide();
});


function AddMinute() {
    var minute = $('#minutes').val();
    Safety_doAjax(BaseUrl + "/Minute", 'POST', { Id: minuteId, Title: minute, Agenda: { Id: TopicId }, UserCreated: { Id: 1 } }, 'application/json', 'json', '', function (err, result) {
        if (err) {
        }
        else {
            //$('#minutes').val("");
            BindStartMeetingDate();
        }
    });
}

function topicCompleted(TopicId) {
    Proloader(true);
    Safety_doAjax(BaseUrl + "/Agenda", 'PUT', { Id: TopicId, IsCompleted: 1 }, 'application/json', 'json', '', function (err, result) {
        if (err) {
        }
        else {
            BindStartMeetingDate();
        }
    });
    Proloader(false);
}

///3-3-2017
//$(document).on("click", "#StartUpcomingMeetingNow", function (e) {
//    //$("#MeetingForm").css({ "min-height": $("#MeetingForm").height() - 0, "max-height": $("#MeetingForm").height() - 0, "overflow-y": "auto" });
//    //$(window).scrollTop(-50);
//    console.log("ss");
//});
var minuteId = 0;
var topicId = 0;
function onMinuteClick(MinuteId, TopicId) {
    minuteId = MinuteId;
    topicId = TopicId;

    console.log(minuteId + " " + topicId);
}

$(document).on("blur", ".minutetxtarea", function () {
    var minute = $(this).val();
    //console.log(minuteId + " " + topicId + " " + minute);
    if (minute != "") {
        Proloader(true);
        Safety_doAjax(BaseUrl + "/Minute", 'POST', { Id: minuteId, Title: minute, Agenda: { Id: topicId }, UserCreated: { Id: 1 } }, 'application/json', 'json', '', function (err, result) {
            if (err) {
            }
            else {
                //$('#minutes').val("");
                BindStartMeetingDate();
            }
        });
        Proloader(false);
    }
    //console.log(this);
});



//$(document).on("click", "#user-list", function () {
//    debugger
//    $.each(userlist, function (index, Member) {
        
//        multiselect = $("#user-list").data("kendoMultiSelect");
//        multiselect.dataSource.remove(value);
//    }
//)
//});




function DueDate(createddate) {
    
debugger
 
    var time1 = new Date();
    var time2 = createddate;

    var diff =  time2- time1;
    var days = diff.Days;
    var hours = diff.Hours;
    var mins = diff.Minutes;
    var seconds = diff.Seconds;

    var Dureation = null;
    var RemainTime = null;
                    

    if (days > 0)
    {
        Dureation = days.ToString();
        RemainTime = "days";
    }
    else if (hours > 0)
    {
        Dureation = hours.ToString();
        RemainTime = "hours";
    }
    else if (mins > 0)
    {
        Dureation = mins.ToString();
        RemainTime = "mins";
    }
    else if (days <= -1)
    {
        Dureation = days.ToString();
        RemainTime = "days";
    }
    else if (hours <= -1)
    {
        Dureation = hours.ToString();
        RemainTime = "hours";
    }
    else if (mins <= -1)
    {
        Dureation = mins.ToString();
        RemainTime = "mins";
    }

    
    
   // return Dureation + RemainTime;
    return "chekc";

}
