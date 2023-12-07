import {TestBed} from "@angular/core/testing";
import {MessagesManagerService} from "./messagesmanager.service";

describe("MessagesManagerService", () => {
  let service: MessagesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
