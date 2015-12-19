(function () {
        //Change me!
	var id = "lamaggdpkgnpojeobnhmkbndakohndop";

	var myAudio = new Audio('chrome-extension://' + id + '/NeilDiamondComingToAmerica.wav');
    myAudio.load();
    var myImg = new Image();
    myImg.src = 'chrome-extension://' + id + '/neil-diamond.jpg';
    myImg.style.position = 'absolute';
    myImg.style.display = 'none';
    document.body.appendChild(myImg);

    setInterval(function() { 
    	var buttons = document.getElementsByClassName('date-nav-today');
 		var i;
        for (i = 0; (i < buttons.length); i++)
        {
            var button = buttons[i];
            var inner = button.getElementsByClassName('goog-imageless-button-content')[0];
    		if (!inner.getAttribute('data-' + id + '-set')) {
				inner.addEventListener('click', function() {
                	myAudio.currentTime = 0;
                	myAudio.play();
                	startAnimation();
                	return true;
                	});
    		inner.setAttribute('data-' + id + '-set', 1);
    		}
    	}
    }, 100);


   function startAnimation() {
   	var width = window.innerWidth;
    var height = window.innerHeight;
    var x = 0;
    var interval = setInterval(function() {
    	myImg.style.left = x + 'px';
    	var cx = (x - (width / 2)) / (width / 2);
    	var cy = Math.sqrt(1 - cx * cx);
    	myImg.style.top = (height - 225 - cy * (height / 2)) + 'px';
		myImg.style.display = 'block';
		myImg.style.zIndex = 999;
		if (x < 175)
                        {
                            myImg.style.opacity = x / 175;
                        }
                        else if (x > (width - 350))
                        {
                            myImg.style.opacity = 1.0 - ((x - (width - 350)) / 175);
                        }
                        else
                        {
                            myImg.style.opacity = 1.0;
                        }
    	x += 30;
    	if (x > (width - 175))
    	{
        	myImg.style.display = 'none';
        	clearInterval(interval);
    	}

    }, 50); 

    
   };




})();
