/* to process tou arxeiou ginetai sth javascript mesa sto browser. 
mono otan pathsei o user to Upload, exoume epikoinwnia me ton server, pou tou stelnoume mono ta apaitoumena entries. 
oso den to pataei, emeis den vlepoume tipota.
ara eimaste komple se auto pou zhtaei na yparxei privacy
*/

var parsed;
var modified;
var userIP; var city; var city_lat; var city_long; var isp;
var check = 0;
data = new Array();
document.getElementById('myFile').addEventListener('change', function selectedFileChanged() { //listener koitaei an epele3e arxeio o xrhsths
    $('#sendtoserver').attr("disabled", "disabled"); //kryvoume ola ta alerts
    $('#exportslim').attr("disabled", "disabled");
    $('#pleasewait').removeAttr("hidden"); //emfanizoume ena Please Wait oso trexei to reader.onload (gr.18)
    data = [];
    const reader = new FileReader(); 
    reader.onload = function fileReadCompleted() {
        try { //kanoume try/catch se periptwsh pou o xrhsths diale3ei akyro arxeio (.png, .exe, .zip, .jar ktl)
            parsed = JSON.parse(reader.result);
            check = 1; //an einai komple pame gr.30
        } catch (e) { 
            $('#sendtoserver').attr("disabled", "disabled");
            $('#exportslim').attr("disabled", "disabled");
            $('#pleasewait').html("Your file is not compatible. <br> Please use a .har log. <br> Check FAQ on how to obtain them");
            $('#pleasewait').removeAttr("hidden");
            check = 0;
        };

        if (check == 1) {
            if (typeof parsed.log == 'undefined' && parsed[0].url != 'undefined') { //checkaroume an to arxeio einai hdh apo Export
                $('#exportslim').attr("disabled", "disabled"); //an einai, den ton afhnoume na to kanei pali Export, giati gamietai ligo h diadikasia kai megalwnei xwris logo to arxeio
                $('#pleasewait').html("You can't use the Export option as this log has already been processed and slimmed down. <br> You may upload it to the server.");
                $('#pleasewait').removeAttr("hidden");
            } else {
                $('#pleasewait').html("Please wait for the file to process");
                $('#pleasewait').removeAttr("hidden"); //emfanizoume ena Please Wait oso trexei h diadikasia
                for (i = 0; i < parsed.log.entries.length; i++) { //koitame to log grammh grammh kai opou vroume stoixeio pou 8eloume to pairnoume -> gr.87
                    let host, contentType, cacheControl, pragma, expires, age, lastModified;

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

                    url = parsed.log.entries[i].request.url;
                    let domain = (new URL(url));
                    domain = domain.hostname.replace('www.', '');
                    let ipfix1 = parsed.log.entries[i].serverIPAddress || "";
                    let ipfix2 = ipfix1.replace("[", "");
                    let ipfix = ipfix2.replace("]", ""); //Quick fix for ipv6 */

                    if (contentType == null || contentType == '') {
                        contentType = "text/html"
                    }
                    contentType = contentType.split(';')[0]; //to clear not needed values
                    let modifiedHar = { //ftiaxnoume ena Object me ola ta stoixeia pou phrame -> gr.104
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
                    data.push(modifiedHar); //kai to vazoume se ena array
                }
                $('#pleasewait').attr("hidden", "hidden");
            }
        }

        $.ajax({ //kaloume to getIPinfo gia na paroume ta stoixeia tou user pou kanei upload (mia fora arkei)
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
    console.log(data);
    $('#sendtoserver').removeAttr("disabled", "disabled"); //afou teleiwse to process eley8erwnoume ta koumpakia kai kryvoume ta alerts
    $('#exportslim').removeAttr("disabled", "disabled");
    $('#pleasewait').attr("hidden", "hidden");
});


function SendToServer() {
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
            updatelibrary(); //molis teleiwsei to upload sth db, kanoume kai update th vivlio8hkh me tous server mas
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


//kanei update to serverloc (des serverlibrary.php)
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
