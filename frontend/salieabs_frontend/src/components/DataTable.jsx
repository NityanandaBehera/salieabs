import { useState, useEffect } from "react";
import { fetchCustomers } from "../services/CustomerService";

const DataTable = () => {
  const [customers, setCustomers] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([
    "id",
    "name",
    "email",
    "country",
  ]);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    country: "",
  });
  const [loading, setLoading] = useState(false); // Added loading state to avoid concurrent API calls.

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    if (loading) return; // Prevent multiple simultaneous requests

    setLoading(true);
    try {
      const data = await fetchCustomers(skip, 10); // Modify based on your API logic
      setCustomers((prev) => [...prev, ...data]); // Append the new data to the existing customers
      setSkip((prev) => prev + 10); // Increase skip for the next set of customers
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  // Handle filter change
  const handleFilterChange = (e, column) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  // Filtered customer data based on the filter values for 'name', 'email', and 'country'
  const filteredCustomers = customers.filter((customer) => {
    // Only apply filters for name, email, and country
    return (
      (filters.name === "" ||
        customer.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.email === "" ||
        customer.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.country === "" ||
        customer.country.toLowerCase().includes(filters.country.toLowerCase()))
    );
  });

  return (
    <div className="p-6">
      {/* Column Controls */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Show/Hide Columns</h3>
        <div className="space-x-4">
          {["id", "name", "email", "country"].map((col) => (
            <label
              key={col}
              className="inline-flex items-center text-sm font-medium text-gray-700"
            >
              <input
                type="checkbox"
                checked={visibleColumns.includes(col)}
                onChange={() => toggleColumn(col)}
                className="mr-2 rounded border-gray-300"
              />
              {col}
            </label>
          ))}
        </div>
      </div>

      {/* Column Filters */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Filter Columns</h3>
        <div className="grid grid-cols-3 gap-4">
          {["name", "email", "country"].map((col) => (
            <div key={col} className="flex flex-col">
              <label
                htmlFor={col}
                className="text-sm font-medium text-gray-700"
              >
                Filter by {col.charAt(0).toUpperCase() + col.slice(1)}
              </label>
              <input
                type="text"
                id={col}
                value={filters[col]}
                onChange={(e) => handleFilterChange(e, col)}
                className="mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder={`Filter by ${col}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              {visibleColumns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-sm font-semibold text-gray-600"
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                {visibleColumns.map((col) => (
                  <td
                    key={col}
                    className="px-4 py-2 text-sm text-gray-700 border-t border-gray-200"
                  >
                    {customer[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      <div className="mt-4 text-center">
        <button
          onClick={loadMoreData}
          disabled={loading} // Disable the button if data is being loaded
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default DataTable;
