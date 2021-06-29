export class Button {
  private _pressed = false;

  get pressed(): boolean {
    return this._pressed;
  }

  public press(): void {
    this._pressed = true;
  }

  public unpress(): void {
    this._pressed = false;
  }
}
