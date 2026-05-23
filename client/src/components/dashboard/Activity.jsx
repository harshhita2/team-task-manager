function Activity() {
  const activities = [
    "Harshita moved API task to Review",
    "Rahul completed UI redesign",
    "New project created",
    "Meeting scheduled for tomorrow",
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      <h2 className="text-xl font-semibold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />

            <div>
              <p className="text-gray-700">
                {item}
              </p>

              <span className="text-sm text-gray-400">
                2 min ago
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Activity;