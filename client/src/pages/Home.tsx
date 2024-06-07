import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaChartLine, FaMobileAlt, FaMoneyCheckAlt, FaPiggyBank, FaSmile } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { TbTransactionRupee } from "react-icons/tb";
import { MdInsights } from "react-icons/md";
import Navbar from "../components/Navbar";

const Home = (): React.ReactNode => {
  // @ts-expect-error "unexpected error"
  const { user } = useUser();

  return (
    <div className="h-full bg-purple-100 overflow-hidden">
      <Navbar user={user} />

      <main className="overflow-scroll h-screen">
        <section className="bg-gradient-to-r from-blue-500 to-purple-400 py-12 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-md shadow-slate-500 p-8 flex flex-col items-center justify-center">
              <FaSmile className="text-purple-500 text-6xl mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to MyKhata</h2>
              <p className="text-md text-gray-600 text-center mb-4">
                Track your expenses effortlessly. Manage your finances with ease and stay on top of your budget.
              </p>
              <Link to={user ? "/dashboard": "login"} className="bg-purple-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-500 transition duration-300">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Features</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <FaMoneyCheckAlt className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Expense Tracking</h3>
                <p className="mt-2 text-gray-600">Easily track your daily expenses and manage your finances.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaChartLine className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Detailed Reports</h3>
                <p className="mt-2 text-gray-600">Generate detailed reports to analyze your spending habits.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaMobileAlt className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Mobile Friendly</h3>
                <p className="mt-2 text-gray-600">Access your expense tracker on the go with our mobile-friendly design.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <FaUserPlus className="text-blue-500 h-28 w-28 p-5 rounded-lg mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Step 1: Sign Up</h3>
                <p className="mt-2 text-gray-600">Create your free account and start tracking your expenses.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaPiggyBank className="text-blue-500 h-28 w-28 p-5 rounded-lg mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Step 2: Add Sources</h3>
                <p className="mt-2 text-gray-600">Add your sources of money.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <TbTransactionRupee className="text-blue-500 h-28 w-28 p-5 rounded-lg mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Step 3: Add Expenses</h3>
                <p className="mt-2 text-gray-600">Add your daily expenses and categorize them accordingly.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <MdInsights className="text-blue-500 h-28 w-28 p-5 rounded-lg mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Step 4: View Reports</h3>
                <p className="mt-2 text-gray-600">View detailed reports and get insights into your spending habits.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Get Started Today!</h2>
            <p className="mt-4 text-lg text-blue-200">Sign up now and take control of your finances with MyKhata.</p>
            <Link to={user ? "dashboard" : "/register"} className="mt-6 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100">
              Register Now
            </Link>
          </div>
        </section>

        <section className="bg-blue-600 h-10"></section>
      </main>
    </div>
  );
}

export default Home;
