"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  PawPrint,
  Calendar,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

export default function AdminPetsPage() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pets on mount
  useEffect(() => {
    fetchPets();
  }, []);

  // Filter pets when search term or data changes
  useEffect(() => {
    let list = pets;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (pet) =>
          pet.name?.toLowerCase().includes(term) ||
          pet.species?.toLowerCase().includes(term) ||
          pet.breed?.toLowerCase().includes(term) ||
          pet.status?.toLowerCase().includes(term)
      );
    }

    setFilteredPets(list);
  }, [pets, searchTerm]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const result = await fetchWithAuth("/pets/");

      if (
        !result.error &&
        result.data &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        setPets(result.data);
        setFilteredPets(result.data);
      } else {
        const mock = generateMockPets();
        setPets(mock);
        setFilteredPets(mock);
      }
    } catch (err) {
      console.error("Error fetching pets:", err);
      const mock = generateMockPets();
      setPets(mock);
      setFilteredPets(mock);
    } finally {
      setLoading(false);
    }
  };

  const generateMockPets = () => [
    {
      id: 1,
      name: "Max",
      species: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      status: "Available",
      listed_on: "2024-01-10",
    },
    {
      id: 2,
      name: "Luna",
      species: "Cat",
      breed: "Persian",
      age: "1 year",
      status: "Available",
      listed_on: "2024-02-05",
    },
    {
      id: 3,
      name: "Charlie",
      species: "Dog",
      breed: "Border Collie",
      age: "3 years",
      status: "Adopted",
      listed_on: "2024-03-02",
    },
    {
      id: 4,
      name: "Bella",
      species: "Cat",
      breed: "Orange Tabby",
      age: "2 years",
      status: "Available",
      listed_on: "2024-03-15",
    },
    {
      id: 5,
      name: "Snow",
      species: "Rabbit",
      breed: "White Rabbit",
      age: "1 year",
      status: "Available",
      listed_on: "2024-04-01",
    },
  ];

  const handleAddPet = () => {
    console.log("Add pet clicked");
  };

  const handleEditPet = (pet) => {
    console.log("Edit pet:", pet);
  };

  const handleDeletePet = (pet) => {
    console.log("Delete pet:", pet);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  const getStatusStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "available") return styles.statusAvailable;
    if (s === "adopted") return styles.statusAdopted;
    return styles.statusPending;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading pets...</p>

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
              <h1 style={styles.pageTitle}>Pets Management</h1>
              <p style={styles.pageSubtitle}>Manage pet listings</p>
            </div>

            <button
              style={styles.addButton}
              onClick={handleAddPet}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#8f6f5c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#a0826d")
              }
            >
              <Plus size={20} />
              <span>Add Pet</span>
            </button>
          </div>

          {/* Search + Filter bar */}
          <div style={styles.searchBarRow}>
            <div style={styles.searchBar}>
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search pets by name, species, breed, or status..."
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
            <button style={styles.filterButton}>Filter</button>
          </div>

          {/* Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Species</th>
                  <th style={styles.th}>Breed</th>
                  <th style={styles.th}>Age</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Listed On</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPets.map((pet) => (
                  <tr
                    key={pet.id}
                    style={styles.tableRow}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#faf8f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={styles.td}>#{pet.id}</td>

                    <td style={styles.td}>
                      <div style={styles.nameCell}>
                        <div style={styles.petIcon}>
                          <PawPrint size={16} />
                        </div>
                        <span style={styles.petName}>{pet.name}</span>
                      </div>
                    </td>

                    <td style={styles.td}>{pet.species}</td>
                    <td style={styles.td}>{pet.breed}</td>
                    <td style={styles.td}>{pet.age}</td>

                    <td style={styles.td}>
                      <span style={getStatusStyle(pet.status)}>
                        {pet.status}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.dateCell}>
                        <Calendar
                          size={16}
                          style={{ color: "#a0826d" }}
                        />
                        <span>{formatDate(pet.listed_on)}</span>
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEditPet(pet)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f5f1ea")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                              "transparent")
                          }
                          title="Edit pet"
                          aria-label={`Edit ${pet.name}`}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDeletePet(pet)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#fef5f4";
                            e.currentTarget.style.borderColor = "#c17b68";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "transparent";
                            e.currentTarget.style.borderColor = "#f0d9d4";
                          }}
                          title="Delete pet"
                          aria-label={`Delete ${pet.name}`}
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
          {filteredPets.length === 0 && (
            <div style={styles.emptyState}>
              <PawPrint size={48} style={{ color: "#c4a57b" }} />
              <h3 style={styles.emptyTitle}>No pets found</h3>
              <p style={styles.emptyText}>
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== Styles (same beige palette as Users page) =====
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
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#5c4a3a",
    margin: "0 0 8px 0",
  },
  pageSubtitle: {
    fontSize: "15px",
    color: "#8b7355",
    margin: 0,
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
  // Search row
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
    minWidth: "220px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#a0826d",
    pointerEvents: "none",
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
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
  },
  filterButton: {
    padding: "11px 20px",
    borderRadius: "10px",
    border: "1px solid #e8dcc8",
    background: "#fff",
    color: "#5c4a3a",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
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
    minWidth: "850px",
  },
  tableHeader: {
    background: "#f5f1ea",
  },
  th: {
    padding: "14px 18px",
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
  },
  td: {
    padding: "14px 18px",
    fontSize: "14px",
    color: "#5c4a3a",
    verticalAlign: "middle",
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  petIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#f5f1ea",
    color: "#a0826d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  petName: {
    fontWeight: "600",
  },
  statusAvailable: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#d4e7d4",
    color: "#4a7c59",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  statusAdopted: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#e0dde0",
    color: "#5f5666",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  statusPending: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#f7e3c8",
    color: "#b27632",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
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