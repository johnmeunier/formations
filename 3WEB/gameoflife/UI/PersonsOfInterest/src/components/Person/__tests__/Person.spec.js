import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { Person } from "../Person";

describe("snapshot", () => {
  const props = {
    name: "testName",
    email: "testMail@toto.com",
    phone: "+33333",
    greeting: "Hello",
    gender: "M",
    guid: "12KLMSDJKLMQSD",
  };
  it("should render correctly", () => {
    const { container } = render(
      <Router>
        <Person {...props} />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("should render correctly with a bad email", () => {
    const { container } = render(
      <Router>
        <Person {...props} email="sdmlfmsdf" />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
