function Tabs({ active, setActive }) {
  return (
    <div className="flex border-b mb-6">
      {["generate", "history"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 capitalize ${
            active === tab
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          {tab === "generate" ? "Generate Quiz" : "History"}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
