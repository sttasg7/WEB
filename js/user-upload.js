//file processing is done entirely on user's browser via javascript.
//server is contacted only after the user presses Upload (which uploads slim har only)
//thus users privacy is ensured 

var parsed;
var modified;
var userIP; var city; var city_lat; var city_long; var isp;
var check = 0;
data = new Array();

//action listener for Select File button
document.getElementById('myFile').addEventListener('change', function selectedFileChanged() {
    $('#sendtoserver').attr("disabled", "disabled");
    $('#exportslim').attr("disabled", "disabled");
    $('#pleasewait').removeAttr("hidden");
    $("#success").attr("hidden", "hidden");
    data = [];

    //add a FileReader on the button
    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        //check if the file is in the needed format
        try {
            parsed = JSON.parse(reader.result);
            check = 1;
        } catch (e) {
            $('#sendtoserver').attr("disabled", "disabled");
            $('#sendtoserver').attr("disabled", "disabled");
            $('#exportslim').attr("disabled", "disabled");
            $('#pleasewait').html("Your file is not compatible. <br> Please use a .har log. <br> Check FAQ on how to obtain them");
            $('#pleasewait').removeAttr("hidden");
            check = 0;
        };

        //if the file is in .har format we check if it has been already processed
        if (check == 1) {
            if (typeof parsed.log == 'undefined' && parsed[0].url != 'undefined') { //if it is already processed, we avoid processing it again
                $('#sendtoserver').attr("disabled", "disabled");
                $('#exportslim').attr("disabled", "disabled");
                $('#pleasewait').html("You can't use the Export option as this log has already been processed and slimmed down. <br> You may upload the original log to the server.");
                $('#pleasewait').removeAttr("hidden");
            } else { //if it's not, we run the main process
                $('#pleasewait').html("Please wait for the file to process");
                $('#pleasewait').removeAttr("hidden");
                for (i = 0; i < parsed.log.entries.length; i++) {
                    let host, contentType, cacheControl, pragma, expires, age, lastModified;

                    //check both request and response fields for data
                    //grab only needed attributes                     

                    for (j = 0; j < parsed.log.entries[i].request.headers.length; j++) {
                        if (parsed.log.entries[i].request.headers[j].name == "Host" || parsed.log.entries[i].request.headers[j].name == "host") {
                            host = parsed.log.entries[i].request.headers[j].value
                        } else if (parsed.log.entries[i].request.headers[j].name == "Content-Type" || parsed.log.entries[i].request.headers[j].name == "content-type") {
                            contentType = parsed.log.entries[i].request.headers[j].value;
                        } else if (parsed.log.entries[i].request.headers[j].name == "Cache-Control" || parsed.log.entries[i].request.headers[j].name == "cache-control") {
                            cacheControl = parsed.log.entries[i].request.headers[j].value;
                        } else if (parsed.log.entries[i].request.headers[j].name == "Pragma" || parsed.log.entries[i].request.headers[j].name == "pragma") {
                            pragma = parsed.log.entries[i].request.headers[j].value;
                        } else if (parsed.log.entries[i].request.headers[j].name == "Expires" || parsed.log.entries[i].request.headers[j].name == "expires") {
                            expires = parsed.log.entries[i].request.headers[j].value;
                        } else if (parsed.log.entries[i].request.headers[j].name == "Age" || parsed.log.entries[i].request.headers[j].name == "age") {
                            age = parsed.log.entries[i].request.headers[j].value;
                        } else if (parsed.log.entries[i].request.headers[j].name == "Last-Modified" || parsed.log.entries[i].request.headers[j].name == "last-modified") {
                            lastModified = parsed.log.entries[i].request.headers[j].value;
                        }
                    }
                    for (k = 0; k < parsed.log.entries[i].response.headers.length; k++) {
                        if (parsed.log.entries[i].response.headers[k].name == "Host" || parsed.log.entries[i].response.headers[k].name == "host") {
                            host = parsed.log.entries[i].response.headers[k].value
                        } else if (parsed.log.entries[i].response.headers[k].name == "Content-Type" || parsed.log.entries[i].response.headers[k].name == "content-type") {
                            contentType = parsed.log.entries[i].response.headers[k].value;
                        } else if (parsed.log.entries[i].response.headers[k].name == "Cache-Control" || parsed.log.entries[i].response.headers[k].name == "cache-control") {
                            cacheControl = parsed.log.entries[i].response.headers[k].value;
                        } else if (parsed.log.entries[i].response.headers[k].name == "Pragma" || parsed.log.entries[i].response.headers[k].name == "pragma") {
                            pragma = parsed.log.entries[i].response.headers[k].value;
                        } else if (parsed.log.entries[i].response.headers[k].name == "Expires" || parsed.log.entries[i].response.headers[k].name == "expires") {
                            expires = parsed.log.entries[i].response.headers[k].value;
                        } else if (parsed.log.entries[i].response.headers[k].name == "Age" || parsed.log.entries[i].response.headers[k].name == "age") {
                            age = parsed.log.entries[i].response.headers[k].value;
                        } else if (parsed.log.entries[i].response.headers[k].name == "Last-Modified" || parsed.log.entries[i].response.headers[k].name == "last-modified") {
                            lastModified = parsed.log.entries[i].response.headers[k].value;
                        }
                    }

                    //domain process
                    url = parsed.log.entries[i].request.url;
                    let domain = (new URL(url));
                    domain = domain.hostname.replace('www.', '');

                    //IPv6 process
                    let ipfix1 = parsed.log.entries[i].serverIPAddress || "";
                    let ipfix2 = ipfix1.replace("[", "");
                    let ipfix = ipfix2.replace("]", ""); 

                    //null content type process
                    if (contentType == null || contentType == '') {
                        contentType = "text/html"
                    }
                    contentType = contentType.split(';')[0];


                    //create an object will all extracted values
                    let modifiedHar = {
                        "startedDateTime": parsed.log.entries[i].startedDateTime,
                        "wait": parsed.log.entries[i].timings.wait,
                        "serverIPAddress": ipfix,
                        "method": parsed.log.entries[i].request.method,
                        "url": domain,
                        "status": parsed.log.entries[i].response.status,
                        "statusText": parsed.log.entries[i].response.statusText,
                        "Content_Type": contentType,
                        "Cache_Control": cacheControl,
                        "Pragma": pragma,
                        "Expires": expires,
                        "Age": age,
                        "Last_Modified": lastModified,
                        "Host": host,

                    }

                    //push it to "data" array
                    data.push(modifiedHar);
                }
                $('#pleasewait').attr("hidden", "hidden");
            }
        }

        //user IP, city, lat, long process
        $.ajax({
            dataType: "json",
            url: "../backend/getIPinfo.php",
            success: function (uu) {
                userIP = uu.query;
                isp = uu.asname;
                city = uu.city;
                city_lat = uu.lat;
                city_long = uu.lon;
            }
        })

    };
    reader.readAsText(this.files[0]);
    console.log("Your slimmed har data", data);
    $('#sendtoserver').removeAttr("disabled", "disabled");
    $('#exportslim').removeAttr("disabled", "disabled");
    $('#pleasewait').attr("hidden", "hidden");
});


