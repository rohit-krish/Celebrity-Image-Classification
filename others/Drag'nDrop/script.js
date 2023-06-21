Dropzone.autoDiscover = false;

resp = null

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });

    dz.on("addedfile", function () {
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        console.log(imageData)

        var url = "http://127.0.0.1:5000/classify_image";

        $.post(url, {
            image_data: imageData
        },function(data,status){
            console.log(data)
            resp = data
        });
    });

    $("#doIt").on('click', function (e) {
        dz.processQueue();
    });
}

$(document).ready(function () {
    console.log("ready!");
    init();
});
