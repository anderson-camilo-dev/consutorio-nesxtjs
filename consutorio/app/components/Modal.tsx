"use client";

export default function Modal({ children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/10 min-h-screen  backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
