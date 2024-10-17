import birdsData from "./birdData.js";







let unknownAudio = document.getElementById("unknown-bird");
let currentAudio = document.getElementById("current-bird");





let songs = [];
let firstArr = [];
let lvlCount = 0;
let birdsOneArr = birdsData[lvlCount];

let scoreForLvl = 0;
let countLvl =0;

let scoreOverall = [];



function loadAudio(){
    birdsData.forEach(function(elem, index){
        elem.forEach(function(item, i){
            songs.push(item.audio)
        })
        
    })
}
loadAudio()


    let audioPlayers = document.querySelectorAll('.audio-block')

    if (audioPlayers.length){
    unknownAudio.src = songs[0]
    currentAudio.src = songs[2]
   
    unknownAudio.currentTime = 0;
    currentAudio.currentTime = 0;
    unknownAudio.pause();
    currentAudio.pause();

        audioPlayers.forEach(function(audioPlayer, i){
            let audio = audioPlayer.querySelector("audio");
            let playBtn = audioPlayer.querySelector(".playbutton")
         
            playBtn.addEventListener("click", function(elem){
                let target = elem.currentTarget;
                console.log(target)
                let audio = target.closest('.audio-block').querySelector("audio");
                
                if(audio.paused){
                    audio.play()
                    target.classList.add('pausebutton')
                } else {
                    audio.pause();
                    target.classList.remove('pausebutton')
                }
            })
           
            let currentTime = audioPlayer.querySelector('.currentTime')
            let durationTime = audioPlayer.querySelector('.durationTime')
            let progress = audioPlayer.querySelector(".progress")
            let progressContainer = audioPlayer.querySelector(".progress-bar")
            let volumeSlider = audioPlayer.querySelector(".audio-volume")
            
            if(durationTime.textContent === "NaN:NaN"){
                durationTime.textContent === "0:00"
            }

            console.log(currentTime)
            audio.addEventListener('timeupdate', function(){
                let seconds = Math.floor(audio.currentTime);
                let minutes = Math.floor(audio.currentTime / 60);
                let result = `${minutes}:${String(seconds % 60).padStart(2, 0)}`
                currentTime.textContent = result;  
            })
            
           audio.addEventListener("timeupdate", function(){
                if (audio.duration != audio.duration){
                    durationTime.textContent = "0:00";
                } else {
                    let seconds = Math.floor(audio.duration);
                     let minutes = Math.floor(audio.duration / 60);
                    console.log(minutes)
                    let result = `${minutes}:${String(seconds % 60).padStart(2, 0)}`
                    durationTime.textContent = result;
                }
          
        })
         audio.addEventListener('timeupdate', function(){
            let current = audio.currentTime;
            let duration = audio.duration;
            const progressPercent = (current/ duration) * 100;
            progress.style.width = `${progressPercent}%`;
         })
    
         progressContainer.addEventListener('click', function(elem){
            const width = this.clientWidth;
            const click = elem.offsetX;
            audio.currentTime = (click / width) * audio.duration;
         });
    
         volumeSlider.addEventListener('click', function(){
            audio.volume = volumeSlider.value /100;
         }); 
    })
    
    }


   
    
  
    console.log(createQuizAnswer(1))

  function createAboutBirdBlock(id){
    
    const aboutBirdDecription = document.querySelector(".about-bird-description");
    const aboutBirdPic = document.querySelector(".about-bird-pic");
    const aboutBirdName = document.querySelector(".about-bird-name");
    const aboutBirdLatName = document.querySelector(".about-bird-lat-name");

    const aboutBirdAudio = document.getElementById("current-bird");

    aboutBirdDecription.textContent = birdsOneArr[id].description;
    aboutBirdPic.src = birdsOneArr[id].image;
    aboutBirdName.textContent = birdsOneArr[id].name;
    aboutBirdLatName.textContent = birdsOneArr[id].species; 
    aboutBirdAudio.src = birdsOneArr[id].audio

  }  

  function updateBirdContent(id){
    let convert = Number(id)
    let result = createAboutBirdBlock(convert);
    return result;
  }
    
  function createQuizAnswer(num){
    let createItem = document.createElement("li");
    createItem.classList.add("select-bird-item")
    
    createItem.setAttribute("id", `${birdsOneArr[num].id}`);
    createItem.innerHTML = `<div class="select-bird-indicator"></div>${birdsOneArr[num].name}`
   
    return createItem
   
}

function updateBlock(id){
    let convert = Number(id)
    let result = createAboutBirdBlock(convert);
    return result;
}

function createQuizQuestion(){
    let random = Math.floor(Math.random() * (6 - 1 + 1)) + 0;
    const unknownBirdAudio = document.getElementById("unknown-bird");
    const unknownBirdBlock = document.querySelector(".unknown-bird-block")
    unknownBirdAudio.src = birdsOneArr[random].audio;
    unknownBirdBlock.id = birdsOneArr[random].id;
    
}
 
createQuizQuestion()





function createRandomOrderofQuiz(){
    const listOfQuiz = document.querySelector(".select-bird-list")
    listOfQuiz.innerHTML =""
    let quizIdArr = birdsOneArr.map((elem) => {
        return Number(elem);
    })
    
    let frsRandomArray = getInclusiveRandow(quizIdArr);
    console.log(frsRandomArray)
    for (let k = 0; k<frsRandomArray.length; k++){
    let item = createQuizAnswer(frsRandomArray[k]);
    listOfQuiz.appendChild(item)
    }
}
createRandomOrderofQuiz()



let nextLvlBtn = document.querySelector(".next-lvl-btn")

nextLvlBtn.disabled = "disabled";

nextLvlBtn.addEventListener("click", goToNextLvL)

function goToNextLvL(){
    scoreForLvl = 0;
    

    let aboutBirdDecription = document.querySelector(".about-bird-description");
    let aboutBirdDefault = document.querySelector(".about-bird-default");
    let unknownBirdBlock = document.querySelector(".unknown-bird-block")
    let aboutBirdBody = document.querySelector(".about-bird-body");

    let unknownBirdName = document.querySelector(".unknown-bird-name");
    let unknownBirdImg = document.querySelector(".unknown-bird-pic");

    unknownBirdName.textContent = "***";
    unknownBirdImg.src = "./assets/img/unknown-bird.jpg"
    aboutBirdDefault.classList.remove("hide");
    aboutBirdBody.classList.remove("show");
    aboutBirdDecription.classList.remove("show");
    lvlCount = lvlCount +1;
    birdsOneArr = birdsData[lvlCount]
    console.log(birdsOneArr)
    console.log(lvlCount)
    createQuizQuestion()
    createRandomOrderofQuiz()
    changeNavigation()
    let quizItems = document.querySelectorAll(".select-bird-item");
    nextLvlBtn.disabled = "disabled";
    
    quizItems.forEach(function(elem){
    elem.addEventListener("click", setValidation)
})
    
}


let quizItems = document.querySelectorAll(".select-bird-item");
let scorePoints = document.querySelector(".point")


quizItems.forEach(function(elem){
    elem.addEventListener("click", setValidation)
})

function setValidation(){

    let indicator = this.querySelector(".select-bird-indicator");
    let soundOfValidation = new Audio();
    let aboutBirdBody = document.querySelector(".about-bird-body");
        let aboutBirdDecription = document.querySelector(".about-bird-description");
        let aboutBirdDefault = document.querySelector(".about-bird-default");
        let unknownBirdBlock = document.querySelector(".unknown-bird-block")
       

        aboutBirdDefault.classList.add("hide");
        aboutBirdBody.classList.add("show");
        aboutBirdDecription.classList.add("show");
        
        let idUnknown = unknownBirdBlock.id
        console.log(idUnknown)
        let target = this;

        if(target.id === idUnknown){
           
            updateBlock(target.id-1)
            indicator.classList.add("correct")
            soundOfValidation.src = "./assets/sound/correct_tone.mp3";
            soundOfValidation.play()
            let count = scoreForLvl + 5
            scoreOverall.push(count);
            let scoreResult = scoreOverall.reduce(function(sum, elem){
                return sum + elem;
            },0)
            scorePoints.textContent = scoreResult;

            correctQuizAnswer(idUnknown-1)
            nextLvlBtn.disabled = "";
            if (scoreOverall.length == 6 ){
                nextLvlBtn.textContent = "Показать результаты";
                nextLvlBtn.addEventListener("click", function(){
                    document.location = "result.html"
                })

                if (!localStorage.hasOwnProperty("scoreResult")){
                    localStorage.setItem("scoreResult","[]")
                }
                localStorage["scoreResult"] =JSON.parse(scoreResult);
                
            }
            

        }if (target.id.slice(0, 5) === "Done-"){
            console.log("Переходи на следующий уровень !")
            console.log(target.id[5])
            let id = Number(target.id[5])
            updateBlock(id-1)


        } if ( target.id.slice(0, 5) != "Done-" && target.id != idUnknown) {
            updateBlock(target.id-1)
            indicator.classList.add("wrong")
            soundOfValidation.src = "./assets/sound/wrong_tone.mp3";
            soundOfValidation.play()
            scoreForLvl = scoreForLvl -1
            target.id = `Done-${target.id}`;
        } 
        
}




function correctQuizAnswer(id){
    const unknownBirdPic = document.querySelector(".unknown-bird-pic");
    const unknownBirdName = document.querySelector(".unknown-bird-name");
    
    unknownBirdPic.src = birdsOneArr[id].image;
    unknownBirdName.textContent = birdsOneArr[id].name;    
    let quizItems = document.querySelectorAll(".select-bird-item");
    quizItems.forEach(function(elem){
        if (elem.id.slice(0,5) =="Done-"){
            let cutChar = elem.id[5]
            elem.id = ""
            elem.id = `Done-${cutChar}`
        }else {
            elem.id = `Done-${elem.id}`
        }
        
    })
}

function changeNavigation(){
    
    let navItem = document.querySelectorAll(".nav-item");
    navItem[countLvl].classList.add("active");
    countLvl++
}
changeNavigation()

  function getInclusiveRandow(actArr){
    let newArr = new Set()
    for (let i = 0; i<actArr.length; i++){
        if(actArr.length === 6){
            while(newArr.size < 6) {
                let random = Math.floor(Math.random() * (6 - 1 + 1)) + 0;
                  newArr.add(random)
              }
        }
    }
  
  return Array.from(newArr)
  }








