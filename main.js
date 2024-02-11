
const question = document.querySelector(".displayQuestions");
const answer = document.querySelector(".displayAnswer");

const micOn = document.querySelector(".micOn");
const micOff = document.querySelector(".micOff");
const inputArrow = document.querySelector(".inputArrow");
const inputContainer= document.querySelector(".inputContainer");
const inputBox = document.querySelector(".inputBox");
const detailForm = document.querySelector(".detailForm");

const details = document.querySelector(".details");
const detailsPdf = document.querySelector(".detailsPdf");
const eclipse = document.querySelector(".eclipse");
const wave = document.querySelector(".wave");



const Username = "Venkatesh";
// const inputs = [
//   "Company Name",
//   "Financial Year Of The Comapny",
//   "Proposed Bank Of The Company",
//   "Activities Of The Company",
//   "Facility Of The Company",
//   "Legal Status Of The Company",
//   "Share Capital",
//   "Name Of The Share Holder",
//   "Select Role Of The Company",
//   "Emirates I D",
//   "Share Holding Percentage",
//   "Official Mail Address",
//   "Contact Number",
//   "Additional Details",
// ];

const inputs = [
  {question:"Company Name", name:"companyName",answered:false},
  {question:"Financial Year Of The Company",name:"FinancialYearOfTheCompany",answered:false},
  {question:"Proposed Bank Of The Company",name:"ProposedBankOfTheCompany",answered:false},
  {question:"Activities Of The Company",name:"ActivitiesOfTheDmccCompany",answered:false},
  {question:"Facility Of The Company",name:"FacilityOfTheDmccCompany",answered:false},
  {question:"Legal Status Of The Company",name:"LegalStatusOfTheCompany",answered:false},
  {question:"Share Capital",name:"ShareCapital",answered:false},
  {question:"Name Of The Share Holder",name:"NameOfTheShareHolder",answered:false},
  {question:"Select Role Of The Company",name:"SelectRoleOfTheCompany",answered:false},
  {question:"Emirates I D",name:"EmiratesId",answered:false},
  {question:"Share Holding Percentage",name:"ShareHoldingPercentage",answered:false},
  {question:"Official Mail Address",name:"OfficialMailAddress",answered:false},
  {question:"Contact Number",name:"ContactNumber",answered:false},
  {question:"Additional Details",name:"AdditionalDetails",answered:false}
];
var result = {};

if ("speechSynthesis" in window) {
  console.log("Web Speech API supported!");
} else {
  console.log("Web Speech API not supported :-(");
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


async function speakInput() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  for (const input of inputs) {
    speak(`Please share the ${input.question}`);
    question.textContent = `Please share the ${input.question}`;

    await new Promise((resolve) => {

      
      inputContainer.addEventListener("submit", (e) => {
        e.preventDefault();
        if(!input.answered){
          input.answered=true;
             // details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${inputBox.value}</span></div>`;
          details.innerHTML+=`<div class="eachDetail"><label for=${input.name} >${input.question}&nbsp:&nbsp</label>
          <input type="text" id=${input.name} name=${input.name} value=${inputBox.value}></div>`
          inputBox.value = "";
          resolve();
        }
      });
  


      micOn.addEventListener("click", () => {
        // Handle mic activation
        micOff.style.display = "block";
        micOn.style.display = "none";
        eclipse.style.display='none';
        wave.style.display='block';
        recognition.start();
      });

      micOff.addEventListener("click", () => {
        // Handle mic deactivation
        micOff.style.display = "none";
        micOn.style.display = "block";
        eclipse.style.display='block';
        wave.style.display='none';
        recognition.stop();
      });

      recognition.onresult = (event) => {
        // Handle speech recognition result
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        result[input] = transcript;
        input.answered=true;
        // details.innerHTML += `<div class="eachDetail">${input}&nbsp:&nbsp<span class="eachDetailAnswer">${transcript}</span></div>`;
        details.innerHTML+=`<div><label for=${input.name} class="eachDetail">${input.question}&nbsp:&nbsp</label>
          <input type="text" id=${input.name} name=${input.name} value=${transcript}> </div>`
        resolve();
      };

      recognition.onerror = (event) => {
        // Handle speech recognition errors
        speak("Sorry, I didn't get that. Please try again.");
        console.error("Speech recognition error:", event.error);
      };
    });
  }

  speak("Thank you and upload all the required documents");
  question.textContent = "Thank you and upload all the required documents";
  detailsPdf.style.display = "block";
}


detailForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  console.log(e.target.elements);
})