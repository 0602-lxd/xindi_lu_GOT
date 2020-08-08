(() => {
		console.log('winter is coming');

		let lightBox = document.querySelector('.lightbox'),
        lbClose = lightBox.querySelector('span'),
        lbVideo = lightBox.querySelector('video'),
        sigils = document.querySelectorAll('.sigilContainer'),
        houseImages = document.querySelector('#houseImages'),
        houseName = document.querySelector('.house-name'),
        houseBio = document.querySelector('.house-info'),
        playButton = document.querySelector('#playPause'),
        muteButton = document.querySelector('#mute'),
        goButton = document.querySelector('#go'),
        backButton = document.querySelector('#back'),
        fullScreenButton = document.querySelector('#expandScreen'),
        volumeChange = document.querySelector('#volumeControl'),
        timeBar = document.querySelector('#timeBar'),
		timer;


    const houseInfo = [
        ["Stark","House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North."],
        ["Baratheon", "House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark."],
        ["Lannister", `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.
        The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.
        `],
        ["Tully", `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."
        `],
        ["Greyjoy", `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.
        House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God. 
        `],
        ["Arryn", `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority. 
        `],
        ["Targaryen", `House Targaryen of Dragonstone is a Great House of Westeros and was the ruling royal House of the Seven Kingdoms for three centuries since it conquered and unified the realm, before it was deposed during Robert's Rebellion and House Baratheon replaced it as the new royal House. The few surviving Targaryens fled into exile to the Free Cities of Essos across the Narrow Sea. Currently based on Dragonstone off of the eastern coast of Westeros, House Targaryen seeks to retake the Seven Kingdoms from House Lannister, who formally replaced House Baratheon as the royal House following the destruction of the Great Sept of Baelor.
        `],
        ["Frey", `House Frey of the Twins was the Great House of the Riverlands, having gained their position for their treachery against their former liege lords, House Tully, who were stripped of all their lands and titles for their rebellion against the Iron Throne; House Tully had supported the independence movement for the Kingdom of the North. The current head of the house is unknown following the assassinations of Lord Walder Frey and two of his sons, Lothar Frey and Walder Rivers, by the vengeful Arya Stark. This is made more complex by the subsequent assassination of all the male Freys soon after.
        `],
        ["Tyrell", `House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast, fertile, and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords Paramount of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen conquest. 
            The Tyrell sigil is a golden rose on a pale green field. Their house words are "Growing Strong."`]
        ];



    function showHideLightBox() {

        lightBox.classList.toggle('show-lightbox');

        if (lbVideo.currentTime!=lbVideo.duration && lbVideo.paused) {
            lbVideo.play();
        } else {
            lbVideo.currentTime = 0;
            lbVideo.pause();
        }
        //rewind the video and make it pause at current time of 0
    }


    function animateBanner() {
        houseImages.style.right = `${this.dataset.offset * 600}px`;
        houseName.textContent = `House ${houseInfo[this.dataset.offset][0]}`;
        houseBio.textContent =  `${houseInfo[this.dataset.offset][1]}`;

		lbVideo.src=`./video/House-${houseInfo[this.dataset.offset][0]}.mp4`;
        //multiply 600 by the data-offset
    }
    // sigils.forEach(sigil => sigil.addEventListener('click', showHideLightBox));
   


    function playPause() {
        if (lbVideo.paused) {
            lbVideo.play();
            playButton.innerHTML = "Pause";
        } else {
            lbVideo.pause();
            playButton.innerHTML = "Play";
        }
    }


    function muteUnmute() {
        if (lbVideo.muted == false) {
            lbVideo.muted = true;
            volumeChange.value = 0;
            muteButton.innerHTML = "Unmute";
        } else {
            lbVideo.muted = false;
            volumeChange.value = lbVideo.volume;
            muteButton.innerHTML = "Mute";
        }
    }


    function fullScreen() {
			if (lbVideo.requestFullscreen) {
			  lbVideo.requestFullscreen();
			} else if (lbVideo.mozRequestFullScreen) {
			  lbVideo.mozRequestFullScreen();
			} else if (lbVideo.webkitRequestFullscreen) {
			  lbVideo.webkitRequestFullscreen();
			}
    }


     function volume() {
		lbVideo.volume=volumeChange.value;
    }

	function backPlay(){
			lbVideo.currentTime=lbVideo.currentTime-5;
	}	
	
	function goPlay(){
			lbVideo.currentTime=lbVideo.currentTime+5;
	}

	function goToPlay(){
			lbVideo.currentTime=timeBar.value/100*lbVideo.duration;
	}

	
	function durationchange(){
			timer=setInterval(function(){
				timeBar.value=lbVideo.currentTime/lbVideo.duration*100;
			}, 1000);
	}
	
	function stopTimeBar(){
		clearInterval(timer);
	}


    sigils.forEach(sigil => {
		sigil.addEventListener('click', animateBanner);
		sigil.addEventListener('click', showHideLightBox);
	});
    lbClose.addEventListener('click', showHideLightBox);
    lbVideo.addEventListener('ended', showHideLightBox);
    lbVideo.addEventListener('play', durationchange);
    lbVideo.addEventListener('pause', stopTimeBar);
    lbVideo.addEventListener('ended', stopTimeBar);




    playButton.addEventListener("click", playPause);
    muteButton.addEventListener("click",  muteUnmute);


    volumeChange.addEventListener("change",  volume);
    timeBar.addEventListener("change",  goToPlay);

    backButton.addEventListener("click",  backPlay);
    goButton.addEventListener("click",  goPlay);
    fullScreenButton.addEventListener("click",  fullScreen);

	



})();

