import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function ResetPasswordPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
                <ResetPasswordForm />
            </div>
            <Footer />
        </>
    );
}