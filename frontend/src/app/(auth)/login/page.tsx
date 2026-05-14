import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function LoginPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
                <LoginForm />
            </div>
            <Footer />
        </>
    );
}