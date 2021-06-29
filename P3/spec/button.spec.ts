import "mocha";
import { expect } from "chai";
import { Button } from "../src/button";

describe("Button", function () {
  let button: Button;

  beforeEach("create new button", function () {
    button = new Button();
  });

  it("is unpressed by default", function () {
    expect(button.pressed).to.be.false;
  });

  describe("#press()", function () {
    beforeEach("ensure button is unpressed", function () {
      expect(button.pressed).to.be.false;
    });

    it("presses the button", function () {
      button.press();
      expect(button.pressed).to.be.true;
    });
  });

  describe("#unpress()", function () {
    beforeEach("ensure button is pressed", function () {
      button.press();
      expect(button.pressed).to.be.true;
    });

    it("unpresses the button", function () {
      button.unpress();
      expect(button.pressed).to.be.false;
    });
  });
});
