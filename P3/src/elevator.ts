import { ElevatorController } from "./elevator-controllers";

export class Elevator {
  private _currentFloorIdx = 0;

  constructor(private _controller: ElevatorController) { }

  get controller(): ElevatorController {
    return this._controller;
  }

  get currentFloorIdx(): number {
    return this._currentFloorIdx;
  }

  public move(): void {
    this._currentFloorIdx = this._controller.control(this._currentFloorIdx);
  }
}
