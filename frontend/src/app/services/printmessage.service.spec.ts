import {TestBed} from "@angular/core/testing";
import {PrintMessageService} from "./printmessage.service";

describe("PrintMessageService", () => {
  let service: PrintMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintMessageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
