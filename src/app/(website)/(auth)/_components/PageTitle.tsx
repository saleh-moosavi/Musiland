export default function PageTitle({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-bold text-my-black-max dark:text-my-white-low mb-6 text-center">
      {title}
    </h2>
  );
}
