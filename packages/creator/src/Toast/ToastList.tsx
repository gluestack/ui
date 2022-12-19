import React from 'react';
import { ToastContext } from './Toast';
import { Overlay } from '../Overlay';
import { PresenceTransition } from '../Transitions';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';
const initialAnimationOffset = 24;
const transitionConfig: any = {
  'bottom': initialAnimationOffset,
  'top': -initialAnimationOffset,
  'top-right': -initialAnimationOffset,
  'top-left': -initialAnimationOffset,
  'bottom-left': initialAnimationOffset,
  'bottom-right': initialAnimationOffset,
};

const INSET = 50;
const POSITIONS = {
  'top': {
    top: INSET,
    left: 0,
    right: 0,
  },
  'top-right': {
    top: INSET,
    right: 0,
  },
  'top-left': {
    top: INSET,
    left: 0,
  },
  'bottom': {
    bottom: INSET,
    left: 0,
    right: 0,
  },
  'bottom-left': {
    bottom: INSET,
    left: 0,
  },
  'bottom-right': {
    bottom: INSET,
    right: 0,
  },
};
export const ToastList = () => {
  const { toastInfo, visibleToasts, removeToast } =
    React.useContext(ToastContext);

  //   const bottomInset = useKeyboardBottomInset() * 2;
  const getPositions = () => {
    return Object.keys(toastInfo);
  };

  let hasToastOnOverlay = false;
  getPositions().map((position) => {
    if (toastInfo[position]?.length > 0) hasToastOnOverlay = true;
  });

  return getPositions().length > 0 ? (
    <Overlay isOpen={hasToastOnOverlay} isKeyboardDismissable={false}>
      {getPositions().map((position: string) => {
        if (Object.keys(POSITIONS).includes(position))
          return (
            <View
              // {..._stack}
              key={position}
              // @ts-ignore

              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
                //@ts-ignore
                pointerEvents: 'none',
                //inCase of web
                position: 'fixed',
                //@ts-ignore
                ...POSITIONS[position],
              }}
            >
              {
                // @ts-ignore
                toastInfo[position].map((toast: IToast) => (
                  <PresenceTransition
                    // {..._presenceTransition}
                    key={toast.id}
                    visible={visibleToasts[toast.id]}
                    onTransitionComplete={(status: any) => {
                      if (status === 'exited') {
                        removeToast(toast.id);
                        toast.config?.onCloseComplete &&
                          toast.config?.onCloseComplete();
                      }
                    }}
                    initial={{
                      opacity: 0,
                      translateY: transitionConfig[position],
                    }}
                  >
                    <SafeAreaView>
                      {/* <Box
                          bottom={
                            ['bottom', 'bottom-left', 'bottom-right'].includes(
                              position
                            ) && toast.config?.avoidKeyboard
                              ? bottomInset + 'px'
                              : undefined
                          }
                        > */}
                      {toast.component}
                      {/* </Box> */}
                    </SafeAreaView>
                  </PresenceTransition>
                ))
              }
            </View>
          );
        else return null;
      })}
    </Overlay>
  ) : null;
};
