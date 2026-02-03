export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
    
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-slate-900 p-6 shadow-xl border border-slate-700"
      >
      
        <h2 className="text-xl font-semibold text-white mb-2">
          Are you sure you want to delete this post? This action cannot be undone."
        </h2>

    

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
