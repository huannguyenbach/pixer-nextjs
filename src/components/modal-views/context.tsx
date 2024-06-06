import React from 'react';
import routes from '@/config/routes';

export type MODAL_VIEWS =
  | 'REGISTER'
  | 'LOGIN_VIEW'
  | 'FORGOT_PASSWORD_VIEW'
  | 'PRODUCT_DETAILS'

interface State {
  view: MODAL_VIEWS | undefined;
  data?: any;
  isOpen: boolean;
  useHistoryBack: boolean;
}
interface Payload {
  slug: string;

}
type Action =
  | { type: 'open'; view: MODAL_VIEWS; payload?: any }
  | { type: 'close' };

const initialState: State = {
  view: undefined,
  isOpen: false,
  data: null,
  useHistoryBack: false,
};

function modalReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: true,
        useHistoryBack: action.view === 'PRODUCT_DETAILS',
      };
    case 'close':
      return {
        ...state,
        view: undefined,
        data: null,
        isOpen: false,
      };
    default:
      throw new Error('Unknown Modal Action!');
  }
}

const ModalStateContext = React.createContext<State>(initialState);
ModalStateContext.displayName = 'ModalStateContext';
const ModalActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);
ModalActionContext.displayName = 'ModalActionContext';

export const ModalProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, initialState);
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`);
  }
  return context;
}

export function useModalAction() {
  const state = useModalState();
  const dispatch = React.useContext(ModalActionContext);
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`);
  }
  return {
    openModal(view: MODAL_VIEWS, payload?: Payload) {
      dispatch({ type: 'open', view, payload });
      if (view === 'PRODUCT_DETAILS' && payload?.slug) {
        window.history.pushState({}, '', routes.productUrl(payload.slug)); // Update URL dynamically when openModal without reload page
      }
    },
    closeModal() {
      dispatch({ type: 'close' });
      if (state.useHistoryBack) {
        window.history.back(); // Go back to the previous URL when closeModal
      }
    },
  };
}
