import { SocketClass } from "./socket";

const mockPersistenceRepository = jest.fn();

beforeAll(() => {});

describe("Socket", () => {
  it("should be defined", () => {
    expect(SocketClass).toBeDefined();
  });
});
