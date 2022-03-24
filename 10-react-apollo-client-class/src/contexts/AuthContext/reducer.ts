export interface State {
  value: boolean;
}

export type Action = { type: "SET_TRUE" } | { type: "SET_FALSE" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TRUE": {
      return { ...state, value: true }
    }
    case "SET_FALSE": {
      return { ...state, value: false }
    }
  }
}
