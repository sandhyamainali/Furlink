"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  User,
  PawPrint,
  Calendar,
  DollarSign,
  Filter,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

export default function AdminAdoptionsPage() {
  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch adoptions on mount
  useEffect(() => {
    fetchAdoptions();
  }, []);

  // Filter adoptions
  useEffect(() => {
    let list = adoptions;

    if (searchTerm.trim() !== "") {
      const t = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.user_name?.toLowerCase().includes(t) ||
          a.pet_name?.toLowerCase().includes(t) ||
          a.pet_details?.toLowerCase().includes(t) ||
          a.status?.toLowerCase().includes(t)
      );
    }

    setFilteredAdoptions(list);
  }, [searchTerm, adoptions]);

  const fetchAdoptions = async () => {
    setLoading(true);
    try {
      const result = await fetchWithAuth("/adoptions/");

      if (
        !result.error &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        setAdoptions(result.data);
        setFilteredAdoptions(result.data);
      } else {
        const mock = generateMock();
        setAdoptions(mock);
        setFilteredAdoptions(mock);
      }
    } catch (err) {
      console.error("Error:", err);
      const mock = generateMock();
      setAdoptions(mock);
      setFilteredAdoptions(mock);
    } finally {
      setLoading(false);
    }
  };

  // Mock data
  const generateMock = () => [
    {
      id: 1,
      user_name: "John Doe",
      pet_name: "Max",
      pet_details: "Golden Retriever",
      date: "2024-01-15",
      amount: 150,
      status: "Completed",
    },
    {
      id: 2,
      user_name: "Sarah Smith",
      pet_name: "Luna",
      pet_details: "Persian Cat",
      date: "2024-01-14",
      amount: 120,
      status: "Pending",
    },
    {
      id: 3,
      user_name: "Mike Johnson",
      pet_name: "Charlie",
      pet_details: "Beagle",
      date: "2024-01-12",
      amount: 180,
      status: "Completed",
    },
    {
      id: 4,
      user_name: "Emily Brown",
      pet_name: "Bella",
      pet_details: "Border Collie",
      date: "2024-01-10",
      amount: 200,
      status: "In Progress",
    },
    {
      id: 5,
      user_name: "David Wilson",
      pet_name: "Oliver",
      pet_details: "Orange Tabby",
      date: "2024-01-08",
      amount: 100,
      status: "Completed",
    },
  ];

  // Action handlers
  const handleAdd = () => console.log("Add clicked");

  const handleEdit = (data) => console.log("Edit:", data);

  const handleDelete = (data) => console.log("Delete:", data);

  // Utility formatters
  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "N/A";

  const formatAmount = (a) => `$${a}`;

  const statusStyle = (s) => {
    const x = s.toLowerCase();
    if (x === "completed") return styles.statusCompleted;
    if (x === "pending") return styles.statusPending;
    if (x === "in progress") return styles.statusInProgress;
    return styles.statusDefault;
  };

  // Loading UI
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading adoptions...</p>

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

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div>
              <h1 style={styles.pageTitle}>Adoptions</h1>
              <p style={styles.pageSubtitle}>
                Manage adoption requests and records
              </p>
            </div>

            <button
              style={styles.addButton}
              onClick={handleAdd}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#8f6f5c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#a0826d")
              }
            >
              <Plus size={20} />
              Add Adoption
            </button>
          </div>

          {/* Search Row */}
          <div style={styles.searchBarRow}>
            <div style={styles.searchBar}>
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search adoptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <button style={styles.filterButton}>
              <Filter size={16} />
              Filter
            </button>
          </div>

          {/* Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Pet</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredAdoptions.map((a) => (
                  <tr
                    key={a.id}
                    style={styles.tableRow}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#faf8f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={styles.td}>{a.id}</td>

                    <td style={styles.td}>
                      <div style={styles.userCell}>
                        <div style={styles.userIcon}>
                          <User size={16} />
                        </div>
                        <span>{a.user_name}</span>
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.petCell}>
                        <div style={styles.petIconSmall}>
                          <PawPrint size={14} />
                        </div>
                        <div>
                          <div style={styles.petName}>{a.pet_name}</div>
                          <div style={styles.petDetails}>
                            ({a.pet_details})
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.dateCell}>
                        <Calendar size={16} style={{ color: "#a0826d" }} />
                        <span>{formatDate(a.date)}</span>
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.amountCell}>
                        <DollarSign size={14} style={{ color: "#a0826d" }} />
                        {formatAmount(a.amount)}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <span style={statusStyle(a.status)}>{a.status}</span>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEdit(a)}
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDelete(a)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredAdoptions.length === 0 && (
            <div style={styles.emptyState}>
              <PawPrint size={40} style={{ color: "#b89b76" }} />
              <h3 style={styles.emptyTitle}>No adoptions found</h3>
              <p style={styles.emptyText}>
                Try changing your search keywords or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   STYLES (Beige Theme Same as Users & Pets)
--------------------------------------------- */
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#f5f1ea",
  },
  container: {
    background: "#f5f1ea",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px",
  },

  /* Header */
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "24px",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#5c4a3a",
  },
  pageSubtitle: {
    marginTop: "4px",
    fontSize: "15px",
    color: "#8b7355",
  },

  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 22px",
    background: "#a0826d",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },

  /* Search */
  searchBarRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  searchBar: {
    position: "relative",
    flex: 1,
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a0826d",
    zIndex: 2,
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 46px",
    border: "1px solid #e8dcc8",
    borderRadius: "10px",
    fontSize: "15px",
    background: "#fff",
    color: "#5c4a3a",
    outline: "none",
    transition: "0.2s border-color",
  },
  filterButton: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #e8dcc8",
    background: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#5c4a3a",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  /* Table */
  tableContainer: {
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    overflow: "auto",
    background: "#fff",
    boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },
  tableHeader: {
    background: "#f5f1ea",
  },
  th: {
    padding: "14px 18px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: 700,
    color: "#5c4a3a",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tableRow: {
    borderBottom: "1px solid #f5f1ea",
    transition: "0.2s background",
  },
  td: {
    padding: "14px 18px",
    color: "#5c4a3a",
    fontSize: "14px",
  },

  /* User column */
  userCell: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  userIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#f5f1ea",
    color: "#a0826d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Pet cell */
  petCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  petIconSmall: {
    width: "30px",
    height: "30px",
    background: "#f5f1ea",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#a0826d",
  },
  petName: { fontWeight: "600", fontSize: "14px" },
  petDetails: { fontSize: "12px", color: "#8b7355" },

  /* Date */
  dateCell: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    color: "#8b7355",
  },

  /* Amount */
  amountCell: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  /* Status Tags */
  statusCompleted: {
    padding: "6px 12px",
    background: "#d4e7d4",
    color: "#2f6c3a",
    borderRadius: "6px",
    fontWeight: "600",
  },
  statusPending: {
    padding: "6px 12px",
    background: "#ffeec2",
    color: "#a26a10",
    borderRadius: "6px",
    fontWeight: "600",
  },
  statusInProgress: {
    padding: "6px 12px",
    background: "#dde8ff",
    color: "#2c4f8f",
    borderRadius: "6px",
    fontWeight: "600",
  },
  statusDefault: {
    padding: "6px 12px",
    background: "#e8dcc8",
    color: "#5c4a3a",
    borderRadius: "6px",
    fontWeight: "600",
  },

  /* Action Buttons */
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "8px",
    border: "1px solid #e8dcc8",
    background: "transparent",
    borderRadius: "6px",
    color: "#a0826d",
    cursor: "pointer",
    transition: "0.2s",
  },
  deleteButton: {
    padding: "8px",
    border: "1px solid #f0d9d4",
    background: "transparent",
    borderRadius: "6px",
    color: "#c17b68",
    cursor: "pointer",
    transition: "0.2s",
  },

  /* Empty State */
  emptyState: {
    marginTop: "30px",
    padding: "40px",
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    background: "#fff",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "14px",
    color: "#5c4a3a",
  },
  emptyText: {
    color: "#8b7355",
    marginTop: "4px",
  },

  /* Loading */
  loadingContainer: {
    minHeight: "100vh",
    background: "#f5f1ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e8dcc8",
    borderTop: "4px solid #a0826d",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "15px",
    color: "#8b7355",
  },
};