import React, { useReducer, createContext } from "react";

type TCCompany = {
  id: string;
  name: string;
};
type TUploadFile = { key: string; value: string };
type TCurrentApproval = {
  approvalStageId: number;
  workflowType: "basic" | "advanced";
  requires2FA?: boolean;

  status: "approved" | "rejected";
  handleSuccess?: () => void;
  // TODO: Add a details & a handleSuccess here
  // details should be an array of objects with style indications and all that
  // handleSuccess will called in approval container onSuccess
};

export interface IGlobalState {
  currentCompany: TCCompany | null;
  showInitialSetUp: boolean;
  showAdminWelcomeMessage: boolean;
  currentApproval?: TCurrentApproval;
  upLoadFileString: TUploadFile[];
}

const initState: IGlobalState = {
  currentCompany: null,
  showInitialSetUp: false,
  showAdminWelcomeMessage: true,
  upLoadFileString: [],
};

interface IGlobalContext {
  state: IGlobalState;
  dispatch: Function;
}

export enum EGlobalOps {
  setCurrentApproval,
  setCurrentCompanyId,
  setAdminWelcomeMessage,
  setShowInitialSetup,
  setUploadFileString,
  clearUploadFileString,
}

interface IAction {
  payload?: any;
  type: EGlobalOps;
}
const updateLocalStorage = ({ key, val }: { key: string; val: string }) => {
  localStorage.setItem(key, JSON.stringify(val));
};

const removeAuthLocalStorage = ({ key }: { key: string }) => {
  localStorage.removeItem("currentCompany");
};

const GlobalReducer = (state: IGlobalState, action: IAction): IGlobalState => {
  switch (action.type) {
    case EGlobalOps.setCurrentCompanyId:
      const newState = {
        ...state,
        currentCompany: action.payload,
      };
      updateLocalStorage({
        key: "currentCompany",
        val: action.payload,
      });
      return newState;
    case EGlobalOps.setUploadFileString:
      // delete the key if it exists
      const updatedFileString = state.upLoadFileString.filter(
        (item) => item.key !== (action.payload as TUploadFile).key
      );
      return {
        ...state,
        upLoadFileString: [
          ...updatedFileString,
          {
            key: (action.payload as TUploadFile).key,
            value: (action.payload as TUploadFile).value,
          },
        ],
      };
    case EGlobalOps.clearUploadFileString:
      // delete the key if it exists
      const clearedFileString = state.upLoadFileString.filter(
        (item) => item.key !== (action.payload as TUploadFile).key
      );
      return {
        ...state,
        upLoadFileString: [...clearedFileString],
      };
    case EGlobalOps.setShowInitialSetup:
      return {
        ...state,
        showInitialSetUp: action.payload,
      };
    case EGlobalOps.setAdminWelcomeMessage:
      return {
        ...state,
        showAdminWelcomeMessage: action.payload,
      };
    case EGlobalOps.setCurrentApproval:
      return {
        ...state,
        currentApproval: action.payload as TCurrentApproval,
      };

    default:
      return state;
  }
};

export const GlobalContext = createContext<IGlobalContext>({
  state: initState,
  dispatch: Function,
});

interface IProps {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    GlobalReducer,
    initState,
    (): IGlobalState => {
      const localCC = localStorage.getItem("currentCompany");
      const currentCompany =
        typeof localCC === "string"
          ? (JSON.parse(localCC) as unknown as TCCompany)
          : null;
      return {
        currentCompany,
        showInitialSetUp: false,
        upLoadFileString: [],
        showAdminWelcomeMessage: true,
      };
    }
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
