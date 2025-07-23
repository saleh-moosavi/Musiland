import { useRef } from "react";
import NavListMobileDropDown from "./NavListMobileDropDown";

export default function NavListMobile({
  genres,
  playlists,
  showMobileMenuPanel,
  setShowMobileMenuPanel,
}: any) {
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

  const menuItems = [
    {
      title: "Playlists",
      show: false,
      content: playlists,
    },
    {
      title: "Genres",
      show: false,
      content: genres,
    },
    { title: "About Us", content: null, show: true },
    { title: "Contact US", content: null, show: true },
    { title: "Login / Register", content: null, show: true },
  ];

  return (
    <>
      <aside
        className={`fixed inset-x-5 bottom-0 h-4/5 bg-gray-200 dark:bg-gray-900 dark:text-white rounded-t-3xl overscroll-y-contain overflow-y-scroll pb-20 ${
          showMobileMenuPanel ? "" : "translate-y-full"
        } lg:hidden transition-all duration-300 z-50`}
      >
        <div
          ref={menuRef}
          onClick={() => setShowMobileMenuPanel(false)}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          className="w-1/2 mx-auto h-1.5 bg-gray-400 rounded-full"
        ></div>
        <ul className="p-5 pt-10 space-y-2">
          {menuItems.map((item, index) => (
            <NavListMobileDropDown item={item} key={index} />
          ))}
        </ul>
      </aside>
      <div
        className={`fixed inset-0 bg-black/20 z-10 ${
          showMobileMenuPanel ? "" : "hidden"
        }`}
        onClick={() => setShowMobileMenuPanel(false)}
      ></div>
    </>
  );
}
