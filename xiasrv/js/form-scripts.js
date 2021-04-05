$(document).ready(function () {
    getDevices();
});



function getDevices() {
    $.ajax({
        type: "get",
        url: "devices",
        dataType: "json",
        success: function (data) {
            if(JSON.stringify(data).includes("error"))
            {
                alert("error");
                $('#xia_devices').hide();
                $('#loading').hide();
            }
            else
            {
                $.each(data, function (i, item) {
                    var $tr = $('<tr>').append(
                        $('<td>').text(item[0]),
                        $('<td>').text(item[1]),
                        $('<td>').text(item[2]),
                        $('<td>').text(item[3]),
                        $('<td>').text(item[4]),
                        $('<td>').text(item[5]),
                        $('<td>').text(item[6]),
                        $('<td>').text(item[7])
                      );
                    i++;
                    $('#xia_devices').append('<tr>' + $tr.wrap('<tr>').html() + '</tr>');
                  });
                  $('#loading').hide();
                  $('#xia_devices').show();
                  
            }
            
        }
    });
}



