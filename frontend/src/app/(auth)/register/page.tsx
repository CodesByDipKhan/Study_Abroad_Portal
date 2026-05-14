import RegisterForm from '@/components/auth/RegisterForm';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function RegisterPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
                <RegisterForm />
            </div>
            <Footer />
        </>
    );
}