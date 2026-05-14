export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Study Abroad Consultancy Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find and apply to scholarships worldwide. Track your applications.
        </p>
        <div className="space-x-4">
          <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Login
          </a>
          <a href="/register" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Register
          </a>
          <a href="/about" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            About Us
          </a>
          <a href="/contact" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}