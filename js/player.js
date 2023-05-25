const aniVideo = document.querySelector('#aniVideo');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const stopBtn = document.querySelector('#stopBtn');
const timeline = document.querySelector('.timeline');

// 영상 초 -> 00:00 형태로 format
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
	document.querySelector('.progress').style.width = progress + '%';
	document.querySelector('.slider-thumb').style.left = progress + '%';
}


/* 타임라인 클릭/드래그 하면서 구간 이동 */
timeline.addEventListener('click', moveTimeline);
timeline.addEventListener('mousedown', startDrag);
function startDrag(event) {
	event.preventDefault();

	document.addEventListener('mousemove', moveTimeline);
	document.addEventListener('mouseup', stopDrag);
}

function moveTimeline(event) {
	const timelineWidth = timeline.clientWidth;
	const duration = aniVideo.duration;
	let timelineRect = timeline.getBoundingClientRect();
	let position = ((event.clientX - timelineRect.left) / timelineWidth) * duration;

	if (position < 0) {
		position = 0;
	} else if (position > timelineRect.width) {
		position = timelineRect.width;
	}

	aniVideo.currentTime = position;
	updateProgress()
	getCurrentTime()
}

function stopDrag(event) {
	document.removeEventListener('mousemove', moveTimeline);
	document.removeEventListener('mouseup', stopDrag);
}
/* 타임라인 클릭/드래그 하면서 구간 이동 */