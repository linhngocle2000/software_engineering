import "mocha";
import { expect } from "chai";
import { Floor } from "../src/floor";

describe("Floor", function () {
  let floor: Floor;

  beforeEach("create new floor", function () {
    floor = new Floor();
  });

  it("is not waiting by default", function () {
    expect(floor.waiting).to.be.false;
  });

  describe("#callElevator()", function () {
    beforeEach("ensure floor is not waiting", function () {
      expect(floor.waiting).to.be.false;
    });

    it("causes the floor to wait", function () {
      floor.callElevator();
      expect(floor.waiting).to.be.true;
    });
  });

  describe("#elevatorArrived()", function () {
    beforeEach("ensure floor is waiting", function () {
      floor.callElevator();
      expect(floor.waiting).to.be.true;
    });

    it("causes the floor to stop waiting", function () {
      floor.elevatorArrived();
      expect(floor.waiting).to.be.false;
    });
  });
});
