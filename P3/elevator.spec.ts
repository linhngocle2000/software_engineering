import "mocha";
import { expect } from "chai";
import { Elevator } from "../src/elevator";
import { ElevatorFactory } from "../src/elevator-factory";
import { SimpleElevatorController } from "../src/elevator-controllers";

describe("Elevator", function () {
  const NUM_FLOORS = 5;
  const factory = new ElevatorFactory<SimpleElevatorController>(SimpleElevatorController, NUM_FLOORS);

  let elevator: Elevator;

  beforeEach("create new elevator", function () {
    elevator = factory.create();
  });

  it("behaves as its controller type dictates", function () {
    const NUM_ITERATIONS = 100;
    const MAX_CALLS_PER_ITERATION = 3;

    const controller = factory.create().controller;

    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let floor = 0;
    for (let i = 0; i < NUM_ITERATIONS; i++) {
      const numCalls = getRandomInt(0, MAX_CALLS_PER_ITERATION + 1);
      for (let c = 0; c < numCalls; c++) {
        const idx = getRandomInt(0, NUM_FLOORS);
        elevator.controller.floors[idx].callElevator();
        controller.floors[idx].callElevator();
      }

      elevator.move();
      floor = controller.control(floor);

      expect(elevator.currentFloorIdx).to.equal(floor);
    }
  });
});
