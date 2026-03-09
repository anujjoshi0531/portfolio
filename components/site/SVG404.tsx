export default function SVG404({ className }: { className?: string }) {
  return (
    <object
      data="/404.svg"
      type="image/svg+xml"
      aria-hidden="true"
      className={className}
      width={595}
      height={595}
    />
  );
}
