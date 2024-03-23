import { IconInfo } from "../Icons";

type InfoTooltipProps = {
  tipMessage: string;
  className?: string;
  open?: boolean;
};

export const InfoTooltip = ({ tipMessage, className, open }: InfoTooltipProps) => {
  return (
    <div className='absolute left-[-18px] top-[3px] cursor-pointer fadeIn'>
      <div className={`tooltip tooltip-left ${className ?? ""} ${open ? "tooltip-open" : ""}`} data-tip={tipMessage}>
        <IconInfo />
      </div>
    </div>
  );
}