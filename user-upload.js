var parsed;
var modified;
var userIP; var city; var city_lat; var city_long; var isp;
data = new Array();
document.getElementById('myFile').addEventListener('change', function selectedFileChanged() {
    $('#sendtoserver').attr("disabled", "disabled");
    $('#exportslim').attr("disabled", "disabled");
    $('#pleasewait').removeAttr("hidden");
    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        parsed = JSON.parse(reader.result);
        if (typeof parsed.log == 'undefined' && parsed[0].url != 'undefined') { //Check if file is already at the needed format
            modified = parsed;
        } else {
            for (i = 0; i < parsed.log.entries.length; i++) {
                let host, contentType, cacheControl, pragma, expires,
                    age = '0';
                lastModified = '0';
                for (j = 0; j < parsed.log.entries[i].request.headers.length; j++) {
                    if (parsed.log.entries[i].request.headers[j].name == "Host") {
                        host = parsed.log.entries[i].request.headers[j].value
                    } else if (parsed.log.entries[i].request.headers[j].name == "Content-Type") {
                        contentType = parsed.log.entries[i].request.headers[j].value;
                    } else if (parsed.log.entries[i].request.headers[j].name == "Cache-Control") {
                        cacheControl = parsed.log.entries[i].request.headers[j].value;
                    } else if (parsed.log.entries[i].request.headers[j].name == "Pragma") {
                        pragma = parsed.log.entries[i].request.headers[j].value;
                    } else if (parsed.log.entries[i].request.headers[j].name == "Expires") {
                        expires = parsed.log.entries[i].request.headers[j].value;
                    } else if (parsed.log.entries[i].request.headers[j].name == "Age") {
                        age = parsed.log.entries[i].request.headers[j].value;
                    } else if (parsed.log.entries[i].request.headers[j].name == "Last-Modified") {
                        lastModified = parsed.log.entries[i].request.headers[j].value;
                    }
                }
                
                /* url = parsed.log.entries[i].request.url;
                ip = parsed.log.entries[i].serverIPAddress;
                temp = ip;//.replace("[", "");
                temp2 = temp;//.replace("]", ""); //Quick fix for ipv6 */
                
                if (contentType == null || contentType == '') {
                    contentType = "text/html"
                }
                contentType = contentType.split(';')[0]; //to clear not needed values
                let modifiedHar = {
                    "startedDateTime": parsed.log.entries[i].startedDateTime,
                    "wait": parsed.log.entries[i].timings.wait,
                    "serverIPAddress": parsed.log.entries[i].serverIPAddress,
                    "method": parsed.log.entries[i].request.method,
                    "url": parsed.log.entries[i].request.url,
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
                data.push(modifiedHar);
            }
        }
    
    
        $.ajax({
            dataType: "json",
            url: "getIPinfo.php",            
            success: function(uu){
              console.log(uu);              
              userIP = uu.query;
              isp = uu.asname;
              city = uu.city;
              city_lat = uu.lat;
              city_long = uu.lon;
              console.log(isp, city, userIP);              
            }
          })
 
    };
    reader.readAsText(this.files[0]);
    console.log(data);
    $('#sendtoserver').removeAttr("disabled", "disabled");
    $('#exportslim').removeAttr("disabled", "disabled");
    $('#pleasewait').attr("hidden", "hidden");
});


function SendToServer() {
    data = JSON.stringify(data);
    $.ajax({
        url: "uploadhar.php",
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
        success: function(response){
            $("#PLEASE").html(response);
        }   
    });
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

    modified = JSON.stringify(data, undefined, '\t');
    DownloadJSON(modified)
}
