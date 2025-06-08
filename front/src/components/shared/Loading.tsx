export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 text-white z-[100]">
      <span className="w-16 h-16 border-8 border-t-transparent border-white rounded-full animate-spin"></span>
    </div>
  );
}
