# Simple HTML5 game  

This repository is a fork from [lostdecade/simple_canvas_game](https://github.com/lostdecade/simple_canvas_game) :star:  

---

## Usage  

You can [try it](https://christianbender.github.io/simple_canvas_game/) online.  
Or you clone this repository and :  

```bash
npm install
npm run serve
``` 

After this commands you can start the game with [http://127.0.0.1:8080](http://127.0.0.1:8080) in your browser.  


---

## Changes that I have done  

* Changed the ```README.md```  
* Added a license (MIT)  
* Added the npm manager  
  * Added ```http-server```  
* In the javascript code:
  * Added constants for magical numbers.  
  * Added bounds. Now the hero can't leave the playfield.  
  * Simple AI for the monster. Now the monster tried to escape.  
  * Places the monster in the bounds of the playfield.   
  * Logic for rose.  
* Graphic: 
  * Added a [rose](https://opengameart.org/content/rose-sprite)  
    * If you touch a rose then decrements your score.  
* Added GitHub page for this project.  