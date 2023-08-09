type PluginOptions = {
  onAlreadyAtPositions: () => void;
  onCancel: () => void;
  onEnd: () => void;
  onStart: () => void;
  onTick: () => void;
  friction: number;
  acceleration: number;
};

export default class Scrl {
  _raf?: number;
  _positionY = 0;
  _velocityY = 0;
  _targetPositionY: number = 0;
  _targetPositionYWithOffset = 0;
  _direction = 0;

  defaults: PluginOptions = {
    onAlreadyAtPositions: () => {},
    onCancel: () => {},
    onEnd: () => {},
    onStart: () => {},
    onTick: () => {},
    friction: 0.7, // 1 - .3
    acceleration: 0.04,
  };

  options: PluginOptions;

  constructor(options: Partial<PluginOptions> = {}) {

    // merge options
    this.options = {
      ...this.defaults,
      ...options,
    };

    // set reverse friction
    if (options && options.friction) {
      this.options.friction = 1 - options.friction;
    }

    // register listener for cancel on wheel event
    window.addEventListener(
      "mousewheel",
      () => {
        if (this._raf) {
          this.options.onCancel();
          cancelAnimationFrame(this._raf);
          this._raf = undefined;
        }
      },
      {
        passive: true,
      }
    );
  }

  scrollTo = (offset: Element | number) => {
    if (offset instanceof Element) {
      // the offset is element
      this._targetPositionY = Math.round(
        offset.getBoundingClientRect().top + window.scrollY
      );
    } else if (Math.round(this._targetPositionY) === this._targetPositionY) {
      // the offset is a number
      this._targetPositionY = Math.round(offset);
    } else {
      console.error("Argument must be a number or an element.");
      return;
    }

    // don't animate beyond the document height
    if (
      this._targetPositionY >
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      this._targetPositionY =
        document.documentElement.scrollHeight - window.innerHeight;
    }

    // calculated required values
    this._positionY =
      document.body.scrollTop || document.documentElement.scrollTop;
    this._direction = this._positionY > this._targetPositionY ? -1 : 1;
    this._targetPositionYWithOffset = this._targetPositionY + this._direction;
    this._velocityY = 0;

    if (this._positionY !== this._targetPositionY) {
      // start animation
      this.options.onStart();
      this._animate();
    } else {
      // page is already at the position
      this.options.onAlreadyAtPositions();
    }
  };

  _animate = () => {
    const distance = this._update();
    this._render();

    if (
      (this._direction === 1 && this._targetPositionY > this._positionY) ||
      (this._direction === -1 && this._targetPositionY < this._positionY)
    ) {
      // calculate next position
      this._raf = requestAnimationFrame(this._animate);
      this.options.onTick();
    } else {
      // finish and set position to the final position
      this._positionY = this._targetPositionY;
      this._render();
      this._raf = undefined;
      this.options.onTick();
      this.options.onEnd();
      // this.triggerEvent('scrollDone')
    }
  };

  _update = () => {
    const distance = this._targetPositionYWithOffset - this._positionY;
    const attraction = distance * this.options.acceleration;

    this._velocityY += attraction;

    this._velocityY *= this.options.friction;
    this._positionY += this._velocityY;

    return Math.abs(distance);
  };

  _render = () => {
    window.scrollTo(0, this._positionY);
  };
}
