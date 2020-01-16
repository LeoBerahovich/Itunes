$(document).ready(function() {

    $("#clearB").click(function(){
        console.log("uhoh");
        $("#rez").empty();
        trackList = [];
        $("#clearB").hide();
    })

    $("#spidr").hide();
    $("#clearB").hide();

});


var trackList = [];

function search(){
    var name = $("#artist").val();
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + name,
        dataType: "jsonp",
        success: function (results){
            displayResults(results);
        }

    });

}

function suffer(){
    $("#spidr").toggle();
    console.log(document.getElementById("pain").innerHTML);
    if (document.getElementById("pain").innerHTML === "Enable Spiderman"){
        document.getElementById("pain").innerHTML = "Disable Spiderman";
    }else{
        document.getElementById("pain").innerHTML = "Enable Spiderman";
    }
}

function displayResults(results){
    trackList = [];
    console.log(results);
    var artist = "";
    var album = "";
    var cost = "";
    var tNum = "";
    var explicit = false;
    $("#clearB").show();
    $("#rez").empty();
    var resNo = $("#resNo").val();
    var hTable =  '<table class="table">';
    for (var i = 0; i < resNo; i++){

        artist = results.results[i].artistName;
        album = results.results[i].collectionCensoredName;
        cost = results.results[i].trackPrice;
        tNum = (results.results[i].trackNumber + " of " + results.results[i].trackCount);
        if (results.results[i].trackExplicitness === "notExplicit"){
            explicit = "Safe";
        }else{
            explicit = "Explicit";
        }

        hTable += '<br><br>';
        hTable += '<table class="tg">';
        hTable += '<tr>';
        hTable +=  results.results[i].trackName;
        hTable += '</tr><tr><td>';
        hTable += "<img src='" + results.results[i].artworkUrl100 + "'>";
        hTable += '</td><td>';
        hTable += "<audio controls='true' src=" + results.results[i].previewUrl + " id='audio' type='audio/m4a'></audio>";
        hTable += '</td></tr><table class="tm">';
        hTable += '<img id="img' + i + '" onClick="details(' + i + ')" class="infoBut" src="images/info.png" >';
        hTable += '</table> <table class="td">';
        hTable += '<tr id="tbl' + i + '" class="tm johnCena"></tr>';
        hTable += '<tr id="artN' + i + '"></tr>';
        hTable += '<tr id="albN' + i + '"></tr>';
        hTable += '<tr id="traP' + i + '"></tr>';
        hTable += '<tr id="traN' + i + '"></tr>';
        hTable += '<tr id="traE' + i + '"></tr>';
        hTable += '</table>';

        trackList.push( new Track(artist, album, cost, tNum, explicit));

    }

    $("#rez").append(hTable);
}

function details(x){
    console.log("yeet");
    if (document.getElementById("tbl" + parseInt(x)).className === "tm johnCena"){
        document.getElementById("tbl" + parseInt(x)).className = "tm hulkHogan";
        document.getElementById("artN" + parseInt(x)).innerHTML = ("<br>" + "Artist Name: " + trackList[x].artist);
        document.getElementById("albN" + parseInt(x)).innerHTML = ("<br>" + "Album Name: " + trackList[x].album);
        document.getElementById("traP" + parseInt(x)).innerHTML = ("<br>" + "Track Cost: " + trackList[x].cost);
        document.getElementById("traN" + parseInt(x)).innerHTML = ("<br>" + "Track Number: " + trackList[x].tNum);
        document.getElementById("traE" + parseInt(x)).innerHTML = ("<br>" + "Explicity: " + trackList[x].explicit);
    }else if(document.getElementById("tbl" + parseInt(x)).className === "tm hulkHogan"){
        document.getElementById("tbl" + parseInt(x)).className = "tm johnCena";
        document.getElementById("artN" + parseInt(x)).innerHTML = ('');
        document.getElementById("albN" + parseInt(x)).innerHTML = ('');
        document.getElementById("traP" + parseInt(x)).innerHTML = ('');
        document.getElementById("traN" + parseInt(x)).innerHTML = ('');
        document.getElementById("traE" + parseInt(x)).innerHTML = ('');
    }
}

function getQueryParameter(name)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == name){return pair[1];}
    }
    return false;
}

class Track{
    constructor(artist, album, cost, tNum, explicit) {
        this.artist = artist;
        this.album = album;
        this.cost = cost;
        this.tNum = tNum;
        this.explicit = explicit;
    }
}

