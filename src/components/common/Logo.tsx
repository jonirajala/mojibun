interface Props {
  size?: number;
  className?: string;
}

function LogoImage({ size, className = '' }: Props) {
  return (
    <img
      src="/logo.png"
      alt="Yappari logo"
      width={size}
      height={size}
      className={className}
    />
  );
}

export function Logo({ size = 64, className = '' }: Props) {
  return <LogoImage size={size} className={className} />;
}

export function LogoMark({ size = 32, className = '' }: Props) {
  return <LogoImage size={size} className={className} />;
}
