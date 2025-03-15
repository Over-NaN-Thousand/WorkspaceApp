$(document).ready(function () {
    // 動態載入header、sidebar同footer
    $("#header-mainjs").load("header.html");
    $("#leftSideBar-mainjs").load("leftsidebar.html", function () {
        // 當sidebar載入完成後，綁定點擊事件
        const sidebarButtons = $('.sidebar-btn');
        const contentSections = $('.content-section');

        sidebarButtons.on('click', function (e) {
            e.preventDefault(); // 防止表單提交

            // 移除所有按鈕嘅active class
            sidebarButtons.removeClass('active');
            // 為當前按鈕加active class
            $(this).addClass('active');

            // 隱藏所有內容
            contentSections.hide();
            // 顯示對應嘅內容
            const sectionId = $(this).data('section');
            $(`#${sectionId}`).show();
        });

        // 初始時觸發"Edit Profile"按鈕
        $('input[data-section="edit-profile"]').addClass('active');
    });
    $("#footer-mainjs").load("footer.html");
});