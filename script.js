async function getUser() {
  console.log("Hello, I'm here");
  
  let pincode = document.getElementById("pin").value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let age = document.getElementById("age").value;
  let msgEle = document.getElementById("msg");
  console.log(pincode, name);
  console.log(date, age);
  
  //setInterval(function(){ console.log("Hello"); }, 6000);
  let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`

  function speakText(msg) {
      let speech = new SpeechSynthesisUtterance();
      speech.text = msg;
      speech.lang = "en-US";
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
  }
  async function Fetch(url) {
      return fetch(url)
      .then(data => {
        return data.json();
      })
      .then(res => {
        return res;
      })
  }
  let data_raw = await Fetch(url);
    
  if(data_raw.error) {
    msgEle.innerText = data_raw.error;
    return;
  }

  document.body.style.backgroundImage = 'url(./tec.gif)';
  msgEle.innerText = `Working on it ...`;
  speakText("Sir, we are working on your request");

  setInterval(async () => {
    let data_raw = await Fetch(url);
    
    let data = data_raw.sessions;

    let avail = 0;

    if(data.length == 0) {
      avail = 0;
    } else {
      data.map(av => {
        if(av.available_capacity_dose1 > 0 && av.min_age_limit == age) {
          avail += 1;
        }
        //console.log(av.name, av.available_capacity_dose1);
      })

      //console.log(avail);
      if(avail >= 1) {
        // slot available
        let msg = `congratulations sir! you can book now, ${avail} slots ${avail == 1 ? 'is' : 'are'} available`;
        speakText(msg);
      } else {
        // slot not available
      }

    }

  }, 5000);
  
}

