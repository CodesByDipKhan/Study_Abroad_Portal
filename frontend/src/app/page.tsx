import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            Study Abroad Consultancy Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find and apply to scholarships worldwide. Track your applications.
          </p>
          <div className="flex flex-col items-center space-y-4 mt-8">
            <a href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 w-64 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              Login
            </a>
            <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 w-64 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              Register
            </a>
            <a href="/about" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 w-64 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              About Us
            </a>
            <a href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 w-64 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}