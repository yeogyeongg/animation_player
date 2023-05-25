const aniVideo = document.querySelector('#aniVideo');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const stopBtn = document.querySelector('#stopBtn');
const timeline = document.querySelector('.timeline');
const thumb = document.querySelector('.slider-thumb');
const progressBar = document.querySelector('.progress');


// 초 -> 00:00 형태로 format
function formatTime(seconds) {
	let min = Math.floor(seconds / 60)
	let sec = Math.floor(seconds - (min * 60));

	if(min < 10) min = `0${min}`;
	if(sec < 10) sec = `0${sec}`;
	return `${min}:${sec}`;
}
// 총 시간 구하기
const getTotalTime = () => {
	document.querySelector('.total_time').textContent = formatTime(aniVideo.duration)
}
// 현재재생시간 구하기
const getCurrentTime = () => {
	document.querySelector('.now_time').textContent = formatTime(aniVideo.currentTime);
}
// 비디오 로드 될때
aniVideo.addEventListener('loadedmetadata', getTotalTime);
// 재생이 가능한 상태일 경우
aniVideo.addEventListener('canplaythrough', getTotalTime);

// 재생 버튼 눌렀을 때
playBtn.addEventListener('click', playTrack);
function playTrack(){
	aniVideo.play();
	playBtn.style.display = 'none'
	pauseBtn.style.display = 'block'
	setInterval(getCurrentTime, 1000);
}
// 일시정지 버튼 눌렀을 때
pauseBtn.addEventListener('click', pauseTrack);
function pauseTrack(){
	aniVideo.pause();
	pauseBtn.style.display = 'none'
	playBtn.style.display = 'block'
}
// 음원이 끝나면
aniVideo.addEventListener('ended', () => setTimeout(stopTrack, 1000));
// stop 버튼 눌렀을 때
stopBtn.addEventListener('click', stopTrack);
function stopTrack(){
	pauseTrack();
	aniVideo.currentTime = 0;
}

// 비디오의 진행상황 업데이트
aniVideo.addEventListener('timeupdate', updateProgress);
function updateProgress() {
	const progress = (aniVideo.currentTime / aniVideo.duration) * 100;
	progressBar.style.width = progress + '%';
	thumb.style.left = progress + '%';
}


let isMouseDown = false;
timeline.addEventListener("mousedown", function(event) {
	isMouseDown = true;
	seek(event);
});
timeline.addEventListener('mousemove', seek);
timeline.addEventListener('mouseup', function (event) {
	isMouseDown = false;
	seek(event);
});
timeline.addEventListener('mouseout', function (event) {
	isMouseDown = false;
	seek(event);
});
function seek(event){
	if(isMouseDown) {
		const timelineWidth = timeline.clientWidth;
		const clickOffset = event.offsetX;
		const duration = aniVideo.duration;
		const seekTime = (clickOffset / timelineWidth) * duration;
		aniVideo.currentTime = seekTime;
		updateProgress()
		getCurrentTime()
	}
}

function dragStart(event) {
	event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
	event.preventDefault();
}

function drop(event) {
	event.preventDefault();
	var data = event.dataTransfer.getData('text/plain');
	var draggedElement = document.getElementById(data);
	var offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
	draggedElement.style.left = (event.clientX - offsetX) + 'px';
	progressBar.style.width = (event.clientX - offsetX) + '%';
	thumb.style.left = (event.clientX - offsetX) + '%';
}