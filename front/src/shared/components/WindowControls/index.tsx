import React from 'react';

export const WindowControls: React.FC = () => {
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    if (window.electronAPI && window.electronAPI.getPlatform) {
      const platform = window.electronAPI.getPlatform();
      setIsMac(platform === 'darwin');
    }
  }, []);



  return (
    <>
      <div
        className="position-absolute w-100"
        style={{ height: "32px", top: 0, left: 0, zIndex: 1, WebkitAppRegion: "drag" } as React.CSSProperties}
      />
      <div
        className="d-flex align-items-center justify-content-between position-absolute pt-1"
        style={{
          width: "68px", top: 0, zIndex: 1000,
          ...(isMac ? { left: "5px", right: "unset" } : { right: "5px", left: "unset" })
        }}
      >
        {isMac ? (
          <>
            <Close />
            <Minimize />
            <Maximize />
          </>
        ) : (
          <>
            <Minimize />
            <Maximize />
            <Close />
          </>
        )}
      </div>
    </>
  );
};

const Close = () => {
  const spanStyle = {
    left: "4px", width: "1.2px", height: "10px", borderRadius: "1px"
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle text-dark bg-danger"
      style={{ width: '20px', height: '20px', cursor: 'pointer', WebkitAppRegion: "no-drag" } as React.CSSProperties}
      onClick={() => { window.electronAPI.close() }}
    >
      <span
        className="position-relative d-inline-block"
        style={{ width: "10px", height: "10px" }}
      >
        <span
          className="position-absolute bg-dark t-0"
          style={{ ...spanStyle, transform: "rotate(45deg)" }}
        />
        <span
          className="position-absolute bg-dark t-0"
          style={{ ...spanStyle, transform: "rotate(-45deg)" }}
        />
      </span>
    </div>
  )
};

const Maximize = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle text-dark"
      style={{ width: '20px', height: '20px', cursor: 'pointer', background: "#61c554", WebkitAppRegion: "no-drag" } as React.CSSProperties}
      onClick={() => window.electronAPI.maximize()}
    >
      <span
        className="d-inline-block position-relative"
        style={{ width: "10px", height: "10px" }}
      >
        <span
          className="position-absolute"
          style={{
            top: "1px", left: "1px", width: "8px", height: "8px",
            border: "1.7px solid #222", borderRadius: "2px", boxSizing: "border-box"
          }}
        />
      </span>
    </div>
  );
};

const Minimize = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle text-dark"
      style={{ width: '20px', height: '20px', cursor: 'pointer', background: "#f4bf4f", WebkitAppRegion: "no-drag" } as React.CSSProperties}
      onClick={() => window.electronAPI.minimize()}
    >
      <span
        className="d-inline-block position-relative"
        style={{ width: "10px", height: "10px" }}
      >
        <span
          className="position-absolute d-block bg-dark"
          style={{
            top: "4px", left: "1px", width: "8px",
            height: "2px", borderRadius: "1px"
          }}
        />
      </span>
    </div>
  );
}