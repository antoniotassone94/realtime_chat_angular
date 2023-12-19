import {ElementRef} from "@angular/core";
import {StyleReceivedSendedDirective} from "./stylereceivedsended.directive";

describe("StyleReceivedSendedDirective", () => {
  it("should create an instance", () => {
    const directive = new StyleReceivedSendedDirective(new ElementRef(undefined));
    expect(directive).toBeTruthy();
  });
});
