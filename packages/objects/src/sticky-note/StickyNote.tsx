"use client";

import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";

export type StickyTone = "butter" | "mint" | "lilac" | "rose";
export interface StickyNoteProps {
  /** The visible note body. */
  text?: string;
  defaultText?: string;
  onTextChange?: (value: string) => void;
  editable?: boolean;
  tone?: StickyTone;
  defaultPinned?: boolean;
  pinned?: boolean;
  onPinnedChange?: (pinned: boolean) => void;
  className?: string;
  style?: CSSProperties;
}
type Point = { x: number; y: number };
const limit = (n: number, max: number) => Math.max(-max, Math.min(max,n));
/**
 * A peel-and-place note. Unpin to drag or use keyboard arrow keys to reposition.
 * It stays where it is dropped; pinning returns it home with an elastic settle.
 */
export function StickyNote({
  text, defaultText = "Remember the little things.", onTextChange, editable = false,
  tone = "butter", defaultPinned = true, pinned, onPinnedChange, className, style,
}: StickyNoteProps) {
  const [localText, setLocalText] = useState(defaultText);
  const [localPinned, setLocalPinned] = useState(defaultPinned);
  const [position,setPosition] = useState<Point>({x:0,y:0});
  const [dragging,setDragging] = useState(false);
  const drag = useRef<{pointer:number;origin:Point;start:Point}|null>(null);
  const isPinned = pinned ?? localPinned;
  const content = text ?? localText;
  const setPinned = (next:boolean) => {
    if (pinned === undefined) setLocalPinned(next);
    onPinnedChange?.(next);
    if (next) setPosition({x:0,y:0});
  };
  const setContent = (value:string) => {
    if (text === undefined) setLocalText(value);
    onTextChange?.(value);
  };
  const start = (event:PointerEvent<HTMLButtonElement>) => {
    if (isPinned || event.button !== 0) return;
    event.preventDefault();
    drag.current = {
      pointer:event.pointerId,
      origin:{x:event.clientX,y:event.clientY},
      start:position,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const move = (event:PointerEvent<HTMLButtonElement>) => {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    const {start,origin}=drag.current;
    setPosition({
      x:limit(start.x+event.clientX-origin.x,150),
      y:limit(start.y+event.clientY-origin.y,115),
    });
  };
  const finish=(event:PointerEvent<HTMLButtonElement>)=>{
    if (drag.current?.pointer !== event.pointerId) return;
    drag.current=null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onKeyDown=(event:KeyboardEvent<HTMLButtonElement>)=>{
    if (isPinned) return;
    const increments:{[key:string]:Point}={
      ArrowLeft:{x:-16,y:0},ArrowRight:{x:16,y:0},
      ArrowUp:{x:0,y:-16},ArrowDown:{x:0,y:16},
    };
    if(event.key==="Escape") {event.preventDefault();setPosition({x:0,y:0});return;}
    const amount=increments[event.key];
    if(!amount)return;
    event.preventDefault();
    setPosition(point=>({x:limit(point.x+amount.x,150),y:limit(point.y+amount.y,115)}));
  };
  return (
    <div className={["to-sticky",className].filter(Boolean).join(" ")} style={style} data-tone={tone} data-pinned={isPinned} data-dragging={dragging}>
      <div className="to-sticky__scene">
        <div className="to-sticky__sheet" style={{ "--note-x":`${position.x}px`,"--note-y":`${position.y}px` } as CSSProperties}>
          <button
            type="button" className="to-sticky__handle"
            disabled={isPinned}
            aria-label={isPinned ? "Note is pinned" : "Drag note to move; use arrow keys for precise placement; Escape to center"}
            onPointerDown={start} onPointerMove={move} onPointerUp={finish}
            onPointerCancel={finish} onLostPointerCapture={()=>{drag.current=null;setDragging(false);}}
            onKeyDown={onKeyDown}
          >
            <span className="to-sticky__adhesive" aria-hidden="true"/>
            <span className="to-sticky__grip" aria-hidden="true">{isPinned ? "PINNED" : "DRAG TO PLACE"}</span>
          </button>
          <div className="to-sticky__body">
            {editable
              ? <textarea aria-label="Sticky note text" maxLength={260} value={content} onChange={e=>setContent(e.target.value)} spellCheck={false}/>
              : <p>{content}</p>}
          </div>
          <span className="to-sticky__fold" aria-hidden="true" />
          <span className="to-sticky__mark" aria-hidden="true">✳</span>
        </div>
      </div>
      <div className="to-sticky__controls">
        <button type="button" className="to-sticky__toggle" onClick={()=>setPinned(!isPinned)} aria-pressed={isPinned}>
          {isPinned ? "Peel note" : "Pin note"}
        </button>
        <button type="button" className="to-sticky__reset" onClick={()=>setPosition({x:0,y:0})} disabled={isPinned || (position.x===0&&position.y===0)}>
          Center
        </button>
      </div>
      <p className="to-sticky__hint">{isPinned ? "Peel the note to move it." : "Drag the top edge, or use the arrow keys."}</p>
    </div>
  );
}
