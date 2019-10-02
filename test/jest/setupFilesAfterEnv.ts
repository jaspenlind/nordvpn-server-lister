import matchers from "./matchers";

matchers.forEach(matcher => expect.extend(matcher));
