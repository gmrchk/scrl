export default class Scrl {
	_raf = null;
	_positionY = 0;
	_velocityY = 0;
	_targetPositionY = 0;
	_targetPositionYWithOffset = 0;
	_directionY = 0;

	constructor(options) {
		// default options
		const defaults = {
			onAlreadyAtPositions: () => {},
			onCancel: () => {},
			onEnd: () => {},
			onStart: () => {},
			onTick: () => {},
			friction: 0.7, // 1 - .3
			acceleration: 0.04,
			scrollTarget: window
		};

		// merge options
		this.options = {
			...defaults,
			...options
		};

		this.validateScrollTarget();

		// set reverse friction
		if (options && options.friction) {
			this.options.friction = 1 - options.friction;
		}

		// register listener for cancel on wheel event
		window.addEventListener(
			'mousewheel',
			(event) => {
				if (this._raf) {
					this.options.onCancel();
					cancelAnimationFrame(this._raf);
					this._raf = null;
				}
			},
			{
				passive: true
			}
		);
	}

    /**
     * Validates options.scrollTarget
     */
	validateScrollTarget() {
		if (this.options.scrollTarget == null) {
			throw new Error("[scrl] options.scrollTarget can't be null");
		}
		if (!this._scrollTargetIsWindow() && !(this.options.scrollTarget instanceof Element)) {
			throw new Error(
				'[srcl] options.scrollTarget expects either window or an HTMLElement. Given value:',
				options.scrollTarget
			);
		}
	}

	/**
	 * scroll towards a number or HTMLElement
	 * @param {number|HTMLElement} offsetOrElement
	 * @returns
	 */
	scrollTo = (offsetOrElement) => {
		if (offsetOrElement && offsetOrElement.nodeType) {
			// the offset is a HTMLElement
			this._targetPositionY = this._getTargetPositionFromElement(offsetOrElement);
		} else if (parseInt(offsetOrElement) === offsetOrElement) {
			// the offset is a number
			this._targetPositionY = Math.round(offsetOrElement);
		} else {
			console.error('Argument must be a number or HTMLElement.');
			return;
		}

		// don't animate beyond the available height
		this._targetPositionY = Math.min(
			this._targetPositionY,
			this._getMaximumPossibleScrollPosition()
		);

		// calculated required values
		this._positionY = this._getScrollPosition();
		this._directionY = this._positionY > this._targetPositionY ? -1 : 1;
		this._targetPositionYWithOffset = this._targetPositionY + this._directionY;
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

	/**
	 * Animate the scroll position
	 */
	_animate = () => {
		const distance = this._getUpdatedDistance();
		this._render();

		if (
			(this._directionY === 1 && this._targetPositionY > this._positionY) ||
			(this._directionY === -1 && this._targetPositionY < this._positionY)
		) {
			// calculate next position
			this._raf = requestAnimationFrame(this._animate);
			this.options.onTick();
		} else {
			// finish and set position to the final position
			this._positionY = this._targetPositionY;
			this._render();
			this._raf = null;
			this.options.onTick();
			this.options.onEnd();
			// this.triggerEvent('scrollDone')
		}
	};

	/**
	 * Updates and returns the distance the scroll has still to go
	 * @returns float
	 */
	_getUpdatedDistance = () => {
		const distance = this._targetPositionYWithOffset - this._positionY;
		const attraction = distance * this.options.acceleration;

		this._velocityY += attraction;

		this._velocityY *= this.options.friction;
		this._positionY += this._velocityY;

		return Math.abs(distance);
	};

	/**
	 * Apply the current scroll position to either the window or the HTMLElement
	 */
	_render = () => {
		this.options.scrollTarget.scrollTo(0, this._positionY);
	};

	/**
	 * Checks if an the given options.scrollTarget is equal to window
	 * @see https://stackoverflow.com/a/3099796/586823
	 * @returns boolean
	 */
	_scrollTargetIsWindow() {
		return this.options.scrollTarget.self === window;
	}

	/**
	 * Get the target scroll position for a given HTMLElement
	 * @param {window|HTMLElement} targetElement
	 * @returns float
	 */
	_getTargetPositionFromElement(targetElement) {
		if (this._scrollTargetIsWindow()) {
			return Math.round(targetElement.getBoundingClientRect().top + window.pageYOffset);
		}
		return (
			targetElement.getBoundingClientRect().top -
			this.options.scrollTarget.getBoundingClientRect().top +
			this.options.scrollTarget.scrollTop
		);
	}

	/**
	 * Get the maximum scroll position
	 * @returns float
	 */
	_getMaximumPossibleScrollPosition() {
		if (this._scrollTargetIsWindow()) {
			return document.documentElement.scrollHeight - window.innerHeight;
		}
		return this.options.scrollTarget.scrollHeight - this.options.scrollTarget.offsetHeight;
	}

	/**
	 * Returns the scrollTarget's current scroll position
	 * @returns float
	 */
	_getScrollPosition() {
		return this._scrollTargetIsWindow() ? window.pageYOffset : this.options.scrollTarget.scrollTop;
	}
}
