import optionParser, { ParseOptions } from "../src/lib/optionParser";

describe("optionsParser", () => {
  describe("parse", () => {
    it("can parse key with one dash", () => {
      expect(optionParser.parse(["-key"]).has("key")).toBe(true);
    });

    it("can parse key with double dash", () => {
      expect(optionParser.parse(["--key"]).has("key")).toBe(true);
    });

    it("can parse key with prefix", () => {
      const options: ParseOptions = { keyPrefix: "filter" };

      expect(optionParser.parse(["-filter.key"], options).has("key")).toBe(
        true
      );
      expect(optionParser.parse(["--filter.key"], options).has("key")).toBe(
        true
      );
    });

    it("is empty when args contains no key", () => {
      expect(optionParser.parse(["nokey"]).size).toBe(0);
    });

    it("can handle empty args", () => {
      expect(optionParser.parse([]).size).toBe(0);
    });

    it("can parse single option", () => {
      const map = optionParser.parse(["-o", "option1"]);

      const option = map.get("o");

      expect(option).toBe("option1");
    });

    it("can parse multiple options", () => {
      const options = ["-a", "1", "-b", "2", "-c", "3", "-d", "4", "-e", "5"];

      const map = optionParser.parse(options);

      expect(map.size).toBe(5);
      expect(map.get("a")).toBe("1");
      expect(map.get("e")).toBe("5");
    });

    it("can parse option without value", () => {
      const options = ["-option1", "value1", "-option2"];

      const map = optionParser.parse(options);

      const option2 = map.get("option2");

      expect(map.has("option2")).toBe(true);
      expect(option2).toBeUndefined();
    });

    it("can exclude args that isn't an option", () => {
      const options = [
        "arg1",
        "arg2",
        "-arg3",
        "value3",
        "-arg4",
        "-arg5",
        "value5",
        "value6"
      ];

      const map = optionParser.parse(options);

      expect(map.size).toBe(3);

      expect(map.get("arg3")).toBe("value3");
      expect(map.has("arg4")).toBe(true);
      expect(map.get("arg4")).toBeUndefined();
      expect(map.get("arg5")).toBe("value5");
    });

    it("can parse flags", () => {
      const args = ["command", "level2", "-h", "level3", "-arg2", "value2"];

      const options = optionParser.parse(args);

      expect(options.size).toBe(2);
      expect(options.has("h")).toBe(true);
      expect(options.get("h")).toBeUndefined();
      expect(options.get("arg2")).toBe("value2");
    });
  });

  describe("unwrap", () => {
    it("can unwrap args", () => {
      const args = ["-option1", "value1"];

      const options = optionParser.parse(args);

      const [key, value] = options.unwrap();

      expect(key).toBe("-option1");
      expect(value).toBe("value1");
    });
  });
});
