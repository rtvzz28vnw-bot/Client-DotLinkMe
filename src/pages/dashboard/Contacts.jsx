import React, { useState, useEffect } from "react";
import {
  Download,
  Search,
  Mail,
  Phone,
  MapPin,
  Monitor,
  Users,
  Smartphone as NfcIcon,
  QrCode,
  Link2,
  Globe,
  Filter,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function Contacts() {
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProfile, setFilterProfile] = useState("all");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const fetchAllContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/profiles/all-visitors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setVisitors(data.data.visitors || []);
        setProfiles(data.data.profiles || []);
        setTotalVisitors(data.data.totalVisitors || 0);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.visitorEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.visitorPhone?.includes(searchTerm) ||
      visitor.visitorCountry?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProfile =
      filterProfile === "all" ||
      (filterProfile === "deleted" && !visitor.profileId) ||
      visitor.profileId === parseInt(filterProfile);

    return matchesSearch && matchesProfile;
  });

  const exportToCSV = () => {
    const headers = [
      "Email",
      "Phone",
      "Country",
      "City",
      "Device",
      "Browser",
      "Source",
      "Profile",
      "Date",
    ];
    const csvData = filteredVisitors.map((visitor) => [
      visitor.visitorEmail,
      visitor.visitorPhone,
      visitor.visitorCountry || "Unknown",
      visitor.visitorCity || "Unknown",
      visitor.device || "Unknown",
      visitor.browser || "Unknown",
      visitor.viewSource,
      visitor.profile?.name || "Deleted Profile",
      new Date(visitor.submittedAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `all-contacts-${new Date().toISOString()}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
          Contacts
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          All visitor contacts from your profiles
        </p>
      </div>

      {/* Stats Card */}
      <div className="card-glass p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold text-brand-dark">
              {totalVisitors}
            </p>
            <p className="text-gray-600">Total Contacts</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="card-glass p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Contacts
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by email, phone, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
              />
            </div>
          </div>

          {/* Filter by Profile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Profile
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterProfile}
                onChange={(e) => setFilterProfile(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
              >
                <option value="all">All Profiles</option>
                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name} ({profile.profileType})
                  </option>
                ))}
                <option value="deleted">Deleted Profiles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Export Button */}
        {filteredVisitors.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV ({filteredVisitors.length} contacts)
            </button>
          </div>
        )}
      </div>

      {/* Contacts Table */}
      <div className="card-glass p-6">
        {filteredVisitors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Contact Info
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Profile
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Device
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Source
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a
                            href={`mailto:${visitor.visitorEmail}`}
                            className="text-brand-primary hover:underline"
                          >
                            {visitor.visitorEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a
                            href={`tel:${visitor.visitorPhone}`}
                            className="hover:text-brand-primary"
                          >
                            {visitor.visitorPhone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {visitor.profile ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                            <span className="text-xs font-semibold text-brand-primary">
                              {visitor.profile.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {visitor.profile.name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {visitor.profile.profileType}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm italic">
                            Deleted Profile
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>
                          {visitor.visitorCity || "Unknown"},{" "}
                          {visitor.visitorCountry || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Monitor className="w-4 h-4 text-gray-400" />
                        <div>
                          <div>{visitor.device || "Unknown"}</div>
                          <div className="text-xs text-gray-500">
                            {visitor.browser || "Unknown"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {visitor.viewSource === "nfc" ? (
                          <>
                            <NfcIcon className="w-3 h-3" /> NFC
                          </>
                        ) : visitor.viewSource === "qr" ? (
                          <>
                            <QrCode className="w-3 h-3" /> QR
                          </>
                        ) : visitor.viewSource === "link" ? (
                          <>
                            <Link2 className="w-3 h-3" /> Link
                          </>
                        ) : (
                          <>
                            <Globe className="w-3 h-3" /> Direct
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          {new Date(visitor.submittedAt).toLocaleDateString()}
                          <br />
                          <span className="text-xs text-gray-500">
                            {new Date(visitor.submittedAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchTerm || filterProfile !== "all"
                ? "No contacts match your filters"
                : "No contacts yet"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterProfile !== "all"
                ? "Try adjusting your search or filters"
                : "When people share their contact info with you, they'll appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
