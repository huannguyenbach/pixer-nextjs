import cn from 'classnames';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import { useSettings } from '@/data/settings';
import lightModeLogo from '@/assets/images/logo-black.svg';

export default function Logo({
  className = 'w-20',
  ...props
}: React.AnchorHTMLAttributes<{}>) {
  const { settings }: any = useSettings();
  return (
    <AnchorLink
      href={routes.home}
      className={cn(
        'relative flex items-center text-dark focus:outline-none dark:text-light',
        className,
      )}
      {...props}
    >
      <span
        className="relative overflow-hidden"
        style={{
          width: 128,
          height: 40,
        }}
      >
          <Image
            src={settings?.logo?.original ?? lightModeLogo}
            fill
            loading="eager"
            alt={settings?.siteTitle ?? 'Light Logo'}
            className="object-contain"
          />
        
      </span>
    </AnchorLink>
  );
}
