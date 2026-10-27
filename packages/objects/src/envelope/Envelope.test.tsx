import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Envelope } from "./Envelope";

afterEach(cleanup);

describe("Envelope", () => {
  it("opens and closes when uncontrolled", () => {
    render(<Envelope recipient="Visitor" />);
    const openButton = screen.getByRole("button", { name: "Open envelope" });
    expect(openButton.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(openButton);
    const closeButton = screen.getByRole("button", { name: "Close envelope" });
    expect(closeButton.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(closeButton);
    expect(screen.getByRole("button", { name: "Open envelope" })).toBeTruthy();
  });

  it("notifies a controlled parent without mutating controlled state", () => {
    const onOpenChange = vi.fn();
    render(<Envelope open={false} onOpenChange={onOpenChange} />);
    const button = screen.getByRole("button", { name: "Open envelope" });
    fireEvent.click(button);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("respects defaultOpen", () => {
    render(<Envelope defaultOpen />);
    expect(screen.getByRole("button", { name: "Close envelope" })).toBeTruthy();
  });
});
