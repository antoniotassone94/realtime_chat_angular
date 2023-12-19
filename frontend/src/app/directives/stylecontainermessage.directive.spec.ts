import {ElementRef} from "@angular/core";
import {StyleContainerMessageDirective} from "./stylecontainermessage.directive";

describe("StyleContainerMessageDirective", () => {
  it("should create an instance", () => {
    const directive = new StyleContainerMessageDirective(new ElementRef(undefined));
    expect(directive).toBeTruthy();
  });
});
