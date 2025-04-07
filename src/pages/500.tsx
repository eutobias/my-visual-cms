import { NextPage } from 'next';
import Link from 'next/link';

const ServerErrorPage: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Internal Server Error</h2>
        <p className="text-gray-600 mt-2">Oops! Something went wrong on our end. Please try again later.</p>
        <Link 
          href="/"
          className="inline-block mt-6 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ServerErrorPage;