import "mocha";
import { expect } from "chai";
import { ElevatorController, SimpleElevatorController } from "../src/elevator-controllers";
import { Floor } from "../src/floor";

export function createFloors(numFloors: number): Floor[] {
  const floors = [];
  for (let idx = 0; idx < numFloors; idx++) {
    floors.push(new Floor());
  }
  return floors;
}

describe("ElevatorController", function () {
  class StubElevatorController extends ElevatorController {
    public control(): number { throw new Error(); }
  }

  it(`cannot be instantiated with less than ${ElevatorController.MIN_NUM_FLOORS} floors`, function () {
    expect(() => new StubElevatorController(createFloors(ElevatorController.MIN_NUM_FLOORS - 1))).to.throw();
  });

  it(`can be instantiated with ${ElevatorController.MIN_NUM_FLOORS} floors`, function () {
    expect(() => new StubElevatorController(createFloors(ElevatorController.MIN_NUM_FLOORS))).not.to.throw();
  });

  it(`can be instantiated with more than ${ElevatorController.MIN_NUM_FLOORS} floors`, function () {
    expect(() => new StubElevatorController(createFloors(ElevatorController.MIN_NUM_FLOORS + 1))).not.to.throw();
  });
});

describe("SimpleElevatorController", function () {
  const MIN_NUM_FLOORS = 3;
  const NUM_FLOORS = MIN_NUM_FLOORS;
  const BOTTOM_FLOOR = 0;
  const TOP_FLOOR = NUM_FLOORS - 1;

  let controller: SimpleElevatorController;

  beforeEach("create new controller", function () {
    controller = new SimpleElevatorController(createFloors(NUM_FLOORS));
  });

  describe("#control()", function () {
    beforeEach(`ensure no floor is waiting and there are at least ${MIN_NUM_FLOORS} floors`, function () {
      expect(controller.floors.length >= MIN_NUM_FLOORS);
      for (const floor of controller.floors) {
        floor.elevatorArrived();
        expect(floor.waiting).to.be.false;
      }
    });

    it("throws when start index is negative", function () {
      expect(() => controller.control(-1)).to.throw();
    });

    it("throws when start index is too large", function () {
      expect(() => controller.control(NUM_FLOORS)).to.throw();
    });

    it("does nothing when no floor is waiting", function () {
      for (let idx = 0; idx < NUM_FLOORS; idx++) {
        expect(controller.control(idx)).to.equal(idx);
      }
    });

    it("serves all floors", function () {
      for (const floor of controller.floors) {
        floor.callElevator();
      }

      let numIterations = 0;
      let prevIdx = -1;
      let curIdx = 0;
      do {
        prevIdx = curIdx;
        curIdx = controller.control(curIdx);
        numIterations += 1;
      } while (prevIdx != curIdx && numIterations < NUM_FLOORS);

      for (const floor of controller.floors) {
        expect(floor.waiting).to.be.false;
      }
    });

    it("skips floors that are not waiting when going up", function () {
      controller.floors[TOP_FLOOR].callElevator();
      expect(controller.control(BOTTOM_FLOOR)).to.equal(TOP_FLOOR);
      expect(controller.floors[TOP_FLOOR].waiting).to.be.false;
    });

    it("skips floors that are not waiting when going down", function () {
      controller.floors[BOTTOM_FLOOR].callElevator();
      expect(controller.control(TOP_FLOOR)).to.equal(BOTTOM_FLOOR);
      expect(controller.floors[BOTTOM_FLOOR].waiting).to.be.false;
    });
  });
});
