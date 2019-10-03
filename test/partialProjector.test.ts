import { create, Server } from "../src/models/server";
import { project } from "../src/lib/partialProjector";

describe("partialProjector", () => {
  describe("project", () => {
    it("should have same keys as projector", () => {
      const projector: Partial<Server> = {
        name: "server1",
        country: "SE"
      };

      const server = create({
        name: "server2",
        country: "country2",
        flag: "SE"
      });

      const projected = project(server, projector);
      const keys = Object.keys(projected);

      expect(keys).toHaveLength(2);
      expect(keys).toContain("name");
      expect(keys).toContain("country");
    });

    it("should have values", () => {
      const projector: Partial<Server> = {
        name: "server1",
        country: "SE"
      };

      const server = create({
        name: "server2",
        country: "country2",
        flag: "SE"
      });

      const projected = project(server, projector);

      expect(projected.name).toBe(server.name);
      expect(projected.country).toBe(server.country);
      expect(projected.flag).toBeUndefined();
    });

    it("should have zero keys for empty projector", () => {
      const projector: Partial<Server> = {};

      const server = create({
        name: "server2",
        country: "country2",
        flag: "SE"
      });

      const projected = project(server, projector);

      expect(Object.keys(projected)).toBeEmpty();
    });
  });
});
