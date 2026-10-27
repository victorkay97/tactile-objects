import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Journal } from "./Journal";

afterEach(cleanup);
describe("Journal", () => {
  it("opens and reveals real page content", () => {
    render(<Journal />);
    const open=screen.getByRole("button",{name:"Open journal"});
    expect(open.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(open);
    expect(screen.getByRole("button",{name:"Close journal"}).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("group",{name:"Page 1 of 3"}).textContent).toContain("A little field note.");
  });
  it("turns pages and clamps navigation", () => {
    render(<Journal defaultOpen />);
    expect((screen.getByRole("button",{name:"Previous page"}) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button",{name:"Next page"}));
    expect(screen.getByRole("group",{name:"Page 2 of 3"}).textContent).toContain("Look a little closer.");
    fireEvent.keyDown(screen.getByRole("group",{name:"Page 2 of 3"}),{key:"ArrowRight"});
    // The leaf itself is inside the journal's keyboard listener.
    expect(screen.getByRole("group",{name:"Page 3 of 3"})).toBeTruthy();
    expect((screen.getByRole("button",{name:"Next page"}) as HTMLButtonElement).disabled).toBe(true);
  });
  it("notifies controlled parent without mutating controlled state", () => {
    const onOpen=vi.fn(),onPage=vi.fn();
    render(<Journal open page={0} onOpenChange={onOpen} onPageChange={onPage} />);
    fireEvent.click(screen.getByRole("button",{name:"Close journal"}));
    expect(onOpen).toHaveBeenCalledWith(false);
    fireEvent.click(screen.getByRole("button",{name:"Next page"}));
    expect(onPage).toHaveBeenCalledWith(1);
    expect(screen.getByRole("group",{name:"Page 1 of 3"})).toBeTruthy();
  });
  it("supports custom pages and never produces an invalid page", () => {
    render(<Journal defaultOpen defaultPage={800} pages={[{title:"Custom",body:"Inside"}]} tone="clay"/>);
    expect(screen.getByRole("group",{name:"Page 1 of 1"}).textContent).toContain("Custom");
  });
});
