import "mocha";
import { expect } from "chai";
import { ElevatorFactory } from "../src/elevator-factory";
import { ElevatorController, SimpleElevatorController } from "../src/elevator-controllers";

describe("ElevatorFactory", function () {
  function createSimpleElevatorFactory(numFloors: number) {
    return new ElevatorFactory<SimpleElevatorController>(SimpleElevatorController, numFloors);
  }

  it(`cannot be instantiated to create elevators with less than ${ElevatorController.MIN_NUM_FLOORS} floors`,
    function () {
      expect(() => createSimpleElevatorFactory(ElevatorController.MIN_NUM_FLOORS - 1)).to.throw();
    });

  it(`can be instantiated to create elevators with ${ElevatorController.MIN_NUM_FLOORS} floors`, function () {
    expect(() => createSimpleElevatorFactory(ElevatorController.MIN_NUM_FLOORS)).not.to.throw();
  });

  it(`can be instantiated to create elevators with more than ${ElevatorController.MIN_NUM_FLOORS} floors`, function () {
    expect(() => createSimpleElevatorFactory(ElevatorController.MIN_NUM_FLOORS + 1)).not.to.throw();
  });

  describe("#create()", function () {
    const NUM_FLOORS = ElevatorController.MIN_NUM_FLOORS;
    const factory = createSimpleElevatorFactory(NUM_FLOORS);

    it("creates elevators with the specified number of floors", function () {
      expect(factory.numFloors).to.equal(NUM_FLOORS);
      const elevator = factory.create();
      expect(elevator.controller.floors.length).to.equal(NUM_FLOORS);
    });

    it("creates elevators with the specified controller type", function () {
      expect(factory.controllerType).to.equal(SimpleElevatorController);
      const elevator = factory.create();
      expect(elevator.controller instanceof SimpleElevatorController).to.be.true;
    });
  });
});
