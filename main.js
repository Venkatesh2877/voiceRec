// const btn = document.querySelector(".talk");
// const content = document.querySelector(".content");
const question = document.querySelector(".displayQuestions");
const answer=document.querySelector(".displayAnswer");
// const start = document.querySelector(".start");
// const stop = document.querySelector(".stop");
const micOn=document.querySelector('.micOn');
const micOff=document.querySelector('.micOff');
const inputArrow=document.querySelector('.inputArrow');
const inputBox=document.querySelector('.inputBox');


const details=document.querySelector('.details');

const Username = "Venkatesh";
const inputs = [
  "Company Name",
  "Financial Year Of The Comapny",
  "Proposed Bank Of The Company",
  "Activities Of The Company",
  "Facility Of The Company",
  "Legal Status Of The Company",
  "Share Capital",
  "Name Of The Share Holder",
  "Select Role Of The Company",
  "Emirates I D",
  "Share Holding Percentage",
  "Official Mail Address",
  "Contact Number",
  "Additional Details",
];
var result = {};

if('speechSynthesis' in window){
	console.log("Web Speech API supported!")
} else {
	console.log("Web Speech API not supported :-(")   
}


function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
  return true;
}

function wishMe() {
  var day = new Date();
  var hr = day.getHours();

  if (hr >= 0 && hr < 12) {
    speak("Good morning");
  } else if (hr >= 12 && hr < 17) {
    speak("Good Afternoon");
    console.log("Good Afternoon");
  } else {
    speak("Good evening");
  }
}

window.addEventListener("load", () => {
  speak(`Hello, ${Username}`);
  wishMe();
  speakInput();
});

// async function speakInput() {
//   for (const input of inputs) {
//     speak(`Please share the ${input}`);
//     question.textContent=`Please share the ${input}`;
//     // answer.textContent = "";
//     await new Promise((resolve) => {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognition = new SpeechRecognition();
   

//         micOn.addEventListener('click',()=>{
//           micOff.style.display="block"
//           micOn.style.display="none"
//           recognition.start();
//         })

//         micOff.addEventListener('click',()=>{
//           micOff.style.display="none"
//           micOn.style.display="block"
//           recognition.stop();
//         })

//         inputArrow.addEventListener('click',()=>{
//           console.log(inputBox.value)
//           if(inputBox.value!=""){
//             details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${inputBox.value}</span></div>`;
//             inputBox.value="";
//             resolve();
//           }
//         })


//       recognition.onresult = (event) => {
//         const current = event.resultIndex;
//         const transcript = event.results[current][0].transcript;
//         // answer.textContent = transcript;
//         console.log(input);
//         result[input]=transcript;
//         console.log(result);
//         details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${transcript}</span></div>`;

//         resolve();
//       };
//     });
//   }
//   speak("Thank you and upload all the required documents");
// }



async function speakInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  for (const input of inputs) {
    speak(`Please share the ${input}`);
    question.textContent = `Please share the ${input}`;

    await new Promise((resolve) => {
      inputArrow.addEventListener('click', () => {
        // Handle text input
        if (inputBox.value !== "") {
          details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${inputBox.value}</span></div>`;
          inputValue = inputBox.value;
          inputBox.value = "";
          resolve();
        }
      });

      micOn.addEventListener('click', () => {
        // Handle mic activation
        micOff.style.display = "block";
        micOn.style.display = "none";
        recognition.start();
      });

      micOff.addEventListener('click', () => {
        // Handle mic deactivation
        micOff.style.display = "none";
        micOn.style.display = "block";
        recognition.stop();
      });

      recognition.onresult = (event) => {
        // Handle speech recognition result
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        result[input] = transcript;
        details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${transcript}</span></div>`;
        resolve();
      };

      recognition.onerror = (event) => {
        // Handle speech recognition errors
        console.error('Speech recognition error:', event.error);
        resolve();
      };
    });
  }

  speak("Thank you and upload all the required documents");
}
