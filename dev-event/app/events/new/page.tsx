"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "Next",
    description:
      "A full-day event exploring the latest in Next.js, React, and web performance optimization.",
    overview:
      "Join developers from around the world to discuss modern frontend strategies and hands-on workshops.",
    venue: "Tech Convention Center",
    location: "San Francisco, CA",
    date: "2025-12-10",
    time: "10:00",
    mode: "offline",
    audience: "Developers, Tech Enthusiasts, Designers",
    organizer: "Next.js Community",
    
  });

  const [tags, setTags] = useState<string[]>([
    "Next.js",
    "React",
    "Web Development",
    "Conference",
  ]);
  const [agenda, setAgenda] = useState<string[]>([
    "Keynote: The Future of Next.js",
    "React Server Components Deep Dive",
    "Building Scalable Web Apps",
    "Q&A and Networking",
  ]);

  const [tagInput, setTagInput] = useState("");
  const [agendaInput, setAgendaInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Add new tag
  const handleAddTag = () => {
    const value = tagInput.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
      setTagInput("");
    }
  };

  // 🔹 Add new agenda item
  const handleAddAgenda = () => {
    const value = agendaInput.trim();
    if (value && !agenda.includes(value)) {
      setAgenda([...agenda, value]);
      setAgendaInput("");
    }
  };

  // 🔹 Remove tag or agenda item
  const handleRemove = (
    item: string,
    type: "tag" | "agenda"
  ) => {
    if (type === "tag") setTags(tags.filter((t) => t !== item));
    else setAgenda(agenda.filter((a) => a !== item));
  };

  // 🔹 Handle form field change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value)
      );

      form.append("tags", JSON.stringify(tags));
      form.append("agenda", JSON.stringify(agenda));
      if (image) form.append("image", image);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Event created successfully!");
        setFormData({
          title: "",
          description: "",
          overview: "",
          venue: "",
          location: "",
          date: "",
          time: "",
          mode: "online",
          audience: "",
          organizer: "",
        });
        setTags([]);
        setAgenda([]);
        setImage(null);
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to create event"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Create New Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        <input
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="overview"
          placeholder="Overview"
          value={formData.overview}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <div className="flex gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
        </div>

        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <input
          name="audience"
          placeholder="Audience"
          value={formData.audience}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="organizer"
          placeholder="Organizer"
          value={formData.organizer}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* 🔹 Tags Input */}
        <div>
          <label className="block font-medium mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-blue-600 text-white px-3 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-transparent border border-gray-400 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemove(tag, "tag")}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 🔹 Agenda Input */}
        <div>
          <label className="block font-medium mb-1">Agenda</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add agenda item"
              value={agendaInput}
              onChange={(e) => setAgendaInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAgenda())}
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={handleAddAgenda}
              className="bg-blue-600 text-white px-3 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {agenda.map((item, index) => (
              <span
                key={index}
                className="bg-transparent border border-gray-400 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemove(item, "agenda")}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
