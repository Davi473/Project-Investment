import { useRef, useEffect } from "react";

export function useDragScroll() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const mouseDown = (e: MouseEvent) => {
            isDown = true;
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        };

        const mouseLeave = () => {
            isDown = false;
        };

        const mouseUp = () => {
            isDown = false;
        };

        const mouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX) * 1; // scroll speed
            el.scrollLeft = scrollLeft - walk;
        };

        el.addEventListener("mousedown", mouseDown);
        el.addEventListener("mouseleave", mouseLeave);
        el.addEventListener("mouseup", mouseUp);
        el.addEventListener("mousemove", mouseMove);

        return () => {
            el.removeEventListener("mousedown", mouseDown);
            el.removeEventListener("mouseleave", mouseLeave);
            el.removeEventListener("mouseup", mouseUp);
            el.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return ref;
}