import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipOverlay = 'string' | React.ReactNode;

export interface TooltipProps {
  children: React.ReactNode;
  overlay: TooltipOverlay;
  position?: TooltipPosition;
  hoverDelay?: number;
}

export default function Tooltip({ children, overlay, position, hoverDelay = 400 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<TooltipPosition | undefined>(position);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onShowTooltip = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, hoverDelay);
  };

  const onHideTooltip = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tooltipRef.current && isVisible) {
        // 화면 안에 Tooltip가 보이도록
        const { top, bottom, left, right } = tooltipRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        let updatedPosition = currentPosition;

        if (top < 0) {
          updatedPosition = 'bottom';
        } else if (bottom > windowHeight) {
          updatedPosition = 'top';
        } else if (left < 0) {
          updatedPosition = 'right';
        } else if (right > windowWidth) {
          updatedPosition = 'left';
        }

        if (updatedPosition === 'right' && right > windowWidth) {
          updatedPosition = 'left';
        }

        tooltipRef.current.style.top = 'auto';
        tooltipRef.current.style.bottom = 'auto';
        tooltipRef.current.style.left = 'auto';
        tooltipRef.current.style.right = 'auto';

        switch (updatedPosition) {
          case 'top':
            tooltipRef.current.style.bottom = '100%';
            break;
          case 'bottom':
            tooltipRef.current.style.top = '100%';
            break;
          case 'left':
            tooltipRef.current.style.right = '100%';
            break;
          case 'right':
            tooltipRef.current.style.left = '100%';
            break;
          default:
            break;
        }

        // 위치 업데이트
        setCurrentPosition(updatedPosition);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, currentPosition]);

  return (
    <S.TooltipContainer onMouseEnter={onShowTooltip} onMouseLeave={onHideTooltip} ref={tooltipRef}>
      {children}
      {overlay && typeof overlay === 'string' && overlay?.length > 0 && (
        <S.TooltipText overlay={overlay} isVisible={isVisible} position={currentPosition || 'bottom'}>
          {overlay}
        </S.TooltipText>
      )}
    </S.TooltipContainer>
  );
}
