export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-my-black-high/50 text-my-white-low z-[100]">
      <span className="w-16 h-16 border-8 border-t-transparent border-my-white-low rounded-full animate-spin"></span>
    </div>
  );
}
