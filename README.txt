/*
	============================
		MEMORY GAME DETAILS 
	============================
*/

	- Dependencies:

		1- JQuery Library 				[ V3.1.1 ]
		2- Bootstrap Framework 			[ v4.0.0-beta.2 ]
		3- Wow js for the animations. 	[ v1.1.3 ]

	- Game Specifications: 

		* Shuffling the cards: once the game starts, it randomaly shuffels the cards.

		* Timer: when the game starts, a timer works to count down 1 min, that is the time the player should take to successfully pass the game. the color of the timer changes to red once the time becomes 10sec or less. 

		* Pop up Modal: if the player successfully pass the game and all the cards has been matched, a pop up modal appears to congratulate the player and displays the time he took to win the game, and the stars ratings. and a button to re-start the game.

		* Stars ratings: 

			~ Star rating intially sets to be [3].
			~ if the player clicked on 8 different cards and didn't match any two cards, the star ratings becomes [2]
			~ if the player clicked on 12 different cards and the unmatched cards are bigger than 6, the star ratings becomes [1]
			~ if the player clicked on 16 different cards and the unmatched cards are bigger than 4, the star ratings becomes [0]
			~ else, the star ratings still [3].

		* Move Counter: this is a counter to count How many matched cards. 

		* Lose the game: when the player loses the game, a new pop up modal appears, it shows how many moves the player has made and a button to play again. 

		* Animation: using the WOW JS Library
			~ when click on each card, an animation happens.
			~ when two cards matches, a new animation happens.

		* Leaderboard: 
		Once the player wins the game, in the pop up modal there is an input field to register the name of the player and saves it into a leaderboard table down below.

			** the table displays: 
				1- name: name of the player.
				2- time: the consuming time to win the game.
				3- Star rating: number of the stars.
			** NOTE:
			 the table sorts the players depending on the time consumed to win the game. [ best player consumes less time ] so he comes first.

		* Keyboard:
			~ You can use the Arrows [ up / down / left / right ] to navigate the cards.
			~ use [ z key ] to select the one of the cards.

		* the game is FULLY Responisve. works fine at mobiles, tablets, Big Screens.

		* All the needed prefixes for the css properties has been added to make sure each property works fine in all the different browsers. 