var stop = 0;
var i = 0;
var plistmode = false;

function togglePlistMode() {
  if(plistmode == false) {
    plistmode = true;
  }
  else {
    plistmode = false;
  }
}

function playListMode(plistname) {
  var plistnum = prompt("Number of songs in Playlist " + plistname)
}

function rmstrp(string, strm) {
  return string.split(strm)[0]
}

function elementHide(id) {
  var hide = document.getElementById(id).style;
  hide.display = "None";
}

function elementShow(id) {
  var hide = document.getElementById(id).style;
  hide.display = "Block";
}

function songPlay(id) {
  document.getElementById(id).play();
};

function loadsong() {
  let data = document.getElementById("file").files[0];
  if(stop == 0) {
    if(data == null) {
      alert("TypeError: Failed to execute '<audio src='null'></audio>': audio file is null")
    }
    else {
      if(plistmode == true) {
        playListMode(prompt("Playlist Name insert down there"))
      }
      var songname = data.name;
      var filtersongname = rmstrp(songname, ".mp3")
      if(filtersongname == songname) {
        filtersongname = "Playing: " + rmstrp(songname, ".wav")
      }
      else {
        filtersongname = "Playing: " + rmstrp(songname, ".mp3")
      }
      const fileURl = window.URL.createObjectURL(data);
      const aud = document.createElement("audio")
      const name = document.createElement("h1")
      const so = document.createTextNode(filtersongname);
      const element = document.getElementById("songname");
      name.id = "sname"
      name.style = "color:white"
      aud.src = fileURl;
      aud.id = "name"
      aud.loop = true
      name.appendChild(so);
      document.body.appendChild(aud);
      element.appendChild(name);
      elementHide("sname");
      startPlayer(aud.id);
    }
  }
  else {
    if(data == null) {
      alert("TypeError: Failed to execute '<audio src='null'></audio>': audio file is null")
    }
    else {
        var songname = data.name;
        var filtersongname = rmstrp(songname, ".mp3")
        if(filtersongname == songname) {
          filtersongname = "Playing: " + rmstrp(songname, ".wav")
        }
        else {
          filtersongname = "Playing: " + rmstrp(songname, ".mp3")
        }
        const fileURl = window.URL.createObjectURL(data);
        const aud = document.getElementById("name");
        const name = document.getElementById("sname")
        const so = document.createTextNode(filtersongname)
        aud.src = fileURl;
        aud.load()
        name.replaceChildren(so)
        startPlayer(aud.id);
        elementShow("songname")
        stop = 0;
      }
    }
}

function startPlayer(audioID) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
  setTimeout(function() {
    elementHide("file");
    elementShow("controlpanel")
    elementHide("myBar")
    elementHide("button");
    elementHide("pltoggle");
    elementShow("sname")
    songPlay(audioID);
  }, 1000);
}

function pausesong() {
  let audio = document.getElementById("name").pause();
  elementHide("pause")
  elementShow("resume")
}

function resumesong() {
  let audio = document.getElementById("name");
  elementShow("pause")
  elementHide("resume")
  audio.play()
}

function stopsong() {
  let broker = document.getElementById("file");
  let audio = document.getElementById("name");
  i = 0;
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
      width--;
      elem.style.width = width + "%";
    }
  }
  audio.load();
  audio.currentTime = 0;
  stop = 1;
  elementHide("controlpanel")
  elementShow("button")
  elementShow("file")
  elementShow("myBar")
  elementHide("sname");
  elementShow("pltoggle");
  broker.value = null;
}

function loopsong() {
  let audio = document.getElementById("name");
  if(audio.loop == true) {
    audio.loop = false;
  }
  else {
    audio.loop = true;
  }
}

function restartsong() {
  let audio = document.getElementById("name");
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}