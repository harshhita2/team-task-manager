import Sidebar from "../components/Sidebar.jsx";

function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#f5f5f7",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;