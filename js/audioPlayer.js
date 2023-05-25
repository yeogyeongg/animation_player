const playBtn = document.querySelector('#PlayBtn');
const stopBtn = document.querySelector('#StopBtn');
const slider = document.querySelector('.timeline');
const thumb = document.querySelector('.slider-thumb');
const progress = document.querySelector('.progress');
const textSounds = document.querySelectorAll('.audio_text');
const mainScroller = document.querySelector('#mainScroller');

console.log(playBtn, 'paly')
// 캐릭터 무음
let characterList = [];
let charactersMute = false;

//전체 음원 생성
const audio = new Audio();
audio.src = './video/animation.mp4';
// audio.src = audiofileFolder + audiofileName + ".mp3";
audio.load();
// 텍스트 음원 생성
const textAudio = new Audio();


//Global Variables
//Is the track playing
let trackPlaying = false;

// 전체 클릭시
let allAudioClick = true;


//Add a click event on the play button
playBtn.addEventListener('click', playTrack);

//Play Track Function
function playTrack(){
  //If the audio is not playing
  if(trackPlaying === false){
    //Play the  audiod
    audio.play();

    //And a pause icon inside the button
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
    /*Set the trackPlaying to true,
    because the track is now playing */
    trackPlaying = true;

    //텍스트음원 일시정지
    
    textAudio.pause();
    
    textSounds.forEach(function(e){
      e.classList.remove('off', 'active')
    });

  }else{
    isPause()
  }
  allAudioClick = true;
}

audio.addEventListener('loadeddata', () => {
  //Set max value to slider
  slider.setAttribute('max', audio.duration);
  

});


function isPause(){
  //Pause the audio
  audio.pause();
  //And a pause icon inside the button
  playBtn.classList.remove('pause');
  playBtn.classList.add('play');

  /*Set the trackPlaying to false,
  because the track is now paused again */
  trackPlaying = false;
}



//Function for handling the slider values
function customSlider() {
  //Get the percentage
  const val = (slider.value / audio.duration) * 100 + "%";
  //Set the thumb and progress to the current value
  progress.style.width = val;
  thumb.style.left = val;

  //set audio current time to slider value
  console.log(slider, 'slider')
  audio.currentTime = slider.value;
}

customSlider();

/*Repeat the function when 
the slider is selected*/
slider.addEventListener('input', customSlider);


//when the time changes on the audio  track
audio.addEventListener('timeupdate', () => {
  //Get the  current audio time
  
  // const currentAudioTimeF = Math.floor(audio.currentTime);
  const currentAudioTimeF = audio.currentTime;
  
  //Get the percentage
  const timePercentage = ( currentAudioTimeF / audio.duration) * 100 + "%";
  
  //Set the slider progress to the percenterage
  progress.style.width = timePercentage;
  thumb.style.left = timePercentage;

  //텍스트 색상 활성화
  if(allAudioClick == true){
    audiotextColor();
  }
  
})

// 음원이 끝나면 
audio.addEventListener('ended', stopEnd);

// stop 버튼 클릭시
stopBtn.addEventListener('click', stopEnd);

function stopEnd(){
  isPause();
  audio.currentTime = 0;
  
    const scrollbarHandle= document.querySelector('.scrollbarHandle');
    
    if(scrollbarHandle !== null){
      mainScroller.style.top = 0;      
      scrollbarHandle.style.top = 0;
      
    };
}

// 캐릭터 음소거 되었을 경우 
function characterMute(){
  if(charactersMute == true){
    const characters = document.querySelectorAll('.characters .character_item');
    characters.forEach((e, i) => {
      characterList[i] = false;   
      e.addEventListener('click', ()=>{
        e.getAttribute('data-character');
        e.classList.toggle('off');
        if(e.classList.contains('off')){
          characterList[i] = true;
        }else{
          characterList[i] = false;
        }
      })    
    });
  }
}


//텍스값 가져와서 색상 효과 
function audiotextColor(){
  const currentAudioTime = audio.currentTime;

  textSounds.forEach(function(e){
    const textSoundStart = e.getAttribute('data-audioStart');
    const textSoundEnd = e.getAttribute('data-audioEnd');
    const textCharacter = e.getAttribute('data-characterNum');
    const dataScrolltop = e.getAttribute('data-scrolltop');
    const dataScrollbartop = e.getAttribute('data-scrollbartop');
    if(currentAudioTime > textSoundStart && currentAudioTime < textSoundEnd ){
      // on는 퀴즈로 인해 텍스트 활성화를 다르게 하기 위한 방편
      e.classList.add('active');

      // 음소거 관련
      if(charactersMute == true){
        if( characterList[textCharacter] == true){
          audio.muted = true;
        }else{
          audio.muted = false;
        }
      }

      // 스크롤 위치 조절
      if(dataScrolltop){
        const scrollbarTrackHeight = document.querySelector('.scrollbarHandle');
        mainScroller.style.top = dataScrolltop +"px";
        scrollbarTrackHeight.style.top = dataScrollbartop +"px";
      }
    }else{
      e.classList.remove('active')
    }
  });
}


//텍스트 클릭시 음원 재생
function istextSounds(){
  const textSounds = document.querySelectorAll('.audio_text');
  textSounds.forEach(function(e){
    e.addEventListener('click', () => {
      let dataAudiofile = e.getAttribute('data-audioFile');
      if(dataAudiofile){
        let eachAudiotext = audiofileFolder + dataAudiofile +".mp3";
        allAudioClick = false;
        textAudio.src = eachAudiotext;
        textAudio.play();
        textSounds.forEach(function(e){
          e.classList.remove('active');
        });
        e.classList.add('active');
        // 음원 끝났을 때
        textAudio.onended = function(){
            e.classList.remove('active');
        }
      }
      isPause();
      audio.currentTime = 0;
    })
  });
}
istextSounds();