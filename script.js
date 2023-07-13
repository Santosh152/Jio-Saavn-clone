console.log('Welcome to Jio Saavn');

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(`song/1.mp3`);
let masterPlay = document.getElementById(`masterPlay`);
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    {songName: "Nikamma ", filePath: "song/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "Ishq Sufiyana - The Dirty Picture", filePath: "song/2.mp3", coverPath: "cover/2.jpg"},
    {songName: "Chup Chup Ke - Rush", filePath: "song/3.mp3", coverPath: "cover/3.jpg"},
    {songName: "Tu-Aake-Dekhle", filePath: "song/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "Neele Neele Ambar Par - Sanam", filePath: "song/5.mp3", coverPath: "cover/1.jpg"},
    {songName: "Gulabi Aankhen - SANAM", filePath: "song/6.mp3", coverPath: "cover/2.jpg"},
    {songName: "Ye Tune Kya Kiya", filePath: "song/7.mp3", coverPath: "cover/3.jpg"},
    {songName: "Main-Shiv-Ka-Hu-Shiv-Mere-Hai", filePath: "song/8.mp3", coverPath: "cover/4.jpg"},
    {songName: "Meri Lagi Shyam Sang Preet ", filePath: "song/9.mp3", coverPath: "cover/2.jpg"},
    {songName: "Backbone - Harrdy Sandhu", filePath: "song/10.mp3", coverPath: "cover/3.jpg"},
]
    songItems.forEach((element, i)=>{
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    })
//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate',()=>{
    // update seeker
   progress = parseInt(( audioElement.currentTime/audioElement.duration)* 100);
    console.log(progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        
    })

}

songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songIndex = parseInt(e.target.id);
        makeAllPlays();
                if(audioElement.paused){
                    e.target.classList.remove('fa-circle-play');
                    e.target.classList.add('fa-circle-pause');
                    audioElement.src = `song/${songIndex+1}.mp3`;
                    masterSongName.innerText = songs[songIndex].songName;
                    audioElement.currentTime = 0;
                    audioElement.play();
                    gif.style.opacity = 1;
                    masterPlay.classList.remove('fa-circle-play');
                    masterPlay.classList.add('fa-circle-pause');

                }
                else{
                    e.target.classList.remove('fa-circle-pause');
                    e.target.classList.add('fa-circle-play');
                    audioElement.pause();
                    gif.style.opacity = 0;
                    masterPlay.classList.remove('fa-circle-pause');
                    masterPlay.classList.add('fa-circle-play');
                }
                
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})