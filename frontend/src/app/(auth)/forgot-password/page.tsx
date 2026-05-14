import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function ForgotPasswordPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
                <ForgotPasswordForm />
            </div>
            <Footer />
        </>
    );
}