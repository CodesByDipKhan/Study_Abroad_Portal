import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function ForgotPasswordPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
                <div className="w-full max-w-md">
                    <div className="mb-4">
                        <a
                            href="/"
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 inline-block transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                        >
                            Back
                        </a>
                    </div>
                    <ForgotPasswordForm />
                </div>
            </div>
            <Footer />
        </>
    );
}