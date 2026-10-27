import { afterEach,describe,expect,it,vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Polaroid } from "./Polaroid";
afterEach(cleanup);
describe("Polaroid",()=>{
  it("develops on demand and resets",()=>{
    const view=render(<Polaroid />);
    const photo=view.container.querySelector(".to-polaroid");
    expect(photo?.getAttribute("data-developed")).toBe("false");
    fireEvent.click(screen.getByRole("button",{name:"Develop photo"}));
    expect(photo?.getAttribute("data-developed")).toBe("true");
    fireEvent.click(screen.getByRole("button",{name:"Develop again"}));
    expect(photo?.getAttribute("data-developed")).toBe("false");
  });
  it("flips to the personalized reverse side",()=>{
    const view=render(<Polaroid caption="From Port Harcourt" date="2026" scene="garden"/>);
    const photo=view.container.querySelector(".to-polaroid");
    fireEvent.click(screen.getByRole("button",{name:"Flip photo"}));
    expect(photo?.getAttribute("data-flipped")).toBe("true");
    expect(view.container.querySelector(".to-polaroid__back")?.textContent).toContain("From Port Harcourt");
    fireEvent.click(screen.getByRole("button",{name:"Show front"}));
    expect(photo?.getAttribute("data-flipped")).toBe("false");
  });
  it("notifies controlled development and flip without changing it",()=>{
    const onDevelopChange=vi.fn(),onFlipChange=vi.fn();
    const view=render(<Polaroid developed={false} flipped={false} onDevelopChange={onDevelopChange} onFlipChange={onFlipChange}/>);
    fireEvent.click(screen.getByRole("button",{name:"Develop photo"}));
    fireEvent.click(screen.getByRole("button",{name:"Flip photo"}));
    expect(onDevelopChange).toHaveBeenCalledWith(true);
    expect(onFlipChange).toHaveBeenCalledWith(true);
    expect(view.container.querySelector(".to-polaroid")?.getAttribute("data-developed")).toBe("false");
  });
});
