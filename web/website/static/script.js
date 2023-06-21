Dropzone.autoDiscover = false;



function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        autoProcessQueue: false
    });

    dz.on("addedfile", function () {
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;

        var url = "http://127.0.0.1:5000/classify_image";

        $.post(url, {
            image_data: imageData
        }, function (data, status) {
            if (data.length == 0) {
                $('#resultDiv').hide()
                $('#errorTxt').text("Could not detect! [Check Internet connection / Change Image]")
                $('#error').show()
                return;
            }
            else {
                data = data[0]
                $('#error').hide()
            }
            if (data.class == 'ratan_tata') {
                $('#resultName').text('Ratan Tata')
                $('#resultImg').attr('src', '../static/images/tata.png')
            }
            else if (data.class == 'elon_musk') {
                $('#resultName').text('Elon Musk')
                $('#resultImg').attr('src', '../static/images/elon.png')
            }
            else if (data.class == 'greta_thunberg') {
                $('#resultName').text('Greta Thunberg')
                $('#resultImg').attr('src', '../static/images/greta.png')
            }
            else if (data.class == 'sachin_tendulkar') {
                $('#resultName').text('Sachin Tendulkar')
                $('#resultImg').attr('src', '../static/images/sachin.png')
            }
            else if (data.class == 'sundar_pichai') {
                $('#resultName').text('Sundar Pichai')
                $('#resultImg').attr('src', '../static/images/sundar.png')
            }
            person_list = ['elon_musk', 'greta_thunberg', 'ratan_tata', 'sachin_tendulkar', 'sundar_pichai']
            for (person of person_list) {
                proba = data.class_proba[data.class_dict[person]]
                $(`#${person}_proba`).text(proba)
            }
            $('#resultDiv').show()
        });
    });

    $("#classifyBtn").on('click', function (e) {
        dz.processQueue();
    });
}

$(document).ready(function () {
    console.log("ready!");
    $("#resultDiv").hide()
    $('#error').hide()
    init();
});
