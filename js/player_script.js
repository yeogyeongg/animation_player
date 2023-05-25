/* player.js 에 선언 된 aniVideo 가 사용되고 있어요!  */

// 자막을 표시할 요소 가져오기
const scriptContainer = document.querySelector(".script");

// 자막 보여줄지 설정
const showScriptButton = document.querySelector('.script_button')
showScriptButton.addEventListener('click', function() {
	if(showScriptButton.classList.contains('active')) {
		showScriptButton.textContent = '자막 보기'
		showScriptButton.classList.remove('active')
		scriptContainer.style.display = 'none'
	} else {
		showScriptButton.textContent = '자막 닫기'
		showScriptButton.classList.add('active')
		scriptContainer.style.display = 'block'
	}
})

// 자막 언어 설정
const showKorButton = document.querySelector('.translate_button')
let language = 'jpn'; // 실제 사용중인 class 명 값과 같게
showKorButton.addEventListener('click', function() {
	if(showKorButton.classList.contains('active')) {
		showKorButton.textContent = '한국어보기'
		showKorButton.classList.remove('active')
		scriptContainer.classList.replace(language, 'jpn');
		language = 'jpn'
	} else {
		showKorButton.textContent = '일본어보기'
		showKorButton.classList.add('active')
		scriptContainer.classList.replace(language, 'kor');
		language = 'kor'
	}
	settingScript()
})

// 비디오 재생 시간 변화 감지
aniVideo.addEventListener("timeupdate", settingScript);

// 자막 설정
function settingScript() {
	const currentTime = aniVideo.currentTime;

	// 현재 재생 시간에 해당하는 자막 찾기
	const currentScript = scriptList.find(
		(subtitle) => currentTime >= subtitle.startTime && currentTime < subtitle.endTime
	);

	// 자막 표시
	if (currentScript) {
		scriptContainer.innerHTML = currentScript[language];
		scriptContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	} else {
		scriptContainer.textContent = "";
		scriptContainer.style.backgroundColor = 'transparent';
	}
}

const characterParentBox = document.querySelector('.voice_box');
const characters = characterParentBox.childNodes;
characters.forEach(c => {
	c.addEventListener('click', ()=>{
		c.classList.toggle('active');
	})
})

const scriptList = [
	{
		name: 'characters_1',
		startTime: '0.278',
		endTime: '3.753',
		jpn: '<ruby>大<rt>おお</rt></ruby>きくて きれいだね。',
		kor: '크고 예쁘네.',
	},
	{
		name: 'characters_2',
		startTime: '3.754',
		endTime: '7.962',
		jpn: 'うん、<ruby>中<rt>なか</rt></ruby>は もっと<ruby>広<rt>ひろ</rt></ruby>いよ。',
		kor: '응, 안은 더 넓어.',
	},
	{
		name: 'characters_3',
		startTime: '7.962',
		endTime: '11.179',
		jpn: '<ruby>外<rt>がい</rt></ruby><ruby>国<rt>こく</rt></ruby><ruby>人<rt>じん</rt></ruby>も <ruby>多<rt>おお</rt></ruby>いね',
		kor: '외국인도 많네.',
	},
	{
		name: 'characters_1',
		startTime: '11.179',
		endTime: '15.329',
		jpn: 'すずきくんは よく ここに<ruby>来<rt>く</rt></ruby>るの？',
		kor: '스즈키 군은 자주 여기에 와?',
	},
	{
		name: 'characters_2',
		startTime: '15.329',
		endTime: '19.280',
		jpn: 'いや、とおいから あまり <ruby>来<rt>こ</rt></ruby>ない。',
		kor: '아니, 멀기 때문에 그다지 오지 않아.',
	},
	{
		name: 'characters_2',
		startTime: '19.280',
		endTime: '22.258',
		jpn: 'すもうは テレビで <ruby>見<rt>み</rt></ruby>るよ。',
		kor: '스모는 텔레비전으로 봐.',
	},
	{
		name: 'characters_3',
		startTime: '22.258',
		endTime: '25.177',
		jpn: '<ruby>好<rt>す</rt></ruby>きな りきしは いる？',
		kor: '좋아하는 스모 선수는 있어?',
	},
	{
		name: 'characters_2',
		startTime: '25.177',
		endTime: '30.2',
		jpn: 'そうだね。<ruby>今<rt>いま</rt></ruby>は とくに いないよ。',
		kor: '그렇네, 지금은 딱히 없어.',
	},
	{
		name: 'characters_1',
		startTime: '30.2',
		endTime: '33.755',
		jpn: 'あ、そろそろ <ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>だよ。',
		kor: '아, 슬슬 시간이 됐어.',
	},
	{
		name: 'characters_2',
		startTime: '33.755',
		endTime: '35.959',
		jpn: 'ほんとうだ。',
		kor: '진짜네.',
	},
];

