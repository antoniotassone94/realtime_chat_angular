import {TestBed} from "@angular/core/testing";
import {SwitchLoginRegisterFormService} from "./switchloginregisterform.service";

describe("SwitchLoginRegisterFormService", () => {
  let service: SwitchLoginRegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchLoginRegisterFormService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
