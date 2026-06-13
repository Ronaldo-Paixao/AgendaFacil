type Props = {
  current: string;
};

export default function Breadcrumb({ current }: Props) {
  return (
    <div className="text-sm text-amber-600 mb-4">
      Home / {current}
    </div>
  );
}