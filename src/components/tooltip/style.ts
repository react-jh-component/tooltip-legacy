import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TooltipOverlay, TooltipPosition } from './Tooltip';
import { FONT_STYLES, USER_SELECT_NONE } from '@/common/styles/common.style';

export const TooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const TooltipText = styled.div<{
  overlay?: TooltipOverlay;
  isVisible: boolean;
  position?: TooltipPosition;
}>`
  padding: ${({ overlay }) => (typeof overlay === 'object' && overlay !== null ? '24px' : '8px 6px')};
  position: absolute;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  z-index: ${({ theme }) => theme.zIndex.tooltip};

  background-color: ${({ theme, overlay }) =>
    typeof overlay === 'object' && overlay !== null ? theme.colors.white : theme.colors.gray10};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  ${FONT_STYLES.BODY2_R14}
  white-space: nowrap;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);

  ${USER_SELECT_NONE}

  ${({ position }) => {
    switch (position) {
      case 'top':
        return css`
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'bottom':
        return css`
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'left':
        return css`
          top: 50%;
          right: calc(100% + 12px);
          transform: translateY(-50%);
        `;
      case 'right':
        return css`
          top: 50%;
          left: calc(100% + 12px);
          transform: translate(-50%, -50%);
        `;
      default:
        return css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, 12px);
        `;
    }
  }}
`;
