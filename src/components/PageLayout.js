export const PageLayout = ({ menuContent, children }) => (
    <div className="cos"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "200px",
          height:"100%",
          background: "#F2F2F2",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {menuContent}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );