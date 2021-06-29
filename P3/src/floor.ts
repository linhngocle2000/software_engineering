import { Button } from "./button";

export class Floor {
  constructor(private _button = new Button()) { }

  get waiting(): boolean {
    return this._button.pressed;
  }

  public callElevator(): void {
    this._button.press();
  }

  public elevatorArrived(): void {
    this._button.unpress();
  }
}
