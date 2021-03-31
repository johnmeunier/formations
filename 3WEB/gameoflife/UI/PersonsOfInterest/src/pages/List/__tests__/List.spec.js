import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

import { List } from "../List";

describe("filter", () => {
  it("should display 20 people", async () => {
    render(
      <Router>
        <List />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText("20 people")).toBeInTheDocument();
    });
  });
  it("should display 1 people when the search name value equals Ju", async () => {
    render(
      <Router>
        <List />
      </Router>
    );
    const $searchInput = screen.getByLabelText("Name");
    userEvent.type($searchInput, "Ju");
    await waitFor(() => {
      expect(screen.getByText("1 people")).toBeInTheDocument();
      expect(screen.getByText("Julianne Farley")).toBeInTheDocument();
      expect(screen.queryByText("Lina Farrell")).not.toBeInTheDocument();
    });
  });
  it("should display FAIL when the filters are bad", async () => {
    render(
      <Router>
        <List />
      </Router>
    );
    const $searchInput = screen.getByLabelText("Name");
    userEvent.type($searchInput, "bad");
    await waitFor(() => {
      expect(screen.getByText("0 people")).toBeInTheDocument();
      expect(screen.queryByText("Julianne Farley")).not.toBeInTheDocument();
      expect(screen.queryByText("Lina Farrell")).not.toBeInTheDocument();
      expect(screen.getByText("FAIL")).toBeInTheDocument();
    });
  });
  it("should display only womens when the filters are set on women only", async () => {
    render(
      <Router>
        <List />
      </Router>
    );
    const $maleInput = screen.getByText("male");
    userEvent.click($maleInput);
    await waitFor(() => {
      expect(screen.getByText("11 people")).toBeInTheDocument();
      expect(screen.getByText("Julianne Farley")).toBeInTheDocument();
      expect(screen.getByText("Lina Farrell")).toBeInTheDocument();
      expect(screen.queryByText("&#9794;")).not.toBeInTheDocument();
    });
  });
  it("should display all the people when the gender are rechecked", async () => {
    render(
      <Router>
        <List />
      </Router>
    );
    const $maleInput = screen.getByText("male");
    userEvent.click($maleInput);
    userEvent.click($maleInput);
    await waitFor(() => {
      expect(screen.getByText("20 people")).toBeInTheDocument();
      expect(screen.getAllByText("♀").length).toEqual(11);
      expect(screen.getAllByText("♂").length).toEqual(9);
    });
  });
  it("should display 1 people when the phone number value equals Ju", async () => {
    render(
      <Router>
        <List />
      </Router>
    );
    const $searchInput = screen.getByLabelText("Phone number");
    userEvent.type($searchInput, "976");
    await waitFor(() => {
      expect(screen.getByText("1 people")).toBeInTheDocument();
      expect(screen.getByText("Abby Poole")).toBeInTheDocument();
      expect(screen.queryByText("Julianne Farley")).not.toBeInTheDocument();
    });
  });
});
