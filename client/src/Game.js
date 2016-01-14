import Mediator from 'shared/Mediator';
import bindAll from 'lodash.bindall';

export default class Game {
  constructor(timeEl, scoreEl) {
    bindAll(this, 'start', 'stop', 'addPoints');

    this.scoreEl = scoreEl;
    this.timeEl = timeEl;

    this.started = false;
    this.points = 0;
    this.pointsToWin = 150;
    this.remainingTime = 60; // seconds

    Mediator.on('app:stop', this.stop);
    Mediator.on('game:addpoints', this.addPoints);
  }

  start() {
    console.log('[Game] start');

    Mediator.emit('game:start');
    this.started = true;
  }

  stop() {
    if (!this.started) { return; }

    console.log('[Game] stop');

    Mediator.emit('game:stop');
    this.started = false;
  }

  reset() {
    this.points = 0;
    this.remainingTime = 60; // 3 minutes in seconds
  }

  removeTime(t) {
    this.remainingTime -= t;
    this.timeEl.innerHTML = this.remainingTime.toFixed(2);

    if (this.remainingTime <= 0) {
      this.checkVictory();
    }
  }

  checkVictory() {
    if (!this.started) { return; }

    this.stop();

    if (this.points >= this.pointsToWin) {
      Mediator.emit('game:win');
    } else {
      Mediator.emit('game:lose');
    }
  }

  addPoints(pts) {
    this.points += pts;
    this.scoreEl.innerHTML = this.points;
  }
}
