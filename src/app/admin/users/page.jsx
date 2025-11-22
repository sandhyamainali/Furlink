"use client";

// ==================== IMPORTS ====================
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Shield,
  Calendar,
  Users,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

// ==================== MAIN PAGE COMPONENT ====================
export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when search changes
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term) ||
          user.role?.toLowerCase().includes(term)
      );
    }
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // ==================== API ====================
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await fetchWithAuth("/auth/users/");

      if (
        !result.error &&
        result.data &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        setUsers(result.data);
        setFilteredUsers(result.data);
      } else {
        const mockUsers = generateMockUsers();
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      const mockUsers = generateMockUsers();
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  // ==================== UTILITIES ====================
  const generateMockUsers = () => [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      joined: "2024-02-20",
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Moderator",
      status: "Active",
      joined: "2024-03-10",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "User",
      status: "Inactive",
      joined: "2024-04-05",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "User",
      status: "Active",
      joined: "2024-05-12",
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-01-20",
    },
    {
      id: 7,
      name: "Ethan Hunt",
      email: "ethan@example.com",
      role: "Moderator",
      status: "Active",
      joined: "2024-03-15",
    },
  ];

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "??";

  // ==================== HANDLERS ====================
  const handleAddUser = () => {
    console.log("Add user clicked");
  };

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
  };

  const handleDeleteUser = (user) => {
    console.log("Delete user:", user);
  };

  // ==================== LOADING ====================
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading...</p>

        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.content}>
          {/* HEADER */}
          <div style={styles.pageHeader}>
            <div>
              <h1 style={styles.pageTitle}>Users Management</h1>
              <p style={styles.pageSubtitle}>
                Manage and monitor all user accounts
              </p>
            </div>

            <button
              style={styles.addButton}
              onClick={handleAddUser}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#8f6f5c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#a0826d")
              }
            >
              <Plus size={20} />
              <span>Add User</span>
            </button>
          </div>

          {/* STATS */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <Users size={24} />
              </div>
              <div>
                <p style={styles.statLabel}>Total Users</p>
                <h3 style={styles.statValue}>{users.length}</h3>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#d4e7d4" }}>
                <Users size={24} style={{ color: "#4a7c59" }} />
              </div>
              <div>
                <p style={styles.statLabel}>Active</p>
                <h3 style={styles.statValue}>
                  {
                    users.filter(
                      (u) => u.status === "Active" || u.is_active
                    ).length
                  }
                </h3>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#f0d9d4" }}>
                <Shield size={24} style={{ color: "#8b5a4d" }} />
              </div>
              <div>
                <p style={styles.statLabel}>Admins</p>
                <h3 style={styles.statValue}>
                  {users.filter((u) => u.role === "Admin").length}
                </h3>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div style={styles.searchBar}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "#a0826d")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "#e8dcc8")
              }
            />
          </div>

          {/* TABLE */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Joined Date</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const isActive =
                    user.status === "Active" || user.is_active;
                  return (
                    <tr
                      key={user.id}
                      style={styles.tableRow}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#faf8f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {/* User */}
                      <td style={styles.td}>
                        <div style={styles.userCell}>
                          <div style={styles.avatar}>
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <div style={styles.userName}>{user.name}</div>
                            <div style={styles.userId}>ID: {user.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td style={styles.td}>
                        <div style={styles.emailCell}>
                          <Mail size={16} style={{ color: "#a0826d" }} />
                          <span>{user.email}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td style={styles.td}>
                        <span style={styles.roleBadge}>{user.role}</span>
                      </td>

                      {/* Status */}
                      <td style={styles.td}>
                        <span
                          style={
                            isActive
                              ? styles.statusActive
                              : styles.statusInactive
                          }
                        >
                          {user.status ||
                            (user.is_active ? "Active" : "Inactive")}
                        </span>
                      </td>

                      {/* Joined */}
                      <td style={styles.td}>
                        <div style={styles.dateCell}>
                          <Calendar
                            size={16}
                            style={{ color: "#a0826d" }}
                          />
                          <span>
                            {user.joined ||
                              (user.date_joined
                                ? new Date(
                                    user.date_joined
                                  ).toLocaleDateString()
                                : "N/A")}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={styles.td}>
                        <div style={styles.actionButtons}>
                          <button
                            style={styles.editButton}
                            onClick={() => handleEditUser(user)}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "#f5f1ea")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background =
                                "transparent")
                            }
                            title="Edit user"
                            aria-label={`Edit ${user.name}`}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            style={styles.deleteButton}
                            onClick={() => handleDeleteUser(user)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "#fef5f4";
                              e.currentTarget.style.borderColor =
                                "#c17b68";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "transparent";
                              e.currentTarget.style.borderColor =
                                "#f0d9d4";
                            }}
                            title="Delete user"
                            aria-label={`Delete ${user.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {filteredUsers.length === 0 && (
            <div style={styles.emptyState}>
              <Users size={48} style={{ color: "#c4a57b" }} />
              <h3 style={styles.emptyTitle}>No users found</h3>
              <p style={styles.emptyText}>
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#f5f1ea",
  },
  container: {
    minHeight: "100vh",
    background: "#f5f1ea",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  content: {
    padding: "40px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "16px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#5c4a3a",
    margin: "0 0 8px 0",
    lineHeight: "1.2",
  },
  pageSubtitle: {
    fontSize: "15px",
    color: "#8b7355",
    margin: 0,
    lineHeight: "1.5",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "#a0826d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  statIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    background: "#f5f1ea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a0826d",
    flexShrink: 0,
  },
  statLabel: {
    fontSize: "13px",
    color: "#8b7355",
    margin: "0 0 4px 0",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#5c4a3a",
    margin: 0,
    lineHeight: "1",
  },
  searchBar: {
    position: "relative",
    marginBottom: "30px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a0826d",
    pointerEvents: "none",
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: "1px solid #e8dcc8",
    borderRadius: "10px",
    fontSize: "15px",
    background: "#fff",
    color: "#5c4a3a",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
  },
  tableContainer: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    overflow: "auto",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },
  tableHeader: {
    background: "#f5f1ea",
  },
  th: {
    padding: "16px 20px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "700",
    color: "#5c4a3a",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  },
  tableRow: {
    borderBottom: "1px solid #f5f1ea",
    transition: "background 0.2s ease",
    cursor: "default",
  },
  td: {
    padding: "16px 20px",
    fontSize: "14px",
    color: "#5c4a3a",
    verticalAlign: "middle",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#e8dcc8",
    color: "#5c4a3a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "13px",
    flexShrink: 0,
    textTransform: "uppercase",
  },
  userName: {
    fontWeight: "600",
    color: "#5c4a3a",
    marginBottom: "2px",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  userId: {
    fontSize: "12px",
    color: "#a0826d",
    fontFamily: "monospace",
    lineHeight: "1.4",
  },
  emailCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#8b7355",
  },
  roleBadge: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#f5f1ea",
    color: "#5c4a3a",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  statusActive: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#d4e7d4",
    color: "#4a7c59",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  statusInactive: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#e8dcc8",
    color: "#8b7355",
    borderRadius: "6px",
    fontSize: "13px",
    whiteSpace: "nowrap",
    fontWeight: "600",
  },
  dateCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#8b7355",
    whiteSpace: "nowrap",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-start",
  },
  editButton: {
    padding: "8px",
    background: "transparent",
    border: "1px solid #e8dcc8",
    borderRadius: "6px",
    color: "#a0826d",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    flexShrink: 0,
  },
  deleteButton: {
    padding: "8px",
    background: "transparent",
    border: "1px solid #f0d9d4",
    borderRadius: "6px",
    color: "#c17b68",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    flexShrink: 0,
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    marginTop: "20px",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#5c4a3a",
    margin: "16px 0 8px 0",
  },
  emptyText: {
    fontSize: "14px",
    color: "#8b7355",
    margin: 0,
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f1ea",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e8dcc8",
    borderTopColor: "#a0826d",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "16px",
    fontSize: "15px",
    color: "#8b7355",
    fontWeight: "500",
  },
};