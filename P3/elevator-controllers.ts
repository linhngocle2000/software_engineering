import { Floor } from "./floor";

export abstract class ElevatorController {
  public static readonly MIN_NUM_FLOORS = 2;

  constructor(protected _floors: Floor[]) {
    if (this._floors.length < ElevatorController.MIN_NUM_FLOORS) {
      throw new Error(`An elevator needs at least ${ElevatorController.MIN_NUM_FLOORS} floors!`);
    }
  }

  get floors(): Floor[] {
    return this._floors;
  }

  public abstract control(startIdx: number): number;
}

export class SimpleElevatorController extends ElevatorController {
  private _queue: number[] = [];

  constructor(floors: Floor[]) {
    super(floors);
  }

  public control(startIdx: number): number {
    this._floors[startIdx].elevatorArrived();

    for (let idx = 0; idx < this._floors.length; idx++) {
      if (!this._queue.includes(idx) && this._floors[idx].waiting) {
        this._queue.push(idx);
      }
    }

    const nextIdx = this._queue.shift();
    if (nextIdx != undefined) {
      this._floors[nextIdx].elevatorArrived();
      return nextIdx;
    } else {
      return startIdx;
    }
  }
}
