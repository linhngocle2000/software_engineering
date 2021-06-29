import { Elevator } from "./elevator";
import { ElevatorController } from "./elevator-controllers";
import { Floor } from "./floor";

export class ElevatorFactory<ControllerType extends ElevatorController> {
  constructor(
    private readonly _controllerType: new (floors: Floor[]) => ControllerType,
    private readonly _numFloors: number
  ) {
    if (this._numFloors < ElevatorController.MIN_NUM_FLOORS) {
      throw new Error(`An elevator needs at least ${ElevatorController.MIN_NUM_FLOORS} floors!`);
    }
  }

  get controllerType(): new (floors: Floor[]) => ControllerType {
    return this._controllerType;
  }

  get numFloors(): number {
    return this._numFloors;
  }

  public create(): Elevator {
    const floors: Floor[] = [];
    for (let i = 0; i < this._numFloors; i++) {
      floors.push(new Floor());
    }
    return new Elevator(new this._controllerType(floors));
  }
}
