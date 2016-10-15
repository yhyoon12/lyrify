$(function(){
  var osascript = require('node-osascript');

  osascript.execute('tell application "Spotify"\n set currentArtist to artist of current track as string\n set currentSong to name of current track as string\n return {currentSong, currentArtist}\n end tell', function(err, result, raw) {
    song_title = JSON.stringify(result[0]).slice(1, -1);
    song_artist = JSON.stringify(result[1]).slice(1, -1);
    if (song_title.indexOf("(") != -1) {
      song_title = song_title.substring(0, song_title.indexOf("("));
    }
    document.title = song_title + ": " + song_artist;
    regex_title = song_title.replace(/\./g, '').replace(/\s/g, '').toLowerCase();
    regex_artist = song_artist.replace(/\$/g, 's').replace(/\./g, '').replace(/\s/g, '').toLowerCase();
    document.getElementById('lyrics').src = "http://www.azlyrics.com/lyrics/" + regex_artist + "/" + regex_title + ".html";
  });
});
