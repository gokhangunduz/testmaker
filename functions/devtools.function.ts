import devTools from "devtools-detect";

export function disableDevTools() {
  devTools.isOpen && devToolsIsOpen();

  window.addEventListener("devtoolschange", ({ detail: { isOpen } }) => {
    if (isOpen) {
      devToolsIsOpen();
    }
  });
}

function devToolsIsOpen() {
  document.body.classList.add(
    "absolute",
    "inset-0",
    "hw-screen",
    "bg-black",
    "animate__animated",
    "animate__fadeIn",
    "animate__slower",
    "text-gray-300",
    "flex",
    "justify-center",
    "items-center",
    "text-sm",
    "z-50"
  );
  document.body.innerHTML = `<p>Developer Tools is not allowed.</p>`;
}
