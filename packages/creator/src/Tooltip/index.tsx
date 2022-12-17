import { TooltipContent } from './TooltipContent';
import { Tooltip } from './Tooltip';

export const createTooltip = ({ StyledTooltipContent }: any) => {
  const TooltipTemp = Tooltip() as any;
  TooltipTemp.Content = TooltipContent(StyledTooltipContent);
  return TooltipTemp;
};
