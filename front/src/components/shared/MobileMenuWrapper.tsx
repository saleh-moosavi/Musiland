import { ReactNode, useRef } from "react";
import useWindowStore from "@/store/windowStore";

export default function MobileMenuWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { showMobileMenuPanel, setShowMobileMenuPanel } = useWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);
  let initialY: number = 0;

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in event) {
      initialY = event?.touches[0]?.clientY;
    } else {
      initialY = event?.clientY;
    }
  };

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    let clientY: number;

    if ("touches" in event) {
      clientY = event?.touches[0]?.clientY;
    } else {
      clientY = event?.clientY;
    }

    const distanceDragged = clientY - initialY;

    if (distanceDragged > 10 && showMobileMenuPanel) {
      setShowMobileMenuPanel(false);
    }
  };

  return (
    <>
      <aside
        className={`fixed inset-x-5 bottom-0 h-4/5 bg-my-white-med dark:bg-my-black-max dark:text-my-white-low rounded-t-2xl overscroll-y-contain overflow-y-scroll overscroll-contain pb-20 ${
          showMobileMenuPanel ? "" : "translate-y-full"
        } lg:hidden transition-all duration-300 z-50`}
      >
        <div
          ref={menuRef}
          onClick={() => setShowMobileMenuPanel(false)}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          className="w-1/2 mx-auto h-1.5 bg-my-black-low rounded-full sticky top-0"
        ></div>
        {/* Render Childrens Here */}
        {children}
      </aside>
      <div
        className={`fixed inset-0 bg-my-black-max/40 dark:bg-my-black-low/20 z-10 ${
          showMobileMenuPanel ? "" : "hidden"
        }`}
        onClick={() => setShowMobileMenuPanel(false)}
      ></div>
    </>
  );
}
