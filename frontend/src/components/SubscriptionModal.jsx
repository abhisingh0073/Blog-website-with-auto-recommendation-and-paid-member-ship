import { subscribeCreator } from "../api/userApi";
import { useToast } from "../context/ToastContext";

export const SubscriptionModal = ({ isOpen, onClose, creatorId }) => {
  if (!isOpen) return null;

  const toast = useToast();

  const handleButtonClick = async (creatorId, month) => {
    try{
        const res = await subscribeCreator(creatorId, month);
        toast.success(res.data.message);
        onClose();

    } catch(err){
        toast.error(err.response.data.message || "Something went wrong");
        onClose();
    }
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
       
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Choose Your Subscription
        </h2>
        <p className="mb-8 text-center text-gray-500">
          Unlock premium content from this creator
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Plan 1 */}
          <div className="flex flex-col items-center rounded-xl border-2 bg-slate-50 p-6 text-center shadow-sm transition hover:shadow-md hover:border-indigo-600">
            <h3 className="text-lg font-semibold text-gray-800">1 Month</h3>
            <p className="mt-2 text-sm text-gray-500">
              Perfect for trying things out
            </p>
            <div className="my-4 text-3xl font-bold text-indigo-600">₹199/Month</div>
            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
                    onClick={() => handleButtonClick(creatorId, 1)}
            >
              Join Now @ ₹199
            </button>
          </div>

          {/* Plan 2 (Highlighted) */}
          <div className="flex flex-col items-center rounded-xl border-2 bg-slate-50 p-6 text-center shadow-md transition hover:shadow-lg hover:border-indigo-600">
            <span className="mb-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Most Popular
            </span>
            <h3 className="text-lg font-semibold text-gray-800">3 Months</h3>
            <p className="mt-2 text-sm text-gray-500">
              Best value for regular fans
            </p>
            <div className="my-4 text-3xl font-bold text-indigo-600">₹160/Month</div>
            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
                    onClick={() => handleButtonClick(creatorId, 3)}
            >
              Join Now @ ₹480
            </button>
          </div>

          {/* Plan 3 */}
          <div className="flex flex-col items-center rounded-xl border-2 bg-slate-50 p-6 text-center shadow-sm transition hover:shadow-md hover:border-indigo-600">
            <h3 className="text-lg font-semibold text-gray-800">6 Months</h3>
            <p className="mt-2 text-sm text-gray-500">
              Maximum savings, full access
            </p>
            <div className="my-4 text-3xl font-bold text-indigo-600">₹130/Month</div>
            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
                    onClick={() => handleButtonClick(creatorId, 6)}
            >
              Join Now @ ₹780
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
