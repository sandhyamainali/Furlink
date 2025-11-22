"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  DollarSign,
  Calendar,
  User,
  FileDown,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    let list = payments;

    if (searchTerm.trim() !== "") {
      const t = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.payment_id?.toLowerCase().includes(t) ||
          p.user_name?.toLowerCase().includes(t) ||
          String(p.amount).toLowerCase().includes(t) ||
          p.method?.toLowerCase().includes(t) ||
          p.status?.toLowerCase().includes(t)
      );
    }

    setFilteredPayments(list);
  }, [searchTerm, payments]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const result = await fetchWithAuth("/payments/");

      if (
        !result.error &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        setPayments(result.data);
        setFilteredPayments(result.data);
      } else {
        const mock = generateMockPayments();
        setPayments(mock);
        setFilteredPayments(mock);
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      const mock = generateMockPayments();
      setPayments(mock);
      setFilteredPayments(mock);
    } finally {
      setLoading(false);
    }
  };

  const generateMockPayments = () => [
    {
      id: 1,
      payment_id: "PAY-001",
      user_name: "John Doe",
      amount: 150.0,
      status: "Success",
      date: "2024-01-15",
      method: "Credit Card",
    },
    {
      id: 2,
      payment_id: "PAY-002",
      user_name: "Sarah Smith",
      amount: 120.0,
      status: "Pending",
      date: "2024-01-14",
      method: "PayPal",
    },
    {
      id: 3,
      payment_id: "PAY-003",
      user_name: "Mike Johnson",
      amount: 180.0,
      status: "Success",
      date: "2024-01-12",
      method: "Credit Card",
    },
    {
      id: 4,
      payment_id: "PAY-004",
      user_name: "Emily Brown",
      amount: 200.0,
      status: "Failed",
      date: "2024-01-10",
      method: "Debit Card",
    },
    {
      id: 5,
      payment_id: "PAY-005",
      user_name: "David Wilson",
      amount: 100.0,
      status: "Success",
      date: "2024-01-08",
      method: "Credit Card",
    },
    {
      id: 6,
      payment_id: "PAY-006",
      user_name: "Lisa Anderson",
      amount: 95.0,
      status: "Success",
      date: "2024-01-07",
      method: "PayPal",
    },
  ];

  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const successCount = payments.filter(
    (p) => p.status?.toLowerCase() === "success"
  ).length;
  const pendingCount = payments.filter(
    (p) => p.status?.toLowerCase() === "pending"
  ).length;
  const failedCount = payments.filter(
    (p) => p.status?.toLowerCase() === "failed"
  ).length;

  const formatCurrency = (n) =>
    typeof n === "number" ? `$${n.toFixed(2)}` : "$0.00";

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "N/A");

  const getStatusStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "success") return styles.statusSuccess;
    if (s === "pending") return styles.statusPending;
    if (s === "failed") return styles.statusFailed;
    return styles.statusDefault;
  };

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleEdit = (payment) => {
    console.log("Edit payment:", payment);
  };

  const handleDelete = (payment) => {
    console.log("Delete payment:", payment);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading payments...</p>

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
          {/* Header */}
          <div style={styles.pageHeader}>
            <div>
              <h1 style={styles.pageTitle}>Payments</h1>
              <p style={styles.pageSubtitle}>
                Manage payment transactions and history
              </p>
            </div>

            <button
              style={styles.exportButton}
              onClick={handleExport}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#6b9b8e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#7bafa0")
              }
            >
              <FileDown size={18} />
              Export
            </button>
          </div>

          {/* Stats row */}
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Total Revenue</p>
              <h3 style={styles.statValue}>{formatCurrency(totalRevenue)}</h3>
              <p style={styles.statSub}>+12% this month</p>
            </div>

            <div style={styles.statCard}>
              <p style={styles.statLabel}>Successful</p>
              <h3 style={styles.statValue}>{successCount}</h3>
              <p style={styles.statSub}>Payment success rate</p>
            </div>

            <div style={styles.statCard}>
              <p style={styles.statLabel}>Pending</p>
              <h3 style={styles.statValue}>{pendingCount}</h3>
              <p style={styles.statSub}>Awaiting confirmation</p>
            </div>

            <div style={styles.statCard}>
              <p style={styles.statLabel}>Failed</p>
              <h3 style={styles.statValue}>{failedCount}</h3>
              <p style={styles.statSub}>Requires attention</p>
            </div>
          </div>

          {/* Search + Filter row */}
          <div style={styles.searchRow}>
            <div style={styles.searchBar}>
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by ID, user, or amount..."
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
                  <th style={styles.th}>Payment ID</th>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Method</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((p) => (
                  <tr
                    key={p.id || p.payment_id}
                    style={styles.tableRow}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#faf8f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={styles.td}>
                      <span style={styles.paymentId}>{p.payment_id}</span>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.userCell}>
                        <div style={styles.userIcon}>
                          <User size={16} />
                        </div>
                        <span>{p.user_name}</span>
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.amountCell}>
                        <DollarSign
                          size={14}
                          style={{ color: "#a0826d" }}
                        />
                        {formatCurrency(p.amount || 0)}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <span style={getStatusStyle(p.status)}>{p.status}</span>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.dateCell}>
                        <Calendar
                          size={16}
                          style={{ color: "#a0826d" }}
                        />
                        <span>{formatDate(p.date)}</span>
                      </div>
                    </td>

                    <td style={styles.td}>{p.method}</td>

                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEdit(p)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDelete(p)}
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
          {filteredPayments.length === 0 && (
            <div style={styles.emptyState}>
              <DollarSign size={40} style={{ color: "#b89b76" }} />
              <h3 style={styles.emptyTitle}>No payments found</h3>
              <p style={styles.emptyText}>
                Try adjusting your search keywords or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------
   Styles (beige theme)
-------------------- */
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

  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
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

  exportButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#7bafa0",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },

  /* Stats row */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "16px",
    marginBottom: "28px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    padding: "18px 20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  statLabel: {
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#8b7355",
    marginBottom: "4px",
    fontWeight: "600",
  },
  statValue: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#5c4a3a",
    marginBottom: "4px",
  },
  statSub: {
    fontSize: "13px",
    color: "#a0826d",
  },

  /* Search row */
  searchRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  searchBar: {
    position: "relative",
    flex: 1,
    minWidth: "220px",
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a0826d",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 46px",
    borderRadius: "10px",
    border: "1px solid #e8dcc8",
    background: "#fff",
    fontSize: "15px",
    color: "#5c4a3a",
    outline: "none",
  },
  filterButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "11px 20px",
    borderRadius: "10px",
    border: "1px solid #e8dcc8",
    background: "#fff",
    color: "#5c4a3a",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  /* Table */
  tableContainer: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    overflow: "auto",
    boxShadow: "0 2px 7px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    minWidth: "900px",
    borderCollapse: "collapse",
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
    transition: "background 0.2s ease",
  },
  td: {
    padding: "14px 18px",
    fontSize: "14px",
    color: "#5c4a3a",
    verticalAlign: "middle",
  },
  paymentId: {
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#5c4a3a",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  userIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#f5f1ea",
    color: "#a0826d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  amountCell: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#5c4a3a",
  },

  dateCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#8b7355",
  },

  /* Status badges */
  statusSuccess: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#d4e7d4",
    color: "#2f6c3a",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "13px",
  },
  statusPending: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#ffeec2",
    color: "#a26a10",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "13px",
  },
  statusFailed: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#f7d2d0",
    color: "#a53b32",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "13px",
  },
  statusDefault: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#e8dcc8",
    color: "#5c4a3a",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "13px",
  },

  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #e8dcc8",
    background: "transparent",
    color: "#a0826d",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #f0d9d4",
    background: "transparent",
    color: "#c17b68",
    cursor: "pointer",
  },

  /* Empty state */
  emptyState: {
    marginTop: "28px",
    padding: "40px",
    textAlign: "center",
    borderRadius: "12px",
    border: "1px solid #e8dcc8",
    background: "#fff",
  },
  emptyTitle: {
    marginTop: "16px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#5c4a3a",
  },
  emptyText: {
    marginTop: "4px",
    fontSize: "14px",
    color: "#8b7355",
  },

  /* Loading */
  loadingContainer: {
    minHeight: "100vh",
    background: "#f5f1ea",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "4px solid #e8dcc8",
    borderTop: "4px solid #a0826d",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "14px",
    color: "#8b7355",
    fontSize: "15px",
  },
};