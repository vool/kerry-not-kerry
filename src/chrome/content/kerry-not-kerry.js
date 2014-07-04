( function() {

		function walk(node) {
			// I stole this function from here:
			// http://is.gd/mwZp7E

			var child, next;

			switch ( node.nodeType ) {
				case 1:
				// Element
				case 9:
				// Document
				case 11:
					// Document fragment
					child = node.firstChild;
					while (child) {
						next = child.nextSibling;
						walk(child);
						child = next;
					}
					break;

				case 3:
					// Text node
					handleText(node);
					break;
			}

			if ((node.nodeName.toLowerCase() === 'img')) {// image node
				handleImage(node);
			}

		}

		function handleText(textNode) {
			var v = textNode.nodeValue;

			v = v.replace(/\bU[.]?S[.]? Secretary of State John Kerry\b/g, "The Kingdom");
			v = v.replace(/\bU[.]?S[.]? Secretary of State John F[.]? Kerry\b/g, "The Kingdom");
			v = v.replace(/\bU[.]?S[.]? Secretary John Kerry\b/g, "County Kerry");
			v = v.replace(/\bUS secretary of state\b/g, "County Kerry");
			v = v.replace(/\bSecretary of State John Kerry\b/g, "The Glorious Kingdom of Kerry");
			v = v.replace(/\bSecretary Kerry\b/g, "Co. Kerry");
			v = v.replace(/\bSenator John Kerry\b/g, "The County Kerry");
			v = v.replace(/\bJohn Kerry\b/gi, "County Kerry");
			v = v.replace(/\bMr[.]? Kerry\b/g, "County Kerry");
			v = v.replace(/\bMister Kerry\b/g, "County Kerry");
			v = v.replace(/\bJohn (Forbes|F[.]?) Kerry\b/g, "County Kerry");

			textNode.nodeValue = v;
		}

		function handleImage(imgNode) {

			// replacement images array
			var imgs = ['http://www.thebenchwarmers.ie/wp-content/uploads/2013/07/1224272519081_1.jpg',
			'http://media.joe.ie/wp-content/uploads/2012/11/story_29989_29989-xlarge.JPG',
			'http://gaabanter.ie/wp-content/uploads/2013/08/1151078_10201926279697946_1300549949_n.jpg',
			'http://www.radiokerry.ie/wp-content/uploads/2013/03/kerry.jpg',
			'http://c1.dmlimg.com/2e5c93fc5fcb277c88837e18ff8cc04519cedc032a30a4284c25282fa259ba80.jpg',
			'http://www.squareball.com/wp-content/uploads/2008/09/kerry_woman.jpg',
			'http://www.irelandluxurytours.com/wp-content/uploads/2013/05/Great-And-Little-Skellig-County-Kerry.jpg',
			'http://www.irelandluxurytours.com/wp-content/uploads/2013/05/Dingle-County-Kerry.jpg',
			'http://img.rasset.ie/0005f256-642.jpg',
			'http://www.gaa.ie/content/images/news/kerry/OSePaidi_Manager.jpg'
			];

			// get the alt tag
			var alt = imgNode.getAttribute('alt');
			
			// get the title tag
			var title = imgNode.getAttribute('title');

			//test if the alt of title or alt tag contain john and kerry 	
			if (((/John/i.test(alt)) || (/John/i.test(title))) && ((/Kerry/i.test(alt)) || (/Kerry/i.test(title)))) {

				imgNode.src = imgs[Math.floor(Math.random() * imgs.length)];

			}

		}

		function windowLoadHandler() {
			// Dear Mozilla: I hate you for making me do this.
			window.removeEventListener('load', windowLoadHandler);

			document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
				walk(e.originalTarget.body);
			});
		}


		window.addEventListener('load', windowLoadHandler);
	}());
