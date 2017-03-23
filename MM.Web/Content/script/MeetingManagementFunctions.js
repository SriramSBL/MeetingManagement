var BaseUrl = '';
var BaseMvcUrl = '';
var AllDefects = '';
var OpenDefects = '';
var ImagesArray = [];
var SelectedRiskRow = '';
var SelectedRiskRowIndex = -1;
var LocationSelectedID = 0;
var LocationListTreeURL = '';
var GetSessionURL = '';
var AppUserslist;
var createNewDefectURL = '';
var updateDefectURL = '';
var statusUpdateURL = '';
var viewUpdateURL = '';
var LocationListURL = '';
var GridOpenState = 1;
var CategoryListTreeURL = '';
var Newlocation;
var Updatetreenode;
var SaveImage = '';
var GetSession
var a;
var mid = 0;
var DefectLocationDataSource = '';
var DefectsListDataSource = [];

var DefectFullDetails = '';
var treenewelement;
var deletetreeelement;
var selectedRows = [];
var grid = '';
var locationid = 1;
var bannerlabel = "All Categories";
var item = "";
var Userid = "0";
var SelectedItemLocation = 1;
var ViewLayout = 1;
var AppID;
var dataSource = '';
var dataSourceLocation;
var selectedlocationtree = 0;
var Isadmin;
var kendotreedata;
var childrenscount;
var gridcount;
var confinlocationid = 0;
var confinlocationPreid = 0;
var updatenodeid = 0;
var GetRisks = "";
var RiskListDataSource = [];
var SelectedCategoryID = 1;
var CategoryDataSource = '';
var locationtreereorder = '';
var CreateNewNode = '';
var RemoveNode = '';
var ReNameNode = '';
var isNewRisk = false;
var selectedItem = '';
var isReadInProgress = '';
var isMeetingReadInProgress = false;
var agendaTableURL = '';
var selectedAgendaItem = '';
var ScriptUsername;
var layoutType = 0;
var userlist = [];
var CurrentMeetingId;
var memberdata;

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
function trimString(T_String, T_String_Length) {
   
    var Out_String = T_String;
    if (T_String.length > T_String_Length) {
       
        Out_String = T_String.substring(0, T_String_Length) + "...";
    }
    return Out_String;
}
function ChangeDateFormat(date) {
    var d = new Date(date);
    return month[(d.getMonth())] + ' ' + d.getDate() + ' ' + d.getFullYear();
}
function LoadDomainUrl() {

    var Url = window.location.href;
    var urlsplit = Url.split("/");
    AppID = urlsplit[4]
    //AppID = "A000020";

    var Hosting = '';
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
        BaseUrl = '/apps/A000022/api';
        BaseMvcUrl = '/apps/A000022';
    }
    else if (Hosting.toUpperCase() == CheckLocDom.toUpperCase() || Hosting.toUpperCase() == CheckSblDom.toUpperCase()) {

        if (Hosting.toUpperCase() == CheckSblDom.toUpperCase()) {
            console.log('Sblsol');
            BaseUrl = '/apps/A000022/api';
            BaseMvcUrl = '/apps/A000022';
        }
        else {
            console.log('Localhost');
            BaseUrl = '/api';
            BaseMvcUrl = '';
        }
    }


    GetRisks = BaseUrl+'/RiskRegisterQuery';
    CreateRisks = BaseUrl + '/RiskRegister';
    updateRiskURL = BaseUrl+'/RiskRegister';
    CategoryListTreeURL = BaseUrl+'/RiskCategory';
    CategoryListURL = BaseUrl + '/RiskCategory';
    AppUserslist = BaseUrl+'/risk/AppUserslist';
    riskActivities = BaseUrl+'/Loggers';
    meetingURL = BaseUrl + '/meeting';
    usersURL = BaseUrl + '/User';
    locationURL = BaseUrl + '/Location';
    runningMeetingURL = BaseUrl + '/MeetingQuery';
    locationtreereorder = BaseUrl + '/RiskCategory/reOrderTree';
    CreateNewNode = BaseUrl + '/RiskCategory/addNewNodeToTree';
    RemoveNode = BaseUrl + '/RiskCategory/deleteTreeNode';
    ReNameNode = BaseUrl + '/RiskCategory/updateTreeNode';
    agendaTableURL = BaseUrl + '/Agenda';
    
}
LoadDomainUrl();



var Safety_doAjax = function (Url, Type, Data, ContentType, DataType, preLoader, getBack) {
    $.ajax({
        url: Url,
        type: Type,
        data: JSON.stringify(Data),
        contentType: ContentType,
        dataType: DataType,
        beforeSend: function () { if (preLoader) $('.' + preLoader).css("display", 'block'); },
        complete: function () { if (preLoader) $('.' + preLoader).css("display", 'none') },
        success: function (Response) {
            getBack(null, Response);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            getBack({ Status: 0, InfoOpts: 501, Data: {} });
        }
    });
}

//--------------------------------------------------------------------------------------//


function getMeetingsList(GridId) {
    console.log("Meetings List")
    $("#" + GridId).html("<h2>Meetings List</h2>");
}



function hideMeetingBtn(show) {
    if (show) {
        $(".StopMeeting").parent().show();
    }
    else {
        $(".StopMeeting").parent().hide();
    }
}


function manageMeetingFormView(runningMeeting) {
    if (runningMeeting == true) {
        $(".firstBlock").show();
        $(".secondBlock").show();
        $(".thirdBlock").show();
        $(".fourthdBlock").hide();
        $(".hedings").show();
    }
    else {
        $(".firstBlock").hide();
        $(".secondBlock").hide();
        $(".thirdBlock").show();
        $(".fourthdBlock").show();
        $(".hedings").hide();
    }
}



