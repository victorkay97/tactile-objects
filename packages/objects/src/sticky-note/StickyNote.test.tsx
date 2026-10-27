import { afterEach,describe,expect,it,vi } from "vitest";
import { cleanup,fireEvent,render,screen } from "@testing-library/react";
import { StickyNote } from "./StickyNote";
afterEach(cleanup);
describe("StickyNote",()=>{
  it("peels and pins while keeping accessible drag semantics",()=>{
    const view=render(<StickyNote />);
    const root=view.container.querySelector(".to-sticky");
    expect(root?.getAttribute("data-pinned")).toBe("true");
    fireEvent.click(screen.getByRole("button",{name:"Peel note"}));
    expect(root?.getAttribute("data-pinned")).toBe("false");
    expect(screen.getByRole("button",{name:/Drag note to move/})).toBeTruthy();
    fireEvent.click(screen.getByRole("button",{name:"Pin note"}));
    expect(root?.getAttribute("data-pinned")).toBe("true");
  });
  it("updates editable content through the controlled callback",()=>{
    const onTextChange=vi.fn();
    render(<StickyNote editable text="hello" onTextChange={onTextChange}/>);
    fireEvent.change(screen.getByRole("textbox",{name:"Sticky note text"}),{target:{value:"new idea"}});
    expect(onTextChange).toHaveBeenCalledWith("new idea");
    expect((screen.getByRole("textbox",{name:"Sticky note text"}) as HTMLTextAreaElement).value).toBe("hello");
  });
  it("moves with keyboard and centers on Escape",()=>{
    const view=render(<StickyNote defaultPinned={false} />);
    const handle=screen.getByRole("button",{name:/Drag note to move/});
    fireEvent.keyDown(handle,{key:"ArrowRight"});
    expect(view.container.querySelector(".to-sticky__sheet")?.getAttribute("style")).toContain("16px");
    fireEvent.keyDown(handle,{key:"Escape"});
    expect(view.container.querySelector(".to-sticky__sheet")?.getAttribute("style")).toContain("0px");
  });
  it("calls a controlled parent when pin state changes",()=>{
    const onPinnedChange=vi.fn();
    const view=render(<StickyNote pinned={true} onPinnedChange={onPinnedChange}/>);
    fireEvent.click(screen.getByRole("button",{name:"Peel note"}));
    expect(onPinnedChange).toHaveBeenCalledWith(false);
    expect(view.container.querySelector(".to-sticky")?.getAttribute("data-pinned")).toBe("true");
  });
});
