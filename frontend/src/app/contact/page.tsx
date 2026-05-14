import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-4">
                        <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
                    </div>
                    <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Contact Us</h1>
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Office Address</h2>
                            <p className="text-gray-600">123 Gulshan Avenue, Dhaka-1212, Bangladesh</p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Phone Numbers</h2>
                            <p className="text-gray-600">+880 1234 567890</p>
                            <p className="text-gray-600">+880 9876 543210</p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Email</h2>
                            <p className="text-gray-600">info@studyabroad.com</p>
                            <p className="text-gray-600">support@studyabroad.com</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Business Hours</h2>
                            <p className="text-gray-600">Sunday – Thursday: 9:00 AM – 6:00 PM</p>
                            <p className="text-gray-600">Friday – Saturday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}