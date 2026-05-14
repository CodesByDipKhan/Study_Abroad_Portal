export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p>Study Abroad Consultancy Portal © {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}