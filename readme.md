# Scrl
**Page acceleration based scroll animation.** (extracted swup scroll)
* Makes scroll animation smooth but quick.
* Takes care of special cases like scrolling to the bottom of the page instead of suddenly stopping.
* Stops scrolling when mouse wheel is used to avoid jaggy page.
* Provides handlers different events. 


## Usage
Create instance...
```javascript
import Scrl from 'scrl';
var scrl = new Scrl();
```
and use it.
```javascript
scrl.scrollTo(offset);  // offset can be a number of pixel, or an element on the page
```

## Options
Scrl accepts several options:
```javascript
const defaults = {
    onAlreadyAtPositions: () => {}, // handler called when link leads to the offset page is already at
    onCancel: () => {},             // handler called on cancel of the animation by mouse scroll
    onEnd: () => {},                // handler called on end of the animation
    onStart: () => {},              // handler called on start of the animation
    onTick: () => {},               // handler called on every step of the animation
    friction: .3,                   // the friction of the scroll animation    
    acceleration: .04,              // the acceleration of the scroll animation,
    target: window,                 // which element to scroll. either window or an element on the page
}
```