//when the Upload button is pressed we contact the server to insert to SQL
function SendToServer() {
    if( data.length !== 0 ){
        $('#sendtoserver').attr("disabled", "disabled");
        $('#exportslim').attr("disabled", "disabled");
        $('#pleasewait').removeAttr("hidden", "hidden");
        data = JSON.stringify(data);

        $.ajax({
            url: "../backend/uploadhar.php",
            type: "POST",
            data: {
                data: data,
                userip: userIP,
                city: city,
                lat: city_lat,
                long: city_long,
                isp: isp
            },
            cache: false,
            success: function () {
                updatelibrary(); //after the upload is done, update serverloc library            
            }
        });
    } else{
        $('#pleasewait').html("You have not selected any file! Please select a HAR file to Submit!");
        $('#pleasewait').removeAttr("hidden");
    }    
}

function DownloadJSON(argument) {
    argument = [argument]; //Converting JSON string to BLOB
    var blob1 = new Blob(argument, { type: "application/json" });
    var url = window.URL || window.webkitURL;
    link = url.createObjectURL(blob1);
    var a = document.createElement("a");
    a.download = "Modified.json";
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function Export() {
    if( data.length !== 0 ){
        modified = JSON.stringify(data, undefined, '\t');
        DownloadJSON(modified)
    } else{
        $('#pleasewait').html("You have not selected any file! Please select a HAR file to Export!");
        $('#pleasewait').removeAttr("hidden");
    } 
}

function updatelibrary() {
    $.ajax({
        url: "../backend/serverlibrary.php",
        cache: false,
        success: function (res) {
            console.log(res);
        }
    })
    $("#sendtoserver").removeAttr("disabled", "disabled");
    $("#success").removeAttr("hidden", "hidden");
    $('#pleasewait').attr("hidden", "hidden");
}
