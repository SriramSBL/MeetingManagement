var para = {
    appTitle: "Meeting Manager",
    appHeader: true,
    leftNavBar: false,
    appNavItems: [
        { menuItem: "Overview", isRight: false, isStartPage: true, url: "", icon: "icon.jpg" },
        { menuItem: "Agenda", isRight: false, isStartPage: false, url: "" },
        { menuItem: "Minutes", isRight: false, isStartPage: false, url: "" },
        { menuItem: "AddMeeting", isRight: true, isStartPage: false, url: "", icon: "/apps/A000022/Content/Images/layoutimgs/add.png" },
        //{ menuItem: "New Risk", isRight: true, isStartPage: false, url: "", isButton: true, isAlwaysTop: true },
        //{ menuItem: "New Meeting", isRight: true, isStartPage: false, url: "", isButton: true, isAlwaysTop: true },
        { menuItem: "Stop Meeting", isRight: true, isStartPage: false, url: "", isButton: true, isAlwaysTop: true }
    ],
    leftNavItems: [
    ]
};

///home/Meeting
$(document).ready(function () {
   
  
    $("body").ConnateLayout(para);
    $(".PT_Right_Content").load(BaseMvcUrl+"/home/Meeting", function (data) {
        bindFormControls();
        bindAgenda("Agenda-Grid",0);
        bindMinuts("Minuts-Grid", 0);
         $(".PT_SecondRightMenu").show();
    });

});

$(document).on('click', '.round-sm hollow', function () {
    alert();
});

$(document).on('click', '.Overview', function () {
    
    layoutType = 0;
    $("#Grids").html('<div class ="next-agendas col-lg-6 col-md-6 col-sm-12 col-xs-12"><div id="Agenda-Grid"></div></div><div class ="previous-minutes col-lg-6 col-md-6 col-sm-12 col-xs-12"><div id="Minuts-Grid"></div></div>');
    bindAgenda("Agenda-Grid", 0);
    bindMinuts("Minuts-Grid", 0);
    $(".PT_SecondRightMenu").show();
});

$(document).on('click', '.Agenda', function () {
  
    layoutType = 1;
    $("#Grids").html('<div class ="next-agendas col-lg-12 col-md-12 col-sm-12 col-xs-12"><div id="Agenda-Grid"></div></div>');
    bindAgenda("Agenda-Grid", 1);
    $(".PT_SecondRightMenu").show();
});

$(document).on('click', '.Minutes', function () {
    layoutType = 1;
    $("#Grids").html('<div class ="next-agendas col-lg-12 col-md-12 col-sm-12 col-xs-12"><div id="Minuts-Grid"></div></div>');
    bindMinuts("Minuts-Grid", 1);
    $(".PT_SecondRightMenu").show();
});


$(window).resize(function () {
    $("#Agenda-Grid").css({ "min-height": $(window).height() - $("#PT_TopHeaders").height() - $("#PT_SecondHeaders").height(), "max-height": $(window).height() - $("#PT_TopHeaders").height() - $("#PT_SecondHeaders").height() });
    $("#Minuts-Grid").css({ "min-height": $(window).height() - $("#PT_TopHeaders").height() - $("#PT_SecondHeaders").height(), "max-height": $(window).height() - $("#PT_TopHeaders").height() - $("#PT_SecondHeaders").height() });
});


$(".addheading").click(function () {
    console.log("kn");

    alert("The paragraph was clicked.");
});

