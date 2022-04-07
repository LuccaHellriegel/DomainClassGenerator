import {createContext, FC, ReactNode, useContext, useReducer} from "react";
import {defaultModel} from "../domain/create";
import {ClassModel} from "../domain/domain";

export type ClassModelDispatch = React.Dispatch<{
  type: keyof ClassModel;
  payload: ClassModel[keyof ClassModel];
}>;

const ClassModelContext = createContext<{
  state: ClassModel;
  dispatch: ClassModelDispatch;
}>(undefined as unknown as any);

//TODO: better reducer, with this I need to hand in the full state to every single component
const classModelReducer = (
  state: ClassModel,
  action: {type: keyof ClassModel; payload: ClassModel[keyof ClassModel]}
) => {
  return {...state, [action.type]: action.payload};
};

export const ClassModelContextProvider: FC<{children: ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(classModelReducer, defaultModel());
  const value = {state, dispatch};
  return (
    <ClassModelContext.Provider value={value}>
      {children}
    </ClassModelContext.Provider>
  );
};

export const useClassModel = () => {
  return useContext(ClassModelContext);
};
