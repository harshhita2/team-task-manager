import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {

  const role = localStorage.getItem("role");

  const isAdmin = role === "Admin";

  return (
    <DashboardLayout>

      {/* Top User Info */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "16px",
        }}
      >

        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "22px",
            }}
          >
            {localStorage.getItem("name")}
          </h3>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
            }}
          >
            {role}
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={{
            padding: "10px 20px",
            border: "1px solid #d1d5db",
            background: "white",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>

      {/* Header Card */}

      <div
        style={{
          background: "#f3ecff",
          padding: "28px",
          borderRadius: "20px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            color: "#4f46e5",
            marginBottom: "10px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            color: "#6b7280",
            margin: 0,
          }}
        >
          Your task stats and upcoming deadlines.
        </p>
      </div>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "24px",
        }}
      >

        <div style={cardStyle}>
          <p style={labelStyle}>Total tasks</p>

          <h1 style={numberStyle}>
            {isAdmin ? 0 : 1}
          </h1>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Completed tasks</p>

          <h1 style={numberStyle}>
            {isAdmin ? 0 : 1}
          </h1>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Overdue tasks</p>

          <h1 style={numberStyle}>0</h1>
        </div>

      </div>

      {/* Progress */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >

        {/* Completion */}

        <div style={cardStyle}>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Completion</span>

            <span>
              {isAdmin ? "0%" : "100%"}
            </span>
          </div>

          <div
            style={{
              height: "10px",
              background: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: isAdmin ? "0%" : "100%",
                height: "100%",
                background: "#22c55e",
              }}
            />
          </div>
        </div>

        {/* Overdue */}

        <div style={cardStyle}>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>Overdue</span>

            <span>0%</span>
          </div>

          <div
            style={{
              height: "10px",
              background: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "0%",
                height: "100%",
                background: "#ef4444",
              }}
            />
          </div>
        </div>

      </div>

      {/* Tasks Table */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #e5e7eb",
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          Upcoming tasks
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>
            <tr
              style={{
                textAlign: "left",
                color: "#6b7280",
              }}
            >
              <th style={thStyle}>TITLE</th>
              <th style={thStyle}>PROJECT</th>
              <th style={thStyle}>STATUS</th>
              <th style={thStyle}>DUE</th>
            </tr>
          </thead>

          <tbody>

            {isAdmin ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#6b7280",
                  }}
                >
                  No tasks yet.
                </td>
              </tr>
            ) : (
              <tr>
                <td style={tdStyle}>Login Dev</td>

                <td style={tdStyle}>
                  TaskManager_project
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#16a34a",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Done
                  </span>
                </td>

                <td style={tdStyle}>30/5/2026</td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "24px",
  border: "1px solid #e5e7eb",
};

const labelStyle = {
  color: "#6b7280",
  marginBottom: "16px",
};

const numberStyle = {
  margin: 0,
  fontSize: "42px",
};

const thStyle = {
  padding: "18px",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "18px",
  borderBottom: "1px solid #f3f4f6",
};

export default Dashboard;