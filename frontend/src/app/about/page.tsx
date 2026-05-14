import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-4">
                        <a
                            href="/"
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 inline-block transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                        >
                            Back
                        </a>
                    </div>
                    <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">About Us</h1>
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4">
                            Study Abroad Consultancy is a leading educational consultancy dedicated to helping students achieve their dream of studying at top universities worldwide.
                        </p>
                        <p className="text-gray-700 mb-4">
                            With over 10 years of experience, we have guided more than 5,000 students to prestigious institutions across the USA, UK, Canada, Australia, Germany, and more.
                        </p>
                        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Our Achievements</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>5,000+ successful student placements</li>
                            <li>200+ university partnerships worldwide</li>
                            <li>$15M+ in scholarship assistance secured</li>
                            <li>98% student satisfaction rate</li>
                            <li>Certified by ICEF and British Council</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}