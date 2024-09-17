import { Button, If } from "@ds";

// styles
import "./ModalHeader.scss";

type TModalHeader = {
  onClose?: () => void;
  className?: string;
  title?: string;
  icon?: string;
};

export const ModalHeader = ({
  onClose,
  className,
  title,
  icon,
}: TModalHeader) => {
  return (
    <div className={`modal-header-ttyk35 ${className}`}>
      <div className='header__curve-ttyk35 bg-beta'></div>
      <div className='header__heading-ttyk35 w-100 px-4 d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center justify-content-start gap-2'>
          <If condition={!!icon}>
            <span className={`icon icon-${icon} color-alpha`} />
          </If>
          <h4>{title}</h4>
        </div>
        <Button onClick={onClose} className='bg-nu'>
          <ion-icon className='icon' name='close-outline' />
        </Button>
      </div>
    </div>
  );
};
